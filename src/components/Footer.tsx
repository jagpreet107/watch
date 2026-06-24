interface FooterProps {
  onNavClick: (view: 'landing' | 'collections') => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-[#0c0f0f] border-t border-white/10 w-full mt-auto text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-20 py-20 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-3xl tracking-[0.2em] text-[#c9c6c5] mb-4">HOROLOGY</h2>
            <p className="text-[#c4c7c7] text-sm leading-relaxed max-w-sm">
              Precision, heritage, and the pursuit of absolute perfection. Hand-finishing memories and mechanical art since 1924.
            </p>
          </div>
          <p className="text-white/40 text-xs mt-12 md:mt-0 font-sans tracking-wide">
            © 2026 HOROLOGY PRESTIGE. ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c176] mb-2">Legal</h3>
          <a href="#" className="text-[#c4c7c7] hover:text-[#e9c176] transition-colors text-sm font-sans">
            Privacy Policy
          </a>
          <a href="#" className="text-[#c4c7c7] hover:text-[#e9c176] transition-colors text-sm font-sans">
            Terms of Service
          </a>
          <button 
            onClick={() => onNavClick('collections')}
            className="text-left text-[#c4c7c7] hover:text-[#e9c176] transition-colors text-sm font-sans"
          >
            Digital Catalog
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c176] mb-2">Support</h3>
          <a href="#" className="text-[#c4c7c7] hover:text-[#e9c176] transition-colors text-sm font-sans">
            Shipping & Import duty
          </a>
          <a href="#" className="text-[#c4c7c7] hover:text-[#e9c176] transition-colors text-sm font-sans">
            Returns policy
          </a>
          <a href="#" className="text-[#c4c7c7] hover:text-[#e9c176] transition-colors text-sm font-sans">
            Bespoke Services
          </a>
        </div>
      </div>
    </footer>
  );
}
