import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';
import LoadingScreen from './components/ui/LoadingScreen';
import CartToast from './components/ui/CartToast';
import LoginModal from './components/ui/LoginModal';
import OrderSuccessModal from './components/ui/OrderSuccessModal';
import { siteConfig } from './config/siteData';

const HomePage = lazy(() => import('./pages/HomePage'));
const BistrotPage = lazy(() => import('./pages/BistrotPage'));
const CaviarBarPage = lazy(() => import('./pages/CaviarBarPage'));
const PatisseriePage = lazy(() => import('./pages/PatisseriePage'));
const ChocolatierPage = lazy(() => import('./pages/ChocolatierPage'));
const CasaGilliPage = lazy(() => import('./pages/CasaGilliPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ReservationPage = lazy(() => import('./pages/ReservationPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Animated Route Transitions Wrapper
function AnimatedRoutes({
  handleAddToCart,
  cart,
  handleUpdateQuantity,
  handleRemoveItem,
  handleClearCart,
  user,
  setLoginModalOpen,
  handleCompleteCheckout,
  handleUpdateUser,
  handleLogout,
  orders,
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
            <Route path="/bistrot" element={<BistrotPage />} />
            <Route path="/caviar-bar" element={<CaviarBarPage onAddToCart={handleAddToCart} />} />
            <Route path="/patisserie" element={<PatisseriePage onAddToCart={handleAddToCart} />} />
            <Route path="/chocolatier" element={<ChocolatierPage onAddToCart={handleAddToCart} />} />
            <Route path="/casa-gilli" element={<CasaGilliPage />} />
            <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                  onAddToCart={handleAddToCart}
                  user={user}
                  onOpenLogin={() => setLoginModalOpen(true)}
                  onCompleteCheckout={handleCompleteCheckout}
                />
              }
            />
            <Route
              path="/account"
              element={
                <AccountPage
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  onLogout={handleLogout}
                  orders={orders}
                />
              }
            />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null); // null = logged out, object = logged in member
  const [orders, setOrders] = useState([]);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setToast(product);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleLoginSuccess = (userData) => {
    setUser({
      name: userData.name || 'Gilli Member',
      email: userData.email || 'member@caffegilli.com',
      phone: userData.phone || '',
      address: userData.address || '',
      city: userData.city || '',
      postalCode: userData.postalCode || '',
      country: userData.country || 'Россия',
    });
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateUser = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const handleCompleteCheckout = async (orderPayload) => {
    // SECURITY-HARDENING: Настоящий API вызов к backend'у
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: orderPayload.items.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Checkout failed:', errorData);
        alert('Ошибка при оформлении заказа: ' + (errorData.error || 'Проверьте данные'));
        return;
      }

      const orderResult = await response.json();
      
      setOrders((prev) => [orderResult, ...prev]);
      setOrderSuccess(orderResult);
      setCart([]);
    } catch (err) {
      console.error('Network error during checkout:', err);
      alert('Ошибка сети. Проверьте соединение с интернетом.');
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <LoadingScreen />
      <CartToast toast={toast} onClose={() => setToast(null)} />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <OrderSuccessModal
        isOpen={!!orderSuccess}
        onClose={() => setOrderSuccess(null)}
        orderDetails={orderSuccess}
        user={user}
      />
      <SmoothScroll>
        <div className="flex flex-col min-h-screen">
          <Navbar
            cartCount={totalCartCount}
            user={user}
            onOpenLogin={() => setLoginModalOpen(true)}
          />
          
          <main className="flex-grow">
            <AnimatedRoutes
              handleAddToCart={handleAddToCart}
              cart={cart}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
              handleClearCart={handleClearCart}
              user={user}
              setLoginModalOpen={setLoginModalOpen}
              handleCompleteCheckout={handleCompleteCheckout}
              handleUpdateUser={handleUpdateUser}
              handleLogout={handleLogout}
              orders={orders}
            />
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}
