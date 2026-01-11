import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { API, Category } from './types';
import { 
  CATEGORIES, INITIAL_APIS, APP_STATS, SHRINKME_BASE,
  BANNERS_728, BANNERS_468, BANNERS_300, BANNERS_120, BANNERS_160, ADDITIONAL_LINKS, SPLASH_LINKS
} from './constants';

const DIRECT_AD_LINK = "https://elderly-foot.com/b/3sVM0nP.3/pLvLbtmYV/JRZEDK0P2bNIzHQA1yN_Tec/zuL/THY/3RNXD/UB1/NpzlQO";

// --- NEW EXTERNAL API CONFIGURATION ---
const RAPID_KEY = (import.meta as any).env?.VITE_RAPIDAPI_KEY || 'fd43cd59cbmsh016b54d400085b6p1dae09jsn666f2499a427';

const fallbackAPIs = [
  {name: "CoinGecko", desc: "أسعار العملات المشفرة", url: "coingecko.com", free: true},
  {name: "OpenWeather", desc: "طقس العالم", url: "openweathermap.org", free: true},
  {name: "REST Countries", desc: "بيانات الدول", url: "restcountries.com", free: true},
  {name: "JSON Placeholder", desc: "تجربة APIs", url: "jsonplaceholder.typicode.com", free: true},
  {name: "Cat Facts", desc: "حقائق القطط", url: "catfact.ninja", free: true},
  {name: "JokeAPI", desc: "نكت مضحكة", url: "sv443.net/jokeapi", free: true},
  {name: "QR Server", desc: "مولد QR", url: "goqr.me", free: true},
  {name: "UUID Generator", desc: "UUID عشوائي", url: "uuidgenerator.net", free: true},
  {name: "IP Info", desc: "معلومات IP", url: "ipapi.co", free: true},
  {name: "Bored API", desc: "أفكار تسلية", url: "boredapi.com", free: true}
];

const shareWhatsApp = (name: string) => {
  const text = `اكتشف هذا الـ API الرائع في موقع CICI: ${name}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
};

const shareTelegram = (name: string) => {
  const text = `اكتشف هذا الـ API الرائع في موقع CICI: ${name}`;
  window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`, '_blank');
};

const getAPIsWithCache = async () => {
  const cached = localStorage.getItem('apis_cache');
  const cacheTime = localStorage.getItem('apis_cache_time');
  const now = Date.now();
  
  if (cached && cacheTime && (now - parseInt(cacheTime) < 3600000)) {
    return JSON.parse(cached);
  }
  
  try {
    const response = await fetch('https://publicapi.dev/api/public-apis', {
      headers: {
        'X-RapidAPI-Key': RAPID_KEY,
        'X-RapidAPI-Host': 'publicapi.dev'
      }
    });
    
    const apis = await response.json();
    localStorage.setItem('apis_cache', JSON.stringify(apis));
    localStorage.setItem('apis_cache_time', now.toString());
    return apis;
  } catch {
    return fallbackAPIs;
  }
};

