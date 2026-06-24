import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface NavbarProps {
  currentView: 'landing' | 'collections' | 'product-detail';
  setCurrentView: (view: 'landing' | 'collections' | 'product-detail') => void;
  cartCount: number;
  onCartClick: () => void;
  onContactClick: () => void;
}

export default function Navbar({
  currentView,
  setCurrentView,
  cartCount,
  onCartClick,
  onContactClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (view: 'landing' | 'collections', sectionId?: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-0 h-32 bg-[#0c0f0f]/95 backdrop-blur-xl z-[60] border-b border-white/10 flex items-center px-6 md:px-20"
          >
            <div className="max-w-7xl mx-auto w-full flex items-center gap-4">
              <Search className="text-[#e9c176] shrink-0" size={24} />
              <input
                type="text"
                placeholder="Search collections, legacy timepieces, boutiques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-none text-white font-sans text-lg focus:outline-none placeholder-white/40"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 hover:bg-white/5 transition-colors text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Nav Web */}
      <nav id="top-nav" className="bg-[#121414]/70 backdrop-blur-xl fixed top-0 w-full border-b border-white/10 flex justify-between items-center h-20 px-6 md:px-20 z-50 transition-all duration-500 ease-in-out">
        <div 
          onClick={() => handleNavClick('landing')}
          className="font-serif text-2xl tracking-[0.2em] font-medium text-[#c9c6c5] cursor-pointer hover:text-[#e9c176] transition-colors"
        >
          HOROLOGY
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-12 items-center font-sans text-xs uppercase tracking-[0.15em] font-semibold text-white/70">
          <button
            onClick={() => handleNavClick('collections')}
            className={`transition-colors py-2 relative group cursor-pointer ${
              currentView === 'collections' ? 'text-[#e9c176]' : 'hover:text-[#e9c176]'
            }`}
          >
            Collections
            <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#e9c176] transition-transform duration-300 ${
              currentView === 'collections' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`} />
          </button>
          
          <button
            onClick={() => handleNavClick('landing', 'about-heritage')}
            className="hover:text-[#e9c176] transition-colors cursor-pointer py-2"
          >
            Heritage
          </button>
          
          <button
            onClick={() => handleNavClick('landing', 'contact-boutiques')}
            className="hover:text-[#e9c176] transition-colors cursor-pointer py-2"
          >
            Boutiques
          </button>
          
          <button
            onClick={onContactClick}
            className="hover:text-[#e9c176] transition-colors cursor-pointer py-2"
          >
            Journal
          </button>
        </div>

        {/* Right tools */}
        <div className="flex gap-6 items-center text-[#c9c6c5]">
          <button
            aria-label="Search Catalog"
            onClick={() => setSearchOpen(true)}
            className="hover:text-[#e9c176] transition-colors p-2 cursor-pointer"
          >
            <Search size={20} />
          </button>

          <button
            aria-label="Shopping Cart"
            onClick={onCartClick}
            className="hover:text-[#e9c176] transition-colors p-2 relative cursor-pointer"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-4 h-4 bg-[#e9c176] text-[#412d00] font-sans text-[10px] font-bold rounded-full flex items-center justify-center translate-x-1 -translate-y-1"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden hover:text-[#e9c176] transition-colors p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 bg-[#121414]/95 backdrop-blur-2xl z-40 border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 font-sans text-sm uppercase tracking-[0.15em] font-semibold text-white/80">
              <button
                onClick={() => handleNavClick('collections')}
                className={`text-left py-2 border-b border-white/5 ${
                  currentView === 'collections' ? 'text-[#e9c176]' : ''
                }`}
              >
                Collections
              </button>
              <button
                onClick={() => handleNavClick('landing', 'about-heritage')}
                className="text-left py-2 border-b border-white/5"
              >
                Heritage
              </button>
              <button
                onClick={() => handleNavClick('landing', 'contact-boutiques')}
                className="text-left py-2 border-b border-white/5"
              >
                Boutiques
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="text-left py-2 text-[#e9c176]"
              >
                Request Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
