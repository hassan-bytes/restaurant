import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from './components/GlassPanel';
import NeuButton from './components/NeuButton';
import ClayCard from './components/ClayCard';
import AIDiningAssistant from './components/AIDiningAssistant';
import menuData from './data/menu.json';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Users,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Heart,
  Star,
  Coffee,
  UtensilsCrossed,
  X,
  Menu
} from 'lucide-react';

const FacebookIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function App() {
  // Pre-loader / Boot sequence states
  const [introVisible, setIntroVisible] = useState(true);
  const [introSlideUp, setIntroSlideUp] = useState(false);

  // Tabbed Routing Page state
  // 'home' (Hero), 'story' (About), 'menu' (Menu Explorer), 'lounge' (Creme Lounge), 'reserve' (Reservation), 'contact' (Location)
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Card Popup dismiss state
  const [showHeroOverlay, setShowHeroOverlay] = useState(true);

  // Video playback speed & loop opacity states
  const videoRef = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(0.58); // default opacity is 58% for a lighter background

  // Brand and Menu Explorer states
  const [selectedBrand, setSelectedBrand] = useState('mashriq'); // 'mashriq' or 'creme'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loungeCategory, setLoungeCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  // Reservation states
  const [reservation, setReservation] = useState({
    name: '',
    phone: '',
    partySize: 2,
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Boot timer
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIntroSlideUp(true);
    }, 2500); // Pulse logo for 2.5 seconds

    const timer2 = setTimeout(() => {
      setIntroVisible(false);
    }, 3500); // Slide up curtain for 1 second

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Prevent scroll when welcome screen is visible
  useEffect(() => {
    if (introVisible) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [introVisible]);

  // Set video speed for smooth slow-motion
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Start at normal speed
    }
  }, [activePage]);

  // Scroll to top when activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage]);

  // Handle smooth loop fade out, fade in, and dynamic speed ramping
  const handleVideoTimeUpdate = (e) => {
    const video = e.target;
    if (!video.duration) return;
    const timeLeft = video.duration - video.currentTime;
    
    // Speed Ramp: Play first 2s at normal speed (1.0), then smoothly ramp down to majestic slow-mo (0.28) over 1s
    if (video.currentTime < 2.0) {
      video.playbackRate = 1.0;
    } else if (video.currentTime >= 2.0 && video.currentTime < 3.0) {
      const rampProgress = video.currentTime - 2.0; // 0.0 to 1.0
      video.playbackRate = 1.0 - rampProgress * (1.0 - 0.28);
    } else {
      video.playbackRate = 0.28;
    }
    
    const fadeDuration = 1.5; // 1.5s fade window for slower speed
    const maxOpacity = 0.58; // Lighter/brighter video base opacity

    // Smooth crossfade just before loop restarts
    if (timeLeft < fadeDuration) {
      setVideoOpacity((timeLeft / fadeDuration) * maxOpacity);
    } else if (video.currentTime < fadeDuration) {
      setVideoOpacity((video.currentTime / fadeDuration) * maxOpacity);
    } else {
      setVideoOpacity(maxOpacity);
    }
  };

  // Pre-fill party size from AI assistant
  const handlePreFillReservation = ({ partySize }) => {
    setReservation(prev => ({
      ...prev,
      partySize: partySize
    }));
    setActivePage('reserve');
  };

  // Toggle favorites
  const toggleFavorite = (itemName) => {
    setFavorites(prev => {
      if (prev.includes(itemName)) {
        return prev.filter(item => item !== itemName);
      } else {
        return [...prev, itemName];
      }
    });
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  // Handle party size stepper
  const adjustPartySize = (amount) => {
    setReservation(prev => ({
      ...prev,
      partySize: Math.max(1, Math.min(20, prev.partySize + amount))
    }));
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API booking submit
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setReservation({
        name: '',
        phone: '',
        partySize: 2,
        date: '',
        time: '',
        notes: ''
      });
    }, 2000);
  };

  // Construct WhatsApp deep-link message
  const getWhatsAppLink = () => {
    const { name, phone, partySize, date, time, notes } = reservation;
    const cleanPhone = phone ? ` (Phone: ${phone})` : '';
    const cleanNotes = notes ? `\nSpecial requests: ${notes}` : '';

    const text = `Assalam-o-Alaikum! I would like to reserve a table at Mashriq Restaurant.
Details:
- Name: ${name || 'Valued Guest'} ${cleanPhone}
- Party Size: ${partySize} guests
- Date: ${date || 'Today'}
- Time: ${time || 'Dinner time'}${cleanNotes}`;

    return `https://wa.me/923288978888?text=${encodeURIComponent(text)}`;
  };

  // Get categories based on brand selection
  const getCategoriesForBrand = () => {
    const cats = menuData.filter(cat => cat.brand === selectedBrand);
    return [
      { id: 'all', category: 'All Categories' },
      ...cats.map(cat => ({ id: cat.id, category: cat.category }))
    ];
  };

  // Get items based on brand and category filters
  const getFilteredItems = () => {
    const brandCats = menuData.filter(cat => cat.brand === selectedBrand);
    if (selectedCategory === 'all') {
      // Flatten all items for selected brand
      return brandCats.reduce((acc, cat) => {
        const itemsWithCat = cat.items.map(item => ({ ...item, categoryId: cat.id, categoryName: cat.category }));
        return [...acc, ...itemsWithCat];
      }, []);
    } else {
      const matchCat = brandCats.find(cat => cat.id === selectedCategory);
      return matchCat ? matchCat.items.map(item => ({ ...item, categoryId: matchCat.id, categoryName: matchCat.category })) : [];
    }
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setSelectedCategory('all');
  };

  // Get categories for Creme Lounge menu
  const getCremeCategories = () => {
    const cats = menuData.filter(cat => cat.brand === 'creme');
    return [
      { id: 'all', category: 'All Café Menu' },
      ...cats.map(cat => ({ id: cat.id, category: cat.category }))
    ];
  };

  // Get filtered items for Creme Lounge menu
  const getCremeFilteredItems = () => {
    const brandCats = menuData.filter(cat => cat.brand === 'creme');
    if (loungeCategory === 'all') {
      return brandCats.reduce((acc, cat) => {
        const itemsWithCat = cat.items.map(item => ({ ...item, categoryId: cat.id, categoryName: cat.category }));
        return [...acc, ...itemsWithCat];
      }, []);
    } else {
      const matchCat = brandCats.find(cat => cat.id === loungeCategory);
      return matchCat ? matchCat.items.map(item => ({ ...item, categoryId: matchCat.id, categoryName: matchCat.category })) : [];
    }
  };

  return (
    <div className="min-h-screen bg-cream-bg relative flex flex-col justify-between overflow-x-hidden">

      {/* 1. Cinematic Intro & Pre-loader Curtain */}
      <AnimatePresence>
        {introVisible && (
          <motion.div
            initial={{ translateY: 0 }}
            animate={{ translateY: introSlideUp ? '-100%' : 0 }}
            exit={{ translateY: '-100%' }}
            transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0F0F]"
          >
            <div className="relative flex flex-col items-center max-w-md px-6 text-center">
              {/* Pulsing Gold Glow Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-48 h-48 mb-6 relative flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-royal-gold/20 rounded-full blur-3xl animate-pulse"></div>
                <img
                  src="/media/logo/mlogo2.png"
                  alt="Mashriq Logo"
                  className="w-40 h-40 object-contain relative z-10 animate-pulse drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                />
              </motion.div>
              <h2 className="font-serif text-3xl font-bold text-royal-gold tracking-wide mb-2">MASHRIQ</h2>
              <p className="font-serif text-sm text-royal-gold/70 tracking-widest uppercase mb-4">Every Meal, Every Flavour</p>
              <div className="w-16 h-0.5 bg-royal-gold/40 mb-6"></div>
              <p className="font-sans text-xs text-stone-400 tracking-wider">Eastern Dining, Arabic Warmth & Dessert Lounge</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-30 transition-all duration-300 px-4 sm:px-0">
        <GlassPanel className="mx-auto my-2 sm:my-4 max-w-6xl !rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between border border-espresso/5 shadow-md !bg-white/95">
          {/* Logo Brand */}
          <button
            onClick={() => {
              setActivePage('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-1.5 sm:gap-2 bg-transparent border-0 cursor-pointer focus:outline-none"
          >
            <img src="/media/logo/mlogo2.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            <span className="font-serif font-bold text-espresso text-lg sm:text-xl tracking-wide hidden xs:inline">MASHRIQ</span>
          </button>

          {/* Main Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-bold text-espresso/80">
            <button
              onClick={() => setActivePage('story')}
              className={`cursor-pointer hover:text-terracotta transition-all py-1 border-0 bg-transparent focus:outline-none ${activePage === 'story' ? 'text-terracotta border-b-2 border-terracotta' : 'text-espresso/85'
                }`}
            >
              Our Story & Services
            </button>
            <button
              onClick={() => setActivePage('menu')}
              className={`cursor-pointer hover:text-terracotta transition-all py-1 border-0 bg-transparent focus:outline-none ${activePage === 'menu' ? 'text-terracotta border-b-2 border-terracotta' : 'text-espresso/85'
                }`}
            >
              Menu Explorer
            </button>
            <button
              onClick={() => setActivePage('lounge')}
              className={`cursor-pointer hover:text-terracotta transition-all py-1 border-0 bg-transparent focus:outline-none ${activePage === 'lounge' ? 'text-terracotta border-b-2 border-terracotta' : 'text-espresso/85'
                }`}
            >
              Crème Lounge
            </button>
            <button
              onClick={() => setActivePage('reserve')}
              className={`cursor-pointer hover:text-terracotta transition-all py-1 border-0 bg-transparent focus:outline-none ${activePage === 'reserve' ? 'text-terracotta border-b-2 border-terracotta' : 'text-espresso/85'
                }`}
            >
              Reserve Table
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className={`cursor-pointer hover:text-terracotta transition-all py-1 border-0 bg-transparent focus:outline-none ${activePage === 'contact' ? 'text-terracotta border-b-2 border-terracotta' : 'text-espresso/85'
                }`}
            >
              Contact
            </button>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setActivePage('reserve');
                setMobileMenuOpen(false);
              }}
              className="text-[10px] sm:text-xs px-4 sm:px-5 py-2 sm:py-2.5 bg-espresso text-[#FAF8F5] hover:text-white rounded-full font-sans font-bold cursor-pointer transition-all border border-espresso/10 hover:bg-[#3d312b] focus:outline-none shadow-sm"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-espresso/5 border border-espresso/10 text-espresso hover:bg-espresso/10 transition-all cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} className="sm:w-5 sm:h-5" /> : <Menu size={16} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
        </GlassPanel>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] sm:top-[76px] left-4 right-4 z-40 md:hidden overflow-hidden"
          >
            <GlassPanel className="p-3 border border-espresso/10 shadow-lg flex flex-col gap-1.5 bg-white/95">
              {[
                { id: 'story', label: 'Our Story & Services' },
                { id: 'menu', label: 'Menu Explorer' },
                { id: 'lounge', label: 'Crème Lounge' },
                { id: 'reserve', label: 'Reserve Table' },
                { id: 'contact', label: 'Contact' }
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2 px-4 rounded-xl text-left font-sans font-bold text-xs sm:text-sm transition-all border-0 bg-transparent focus:outline-none ${activePage === link.id
                      ? 'bg-terracotta/10 text-terracotta'
                      : 'text-espresso/80 hover:bg-espresso/5'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pages Router Block */}
      <main className={`flex-grow ${activePage === 'home' ? 'pt-0' : 'pt-20 sm:pt-24'}`}>
        <AnimatePresence mode="wait">

          {/* HOME PAGE: Hero Scene with Background Video */}
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-screen relative"
            >
              <section id="hero" className="w-full h-full relative bg-[#0F0F0F] overflow-hidden flex items-end justify-center pb-12">
                {/* Background Video Loop with smooth crossfading transitions */}
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onTimeUpdate={handleVideoTimeUpdate}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-200 ease-in-out"
                  style={{ opacity: videoOpacity }}
                >
                  <source src="/media/landing_video/video.mp4" type="video/mp4" />
                </video>

                {/* Dark Translucent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]/45"></div>

                {/* Sleek Bottom Info Bar */}
                <AnimatePresence>
                  {showHeroOverlay && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-20 w-full max-w-4xl px-4 sm:px-6"
                    >
                      <GlassPanel dark className="p-4 sm:p-6 border border-royal-gold/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 text-left w-full relative pr-10 sm:pr-16">

                        {/* Close Button */}
                        <button
                          onClick={() => setShowHeroOverlay(false)}
                          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-royal-gold transition-all cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/25 hover:bg-white/20 focus:outline-none shadow-md"
                          aria-label="Close Info Panel"
                        >
                          <X size={14} className="stroke-[2.5] sm:w-[18px] sm:h-[18px]" />
                        </button>

                        <div className="pr-4 sm:pr-0">
                          <h1 className="font-serif font-bold text-[#FCD34D] text-lg sm:text-2xl tracking-wide uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                            Mashriq <span className="text-[10px] sm:text-xs font-sans font-normal text-[#FDE68A] lowercase tracking-normal">by Ahmad</span>
                          </h1>
                          <p className="font-sans text-[#FCE8B2] text-[10px] sm:text-xs mt-1 sm:mt-1.5 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-semibold">
                            Experience the warm hospitality, rich Arabic Mandi, sizzling charcoal grills, and premium artisan coffee of Crème café.
                          </p>
                        </div>

                        <div className="flex flex-row gap-2.5 w-full sm:w-auto shrink-0 mt-2 sm:mt-0 justify-start sm:justify-end">
                          <NeuButton
                            gold
                            className="text-[10px] sm:text-xs !px-3 sm:!px-4 !py-2 sm:!py-2.5 rounded-xl font-bold flex-1 sm:flex-initial"
                            onClick={() => setActivePage('reserve')}
                          >
                            Reserve Table <ArrowRight size={12} className="ml-0.5 inline" />
                          </NeuButton>
                          <button
                            onClick={() => setActivePage('menu')}
                            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-royal-gold/50 text-[#FCD34D] font-sans font-bold text-[10px] sm:text-xs hover:bg-[#FCD34D]/10 transition-all cursor-pointer focus:outline-none flex-1 sm:flex-initial text-center"
                          >
                            See Menu
                          </button>
                        </div>
                      </GlassPanel>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Show Info Panel Button (appears when bar is closed) */}
                {!showHeroOverlay && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute bottom-10 left-10 z-20 pointer-events-auto"
                  >
                    <NeuButton
                      gold
                      onClick={() => setShowHeroOverlay(true)}
                      className="text-xs !px-4 !py-2.5 rounded-full shadow-lg flex items-center gap-1.5 font-bold"
                    >
                      <UtensilsCrossed size={12} /> Show Info Bar
                    </NeuButton>
                  </motion.div>
                )}
              </section>
            </motion.div>
          )}

          {/* OUR STORY PAGE */}
          {activePage === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
            >
              <section id="about" className="py-4 sm:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                  {/* Asymmetric Image Spotlight Left */}
                  <div className="relative group px-2 sm:px-0">
                    <div className="absolute inset-0 bg-terracotta/10 rounded-[24px] sm:rounded-[32px] transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 -z-10"></div>
                    <ClayCard className="overflow-hidden !p-0 border border-espresso/5 shadow-lg rounded-[24px] sm:rounded-[32px]">
                      <div className="h-[240px] sm:h-[350px] md:h-[450px] overflow-hidden relative">
                        <img
                          src="/media/images/inter2.jpg"
                          alt="Mashriq Restaurant Interior"
                          className="w-full h-full object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-left">
                          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-royal-gold font-bold">Premium Dining Setup</p>
                          <h4 className="font-serif text-base sm:text-lg font-semibold">Warm & Cozy Family Corridor</h4>
                        </div>
                      </div>
                    </ClayCard>
                  </div>

                  {/* Copy Story Right */}
                  <div className="text-left">
                    <span className="text-xs uppercase tracking-widest text-terracotta font-bold font-sans">Our Heritage</span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso font-bold mt-2 mb-4 sm:mb-6">
                      Eastern Dining & Arabic Warmth
                    </h2>
                    <div className="w-12 h-0.5 sm:h-1 bg-terracotta/60 mb-4 sm:mb-6"></div>

                    <p className="font-sans text-taupe-text text-sm sm:text-base leading-relaxed mb-6">
                      <strong>MASHRIQ</strong>, meaning the East, is a celebration of warmth, hospitality, and flavours that bring people together. Inspired by rich Eastern traditions and modern dining, we create food experiences that feel comforting, generous, and memorable.
                    </p>
                    <p className="font-sans text-taupe-text text-base leading-relaxed mb-8">
                      Whether you gather for our celebrated Chicken Mandi, family-sized chargrilled platters, or to enjoy freshly brewed premium espresso at <strong>Crème by Ahmad</strong>, every meal is prepared with honest ingredients, bold flavours, and thoughtful care on Sialkot Road, Jalalpur Jattan.
                    </p>

                    {/* Quick Facts */}
                    <div className="grid grid-cols-2 gap-4 border-t border-espresso/10 pt-6">
                      <div>
                        <h5 className="font-serif font-bold text-espresso text-lg">Jalalpur Jattan</h5>
                        <p className="text-xs text-taupe-text">Sialkot Road, Pakistan</p>
                      </div>
                      <div>
                        <h5 className="font-serif font-bold text-espresso text-lg">Arabic & Pakistani</h5>
                        <p className="text-xs text-taupe-text">Diverse culinary selections</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services & Amenities Grid Section */}
                <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-espresso/15 text-left">
                  <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-terracotta font-bold font-sans">Our Services & Amenities</span>
                    <h3 className="font-serif text-xl sm:text-3xl text-espresso font-bold mt-2 mb-3 sm:mb-4">
                      Features, Offerings & Comforts
                    </h3>
                    <p className="font-sans text-taupe-text text-[11px] sm:text-sm leading-relaxed">
                      We are dedicated to providing an inclusive, comfortable, and premium dining experience for all our valued guests.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Card 1: Dining & Services */}
                    <ClayCard className="p-4 sm:p-6 border border-espresso/5 shadow-sm rounded-[20px] sm:rounded-[24px]">
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                          <UtensilsCrossed size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h4 className="font-serif font-bold text-espresso text-sm sm:text-base">Service & Dining Options</h4>
                      </div>
                      <ul className="space-y-2 sm:space-y-2.5 text-[10px] sm:text-xs text-taupe-text font-sans font-semibold">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> Outdoor Seating & Rooftop Seating
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> Dine-in & Onsite Services
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> Takeout
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> Lunch & Dinner Service
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> Table Service & Counter Service
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span> Popular for Solo Dining
                        </li>
                      </ul>
                    </ClayCard>

                    {/* Card 2: Food & Offerings */}
                    <ClayCard className="p-4 sm:p-6 border border-espresso/5 shadow-sm rounded-[20px] sm:rounded-[24px]">
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-royal-gold/15 text-royal-gold flex items-center justify-center shrink-0">
                          <Coffee size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h4 className="font-serif font-bold text-espresso text-sm sm:text-base">Gourmet Offerings</h4>
                      </div>
                      <ul className="space-y-2 sm:space-y-2.5 text-[10px] sm:text-xs text-taupe-text font-sans font-semibold">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-royal-gold shrink-0"></span> Specialty Coffee & Hot Drinks
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-royal-gold shrink-0"></span> Organic Dishes & Salad Bar
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-royal-gold shrink-0"></span> Vegan Options & Vegetarian Options
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-royal-gold shrink-0"></span> Small Plates & Quick Bites
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-royal-gold shrink-0"></span> Late-night Food Availability
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-royal-gold shrink-0"></span> Handcrafted Desserts & Pastries
                        </li>
                      </ul>
                    </ClayCard>

                    {/* Card 3: Accessibility & Parking */}
                    <ClayCard className="p-4 sm:p-6 border border-espresso/5 shadow-sm rounded-[20px] sm:rounded-[24px]">
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-espresso/5 text-espresso flex items-center justify-center shrink-0">
                          <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h4 className="font-serif font-bold text-espresso text-sm sm:text-base">Accessibility & Parking</h4>
                      </div>
                      <ul className="space-y-2 sm:space-y-2.5 text-[10px] sm:text-xs text-taupe-text font-sans font-semibold">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-espresso shrink-0"></span> Wheelchair Accessible Entrance
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-espresso shrink-0"></span> Wheelchair Accessible Seating
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-espresso shrink-0"></span> Wheelchair Accessible Parking Lot
                        </li>

                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-espresso shrink-0"></span> Free Customer Parking Lot
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-espresso shrink-0"></span> On-site & Free Street Parking
                        </li>
                      </ul>
                    </ClayCard>

                    {/* Card 4: Children & Families */}
                    <ClayCard className="p-4 sm:p-6 border border-espresso/5 shadow-sm rounded-[20px] sm:rounded-[24px]">
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                          <Users size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h4 className="font-serif font-bold text-espresso text-sm sm:text-base">Family & Children</h4>
                      </div>
                      <ul className="space-y-2 sm:space-y-2.5 text-[10px] sm:text-xs text-taupe-text font-sans font-semibold">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span> Family-Friendly Atmosphere
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span> Great for Large Groups & Parties
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span> Highly Accommodating for Kids
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span> Specialized Kids' Menu & High Chairs
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span> Changing Table Availability
                        </li>
                      </ul>
                    </ClayCard>

                    {/* Card 5: Comfort & Amenities */}
                    <ClayCard className="p-4 sm:p-6 border border-espresso/5 shadow-sm rounded-[20px] sm:rounded-[24px]">
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                          <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h4 className="font-serif font-bold text-espresso text-sm sm:text-base">Amenities & Settings</h4>
                      </div>
                      <ul className="space-y-2 sm:space-y-2.5 text-[10px] sm:text-xs text-taupe-text font-sans font-semibold">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span> High-Speed Guest Wi-Fi (Free)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span> Clean Public Restrooms
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span> Casual Atmosphere & Warm Decor
                        </li>
                      </ul>
                    </ClayCard>

                    {/* Card 6: Payments & Planning */}
                    <ClayCard className="p-4 sm:p-6 border border-espresso/5 shadow-sm rounded-[20px] sm:rounded-[24px]">
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                          <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <h4 className="font-serif font-bold text-espresso text-sm sm:text-base">Payments & Planning</h4>
                      </div>
                      <ul className="space-y-2 sm:space-y-2.5 text-[10px] sm:text-xs text-taupe-text font-sans font-semibold">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span> Cash-Only Payments Accepted
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span> Accepts Table Reservations
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span> Reservations Required for Cabanas
                        </li>
                      </ul>
                    </ClayCard>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* MENU EXPLORER PAGE */}
          {activePage === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-[#F5F2EC] py-8 sm:py-12 px-4 sm:px-6 border-b border-espresso/5"
            >
              <section id="menu" className="max-w-6xl mx-auto">
                {/* Section Header with Premium Archway Image */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-10 mb-6 sm:mb-10 text-left bg-espresso/5 p-4 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[32px] border border-espresso/5 shadow-sm">

                  {/* Left Side: Typography */}
                  <div className="flex-1 space-y-2 sm:space-y-4 max-w-2xl">
                    <span className="text-[9px] sm:text-xs uppercase tracking-widest text-terracotta font-bold font-sans bg-terracotta/5 px-2.5 py-1 rounded border border-terracotta/10 inline-block">
                      Discover Taste
                    </span>
                    <h2 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-espresso font-bold leading-tight">
                      Explore Our Digital Catalog
                    </h2>
                    <p className="font-sans text-taupe-text text-[11px] sm:text-sm md:text-base leading-relaxed">
                      Switch between Mashriq Restaurant and Crème Café catalogs, filter by categories, and explore authentic signature dishes.
                    </p>
                  </div>

                  {/* Right Side: Stylish Archway Mixed Interior Image */}
                  <div className="shrink-0 w-28 sm:w-44 md:w-64 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="relative p-1.5 sm:p-2 bg-[#FAF8F5] border border-espresso/10 rounded-t-[100px] rounded-b-[24px] shadow-lg max-w-[200px] w-full aspect-[3/4] overflow-hidden"
                    >
                      <img
                        src="/media/images/mixed_interior.png"
                        alt="Mashriq Restaurant Interior"
                        className="w-full h-full object-cover rounded-t-[92px] rounded-b-[18px] border border-espresso/5"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent pointer-events-none rounded-t-[92px] rounded-b-[18px]"></div>
                      <span className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-sans font-bold tracking-widest text-[#FAF8F5]/90 uppercase text-center w-full">
                        Mashriq Ambiance
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Brand Selection Toggle */}
                <div className="flex justify-center mb-5 sm:mb-8">
                  <GlassPanel className="p-1 sm:p-2 !rounded-full flex gap-1 sm:gap-2 border border-espresso/10 bg-white/50">
                    <button
                      onClick={() => handleBrandChange('mashriq')}
                      className={`px-3 sm:px-6 py-1.5 sm:py-3 rounded-full font-serif font-bold text-[11px] sm:text-sm transition-all duration-300 flex items-center gap-1 sm:gap-2 cursor-pointer focus:outline-none ${selectedBrand === 'mashriq'
                          ? 'bg-espresso text-[#FAF8F5] shadow-md'
                          : 'text-espresso/60 hover:text-espresso'
                        }`}
                    >
                      <UtensilsCrossed size={12} className="sm:w-4 sm:h-4" /> Mashriq <span className="hidden xs:inline">Restaurant</span>
                    </button>
                    <button
                      onClick={() => handleBrandChange('creme')}
                      className={`px-3 sm:px-6 py-1.5 sm:py-3 rounded-full font-serif font-bold text-[11px] sm:text-sm transition-all duration-300 flex items-center gap-1 sm:gap-2 cursor-pointer focus:outline-none ${selectedBrand === 'creme'
                          ? 'bg-[#E3DCD3] text-espresso shadow-md border border-espresso/10'
                          : 'text-espresso/60 hover:text-espresso'
                        }`}
                    >
                      <Coffee size={12} className="sm:w-4 sm:h-4" /> Crème <span className="hidden xs:inline">Café Lounge</span>
                    </button>
                  </GlassPanel>
                </div>

                {/* Category Navigation Bar */}
                <div className="mb-6 sm:mb-10 overflow-x-auto py-2 -mx-6 px-6 no-scrollbar">
                  <GlassPanel className="p-1.5 sm:p-2 !rounded-full flex gap-1.5 sm:gap-3 whitespace-nowrap min-w-max border border-espresso/5 bg-white/70 shadow-sm mx-auto">
                    {getCategoriesForBrand().map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-sans font-bold text-[10px] sm:text-xs transition-all cursor-pointer focus:outline-none ${selectedCategory === cat.id
                            ? 'bg-terracotta text-white shadow-sm'
                            : 'text-espresso/70 hover:text-espresso hover:bg-espresso/5'
                          }`}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </GlassPanel>
                </div>

                {/* Menu Items Cards Grid */}
                <motion.div
                  layout
                  className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-7 pt-4"
                  style={{ perspective: "1200px" }}
                >
                  {getFilteredItems().map((item, index) => {
                    const isFav = favorites.includes(item.name);

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{
                          y: -8,
                          rotateX: 2,
                          rotateY: -2,
                          scale: 1.02,
                          transition: { duration: 0.25, ease: "easeOut" }
                        }}
                        transition={{ duration: 0.4, delay: Math.min((index % 6) * 0.05, 0.3) }}
                        key={`${selectedBrand}-${item.name}`}
                        className="h-full cursor-pointer"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <ClayCard className="relative p-2.5 sm:p-4 md:p-5 flex flex-col h-full group text-left overflow-hidden border border-espresso/5 shadow-md hover:shadow-xl hover:border-royal-gold/25 transition-all duration-300 rounded-[18px] sm:rounded-3xl">
                          {/* Hover Gold Glow Background Orb */}
                          <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-royal-gold/5 blur-2xl group-hover:bg-royal-gold/12 transition-all duration-500 pointer-events-none"></div>

                          {/* Top Row: Category & Signature & Favorite */}
                          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 sm:gap-2 mb-1.5 sm:mb-3 w-full relative z-10">
                            <span className="text-[7px] sm:text-[10px] font-bold text-terracotta tracking-wider uppercase bg-terracotta/5 px-1.5 sm:px-2.5 py-0.5 rounded-md border border-terracotta/10">
                              {item.categoryName}
                            </span>

                            <div className="flex items-center gap-1 sm:gap-2">
                              {item.signature && (
                                <span className="bg-royal-gold/15 text-espresso text-[7px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-royal-gold/25 uppercase">
                                  <Star size={7} fill="currentColor" className="text-royal-gold" /> <span className="hidden xs:inline">Signature</span>
                                </span>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(item.name);
                                }}
                                className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border border-espresso/5 shadow-sm bg-white text-espresso/40 hover:text-red-500 hover:scale-105 transition-all cursor-pointer focus:outline-none"
                              >
                                <Heart size={9} className="sm:w-3.5 sm:h-3.5" fill={isFav ? "currentColor" : "none"} />
                              </button>
                            </div>
                          </div>

                          {/* Item Content */}
                          <div className="flex-1 flex flex-col justify-between relative z-10">
                            <div>
                              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-baseline gap-0.5 xs:gap-2 mb-1 sm:mb-1.5">
                                <h4 className="font-serif font-bold text-espresso text-[11px] sm:text-sm md:text-base leading-tight group-hover:text-terracotta transition-colors">
                                  {item.name}
                                </h4>
                                {/* Dotted Connector Line */}
                                <div className="hidden xs:block flex-1 border-b border-dotted border-espresso/15 mx-1 group-hover:border-royal-gold/45 transition-colors"></div>
                                {/* Price Column (if full/half is not active) */}
                                {!item.price_half && (
                                  <span className="font-serif font-bold text-terracotta text-[11px] sm:text-sm md:text-base shrink-0 group-hover:scale-105 transition-transform duration-200">
                                    Rs. {item.price}
                                  </span>
                                )}
                              </div>

                              <p className="font-sans text-taupe-text text-[9px] sm:text-xs leading-snug sm:leading-relaxed mb-1.5 sm:mb-3 line-clamp-2">
                                {item.desc || "Prepared fresh using finest traditional ingredients, served with house special condiments."}
                              </p>
                            </div>

                            {/* Half / Full Price Row */}
                            {item.price_half && (
                              <div className="text-[9px] sm:text-xs text-taupe-text mt-1 sm:mt-1.5 pt-1 sm:pt-1.5 border-t border-espresso/5 flex flex-col xs:flex-row xs:justify-between gap-0.5 xs:gap-2">
                                <span>Half: <strong className="text-espresso">Rs. {item.price_half}</strong></span>
                                <span>Full: <strong className="text-espresso">Rs. {item.price_full}</strong></span>
                              </div>
                            )}
                          </div>

                          {/* Order CTA Action Indicator */}
                          <div className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-espresso/5 flex items-center justify-between relative z-10 text-[9px] sm:text-xs font-bold text-espresso/60 group-hover:text-terracotta transition-colors">
                            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span className="hidden sm:inline">Book Table to Enjoy</span>
                              <span className="sm:hidden">Book Now</span>
                              <ArrowRight size={10} className="sm:w-3 sm:h-3" />
                            </span>
                            <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-espresso/5 flex items-center justify-center group-hover:bg-terracotta/10 group-hover:text-terracotta transition-all">
                              <UtensilsCrossed size={9} className="text-espresso/60 group-hover:text-terracotta sm:w-3 sm:h-3" />
                            </span>
                          </div>
                        </ClayCard>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </section>
            </motion.div>
          )}

          {/* CRÈME LOUNGE PAGE */}
          {activePage === 'lounge' && (
            <motion.div
              key="lounge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-[#F5F2EC] min-h-screen"
            >
              {/* Ambiance Hero Section */}
              <section id="ambiance" className="w-full relative min-h-[400px] sm:min-h-[600px] lg:h-[650px] overflow-hidden flex items-center py-10 sm:py-16 lg:py-0 border-b border-espresso/5">
                {/* Fixed Ambiance Background */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src="/media/images/garden.jpg"
                    alt="Ambiance Garden View"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/85 to-transparent"></div>
                </div>

                {/* Floating Glassmorphic Content Card */}
                <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                  <div className="max-w-xl text-left w-full">
                    <GlassPanel dark className="p-6 sm:p-8 md:p-10 border border-royal-gold/15 shadow-2xl flex flex-col items-start rounded-[24px] sm:rounded-[32px]">
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-royal-gold font-bold mb-2 sm:mb-3">Premium Dessert Lounge</span>
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream-bg font-bold mb-3 sm:mb-4">
                        Crème by Ahmad
                      </h2>
                      <div className="w-12 h-0.5 bg-royal-gold/50 mb-4 sm:mb-6"></div>

                      <p className="font-sans text-stone-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                        Crème is an artisan café and gourmet pastry escape nestled inside Mashriq's private garden cabanas. Crafted for quiet afternoons, intimate conversations, and family indulgence.
                      </p>

                      <p className="font-sans text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                        Enjoy gold-dusted Cloud Lattes, Iced Spanish specialty coffees, and our legendary Lotus Royale shakes under the soft garden lights.
                      </p>

                      <div className="flex flex-wrap gap-4 items-center w-full">
                        <NeuButton
                          gold
                          onClick={() => {
                            const element = document.getElementById('lounge-menu-section');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="!rounded-xl text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto"
                        >
                          View Café Menu <ArrowRight size={14} className="ml-1 inline" />
                        </NeuButton>
                        <div className="flex items-center gap-1.5 text-stone-400 text-[10px] sm:text-xs font-semibold">
                          <Clock size={12} className="text-royal-gold" /> Open Daily: 12:00 PM – 12:00 AM
                        </div>
                      </div>
                    </GlassPanel>
                  </div>

                  {/* Overlapping Stylish Archway Images */}
                  <div className="relative shrink-0 flex items-center justify-center w-full lg:w-auto h-64 sm:h-72 lg:h-[350px] mt-4 lg:mt-0">
                    {/* Arch 1 (Left background image) */}
                    <motion.div
                      whileHover={{ scale: 1.04, rotate: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="relative rounded-t-[100px] rounded-b-[24px] shadow-2xl border-2 border-white/20 overflow-hidden w-28 xs:w-36 sm:w-44 lg:w-52 aspect-[3/4] z-10 -rotate-2"
                    >
                      <img
                        src="/media/images/creme_int.jpg"
                        alt="Crème Cafe Interior Cabana"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none"></div>
                      <span className="absolute bottom-3 left-4 text-[8px] sm:text-[9px] font-sans font-bold tracking-widest text-[#FAF8F5]/90 uppercase">
                        Cabana Lounge
                      </span>
                    </motion.div>

                    {/* Arch 2 (Right foreground overlapping image) */}
                    <motion.div
                      whileHover={{ scale: 1.04, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="relative rounded-t-[100px] rounded-b-[24px] shadow-2xl border-2 border-white/20 overflow-hidden w-24 xs:w-32 sm:w-40 lg:w-48 aspect-[3/4] z-20 ml-[-30px] sm:ml-[-40px] mt-12 sm:mt-16 lg:mt-24 rotate-3"
                    >
                      <img
                        src="/media/images/creme3_int.jpg"
                        alt="Crème Cafe Seating"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none"></div>
                      <span className="absolute bottom-3 left-4 text-[8px] sm:text-[9px] font-sans font-bold tracking-widest text-[#FAF8F5]/90 uppercase">
                        Artisan Corner
                      </span>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Dedicated Café Menu Section */}
              <section id="lounge-menu-section" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 text-left">
                <div className="text-center max-w-xl mx-auto mb-6 sm:mb-12">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-terracotta font-bold font-sans">Artisan Selection</span>
                  <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-espresso font-bold mt-2 mb-2 sm:mb-4">
                    The Crème Café Menu
                  </h3>
                  <p className="font-sans text-taupe-text text-[11px] sm:text-sm">
                    Browse our premium dessert coffees, gold-dusted specialties, shakes, and gourmet mocktails.
                  </p>
                </div>

                {/* Café Category Selection Tab Row */}
                <div className="mb-6 sm:mb-10 overflow-x-auto py-2 -mx-6 px-6 no-scrollbar">
                  <GlassPanel className="p-1.5 sm:p-2 !rounded-full flex gap-1.5 sm:gap-3 whitespace-nowrap min-w-max border border-espresso/5 bg-white/70 shadow-sm mx-auto w-max">
                    {getCremeCategories().map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setLoungeCategory(cat.id)}
                        className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-sans font-bold text-[10px] sm:text-xs transition-all cursor-pointer focus:outline-none ${loungeCategory === cat.id
                            ? 'bg-espresso text-[#FAF8F5] shadow-sm'
                            : 'text-espresso/70 hover:text-espresso hover:bg-espresso/5'
                          }`}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </GlassPanel>
                </div>

                {/* Café Items Grid */}
                <motion.div
                  layout
                  className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-7 pt-4"
                  style={{ perspective: "1200px" }}
                >
                  {getCremeFilteredItems().map((item, index) => {
                    const isFav = favorites.includes(item.name);

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{
                          y: -8,
                          rotateX: 2,
                          rotateY: -2,
                          scale: 1.02,
                          transition: { duration: 0.25, ease: "easeOut" }
                        }}
                        transition={{ duration: 0.4, delay: Math.min((index % 6) * 0.05, 0.3) }}
                        key={`lounge-${item.name}`}
                        className="h-full cursor-pointer"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <ClayCard className="relative p-2.5 sm:p-4 md:p-5 flex flex-col h-full group text-left overflow-hidden border border-espresso/5 shadow-md hover:shadow-xl hover:border-royal-gold/25 transition-all duration-300 rounded-[18px] sm:rounded-3xl">
                          {/* Hover Gold Glow Background Orb */}
                          <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-royal-gold/5 blur-2xl group-hover:bg-royal-gold/12 transition-all duration-500 pointer-events-none"></div>

                          {/* Top Row: Category & Signature & Favorite */}
                          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 sm:gap-2 mb-1.5 sm:mb-3 w-full relative z-10">
                            <span className="text-[7px] sm:text-[10px] font-bold text-terracotta tracking-wider uppercase bg-terracotta/5 px-1.5 sm:px-2.5 py-0.5 rounded-md border border-terracotta/10">
                              {item.categoryName}
                            </span>

                            <div className="flex items-center gap-1 sm:gap-2">
                              {item.signature && (
                                <span className="bg-royal-gold/15 text-espresso text-[7px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-royal-gold/25 uppercase">
                                  <Star size={7} fill="currentColor" className="text-royal-gold" /> <span className="hidden xs:inline">Signature</span>
                                </span>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(item.name);
                                }}
                                className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border border-espresso/5 shadow-sm bg-white text-espresso/40 hover:text-red-500 hover:scale-105 transition-all cursor-pointer focus:outline-none"
                              >
                                <Heart size={9} className="sm:w-3.5 sm:h-3.5" fill={isFav ? "currentColor" : "none"} />
                              </button>
                            </div>
                          </div>

                          {/* Item Content */}
                          <div className="flex-1 flex flex-col justify-between relative z-10">
                            <div>
                              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-baseline gap-0.5 xs:gap-2 mb-1 sm:mb-1.5">
                                <h4 className="font-serif font-bold text-espresso text-[11px] sm:text-sm md:text-base leading-tight group-hover:text-terracotta transition-colors">
                                  {item.name}
                                </h4>
                                {/* Dotted Connector Line */}
                                <div className="hidden xs:block flex-1 border-b border-dotted border-espresso/15 mx-1 group-hover:border-royal-gold/45 transition-colors"></div>
                                {/* Price Column */}
                                <span className="font-serif font-bold text-terracotta text-[11px] sm:text-sm md:text-base shrink-0 group-hover:scale-105 transition-transform duration-200">
                                  Rs. {item.price}
                                </span>
                              </div>

                              <p className="font-sans text-taupe-text text-[9px] sm:text-xs leading-snug sm:leading-relaxed mb-1.5 sm:mb-3 line-clamp-2">
                                {item.desc || "Artisan dessert coffee, handcrafted by gourmet baristas."}
                              </p>
                            </div>
                          </div>

                          {/* Order CTA Action Indicator */}
                          <div className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-espresso/5 flex items-center justify-between relative z-10 text-[9px] sm:text-xs font-bold text-espresso/60 group-hover:text-terracotta transition-colors">
                            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span className="hidden sm:inline">Order at Lounge Cabana</span>
                              <span className="sm:hidden">Order Now</span>
                              <ArrowRight size={10} className="sm:w-3 sm:h-3" />
                            </span>
                            <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-espresso/5 flex items-center justify-center group-hover:bg-terracotta/10 group-hover:text-terracotta transition-all">
                              <Coffee size={9} className="text-espresso/60 group-hover:text-terracotta sm:w-3 sm:h-3" />
                            </span>
                          </div>
                        </ClayCard>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </section>
            </motion.div>
          )}

          {/* RESERVE TABLE PAGE */}
          {activePage === 'reserve' && (
            <motion.div
              key="reserve"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
            >
              <section id="reservation" className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
                  {/* AI Assistant Column Left (5 Cols) */}
                  <div className="lg:col-span-5 text-left flex flex-col justify-center h-full">
                    <span className="text-xs uppercase tracking-widest text-terracotta font-bold font-sans">Modern Service</span>
                    <h2 className="font-serif text-3xl text-espresso font-bold mt-2 mb-4">
                      AI dining concierge
                    </h2>
                    <p className="font-sans text-taupe-text text-sm leading-relaxed mb-6">
                      Ask our smart assistant details about mandi platters, gluten-free choices, café prices, or request a booking. Tell the assistant what you want (e.g. <em>"Book a table for 4"</em>) to pre-fill the form instantly.
                    </p>

                    <AIDiningAssistant onPreFillReservation={handlePreFillReservation} />
                  </div>

                  {/* Reservation Form Column Right (7 Cols) */}
                  <div className="lg:col-span-7 w-full">
                    <GlassPanel className="p-4 sm:p-8 border border-espresso/5 shadow-xl bg-white text-left">
                      <h3 className="font-serif font-bold text-espresso text-2xl mb-2">Book Your Table</h3>
                      <p className="text-xs text-taupe-text mb-6">Eastern hospitality is about sharing good taste with family and friends.</p>

                      {submitSuccess ? (
                        <GlassPanel className="p-8 text-center bg-green-50 border border-green-200/50 rounded-2xl flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                            <Star size={24} fill="currentColor" />
                          </div>
                          <h4 className="font-serif font-bold text-espresso text-lg mb-2">Reservation Request Received</h4>
                          <p className="font-sans text-taupe-text text-sm mb-6 max-w-sm">
                            Thank you! We've received your booking request. Our host will call you at your provided phone number shortly to confirm.
                          </p>
                          <NeuButton onClick={() => setSubmitSuccess(false)} className="text-xs !px-4 !py-2">
                            Book Another Table
                          </NeuButton>
                        </GlassPanel>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-espresso uppercase tracking-wider mb-1.5 sm:mb-2">Your Name</label>
                              <input
                                type="text"
                                name="name"
                                required
                                value={reservation.name}
                                onChange={handleFormChange}
                                placeholder="Mujeeb-ul-Hassan"
                                className="w-full px-4 py-2.5 sm:py-3 rounded-xl neu-input text-xs sm:text-sm text-espresso font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-espresso uppercase tracking-wider mb-1.5 sm:mb-2">Mobile Phone</label>
                              <input
                                type="tel"
                                name="phone"
                                required
                                value={reservation.phone}
                                onChange={handleFormChange}
                                placeholder="0328 8978888"
                                className="w-full px-4 py-2.5 sm:py-3 rounded-xl neu-input text-xs sm:text-sm text-espresso font-semibold"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-espresso uppercase tracking-wider mb-1.5 sm:mb-2">Number of Guests</label>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                  type="button"
                                  onClick={() => adjustPartySize(-1)}
                                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-espresso/5 shadow-sm hover:border-terracotta hover:text-terracotta flex items-center justify-center font-bold text-base sm:text-lg cursor-pointer"
                                >
                                  -
                                </button>
                                <div className="flex-1 h-10 sm:h-11 rounded-xl bg-cream-bg flex items-center justify-center gap-1.5 sm:gap-2 border border-espresso/5 font-semibold text-espresso text-xs sm:text-sm">
                                  <Users size={14} className="text-taupe-text sm:w-4 sm:h-4" /> {reservation.partySize} {reservation.partySize === 1 ? 'Guest' : 'Guests'}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => adjustPartySize(1)}
                                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-espresso/5 shadow-sm hover:border-terracotta hover:text-terracotta flex items-center justify-center font-bold text-base sm:text-lg cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-espresso uppercase tracking-wider mb-1.5 sm:mb-2">Reservation Date</label>
                              <input
                                type="date"
                                name="date"
                                required
                                value={reservation.date}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 sm:py-3 rounded-xl neu-input text-xs sm:text-sm text-espresso font-semibold"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-espresso uppercase tracking-wider mb-1.5 sm:mb-2">Arrival Time</label>
                              <input
                                type="time"
                                name="time"
                                required
                                value={reservation.time}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2.5 sm:py-3 rounded-xl neu-input text-xs sm:text-sm text-espresso font-semibold"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] sm:text-xs font-bold text-espresso uppercase tracking-wider mb-1.5 sm:mb-2">Special Requests (Optional)</label>
                              <input
                                type="text"
                                name="notes"
                                value={reservation.notes}
                                onChange={handleFormChange}
                                placeholder="Birthday setup, garden area..."
                                className="w-full px-4 py-2.5 sm:py-3 rounded-xl neu-input text-xs sm:text-sm text-espresso font-semibold"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                            <NeuButton
                              type="submit"
                              gold
                              className="w-full sm:w-auto text-xs sm:text-sm py-2.5 sm:py-3"
                            >
                              {isSubmitting ? 'Requesting...' : 'Request Table Booking'}
                            </NeuButton>

                            <a
                              href={getWhatsAppLink()}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full sm:w-auto text-center font-sans font-bold text-xs sm:text-sm text-[#25D366] flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl border border-[#25D366]/35 hover:bg-[#25D366]/5 transition-all no-underline"
                            >
                              <MessageCircle size={16} fill="currentColor" /> Instant Booking (WhatsApp)
                            </a>
                          </div>
                        </form>
                      )}
                    </GlassPanel>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* CONTACT PAGE */}
          {activePage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-[#F5F2EC] py-8 sm:py-12 px-4 sm:px-6 border-b border-espresso/5"
            >
              <section id="location" className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                  {/* Information Column Left (5 Cols) */}
                  <div className="lg:col-span-5 text-left">
                    <span className="text-xs uppercase tracking-widest text-terracotta font-bold font-sans">Find Us</span>
                    <h2 className="font-serif text-3xl text-espresso font-bold mt-2 mb-6">
                      On Sialkot Road
                    </h2>
                    <div className="w-12 h-1 bg-terracotta/60 mb-6"></div>

                    <div className="space-y-6 font-sans text-sm text-taupe-text">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-espresso/5 text-espresso flex items-center justify-center shrink-0">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-espresso text-base mb-1">Our Address</h5>
                          <p className="leading-relaxed">Sialkot Rd, Jalalpur Jattan, Pakistan.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-espresso/5 text-espresso flex items-center justify-center shrink-0">
                          <Clock size={18} />
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-espresso text-base mb-1">Operating Hours</h5>
                          <p className="leading-relaxed">Monday – Sunday: 12:00 PM – 12:00 AM (Midnight)</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-espresso/5 text-espresso flex items-center justify-center shrink-0">
                          <Phone size={18} />
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-espresso text-base mb-1">Direct Call / WhatsApp</h5>
                          <p className="font-bold text-terracotta hover:text-espresso transition-colors text-lg"><a href="tel:+923288978888">+92 (328) 897-8888</a></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Embedded Google Map Column Right (7 Cols) */}
                  <div className="lg:col-span-7 w-full">
                    <ClayCard className="overflow-hidden !p-1.5 sm:!p-2 border border-espresso/5 shadow-md rounded-[20px] sm:rounded-[28px] h-[300px] sm:h-[400px]">
                      <iframe
                        title="Mashriq Restaurant Google Maps Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.1400272977608!2d74.1916485!3d32.6290943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f030000106c21%3A0x8bebafea59a6ca2c!2sMashriq+Restaurant!5e0!3m2!1sen!2s!4v1721658421000!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: '20px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </ClayCard>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 8. Footer Section */}
      <footer className="bg-espresso text-[#FAF8F5] py-10 sm:py-16 px-4 sm:px-6 border-t border-royal-gold/20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left mb-10 sm:mb-12">

            {/* Column 1: Brand & Bio */}
            <div className="flex flex-col items-start gap-4">
              <button
                onClick={() => setActivePage('home')}
                className="flex items-center gap-3 bg-transparent border-0 cursor-pointer focus:outline-none p-0"
              >
                <img src="/media/logo/mlogo2.png" alt="Logo" className="w-12 h-12 object-contain" />
                <span className="font-serif font-bold text-royal-gold text-2xl tracking-wide">MASHRIQ</span>
              </button>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                Celebrating Eastern hospitality, rich Arabic Mandi, chargrilled sizzlers, and premium artisan coffee by Ahmad in Gujrat.
              </p>
            </div>

            {/* Column 2: Proper Address */}
            <div className="flex flex-col items-start gap-3">
              <h4 className="font-serif text-sm font-bold text-royal-gold uppercase tracking-widest">Visit Us</h4>
              <div className="h-0.5 w-8 bg-royal-gold/40 mb-1"></div>
              <div className="text-xs text-stone-300 font-sans space-y-2">
                <p className="leading-relaxed">
                  <strong>Mashriq Restaurant:</strong><br />
                  Sialkot Rd, Jalalpur Jattan, Pakistan.
                </p>
                <p>
                  <strong>Hours:</strong> Daily 12:00 PM – 12:00 AM
                </p>
                <p className="leading-relaxed">
                  <strong>Phone / WhatsApp:</strong><br />
                  <a href="tel:+923288978888" className="text-royal-gold hover:text-white transition-colors font-bold">0328 8978888</a>
                </p>
              </div>
            </div>

            {/* Column 3: Quick Navigation Links */}
            <div className="flex flex-col items-start gap-3">
              <h4 className="font-serif text-sm font-bold text-royal-gold uppercase tracking-widest">Quick Links</h4>
              <div className="h-0.5 w-8 bg-royal-gold/40 mb-1"></div>
              <nav className="flex flex-col gap-2 font-sans text-xs text-stone-300">
                <button onClick={() => setActivePage('story')} className="hover:text-royal-gold text-left transition-colors cursor-pointer border-0 bg-transparent focus:outline-none p-0">Our Story & Services</button>
                <button onClick={() => setActivePage('menu')} className="hover:text-royal-gold text-left transition-colors cursor-pointer border-0 bg-transparent focus:outline-none p-0">Menu Explorer</button>
                <button onClick={() => setActivePage('lounge')} className="hover:text-royal-gold text-left transition-colors cursor-pointer border-0 bg-transparent focus:outline-none p-0">Crème Lounge</button>
                <button onClick={() => setActivePage('reserve')} className="hover:text-royal-gold text-left transition-colors cursor-pointer border-0 bg-transparent focus:outline-none p-0">Reserve Table</button>
                <button onClick={() => setActivePage('contact')} className="hover:text-royal-gold text-left transition-colors cursor-pointer border-0 bg-transparent focus:outline-none p-0">Contact & Map</button>
              </nav>
            </div>

            {/* Column 4: Connect & Socials */}
            <div className="flex flex-col items-start gap-3">
              <h4 className="font-serif text-sm font-bold text-royal-gold uppercase tracking-widest">Connect</h4>
              <div className="h-0.5 w-8 bg-royal-gold/40 mb-1"></div>
              <div className="flex flex-col items-start gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-cream-bg/10 text-royal-gold hover:bg-royal-gold/20 hover:text-white transition-all flex items-center justify-center"
                  aria-label="Facebook Page"
                >
                  <FacebookIcon size={18} />
                </a>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  Join our community of <span className="text-royal-gold font-bold">22.5k+ followers</span> on Facebook!
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Divider */}
          <div className="border-t border-stone-800 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs text-stone-400 font-sans text-center md:text-left">
              &copy; {new Date().getFullYear()} Mashriq Restaurant. All Rights Reserved.
            </p>
            <p className="text-[10px] text-stone-400 font-serif italic text-center md:text-right">
              by Ahmad — Sialkot Rd, Jalalpur Jattan, Pakistan
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