const APIListWithCache = () => {
  const [apis, setApis] = useState<any[]>(fallbackAPIs);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;
  
  const loadAPIs = async () => {
    setLoading(true);
    const data = await getAPIsWithCache();
    const apiList = Array.isArray(data) ? data : (data.apis || data.data || fallbackAPIs);
    setApis(apiList);
    setLoading(false);
  };
  
  useEffect(() => {
    loadAPIs();
  }, []);

  const filtered = useMemo(() => {
    return apis.filter(api => 
      (api.name || '').toLowerCase().includes(search.toLowerCase()) || 
      (api.description || api.desc || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [apis, search]);

  const currentAPIs = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  
  return (
    <div className="glass p-8 rounded-2xl mb-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🔥 APIs مجانية جاهزة للاستخدام
        </h2>
        <div className="flex gap-4 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="ابحث عن APIs..." 
            className="flex-grow p-3 bg-white/10 rounded-xl outline-none border border-white/10 focus:border-purple-400 transition-all text-white placeholder-white/40"
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <button 
            onClick={loadAPIs}
            disabled={loading}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-6 py-2 rounded-xl font-bold shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? '⏳' : '🔄'}
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mb-4"></div>
          <p className="text-xl opacity-75">جاري التحميل...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentAPIs.map((api, i) => (
              <div key={i} className="glass p-6 rounded-xl hover:scale-105 transition-all border border-white/20 flex flex-col h-full group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-bold text-sm">API</span>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-lg text-white mb-1 truncate">{api.name || 'API رائع'}</h3>
                    <p className="text-gray-200 text-xs line-clamp-2">{api.description || api.desc}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10 mb-4">
                  <button onClick={() => shareWhatsApp(api.name)} className="flex-1 px-2 py-1.5 bg-green-500/20 text-green-300 rounded-lg text-[10px] font-bold hover:bg-green-500/40 transition-colors">📱 واتساب</button>
                  <button onClick={() => shareTelegram(api.name)} className="flex-1 px-2 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-[10px] font-bold hover:bg-blue-500/40 transition-colors">✈️ تليجرام</button>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${api.auth === 'No' || api.free ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                    {api.auth === 'No' || api.free ? 'FREE' : 'PRO'}
                  </span>
                  <a 
                    href={DIRECT_AD_LINK} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-xs font-bold shadow-lg transition-all"
                  >
                    استخدم الآن
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-row items-center justify-center gap-4 mt-12 bg-white/5 p-4 rounded-2xl">
              <button 
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                disabled={page === 1}
                className="px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 disabled:opacity-30 transition-all font-bold"
              >
                السابق
              </button>
              <span className="font-bold text-sm">صفحة {page} من {totalPages}</span>
              <button 
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                disabled={page === totalPages}
                className="px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 disabled:opacity-30 transition-all font-bold"
              >
                التالي
              </button>
            </div>
          )}
        </>
      )}
      
      <div className="mt-8 p-4 glass rounded-xl text-center">
        <p className="text-[10px] opacity-60">
          💾 آخر تحديث: {new Date(parseInt(localStorage.getItem('apis_cache_time') || Date.now().toString())).toLocaleString('ar-TN')}
        </p>
      </div>
    </div>
  );
};
// --- END NEW EXTERNAL API CONFIGURATION ---

const ScriptComponent: React.FC<{ code: string }> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement('script');
      script.innerHTML = code;
      containerRef.current.appendChild(script);
    }
  }, [code]);

  return <div ref={containerRef} className="ad-script-container" />;
};

const ALL_AD_LINKS = [
  "http://herculist.com/members/index.cgi?Allapi",
  "https://www.10khits.com/?ref=781647",
  ...SPLASH_LINKS.map(s => s.href),
  ...ADDITIONAL_LINKS.map(l => l.href)
];

