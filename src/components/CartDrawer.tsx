import { motion } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onCheckout,
}: CartDrawerProps) {
  const subTotal = cartItems.reduce((acc, item) => acc + item.watch.rawPrice * item.quantity, 0);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#121414] border-l border-white/10 text-white flex flex-col justify-between"
        >
          {/* Header */}
          <header className="px-6 py-6 border-b border-white/5 flex justify-between items-center bg-[#0c0f0f]">
            <div className="flex items-center gap-3">
              <ShoppingBag size={18} className="text-[#e9c176]" />
              <h2 className="font-serif text-lg tracking-wider">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Shopping Cart"
              className="p-2 -mr-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </header>

          {/* Cart Contents List */}
          <main className="flex-grow overflow-y-auto px-6 py-4 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6">
                  <ShoppingBag className="text-white/25" size={24} />
                </div>
                <h3 className="font-serif text-base text-white mb-2">Your Bag is Empty</h3>
                <p className="font-sans text-xs text-[#c4c7c7] leading-relaxed max-w-xs mb-8">
                  No luxury timepieces have been selected for curation yet. Explore our mechanical catalog to locate yours.
                </p>
                <button
                  onClick={onClose}
                  className="border border-[#e9c176] text-[#e9c176] font-sans font-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-[#e9c176] hover:text-[#412d00] transition-all"
                >
                  Return to Showroom
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.watch.id} className="flex gap-4 p-4 border border-white/5 bg-[#1a1c1c]">
                  {/* Aspect Img Thumb */}
                  <div className="w-20 h-24 bg-[#0c0f0f] border border-white/5 shrink-0 overflow-hidden">
                    <img
                      src={item.watch.image}
                      alt={item.watch.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Quantity & Title details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm text-white mb-1 leading-tight">{item.watch.name}</h4>
                      <p className="font-sans text-xs text-[#e9c176] font-medium">{item.watch.price}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-white/10 bg-[#121414]">
                        <button
                          onClick={() => onUpdateQuantity(item.watch.id, item.quantity - 1)}
                          className="px-3 py-1 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-3 text-xs font-sans font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.watch.id, item.quantity + 1)}
                          className="px-3 py-1 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Remove Button label */}
                      <button
                        onClick={() => onUpdateQuantity(item.watch.id, 0)}
                        className="font-sans text-[10px] uppercase tracking-wider text-white/40 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </main>

          {/* Checkout Footer Drawer area */}
          {cartItems.length > 0 && (
            <footer className="px-6 py-6 border-t border-white/5 bg-[#0c0f0f] space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#c4c7c7] font-semibold">
                  Est. Curated Subtotal
                </span>
                <span className="font-serif text-xl sm:text-2xl text-white">
                  {formatPrice(subTotal)}
                </span>
              </div>
              
              <p className="font-sans text-[10px] text-white/40 leading-relaxed">
                * Complimentary secure armored courier shipping and private salon fitting sessions included on all select timepieces.
              </p>

              <button
                onClick={onCheckout}
                className="w-full bg-[#e9c176] text-[#412d00] hover:bg-[#ffdea5] font-sans font-semibold text-xs uppercase tracking-[0.2em] py-5 flex items-center justify-center gap-3 transition-colors cursor-pointer focus:outline-none"
              >
                <span>Request Concierge Checkout</span>
                <ArrowRight size={14} />
              </button>
            </footer>
          )}
        </motion.div>
      </div>
    </div>
  );
}
