import { useState, useEffect, useRef, useMemo } from 'react';
import { menuItems, categories, heroImage, type MenuItem } from './menuData';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0f0f]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-[#ff6b35]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm leading-tight tracking-wide">
                TAKEOUT
              </h1>
              <p className="text-[#a0a0a0] text-[10px] leading-tight">Banani</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="w-9 h-9 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#a0a0a0] hover:text-white transition-colors"
              aria-label="Search menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <a
              href="tel:+8801847290010"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] flex items-center justify-center text-white"
              aria-label="Call us"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="px-4 pb-3 animate-slide-down">
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 pl-10 text-white text-sm placeholder-[#666] transition-all"
                autoFocus
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
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

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Takeout Banani"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="hero-gradient absolute inset-0" />
        </div>
        <div className={`relative z-10 h-full flex flex-col justify-end px-5 pb-10 transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-8 h-[2px] bg-[#ff6b35]" />
              <span className="text-[#ff6b35] text-xs font-medium uppercase tracking-widest">
                Bangladesh's #1 Burger Brand
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-3">
              Big Flavors.<br />
              <span className="text-[#ff6b35]">Bold Bites.</span>
            </h2>
            <p className="text-[#a0a0a0] text-sm md:text-base max-w-md mb-6">
              Fresh ingredients, bold flavors — handcrafted burgers, crispy fries & thick shakes.
            </p>
            <button
              onClick={scrollToMenu}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white font-semibold px-6 py-3 rounded-full text-sm hover:shadow-lg hover:shadow-[#ff6b35]/30 transition-all active:scale-95"
            >
              View Menu
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
            <div className="w-5 h-8 border border-[#666] rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-[#ff6b35] rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="bg-[#111] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[#a0a0a0] text-[11px]">Open Now</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-yellow-400 text-[11px]">★</span>
              <span className="text-[#a0a0a0] text-[11px]">4.4 (5.9K reviews)</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#a0a0a0] text-[11px]">
            <span>🕐</span>
            <span>11:30 AM – 11:45 PM</span>
          </div>
        </div>
      </div>

      {/* Category Navigation - Sticky */}
      <div
        ref={categoryRef}
        className="sticky top-[56px] z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#1a1a1a]"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto category-scroll pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'category-active'
                    : 'bg-[#1a1a1a] text-[#a0a0a0] hover:bg-[#252525] hover:text-white'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section ref={menuRef} className="max-w-7xl mx-auto px-4 py-6 pb-20">
        {/* Section Title */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold">
            {activeCategory === 'all'
              ? 'Full Menu'
              : categories.find(c => c.id === activeCategory)?.name}
          </h3>
          <p className="text-[#666] text-xs mt-1">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-[#a0a0a0] text-sm">No items found</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-[#ff6b35] text-sm font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] flex items-center justify-center text-white font-bold">
                T
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Takeout Banani</h4>
                <p className="text-[#666] text-xs">Big Flavors. Bold Bites.</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[#a0a0a0] text-xs">
                Abedin Tower, 1st Floor, Road 17, Kemal Ataturk Ave, Banani, Dhaka
              </p>
              <p className="text-[#666] text-xs mt-1">
                Open Daily: 11:30 AM – 11:45 PM
              </p>
              <div className="flex items-center justify-center md:justify-end gap-3 mt-3">
                <a
                  href="tel:+8801847290010"
                  className="text-[#a0a0a0] hover:text-[#ff6b35] text-xs transition-colors"
                >
                  📞 +880 1847-290010
                </a>
                <a
                  href="https://maps.app.goo.gl/vMM9PLKTBYKy3FRj9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#ff6b35] text-xs transition-colors"
                >
                  📍 Directions
                </a>
                <a
                  href="https://www.facebook.com/bdtakeout/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#ff6b35] text-xs transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#1a1a1a] text-center">
            <p className="text-[#444] text-[10px]">
              © 2025 Takeout Banani. Digital Menu Card. Prices may vary.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Menu Card Component
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`menu-card bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#252525] opacity-0 ${
        isVisible ? 'animate-fade-in-up' : ''
      }`}
      style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s`, animationFillMode: 'forwards' }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
        {!imageLoaded && <div className="absolute inset-0 img-placeholder" />}
        <img
          src={item.image}
          alt={item.name}
          className={`card-image w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-[#ff6b35]/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              {item.badge}
            </span>
          </div>
        )}
        {/* Category tag */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-block bg-black/60 backdrop-blur-sm text-[#a0a0a0] text-[10px] px-2 py-1 rounded-full capitalize">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="text-white font-semibold text-sm leading-tight mb-1.5">
          {item.name}
        </h4>
        <p className="text-[#888] text-xs leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="price-tag text-lg font-bold">
            ৳{item.price}
          </span>
          <span className="text-[#444] text-[10px]">
            {categories.find(c => c.id === item.category)?.icon}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
