import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { menuItems, categories, heroImage, logoUrl, type MenuItem } from './menuData';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax mouse tracking for hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] relative">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* ===== HEADER ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass shadow-2xl shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] p-[2px]">
              <img
                src={logoUrl}
                alt="Takeout"
                className="w-full h-full object-cover rounded-[10px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden w-full h-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-[10px]">T</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-sm leading-tight tracking-wider">
                TAKEOUT
              </h1>
              <p className="text-[#888] text-[10px] leading-tight tracking-wide">BANANI • EST. 2014</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                showSearch ? 'bg-[#ff6b35] text-white' : 'glass-light text-[#aaa] hover:text-white'
              }`}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <a
              href="tel:+8801847290010"
              className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center text-white shadow-lg shadow-[#ff6b35]/20 hover:shadow-[#ff6b35]/40 transition-all"
              aria-label="Call"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="px-4 sm:px-6 pb-3 animate-slide-down">
            <div className="max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full glass border border-[#333] rounded-2xl px-5 py-3 pl-12 text-white text-sm placeholder-[#555] transition-all"
                autoFocus
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[500px] max-h-[700px] overflow-hidden">
        {/* Background with parallax */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.05)` }}
        >
          <img
            src={heroImage}
            alt="Takeout Banani"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="hero-gradient absolute inset-0" />

        {/* Floating decorative orbs */}
        <div className="glow-orb w-[300px] h-[300px] bg-[#ff6b35] top-20 -right-20 animate-float" />
        <div className="glow-orb w-[200px] h-[200px] bg-[#f5a623] bottom-40 -left-10 animate-float-slow" />

        {/* Hero Content */}
        <div className={`relative z-10 h-full flex flex-col justify-end px-5 sm:px-8 pb-12 sm:pb-16 transition-all duration-1000 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-7xl mx-auto w-full">
            {/* Tag */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-gradient-to-r from-[#ff6b35] to-transparent" />
              <span className="text-[#ff6b35] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
                Bangladesh's #1 Burger Brand
              </span>
            </div>

            {/* Title */}
            <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-4">
              <span className="block">Big Flavors.</span>
              <span className="block text-gradient">Bold Bites.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-[#999] text-sm sm:text-base max-w-md mb-8 leading-relaxed">
              Fresh ingredients, bold flavors — handcrafted burgers, crispy fries & thick shakes since 2014.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={scrollToMenu}
                className="group inline-flex items-center gap-2 bg-gradient-accent text-white font-semibold px-7 py-3.5 rounded-2xl text-sm hover:shadow-xl hover:shadow-[#ff6b35]/30 transition-all active:scale-95 animate-pulse-glow"
              >
                Explore Menu
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="hidden sm:flex items-center gap-2 text-[#888] text-xs">
                <div className="flex -space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400/60">★</span>
                </div>
                <span>4.4 • 5.9K reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-6 h-10 border-2 border-[#555] rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-2.5 bg-[#ff6b35] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== INFO BAR ===== */}
      <div className="glass-light border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-5 sm:gap-8 text-xs">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[#aaa]">Open Now</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-yellow-400">★</span>
              <span className="text-[#aaa]">4.4 (5.9K+)</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 shrink-0">
              <span>🍔</span>
              <span className="text-[#aaa]">2M+ Burgers Served</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#aaa] text-xs shrink-0">
            <span>🕐</span>
            <span>11:30 AM – 11:45 PM</span>
          </div>
        </div>
      </div>

      {/* ===== CATEGORY NAVIGATION ===== */}
      <div className="sticky top-[56px] z-40 glass border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex gap-2 overflow-x-auto category-scroll pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'category-active scale-105'
                    : 'glass-light text-[#999] hover:text-white hover:bg-[#222]'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MENU SECTION ===== */}
      <section ref={menuRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
        {/* Section Header */}
        <div className="mb-8 scene-3d">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-white text-xl sm:text-2xl font-bold">
                {activeCategory === 'all'
                  ? 'Full Menu'
                  : categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <p className="text-[#555] text-xs mt-1.5">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="text-[#ff6b35] text-xs font-medium hover:underline"
              >
                View All →
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="menu-grid grid">
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 scene-3d">
            <div className="text-5xl mb-4 animate-float">🔍</div>
            <p className="text-[#888] text-sm mb-2">No items found</p>
            <p className="text-[#555] text-xs mb-4">Try a different search or category</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-[#ff6b35] text-sm font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="glass border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] p-[2px]">
                  <img
                    src={logoUrl}
                    alt="Takeout"
                    className="w-full h-full object-cover rounded-[10px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">Takeout Banani</h4>
                  <p className="text-[#555] text-xs">Big Flavors. Bold Bites.</p>
                </div>
              </div>
              <p className="text-[#666] text-xs leading-relaxed">
                Bangladesh's biggest burger brand since 2014. Fresh ingredients, bold flavors, delivered hot.
              </p>
            </div>

            {/* Location */}
            <div>
              <h5 className="text-[#888] text-xs font-semibold uppercase tracking-wider mb-3">Visit Us</h5>
              <p className="text-[#aaa] text-xs leading-relaxed mb-2">
                Abedin Tower, 1st Floor<br />
                Plot #35, Road #17<br />
                Kemal Ataturk Ave, Banani<br />
                Dhaka 1213, Bangladesh
              </p>
              <a
                href="https://maps.app.goo.gl/vMM9PLKTBYKy3FRj9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#ff6b35] text-xs font-medium mt-2 hover:underline"
              >
                📍 Get Directions
              </a>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-[#888] text-xs font-semibold uppercase tracking-wider mb-3">Contact</h5>
              <div className="space-y-2">
                <a href="tel:+8801847290010" className="flex items-center gap-2 text-[#aaa] text-xs hover:text-[#ff6b35] transition-colors">
                  📞 +880 1847-290010
                </a>
                <a href="https://wa.me/8801847290010" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#aaa] text-xs hover:text-[#ff6b35] transition-colors">
                  💬 WhatsApp
                </a>
                <a href="https://www.facebook.com/bdtakeout/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#aaa] text-xs hover:text-[#ff6b35] transition-colors">
                  📘 Facebook
                </a>
                <a href="https://www.instagram.com/takeoutbd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#aaa] text-xs hover:text-[#ff6b35] transition-colors">
                  📸 Instagram
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
                <p className="text-[#555] text-[10px]">Open Daily: 11:30 AM – 11:45 PM</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[#444] text-[10px] text-center sm:text-left">
              © 2025 Takeout Banani. Digital Menu Card. Prices may vary.
            </p>
            <p className="text-[#333] text-[10px]">
              Crafted with 🍔 in Dhaka
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===== 3D MENU CARD COMPONENT =====
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -10,
      y: (x - 0.5) * 10,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-3d scene-3d rounded-2xl overflow-hidden border border-[#1a1a1a] bg-[#111] opacity-0 ${
        isVisible ? 'animate-fade-in-up' : ''
      }`}
      style={{
        animationDelay: `${Math.min(index * 0.06, 0.5)}s`,
        animationFillMode: 'forwards',
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
        {!imageLoaded && <div className="absolute inset-0 img-placeholder" />}
        <img
          src={item.image}
          alt={item.name}
          className={`img-3d w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3 badge-3d">
            <span className="inline-block bg-gradient-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg">
              {item.badge}
            </span>
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-block glass text-white text-sm font-bold px-3 py-1.5 rounded-xl">
            ৳{item.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h4 className="text-white font-semibold text-sm leading-tight">
            {item.name}
          </h4>
          <span className="text-base shrink-0">
            {categories.find(c => c.id === item.category)?.icon}
          </span>
        </div>
        <p className="text-[#666] text-[11px] leading-relaxed line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="price-gradient text-base font-bold">
            ৳{item.price}
          </span>
          <span className="text-[#333] text-[10px] uppercase tracking-wider">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
