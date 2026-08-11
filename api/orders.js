import { z } from 'zod';
import { randomUUID } from 'crypto';

// Server-side authoritative catalog
const serverCatalog = [
  { id: 1, price: 18500 },
  { id: 2, price: 7800 },
  { id: 3, price: 3600 },
  { id: 4, price: 24000 },
  { id: 5, price: 5400 },
  { id: 6, price: 4200 },
];

const orderSchema = z.object({
  items: z.array(z.object({
    id: z.number().int().positive(),
    quantity: z.number().int().positive().max(50),
  })).min(1).max(20),
}).strict();

export default async function handler(req, res) {
  // Enable CORS for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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
        price: dbProduct.price,
        quantity: item.quantity,
        total: itemTotal
      });
    }

    const freeShippingThreshold = 15000;
    const shipping = subtotal >= freeShippingThreshold ? 0 : 950;
    const total = subtotal + shipping;
    
    const orderId = `#ROMANOV-SEC-${randomUUID().split('-')[0].toUpperCase()}`;

    return res.status(200).json({
      orderId,
      status: 'confirmed',
      total,
      shipping,
      subtotal,
      items: enrichedItems,
    });

  } catch (error) {
    if (error instanceof z.ZodError || error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: (error.issues || error.errors || []).map(e => ({ path: e.path, message: e.message })) 
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
