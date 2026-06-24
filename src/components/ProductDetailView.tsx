import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, X, ShoppingBag, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Watch } from '../types';

interface ProductDetailViewProps {
  watch: Watch;
  onClose: () => void;
  onAddToCart: (watch: Watch) => void;
}

export default function ProductDetailView({
  watch,
  onClose,
  onAddToCart,
}: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(watch.image);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sync state if selected watch changes
  useEffect(() => {
    setSelectedImage(watch.image);
    setIsAdded(false);
  }, [watch]);

  const handleAddToCartClick = () => {
    onAddToCart(watch);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0c0f0f] text-white overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col max-w-7xl mx-auto relative px-6 md:px-20">
        
        {/* Modal Header */}
        <header className="flex justify-between items-center h-20 sticky top-0 z-50 border-b border-white/5 bg-[#0c0f0f]/90 backdrop-blur-md">
          <button
            onClick={onClose}
            className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4c7c7] hover:text-[#e9c176] transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Catalog</span>
          </button>

          <h1 className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-[#c9c6c5] uppercase">
            HOROLOGY
          </h1>

          <button
            onClick={onClose}
            aria-label="Close Product Detail View"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-[#c4c7c7] hover:text-[#e9c176] transition-all group"
          >
            <X size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </header>

        {/* Main Content Grid */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-8 lg:py-16">
          
          {/* Left Side: Dynamic Gallery Display */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            {/* Hero Main Image frame with rim lighting simulator */}
            <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden bg-[#121414] flex items-center justify-center group border border-white/5 shadow-2xl">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                alt={watch.name}
                src={selectedImage}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              
              {/* Luxury interactive badges */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer focus:outline-none"
                >
                  <Heart size={16} fill={isFavorite ? '#f87171' : 'none'} className={isFavorite ? 'text-red-400' : ''} />
                </button>
              </div>
            </div>

            {/* Gallery Thumbnail Tray */}
            {watch.gallery && watch.gallery.length > 1 && (
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin">
                {watch.gallery.map((imgUrl, i) => {
                  const isActive = selectedImage === imgUrl;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`flex-shrink-0 w-24 h-24 md:w-28 md:h-28 border bg-[#121414] overflow-hidden transition-all duration-300 ${
                        isActive 
                          ? 'border-[#e9c176] scale-95 opacity-100' 
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        alt={`Detail segment ${i + 1}`}
                        src={imgUrl}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Right Side: Luxury Technical Narrative & Actions */}
          <section className="lg:col-span-5 flex flex-col pt-4 lg:pt-0 lg:pl-4 xl:pl-12">
            <div className="sticky top-28">
              
              {/* Collection Header */}
              <div className="mb-10">
                <span className="font-sans text-[11px] font-bold text-[#e9c176] block mb-4 uppercase tracking-[0.25em]">
                  {watch.collection} Collection
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
                  {watch.name}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl text-white">{watch.price}</span>
                  <span className="font-sans text-[10px] text-white/40 tracking-wider">USD — DUTY FREE</span>
                </div>
              </div>

              {/* Add to Cart button */}
              <div className="mb-12">
                <button
                  onClick={handleAddToCartClick}
                  className={`w-full font-sans font-semibold text-xs uppercase tracking-widest py-5 px-8 flex items-center justify-center gap-4 transition-all duration-300 cursor-pointer focus:outline-none ${
                    isAdded
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#e9c176] text-[#412d00] hover:bg-[#ffdea5]'
                  }`}
                >
                  <ShoppingBag size={14} />
                  <span>{isAdded ? 'Timepiece Added' : 'Add to Cart'}</span>
                </button>
              </div>

              {/* Technical Specifications */}
              <div className="mb-12">
                <h3 className="font-sans text-[11px] font-bold text-[#c4c7c7] uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">
                  Technical Specifications
                </h3>
                <ul className="flex flex-col">
                  <li className="py-4 flex justify-between items-center border-b border-white/[0.08]">
                    <span className="font-sans text-xs text-white/50">Case Diameter</span>
                    <span className="font-sans text-xs text-white font-medium">{watch.specifications.caseDiameter}</span>
                  </li>
                  <li className="py-4 flex justify-between items-center border-b border-white/[0.08]">
                    <span className="font-sans text-xs text-white/50">Calibre Movement</span>
                    <span className="font-sans text-xs text-white font-medium">{watch.specifications.movement}</span>
                  </li>
                  <li className="py-4 flex justify-between items-center border-b border-white/[0.08]">
                    <span className="font-sans text-xs text-white/50">Watch Crystal</span>
                    <span className="font-sans text-xs text-white font-medium">{watch.specifications.crystal}</span>
                  </li>
                  <li className="py-4 flex justify-between items-center border-b border-white/[0.08]">
                    <span className="font-sans text-xs text-white/50">Water Resistance</span>
                    <span className="font-sans text-xs text-white font-medium">{watch.specifications.waterResistance}</span>
                  </li>
                </ul>
              </div>

              {/* Narrative Context Story */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-[#e9c176] flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>Masterpiece Narrative</span>
                </h4>
                <p className="font-sans text-sm text-[#c4c7c7] leading-relaxed font-light">
                  {watch.story}
                </p>
                <div className="pt-4 flex items-center gap-2 text-white/40 font-sans text-[10px] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-[#e9c176]" />
                  <span>3-Year Pre-Registered International Atelier Warranty</span>
                </div>
              </div>

            </div>
          </section>
        </main>

        {/* Space Spacer */}
        <div className="h-20" />
      </div>
    </motion.div>
  );
}
