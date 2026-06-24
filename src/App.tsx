import { useState, useEffect, FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingView from './components/LandingView';
import CollectionsView from './components/CollectionsView';
import ProductDetailView from './components/ProductDetailView';
import CartDrawer from './components/CartDrawer';
import { Watch, CartItem } from './types';
import { Mail, CheckCircle, Diamond, Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'collections' | 'product-detail'>('landing');
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Checkout & general appointment popup statuses
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [inquireModalOpen, setInquireModalOpen] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // Handle Cart updates
  const handleAddToCart = (watch: Watch) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.watch.id === watch.id);
      if (existing) {
        return prevCart.map((item) =>
          item.watch.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { watch, quantity: 1 }];
    });
    // Opt-in UX: auto slide open cart drawer upon addition
    setCartOpen(true);
  };

  const handleUpdateQuantity = (watchId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.watch.id !== watchId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.watch.id === watchId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const handleSelectWatch = (watch: Watch) => {
    setSelectedWatch(watch);
    setCurrentView('product-detail');
  };

  const handleGeneralInquiry = (data: { fullName: string; email: string; interest: string }) => {
    setSuccessEmail(data.email);
    // Modal will render success state
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCheckoutModalOpen(false);
    setCart([]); // Clear cart upon secure submission
    setCartOpen(false);
    
    // Toast confirmation alert
    alert("Checkout request successful! A specialized Horology Concierge will reach out via email shortly to coordinate your insured armored delivery and select fitting session.");
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#121414] text-[#e2e2e2] overflow-x-hidden font-sans selection:bg-[#e9c176] selection:text-[#412d00]">
      {/* Navigation Layer */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onContactClick={() => {
          const el = document.getElementById('contact-boutiques');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            setCurrentView('landing');
            setTimeout(() => {
              document.getElementById('contact-boutiques')?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          }
        }}
      />

      {/* Main View Transition Layer */}
      <div className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LandingView
                onExploreCollections={() => setCurrentView('collections')}
                onSelectWatch={handleSelectWatch}
                onSubmitInquiry={handleGeneralInquiry}
              />
            </motion.div>
          )}

          {currentView === 'collections' && (
            <motion.div
              key="collections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CollectionsView onSelectWatch={handleSelectWatch} />
            </motion.div>
          )}

          {currentView === 'product-detail' && selectedWatch && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductDetailView
                watch={selectedWatch}
                onClose={() => setCurrentView('collections')}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shared Footer */}
      <Footer onNavClick={(view) => setCurrentView(view)} />

      {/* Shopping Bag Slider Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={() => setCheckoutModalOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Concierge checkout request Modal screen */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-[#121414] border border-[#e9c176]/30 p-8 sm:p-12 text-center text-white relative shadow-2xl"
            >
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="absolute right-6 top-6 text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="w-12 h-12 rounded-full border border-[#e9c176]/20 bg-[#e9c176]/5 flex items-center justify-center mx-auto mb-6">
                <Diamond size={20} className="text-[#e9c176]" />
              </div>

              <h3 className="font-serif text-2xl mb-2 text-white">Concierge Reception</h3>
              <p className="font-sans text-xs text-[#c4c7c7] leading-relaxed max-w-sm mx-auto mb-8 font-light">
                Secure checkout is managed directly through our private client services division to ensure personal priority dispatch coordination.
              </p>

              <form onSubmit={handleCheckoutSubmit} className="space-y-6 text-left">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#e9c176] font-semibold mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-[#1a1c1c] border border-white/10 text-white p-4 font-sans text-xs focus:border-[#e9c176] focus:outline-none focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#e9c176] font-semibold mb-2">
                    Email for Communications
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@exclusive.com"
                    className="w-full bg-[#1a1c1c] border border-white/10 text-white p-4 font-sans text-xs focus:border-[#e9c176] focus:outline-none focus:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e9c176] text-[#412d00] font-sans font-bold text-xs uppercase tracking-[0.2em] py-5 hover:bg-[#ffdea5] transition-all cursor-pointer"
                >
                  Confirm Secure Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
