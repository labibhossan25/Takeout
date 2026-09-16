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
    const timer = setTimeout(() => setHeroLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePos({
            x: (e.clientX / window.innerWidth - 0.5) * 25,
            y: (e.clientY / window.innerHeight - 0.5) * 25,
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
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

  const scrollToMenu = useCallback(() => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] relative">
      <div className="noise-overlay" />

      {/* ===== হেডার ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gpu-accelerated ${
          isScrolled
            ? 'glass-3d shadow-2xl shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 scene-3d">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gradient-accent-3d p-[2px] animate-pulse-glow-3d">
              <img
                src={logoUrl}
                alt="টেকআউট"
                className="w-full h-full object-cover rounded-[10px] img-3d"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden w-full h-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-[10px]">ট</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-sm leading-tight tracking-wider">
                টেকআউট
              </h1>
              <p className="text-[#888] text-[10px] leading-tight tracking-wide">বনানী • ২০১৪ সাল থেকে</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all fast-transition category-3d ${
                showSearch ? 'bg-gradient-accent-3d text-white' : 'glass-light-3d text-[#aaa] hover:text-white'
              }`}
              aria-label="খুঁজুন"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <a
              href="tel:+8801847290010"
              className="w-10 h-10 rounded-xl bg-gradient-accent-3d flex items-center justify-center text-white category-3d"
              aria-label="কল করুন"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>

        {showSearch && (
          <div className="px-4 sm:px-6 pb-3 animate-slide-down-3d">
            <div className="max-w-lg mx-auto relative scene-3d">
              <input
                type="text"
                placeholder="মেনু আইটেম খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-3d w-full glass-3d border border-[#333] rounded-2xl px-5 py-3 pl-12 text-white text-sm placeholder-[#555]"
                autoFocus
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors fast-transition"
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

      {/* ===== হিরো সেকশন ===== */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[500px] max-h-[700px] overflow-hidden scene-3d-deep">
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out gpu-accelerated"
          style={{ transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0) scale(1.08)` }}
        >
          <img
            src={heroImage}
            alt="টেকআউট বনানী"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="hero-gradient-3d absolute inset-0" />

        <div className="glow-orb-3d w-[400px] h-[400px] bg-[#ff6b35] top-20 -right-32 animate-float-3d" />
        <div className="glow-orb-3d w-[300px] h-[300px] bg-[#f5a623] bottom-40 -left-20 animate-float-3d" style={{ animationDelay: '2s' }} />

        <div className={`relative z-10 h-full flex flex-col justify-end px-5 sm:px-8 pb-12 sm:pb-16 transition-all duration-700 scene-3d ${heroLoaded ? 'opacity-100 translate-y-0 translate-z-0' : 'opacity-0 translate-y-12 translate-z-[-100px]'}`}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-4 animate-slide-in-left-3d" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#ff6b35] to-transparent" />
              <span className="text-[#ff6b35] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
                বাংলাদেশের ১ নম্বর বার্গার ব্র্যান্ড
              </span>
            </div>

            <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-4 animate-fade-in-up-3d" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}>
              <span className="block">বড় স্বাদ।</span>
              <span className="block text-gradient-3d">দারুণ বাইট।</span>
            </h2>

            <p className="text-[#999] text-sm sm:text-base max-w-md mb-8 leading-relaxed animate-fade-in-up-3d" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', opacity: 0 }}>
              তাজা উপকরণ, সাহসী স্বাদ — হাতে তৈরি বার্গার, ক্রিস্পি ফ্রাইজ ও ঘন শেক ২০১৪ সাল থেকে।
            </p>

            <div className="flex items-center gap-4 animate-fade-in-up-3d" style={{ animationDelay: '0.5s', animationFillMode: 'forwards', opacity: 0 }}>
              <button
                onClick={scrollToMenu}
                className="group inline-flex items-center gap-2 bg-gradient-accent-3d text-white font-semibold px-7 py-3.5 rounded-2xl text-sm animate-pulse-glow-3d category-3d"
              >
                মেনু দেখুন
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-y-0.5 transition-transform fast-transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
                <span>৪.৪ • ৫.৯ হাজার রিভিউ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce-3d">
          <div className="w-6 h-10 border-2 border-[#555] rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-2.5 bg-[#ff6b35] rounded-full" />
          </div>
        </div>
      </section>

      {/* ===== তথ্য বার ===== */}
      <div className="glass-light-3d border-y border-[#1a1a1a] scene-3d">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-5 sm:gap-8 text-xs">
            <div className="flex items-center gap-2 shrink-0 category-3d">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[#aaa]">এখন খোলা</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 shrink-0 category-3d">
              <span className="text-yellow-400">★</span>
              <span className="text-[#aaa]">৪.৪ (৫.৯ হাজার+)</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 shrink-0 category-3d">
              <span>🍔</span>
              <span className="text-[#aaa]">২০ লক্ষ+ বার্গার পরিবেশিত</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#aaa] text-xs shrink-0 category-3d">
            <span>🕐</span>
            <span>সকাল ১১:৩০ – রাত ১১:৪৫</span>
          </div>
        </div>
      </div>

      {/* ===== ক্যাটেগরি নেভিগেশন ===== */}
      <div className="sticky top-[56px] z-40 glass-3d border-b border-[#1a1a1a] scene-3d">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex gap-2 overflow-x-auto category-scroll pb-1">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all fast-transition category-3d ${
                  activeCategory === cat.id
                    ? 'category-active-3d'
                    : 'glass-light-3d text-[#999] hover:text-white hover:bg-[#222]'
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <span className="text-sm">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== মেনু সেকশন ===== */}
      <section ref={menuRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 scene-3d-deep">
        <div className="mb-8">
          <div className="flex items-end justify-between">
            <div className="animate-slide-in-left-3d">
              <h3 className="text-white text-xl sm:text-2xl font-bold">
                {activeCategory === 'all' ? 'সম্পূর্ণ মেনু' : categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <p className="text-[#555] text-xs mt-1.5">
                {filteredItems.length} টি {filteredItems.length === 1 ? 'আইটেম' : 'আইটেম'}
                {searchQuery && ` "${searchQuery}" এর জন্য`}
              </p>
            </div>
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="text-[#ff6b35] text-xs font-medium hover:underline category-3d"
              >
                সব দেখুন →
              </button>
            )}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="menu-grid grid">
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 scene-3d">
            <div className="text-5xl mb-4 animate-float-3d">🔍</div>
            <p className="text-[#888] text-sm mb-2">কোনো আইটেম পাওয়া যায়নি</p>
            <p className="text-[#555] text-xs mb-4">অন্য কিছু খুঁজুন বা ক্যাটেগরি পরিবর্তন করুন</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-[#ff6b35] text-sm font-medium hover:underline category-3d"
            >
              সব ফিল্টার মুছুন
            </button>
          </div>
        )}
      </section>

      {/* ===== ফুটার ===== */}
      <footer className="glass-3d border-t border-[#1a1a1a] scene-3d">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-slide-in-left-3d">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-accent-3d p-[2px] category-3d">
                  <img
                    src={logoUrl}
                    alt="টেকআউট"
                    className="w-full h-full object-cover rounded-[10px] img-3d"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">টেকআউট বনানী</h4>
                  <p className="text-[#555] text-xs">বড় স্বাদ। দারুণ বাইট।</p>
                </div>
              </div>
              <p className="text-[#666] text-xs leading-relaxed">
                ২০১৪ সাল থেকে বাংলাদেশের সবচেয়ে বড় বার্গার ব্র্যান্ড। তাজা উপকরণ, সাহসী স্বাদ, গরম পরিবেশন।
              </p>
            </div>

            <div className="animate-fade-in-up-3d" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', opacity: 0 }}>
              <h5 className="text-[#888] text-xs font-semibold uppercase tracking-wider mb-3">আমাদের ঠিকানা</h5>
              <p className="text-[#aaa] text-xs leading-relaxed mb-2">
                আবেদিন টাওয়ার, ১ম তলা<br />
                প্লট নং ৩৫, রোড নং ১৭<br />
                কেমাল আতাতুর্ক এভিনিউ, বনানী<br />
                ঢাকা ১২১৩, বাংলাদেশ
              </p>
              <a
                href="https://maps.app.goo.gl/vMM9PLKTBYKy3FRj9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#ff6b35] text-xs font-medium mt-2 hover:underline category-3d"
              >
                📍 দিকনির্দেশ পান
              </a>
            </div>

            <div className="animate-fade-in-up-3d" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}>
              <h5 className="text-[#888] text-xs font-semibold uppercase tracking-wider mb-3">যোগাযোগ</h5>
              <div className="space-y-2">
                <a href="tel:+8801847290010" className="flex items-center gap-2 text-[#aaa] text-xs hover:text-[#ff6b35] transition-colors fast-transition category-3d">
                  📞 +৮৮০ ১৮৪৭-২৯০০১০
                </a>
                <a href="https://wa.me/8801847290010" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#aaa] text-xs hover:text-[#ff6b35] transition-colors fast-transition category-3d">
                  💬 হোয়াটসঅ্যাপ
                </a>
                <a href="https://www.facebook.com/bdtakeout/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#aaa] text-xs hover:text-[#ff6b35] transition-colors fast-transition category-3d">
                  📘 ফেসবুক
                </a>
                <a href="https://www.instagram.com/takeoutbd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#aaa] text-xs hover:text-[#ff6b35] transition-colors fast-transition category-3d">
                  📸 ইনস্টাগ্রাম
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
                <p className="text-[#555] text-[10px]">প্রতিদিন খোলা: সকাল ১১:৩০ – রাত ১১:৪৫</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[#444] text-[10px] text-center sm:text-left">
              © ২০২৫ টেকআউট বনানী। ডিজিটাল মেনু কার্ড। দাম পরিবর্তনশীল হতে পারে।
            </p>
            <p className="text-[#333] text-[10px]">
              ঢাকায় 🍔 দিয়ে তৈরি
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===== 3D মেনু কার্ড =====
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
      x: (y - 0.5) * -15,
      y: (x - 0.5) * 15,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-3d scene-3d rounded-2xl overflow-hidden border border-[#1a1a1a] bg-[#111] opacity-0 gpu-accelerated ${
        isVisible ? 'animate-fade-in-up-3d' : ''
      }`}
      style={{
        animationDelay: `${Math.min(index * 0.05, 0.4)}s`,
        animationFillMode: 'forwards',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a] scene-3d">
        {!imageLoaded && <div className="absolute inset-0 img-placeholder-3d" />}
        <img
          src={item.image}
          alt={item.name}
          className={`img-3d w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {item.badge && (
          <div className="absolute top-3 left-3 badge-3d">
            <span className="inline-block bg-gradient-accent-3d text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
              {item.badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 scene-3d">
          <span className="inline-block glass-3d text-white text-sm font-bold px-3 py-1.5 rounded-xl category-3d">
            ৳{item.price}
          </span>
        </div>
      </div>

      <div className="p-4 scene-3d">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h4 className="text-white font-semibold text-sm leading-tight">
            {item.name}
          </h4>
          <span className="text-base shrink-0 category-3d">
            {categories.find(c => c.id === item.category)?.icon}
          </span>
        </div>
        <p className="text-[#666] text-[11px] leading-relaxed line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="price-gradient-3d text-base font-bold">
            ৳{item.price}
          </span>
          <span className="text-[#333] text-[10px] uppercase tracking-wider">
            {categories.find(c => c.id === item.category)?.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
