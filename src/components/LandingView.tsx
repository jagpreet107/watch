import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Diamond, Mail, User, ChevronDown } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { WATCHES_DATA } from '../data';
import { Watch } from '../types';

interface LandingViewProps {
  onExploreCollections: () => void;
  onSelectWatch: (watch: Watch) => void;
  onSubmitInquiry: (data: { fullName: string; email: string; interest: string }) => void;
}

export default function LandingView({
  onExploreCollections,
  onSelectWatch,
  onSubmitInquiry,
}: LandingViewProps) {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryInterest, setInquiryInterest] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Grab some reference watches to link directly
  const gmtWatch = WATCHES_DATA.find((w) => w.id === 'obsidian-gmt') || WATCHES_DATA[0];
  const goldWatch = WATCHES_DATA.find((w) => w.id === 'celestial-gold') || WATCHES_DATA[3];
  const lunarWatch = WATCHES_DATA.find((w) => w.id === 'lunar-perpetual') || WATCHES_DATA[5];

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;

    onSubmitInquiry({
      fullName: inquiryName,
      email: inquiryEmail,
      interest: inquiryInterest,
    });

    setInquirySuccess(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryInterest('');
      setInquirySuccess(false);
    }, 4000);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="bg-cover bg-center bg-no-repeat w-full h-full opacity-50 transition-all duration-1000 scale-100"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQY6Cd27-SzUQugbINS4wr47c4yOMhaYx4ZKJJbFKYX4ysshqY8LWPVTDcAhCFTuvSoKLqJDwMm6QUXyKcScsP0CFNtFUZ5lPV80-ef7HuV5rtOft73bn_o-BSzidw9FHK91BZxUNleGohYDiSLWIOhCE_8V66fttqvtHgsZYE_BVq4lC2av70O8yHACU629BZHpaXZr4-5cisPjJ61OlNU2cj74SdsqOM5iLuWHj8mj2Ivyo35ufltGrgoq_9cCdT-I95mSOiJ4c')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/20 to-[#121414]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121414] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 w-full flex flex-col items-start pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#e2e2e2] max-w-4xl mb-6 tracking-tight leading-none"
          >
            TIMELESS PRECISION.
            <br />
            BEYOND HOROLOGY.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="font-sans text-lg text-[#c4c7c7] max-w-xl mb-10 leading-relaxed font-light"
          >
            Discover masterpieces of mechanical artistry. Where centuries of Swiss heritage meet avant-garde design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <button
              onClick={onExploreCollections}
              className="bg-[#e9c176] text-[#412d00] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-8 py-5 hover:bg-[#ffdea5] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
            >
              Explore the Collection
            </button>
            <button
              onClick={() => handleScrollToSection('about-heritage')}
              className="border border-white/20 text-[#e2e2e2] font-sans font-semibold text-xs uppercase tracking-[0.2em] px-8 py-5 hover:border-[#e9c176] hover:text-[#e9c176] hover:bg-white/5 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
            >
              Discover Heritage
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => handleScrollToSection('about-heritage')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer animate-pulse"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#e2e2e2] font-semibold">SCROLL</span>
          <ArrowDown size={14} className="text-[#e2e2e2]" />
        </div>
      </section>

      {/* About Section: A Legacy of Excellence */}
      <section id="about-heritage" className="py-32 md:py-44 px-6 md:px-20 relative bg-gradient-to-b from-[#121414] to-[#0c0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 flex flex-col justify-center relative">
              <div className="absolute -left-10 top-0 w-[1px] h-32 bg-[#e9c176] opacity-30 hidden lg:block" />
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c176] mb-4">HERITAGE</h2>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-8 leading-tight">
                A Legacy of
                <br />
                Excellence.
              </h3>
              <p className="font-sans text-[#c4c7c7] mb-6 leading-relaxed text-base font-light">
                For generations, Horology Prestige has defined the absolute pinnacle of Swiss watchmaking. Our ateliers blend traditional techniques with cutting-edge micro-mechanics, resulting in timepieces that are not merely instruments of time, but enduring works of art.
              </p>
              <p className="font-sans text-[#c4c7c7] mb-10 leading-relaxed text-base font-light">
                Every single component is meticulously finished by hand, ensuring that each watch possesses a unique soul and character, destined to be passed down as a sacred legacy through generations.
              </p>
              <button
                onClick={onExploreCollections}
                className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-[#e9c176] transition-colors group text-left self-start"
              >
                <span>Read the full story</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            <div className="order-1 lg:order-2 relative w-full aspect-[4/5] lg:aspect-square">
              <div className="absolute inset-0 border border-white/5 translate-x-4 translate-y-4" />
              <div
                className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000 bg-zinc-900 border border-white/10"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpXul6Gq_25-xSgD_REtSFYMhxEWeOFvpzCOtK6BqAa1z50hBItB5h6dG7F2ZJKt5OStpM3NHsbil6eNJwoi--9Xn7UsCAyGxqFiOMyjst8zek4F5csI0PoUKyZrU3yojHkAzwu_V6_abOP0hgzzRY8dtM_o_7wuYcy6QHYaWqzXPNbgVkl2d4suwrRCYVqtEdgCz6pbpK6DKCyDrPG2-uVnKUkzbp_3Yzp3GqtLDfMXiVfyarF0LDuoRzmvEF-JgdvHm8XefxhNw')`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Bento Grid */}
      <section className="py-24 md:py-32 px-6 md:px-20 bg-[#0c0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c176] mb-2">CURATED</h2>
              <h3 className="font-serif text-3xl md:text-4xl text-white">Masterpieces</h3>
            </div>
            <button
              onClick={onExploreCollections}
              className="hidden md:inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#c4c7c7] hover:text-[#e9c176] transition-colors"
            >
              View All Collections
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[420px]">
            {/* Large Feature Card */}
            <div
              onClick={() => onSelectWatch(gmtWatch)}
              className="md:col-span-2 group relative overflow-hidden border border-white/5 cursor-pointer bg-zinc-900 hover:border-[#e9c176]/30 transition-all duration-700"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKosIhL3w_VYmAhgUBoy7I4wgzYGE-0Y5VyHZSIrKHLDsCD07uIF03llHRuXCjS8P2D_amCC-Vv3PG69XPCmqAEQSHOJjICGlEhtA8MV_wByBqZH9YE2c5PHuv3BFOsGMBzAOKrqXKlAq08sk_JcxceXbuyDbUjkEOlFBU7mFAHPgjoTlP7zs6z-r0kzJzW79nq2Tuj1kj2u648otjXBbF5KO7FvljPs1YY4AeZk_F78P4BIGNJKToJ54WhYs2RahLdX3-a2rQzZU')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-[#0c0f0f]/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end gap-6">
                <div>
                  <span className="inline-block px-3 py-1 border border-[#e9c176]/30 bg-[#e9c176]/5 text-[#e9c176] font-sans font-semibold text-[9px] uppercase tracking-[0.2em] mb-4">
                    NEW RELEASE
                  </span>
                  <h4 className="font-serif text-2xl md:text-3xl text-white mb-2 leading-tight">
                    The Vanguard Chronograph
                  </h4>
                  <p className="font-sans text-sm text-[#c4c7c7] max-w-md font-light leading-relaxed">
                    Aerospace-grade titanium paired with an in-house skeletonized movement. Click to view Obsidian legacy details.
                  </p>
                </div>
                <button
                  aria-label="View Timepiece Details"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:border-[#e9c176] group-hover:text-[#e9c176] group-hover:bg-[#e9c176]/10 transition-all duration-500 shrink-0 bg-[#0c0f0f]/50 backdrop-blur-md"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* Small Card 1 */}
            <div
              onClick={() => onSelectWatch(goldWatch)}
              className="group relative overflow-hidden border border-white/5 cursor-pointer bg-zinc-900 hover:border-[#e9c176]/30 transition-all duration-700"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAiKkfkbQtdIVZp3hqYn3ngd9NxxpMWjuTztH1eggKWDskKh-IiDxTh015CEr-yawvtw2XWWtGsgZbSOmIbl8UIa85uADui-Z6sScfEL1KPF8lnzrwHgVE1xw7h9Dk75SY3WthmZFotWfXxSDJJCvuJhe10SjQTLIzWvtf07nZMw8B-l658NOcxbMh-bd-sAb3vJsOFGiOICPyILNIcbw_00wnijQGnDTqho9Pv_x6dk4YbOLV78VpKe2xSYX9whCk_AxbVO7KkSXk')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h4 className="font-serif text-lg text-white mb-1 transition-colors group-hover:text-[#e9c176]">
                  Classique Ultra-Thin
                </h4>
                <p className="font-sans text-[10px] font-semibold text-[#e9c176] uppercase tracking-[0.2em]">ROSE GOLD COLLECTION</p>
              </div>
            </div>

            {/* Small Card 2 */}
            <div
              onClick={() => onSelectWatch(lunarWatch)}
              className="group relative overflow-hidden border border-white/5 cursor-pointer bg-zinc-900 hover:border-[#e9c176]/30 transition-all duration-700"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYPufBFLrUgIzRU3Dvifg2UT2z4262u6OiA4OMEH_XeTmmxXJRM0bN3QuNvtUlue3Rnomp_MBVboYE0P-CTmIGeNVDYHLeQCEQy6OFX3bA1i3DZyYUJ37Mu9cADPOGJOpZSZtXEKBrh_BI711x9Q57DuV0hqNMtxz7XUN84FT9Z0hbum-G-1D89iEibM1vRKG7YvD7MwHp77O18agT4ybWKDxnbVvmVcksVRaFtITTMlMLI35dHCxeH9Ar5H-ESTcaVJdkX82_U3w')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h4 className="font-serif text-lg text-white mb-1 transition-colors group-hover:text-[#e9c176]">
                  Lunar Perpetual Complex
                </h4>
                <p className="font-sans text-[10px] font-semibold text-[#e9c176] uppercase tracking-[0.2em]">PLATINUM SERIES</p>
              </div>
            </div>

            {/* Small Text Card */}
            <div
              onClick={onExploreCollections}
              className="md:col-span-2 group relative overflow-hidden border border-white/5 bg-[#1a1c1c] flex items-center justify-center p-8 sm:p-12 text-center cursor-pointer hover:bg-[#282a2b] transition-all duration-500 hover:border-[#e9c176]/20"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#e9c176]/5 flex items-center justify-center border border-[#e9c176]/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Diamond size={24} className="text-[#e9c176]" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-white mb-3">Bespoke Commissions</h4>
                <p className="font-sans text-xs sm:text-sm text-[#c4c7c7] max-w-md mx-auto font-light leading-relaxed">
                  Collaborate directly with our master Swiss watchmakers to create a singular, hand-finished timepiece tailored precisely to your exacting specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form and Boutiques Section */}
      <section id="contact-boutiques" className="py-32 px-6 md:px-20 border-t border-white/10 bg-[#121414]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Form Side */}
            <div className="lg:col-span-5">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c176] mb-4">
                PRIVATE APPOINTMENTS
              </h2>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-8">Inquire</h3>
              <p className="font-sans text-[#c4c7c7] mb-12 font-light leading-relaxed text-sm">
                Request a private, secure viewing at one of our global flagship salons or arrange a standard consultation with a horological specialist.
              </p>

              {inquirySuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 border border-[#e9c176]/20 bg-[#e9c176]/5 text-center flex flex-col items-center gap-4"
                >
                  <Diamond size={32} className="text-[#e9c176] animate-pulse" />
                  <h4 className="font-serif text-xl text-white">Inquiry Received</h4>
                  <p className="font-sans text-xs text-[#c4c7c7] leading-relaxed max-w-xs">
                    Thank you. A Horology Prestige concierge will contact you within 24 hours to coordinate your custom appointment at your chosen boutique.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-8">
                  <div className="relative group">
                    <User className="absolute right-0 top-3 text-white/30 group-focus-within:text-[#e9c176] transition-colors" size={16} />
                    <input
                      type="text"
                      id="name"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder=" "
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white font-sans text-sm pb-3 focus:ring-0 focus:border-[#e9c176] transition-colors px-0 peer focus:outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-0 text-white/40 font-sans text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#e9c176] peer-valid:-top-4 peer-valid:text-[9px]"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative group">
                    <Mail className="absolute right-0 top-3 text-white/30 group-focus-within:text-[#e9c176] transition-colors" size={16} />
                    <input
                      type="email"
                      id="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder=" "
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white font-sans text-sm pb-3 focus:ring-0 focus:border-[#e9c176] transition-colors px-0 peer focus:outline-none"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-0 text-white/40 font-sans text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#e9c176] peer-valid:-top-4 peer-valid:text-[9px]"
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      id="interest"
                      value={inquiryInterest}
                      onChange={(e) => setInquiryInterest(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white font-sans text-sm pb-3 pr-8 focus:ring-0 focus:border-[#e9c176] transition-colors px-0 appearance-none focus:outline-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#121414] text-white/40">
                        Select Area of Interest...
                      </option>
                      <option value="heritage" className="bg-[#121414] text-[#c4c7c7]">
                        Current Collection Inquiry
                      </option>
                      <option value="bespoke" className="bg-[#121414] text-[#c4c7c7]">
                        Bespoke Commission Consultation
                      </option>
                      <option value="private-viewing" className="bg-[#121414] text-[#c4c7c7]">
                        Private Flagship Salon Viewing
                      </option>
                      <option value="service" className="bg-[#121414] text-[#c4c7c7]">
                        Maintenance & Expert Restorations
                      </option>
                    </select>
                    <ChevronDown size={16} className="absolute right-0 top-1 text-white/50 pointer-events-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full border border-[#e9c176] text-[#e9c176] hover:bg-[#e9c176] hover:text-[#412d00] font-sans font-semibold text-xs uppercase tracking-[0.2em] py-5 transition-all duration-500 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none cursor-pointer"
                  >
                    Request Appointment
                  </button>
                </form>
              )}
            </div>

            {/* Boutiques Side */}
            <div className="lg:col-span-6 lg:col-start-7 lg:pl-12 lg:border-l border-white/10">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#e9c176] mb-12">
                GLOBAL BOUTIQUES
              </h2>
              
              <div className="space-y-12">
                {/* Location 1 */}
                <div 
                  onClick={() => handleScrollToSection('contact-boutiques')}
                  className="group cursor-pointer block"
                >
                  <h4 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-[#e9c176] transition-colors flex justify-between items-center">
                    Geneva
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all text-[#e9c176] duration-300" />
                  </h4>
                  <div className="h-[1px] w-full bg-white/5 group-hover:bg-[#e9c176]/20 transition-colors" />
                  <p className="font-sans text-[#c4c7c7] text-sm mt-3 font-light leading-relaxed">
                    Rue du Rhône 39
                    <br />
                    1204 Genève, Switzerland
                  </p>
                  <p className="font-sans text-[9px] font-bold text-[#e9c176] tracking-[0.2em] mt-2 opacity-60">
                    FLAGSHIP SALON
                  </p>
                </div>

                {/* Location 2 */}
                <div 
                  onClick={() => handleScrollToSection('contact-boutiques')}
                  className="group cursor-pointer block"
                >
                  <h4 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-[#e9c176] transition-colors flex justify-between items-center">
                    London
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all text-[#e9c176] duration-300" />
                  </h4>
                  <div className="h-[1px] w-full bg-white/5 group-hover:bg-[#e9c176]/20 transition-colors" />
                  <p className="font-sans text-[#c4c7c7] text-sm mt-3 font-light leading-relaxed">
                    15 New Bond Street
                    <br />
                    London W1S 3ST, United Kingdom
                  </p>
                </div>

                {/* Location 3 */}
                <div 
                  onClick={() => handleScrollToSection('contact-boutiques')}
                  className="group cursor-pointer block"
                >
                  <h4 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-[#e9c176] transition-colors flex justify-between items-center">
                    New York
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all text-[#e9c176] duration-300" />
                  </h4>
                  <div className="h-[1px] w-full bg-white/5 group-hover:bg-[#e9c176]/20 transition-colors" />
                  <p className="font-sans text-[#c4c7c7] text-sm mt-3 font-light leading-relaxed">
                    712 Fifth Avenue
                    <br />
                    New York, NY 10019, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
