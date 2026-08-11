import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { serverCatalog } from './catalog.js';

const app = express();

// Security middleware
app.use(helmet());
// Allow localhost for dev (in prod this should match your real domain)
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] })); 
app.use(express.json({ limit: '10kb' })); // Restrict body size to prevent DoS

// Rate limiting for checkout
const checkoutLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: { error: 'Too many checkout attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Zod schema for strict validation
const orderSchema = z.object({
  items: z.array(z.object({
    id: z.number().int().positive(),
    quantity: z.number().int().positive().max(50),
  })).min(1).max(20), // Max 20 unique items per order
}).strict(); // Reject any unknown fields (isPremium, total, etc.)

app.post('/api/orders', checkoutLimiter, (req, res) => {
  try {
    const validatedData = orderSchema.parse(req.body);
    
    let subtotal = 0;
    const enrichedItems = [];

    for (const item of validatedData.items) {
      const dbProduct = serverCatalog.find((p) => p.id === item.id);
      
      if (!dbProduct) {
        return res.status(400).json({ error: `Product with ID ${item.id} not found` });
      }

      const itemTotal = dbProduct.price * item.quantity;
      subtotal += itemTotal;
      
      enrichedItems.push({
        id: item.id,
        price: dbProduct.price, // Authorized price from server
        quantity: item.quantity,
        total: itemTotal
      });
    }

    const freeShippingThreshold = 15000;
    const shipping = subtotal >= freeShippingThreshold ? 0 : 950;
    const total = subtotal + shipping;
    
    const orderId = `#ROMANOV-SEC-${randomUUID().split('-')[0].toUpperCase()}`;

    res.json({
      orderId,
      status: 'confirmed',
      total,
      shipping,
      subtotal,
      items: enrichedItems,
    });

  } catch (error) {
    if (error instanceof z.ZodError || error.name === 'ZodError') {
      // Safe error mapping without internal leaks
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: (error.issues || error.errors || []).map(e => ({ path: e.path, message: e.message })) 
      });
    }
    // Log real error to server, return generic message to client
    console.error('Order processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Secure Checkout Server listening on port ${PORT}`);
});