const AdBanner: React.FC<{ 
  imageUrl: string; 
  width?: string; 
  height?: string; 
  onAdClick?: () => void;
  label?: string;
}> = ({ imageUrl, width, height, onAdClick, label }) => {
  const randomLink = useMemo(() => ALL_AD_LINKS[Math.floor(Math.random() * ALL_AD_LINKS.length)], []);
  return (
    <div className="flex flex-col items-center">
      {label && <span className="text-[10px] text-white/40 mb-1 uppercase tracking-widest">{label}</span>}
      <a 
        href={randomLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="banner-container inline-block overflow-hidden"
        style={{ width, height }}
        onClick={onAdClick}
      >
        <img src={imageUrl} alt="Advertisement" className="banner-img" />
        <div className="banner-text-layer"></div>
        <div className="banner-overlay"></div>
        <div className="flash-button">إعلان / AD</div>
      </a>
    </div>
  );
};

const ApiCard: React.FC<{ 
  api: API; 
  onTest: (endpoint: string) => void; 
  isUnlocked: boolean; 
  onUnlock: (id: string) => void 
}> = ({ api, onTest, isUnlocked, onUnlock }) => {
  const adLink = useMemo(() => ALL_AD_LINKS[Math.floor(Math.random() * ALL_AD_LINKS.length)], [api.id]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-gray-100 group relative">
      <div className={`bg-gradient-to-r ${isUnlocked ? 'from-blue-600 to-purple-600' : 'from-gray-400 to-gray-500'} p-5 transition-colors duration-500`}>
        <h3 className={`text-xl font-bold text-white truncate ${!isUnlocked ? 'blur-[5px] select-none' : ''}`}>
          {isUnlocked ? api.name : '••••••••••••••••'}
        </h3>
        <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold text-white bg-black bg-opacity-20 rounded-full">
          #{api.category}
        </span>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="relative mb-4">
          <p className={`text-gray-600 text-sm line-clamp-2 h-10 ${!isUnlocked ? 'blur-[5px] select-none' : ''}`}>
            {isUnlocked ? api.desc : 'هذا الوصف مشفر حالياً. انقر على الزر بالأسفل لفتح القفل.'}
          </p>
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 text-xs font-bold bg-white/80 px-2 py-1 rounded">MOCKED DATA</span>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs text-blue-600 break-all border border-gray-200 mb-6 select-all flex items-center justify-between">
          <span className={!isUnlocked ? 'blur-[6px] select-none' : ''}>
            {isUnlocked ? api.endpoint : 'https://api.cici.io/v1/hidden/••••••••'}
          </span>
          {!isUnlocked && <span className="text-red-500 animate-pulse">🔒</span>}
        </div>
        
        <div className="mt-auto">
          {isUnlocked ? (
            <div className="space-y-3">
              <a 
                href={DIRECT_AD_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-colors transform active:scale-95"
              >
                👆 استخدم الآن واربح!
              </a>
              <button 
                onClick={() => onTest(api.endpoint)}
                className="block w-full py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-md hover:bg-emerald-600 transition-colors transform active:scale-95"
              >
                🧪 اختبر الأداء
              </button>
            </div>
          ) : (
            <a 
              href={adLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onUnlock(api.id)}
              className="block w-full text-center py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl shadow-2xl hover:from-red-700 hover:to-orange-600 transition-all transform hover:scale-[1.02] active:scale-95 border-b-4 border-red-800"
            >
              <div className="flex flex-col items-center">
                <span className="text-sm">انقر هنا لفتح هذا الـ API 🔓</span>
                <span className="text-[10px] opacity-80 uppercase tracking-tighter">Click to Unlock this API</span>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(50);
  const [apis] = useState<API[]>(INITIAL_APIS);
  const [loading, setLoading] = useState(true);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    const saved = localStorage.getItem('cici_unlocked_ids');
    if (saved) {
      try {
        setUnlockedIds(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Error parsing unlocked IDs", e);
      }
    }
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = useCallback((id: string) => {
    setUnlockedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem('cici_unlocked_ids', JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const unlockRandomApi = useCallback(() => {
    const lockedApis = apis.filter(api => !unlockedIds.has(api.id));
    if (lockedApis.length > 0) {
      const randomApi = lockedApis[Math.floor(Math.random() * lockedApis.length)];
      handleUnlock(randomApi.id);
    }
  }, [apis, unlockedIds, handleUnlock]);

  const filteredApis = useMemo(() => {
    return apis.filter(api => {
      const matchesSearch = api.name.toLowerCase().includes(search.toLowerCase()) || 
                           api.desc.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'all' || api.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apis, search, activeCategory]);

  const currentApis = useMemo(() => {
    return filteredApis.slice(0, visibleCount);
  }, [filteredApis, visibleCount]);

  const handleTestApi = useCallback(async (endpoint: string) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        alert(`✅ يعمل بنجاح!\n\nاستجابة جزئية:\n${JSON.stringify(data).substring(0, 150)}...`);
      } else {
        alert(`❌ فشل الاتصال. قد يحتاج هذا الـ API إلى مفتاح خاص.`);
      }
    } catch (error) {
      alert(`⚠️ خطأ في الوصول المباشر (CORS).`);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      if (visibleCount < filteredApis.length) {
        setVisibleCount(prev => prev + 20);
      }
    }
  }, [visibleCount, filteredApis.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  return (
    <div className="main-layout-grid p-4 md:p-8">
      {/* HEADER ZONE #6745377 */}
      <header className="area-header flex flex-col items-center gap-4">
        <div className="w-full bg-black/20 py-6 flex flex-col items-center rounded-3xl border border-white/10 shadow-inner">
           <ScriptComponent code={`(function(pafb){var d=document,s=d.createElement('script'),l=d.scripts[d.scripts.length-1];s.settings=pafb||{};s.src="//whispered-dress.com/bCX.VjsvdwGAlY0/Y/WFcj/se/mg9yu/ZVU/l/k/PtTeYy3DNJDJUmzXNAz/cXtmNrjgc/0qNLTqMC3_OFAh";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`} />
           <p className="text-[10px] mt-2 opacity-30">Zone #6745377</p>
        </div>
        <div className="glass px-6 py-3 rounded-full text-center w-full max-w-2xl animate-pulse">
            <span className="text-yellow-400 font-bold">عاجل:</span> انقر على زر فتح القفل لكل API بشكل فردي لرؤية البيانات!
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="area-main">
        {/* Top Header Branding */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-white bg-opacity-20 rounded-full mb-6 glass">
            <span className="text-5xl">🚀</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            CICI - محرك الـ APIs العالمي
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 opacity-90 font-light">
            بيانات مخفية، فرص غير محدودة. انقر وافتح كنزك البرمجي الآن.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass p-6 rounded-3xl text-center shadow-xl">
            <h3 className="text-3xl font-bold text-white">{APP_STATS.totalApis}+</h3>
            <p className="text-blue-200 text-sm">API مجاني</p>
          </div>
          <div className="glass p-6 rounded-3xl text-center shadow-xl">
            <h3 className="text-3xl font-bold text-white">{APP_STATS.totalCategories}+</h3>
            <p className="text-blue-200 text-sm">فئة تقنية</p>
          </div>
          <div className="glass p-6 rounded-3xl text-center shadow-xl">
            <h3 className="text-3xl font-bold text-white">{APP_STATS.activeUsers}</h3>
            <p className="text-blue-200 text-sm">عمل مستمر</p>
          </div>
          <div className="glass p-6 rounded-3xl text-center shadow-xl">
            <h3 className="text-3xl font-bold text-white">{APP_STATS.monthlyEarnings}</h3>
            <p className="text-blue-200 text-sm">ربح شهري متوقع</p>
          </div>
        </div>

        {/* API LIST COMPONENT INTEGRATION */}
        <APIListWithCache />

        {/* Search Controls for Initial APIs */}
        <div className="sticky top-4 z-40 mb-12 space-y-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="ابحث عن APIs المخفية..."
                className="w-full p-5 pl-12 rounded-full border-none shadow-2xl focus:ring-4 focus:ring-indigo-400 text-gray-800 text-lg transition-all outline-none pr-14"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-4 gap-3 custom-scrollbar no-scrollbar justify-start md:justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(50);
                }}
                className={`px-6 py-3 rounded-full whitespace-nowrap transition-all flex items-center gap-2 shadow-lg ${
                  activeCategory === cat.id 
                    ? 'bg-white text-indigo-700 font-bold scale-105' 
                    : 'bg-indigo-900 bg-opacity-40 text-white hover:bg-opacity-60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* API Grid Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-2xl font-bold">جاري تحميل البيانات المشفرة...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentApis.map((api, index) => (
                <React.Fragment key={api.id}>
                  <ApiCard 
                    api={api} 
                    onTest={handleTestApi} 
                    isUnlocked={unlockedIds.has(api.id)} 
                    onUnlock={handleUnlock}
                  />
                  {/* Random Internal Banner Injection every 6 cards */}
                  {(index + 1) % 6 === 0 && (
                    <div className="flex flex-col justify-center items-center h-full space-y-2 p-6 glass rounded-2xl border-2 border-dashed border-white/20">
                      <AdBanner imageUrl={getRandom(BANNERS_300)} width="300px" height="250px" onAdClick={unlockRandomApi} />
                      <div className="text-xs text-white/50 text-center mt-2 italic">مساحة إعلانية ممولة</div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {currentApis.length === 0 && (
              <div className="text-center py-20 glass rounded-3xl">
                <span className="text-6xl block mb-4">🔍</span>
                <p className="text-2xl font-bold">لا توجد نتائج مطابقة</p>
                <button onClick={() => setSearch('')} className="mt-4 text-indigo-200 underline">مسح البحث</button>
              </div>
            )}

            {visibleCount < filteredApis.length && (
              <div className="text-center py-10">
                <button onClick={() => setVisibleCount(v => v + 20)} className="px-8 py-3 glass rounded-full hover:bg-white/20 transition-all font-bold">تحميل المزيد ↓</button>
              </div>
            )}
          </>
        )}
      </main>

      {/* SIDEBAR ZONE #6745378 */}
      <aside className="area-sidebar flex flex-col gap-6">
        <div className="sticky top-4 space-y-6">
            <div className="bg-black/30 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
                <h4 className="text-xs font-bold text-white/40 mb-4 uppercase tracking-widest">Sponsored Sidebar</h4>
                <ScriptComponent code={`(function(fthojk){var d=document,s=d.createElement('script'),l=d.scripts[d.scripts.length-1];s.settings=fthojk||{};s.src="//whispered-dress.com/b/X-VusMd.GEln0XYvWCcK/wexm/9WuxZAUTlxkLP/TFYW3mNeD/UIzxOMDsAMtDNAjJci0/NSTNMH4/M/Qs";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`} />
                <p className="text-[9px] mt-4 opacity-20">Zone #6745378</p>
            </div>

            <div className="glass p-6 rounded-[2rem] space-y-4">
                <h3 className="font-bold text-lg border-b border-white/10 pb-2">روابط سريعة</h3>
                {ADDITIONAL_LINKS.map((link, idx) => (
                    <a key={idx} href={link.href} target="_blank" onClick={unlockRandomApi} className="block text-sm hover:text-yellow-400 transition-colors py-1">
                        ⚡ {link.text}
                    </a>
                ))}
            </div>

            <div className="flex flex-col items-center gap-4">
                <AdBanner imageUrl={getRandom(BANNERS_160)} width="160px" height="600px" onAdClick={unlockRandomApi} />
            </div>
        </div>
      </aside>

      {/* FOOTER ZONE #6745384 */}
      <footer className="area-footer flex flex-col items-center gap-10 mt-20 border-t border-white/10 pt-10">
        <div className="w-full max-w-4xl bg-black/40 p-8 rounded-[3rem] border border-white/5 flex flex-col items-center shadow-2xl">
            <ScriptComponent code={`(function(brdc){var d=document,s=d.createElement('script'),l=d.scripts[d.scripts.length-1];s.settings=brdc||{};s.src="//whispered-dress.com/b/XZVNs.d/GVlN0iYxWCcq/-ewmm9vuYZ/UQlTk/PITzY_3PN/DbUZzbOYDWQethNRjdcX0HNaTxMU4mN/QW";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`} />
            <p className="text-[10px] mt-4 opacity-20">Zone #6745384</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full">
            {SPLASH_LINKS.map((s, idx) => (
                <a key={idx} href={s.href} target="_blank" onClick={unlockRandomApi} className="glass p-3 rounded-2xl text-[10px] text-center hover:bg-white/10 transition-colors truncate">
                    {s.text}
                </a>
            ))}
        </div>

        <div className="text-center space-y-2 pb-10">
            <p className="text-sm opacity-50">© 2024 CICI Platform. All rights reserved.</p>
            <div className="flex gap-4 text-[10px] opacity-30 justify-center">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Contact</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;