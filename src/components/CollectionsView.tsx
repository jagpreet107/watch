import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';
import { WATCHES_DATA } from '../data';
import { Watch } from '../types';

interface CollectionsViewProps {
  onSelectWatch: (watch: Watch) => void;
}

type CollectionFilter = 'all' | 'heritage' | 'curated' | 'classic' | 'modern';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

export default function CollectionsView({ onSelectWatch }: CollectionsViewProps) {
  const [filter, setFilter] = useState<CollectionFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filteredAndSortedWatches = useMemo(() => {
    let result = [...WATCHES_DATA];

    // Filter
    if (filter !== 'all') {
      result = result.filter((w) => w.collection === filter);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.rawPrice - b.rawPrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.rawPrice - a.rawPrice);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [filter, sortBy]);

  const categories: { label: string; value: CollectionFilter }[] = [
    { label: 'All Masterpieces', value: 'all' },
    { label: 'Heritage', value: 'heritage' },
    { label: 'Curated', value: 'curated' },
    { label: 'Classic', value: 'classic' },
    { label: 'Modern', value: 'modern' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#121414] py-24 md:py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6"
          >
            The Collections
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-base sm:text-lg text-[#c4c7c7] leading-relaxed font-light"
          >
            Explore our curated selection of masterpieces. Each timepiece represents the absolute pinnacle of horological engineering, blending traditional craftsmanship with avant-garde design, forged in the crucible of absolute precision.
          </motion.p>
        </header>

        {/* Filter and Sort Dashboard Controls */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16 border-b border-white/10 pb-6">
          
          {/* Categories Tab list */}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 sm:px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-widest border transition-all duration-350 cursor-pointer ${
                  filter === cat.value
                    ? 'border-[#e9c176] text-[#e9c176] bg-[#e9c176]/5'
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-3 shrink-0">
            <SlidersHorizontal size={14} className="text-[#e9c176]" />
            <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-white/40">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border-none text-white font-sans text-xs uppercase tracking-wider focus:ring-0 focus:outline-none cursor-pointer text-[#e9c176]"
            >
              <option value="default" className="bg-[#121414] text-[#c4c7c7]">Unveiled (Featured)</option>
              <option value="price-asc" className="bg-[#121414] text-[#c4c7c7]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#121414] text-[#c4c7c7]">Price: High to Low</option>
              <option value="name-asc" className="bg-[#121414] text-[#c4c7c7]">Alphabetical A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedWatches.map((watch, idx) => (
            <motion.article
              key={watch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.4) }}
              className="group relative bg-[#1a1c1c] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#e9c176]/30 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl"
            >
              <div 
                className="relative aspect-[3/4] overflow-hidden bg-[#0c0f0f] cursor-pointer"
                onClick={() => onSelectWatch(watch)}
              >
                {watch.tag && (
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-0.5 border border-white/10 bg-[#0c0f0f]/80 text-[#c4c7c7] font-sans text-[8px] tracking-[0.2em] font-medium uppercase">
                    {watch.tag}
                  </span>
                )}
                <img
                  alt={watch.name}
                  src={watch.image}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121414]/90 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-4 relative z-10 bg-[#1a1c1c]">
                <div>
                  <h2 
                    className="font-serif text-lg text-white mb-1 cursor-pointer transition-colors hover:text-[#e9c176]"
                    onClick={() => onSelectWatch(watch)}
                  >
                    {watch.name}
                  </h2>
                  <p className="font-sans text-xs font-semibold text-[#e9c176] tracking-widest">{watch.price}</p>
                </div>

                <button
                  onClick={() => onSelectWatch(watch)}
                  className="w-full py-4 border border-white/10 text-white font-sans text-[10px] font-semibold tracking-widest hover:border-[#e9c176] hover:text-[#e9c176] transition-colors duration-300 uppercase cursor-pointer focus:outline-none"
                >
                  View Details
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedWatches.length === 0 && (
          <div className="py-24 text-center border border-white/5 bg-[#1a1c1c]/50">
            <SlidersHorizontal size={32} className="text-white/20 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-white mb-2">No masterpieces match your filter</h3>
            <p className="font-sans text-xs text-[#c4c7c7] mb-6">Try clearing or selecting other curated parameters.</p>
            <button
              onClick={() => { setFilter('all'); setSortBy('default'); }}
              className="px-6 py-2.5 bg-[#e9c176] text-[#412d00] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffdea5] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
