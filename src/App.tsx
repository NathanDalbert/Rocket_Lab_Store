// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <ThemeProvider> {}
      <CartProvider>
        <ToastProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950"> {}
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="/search" element={<SearchPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;