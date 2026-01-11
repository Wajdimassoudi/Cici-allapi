import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { API, Category } from './types';
import { 
  CATEGORIES, INITIAL_APIS, APP_STATS, 
  BANNERS_300, BANNERS_160, ADDITIONAL_LINKS, SPLASH_LINKS 
} from './constants';

const DIRECT_AD_LINK = "https://elderly-foot.com/b/3sVM0nP.3/pLvLbtmYV/JRZEDK0P2bNIzHQA1yN_Tec/zuL/THY/3RNXD/UB1/NpzlQO";

const GeminiAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `أنت WinAssistant المساعد الرسمي لمنصة winapi. ساعد المبرمج بذكاء. سؤاله: ${prompt}`,
        config: { temperature: 0.9, thinkingConfig: { thinkingBudget: 0 } }
      });
      setResponse(result.text || 'لم أجد رداً مناسباً.');
    } catch (e) {
      setResponse('عذراً، طاقة الذكاء الاصطناعي تحتاج للشحن.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 rounded-[2.5rem] border-2 border-indigo-500/20 mb-12 relative overflow-hidden group">
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
        <span className="text-3xl animate-bounce">✨</span> WinAssistant الذكي
      </h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && askAI()}
          placeholder="ماذا تريد أن تبرمج اليوم؟ دعني أساعدك..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-lg"
        />
        <button 
          onClick={askAI}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? 'يفكر...' : 'انطلق'}
        </button>
      </div>
      {response && (
        <div className="mt-6 p-6 bg-indigo-950/40 rounded-3xl text-lg border-l-8 border-pink-500 animate-fade-in">
          {response}
        </div>
      )}
    </div>
  );
};

const AdBanner = ({ imageUrl, width, height, label = "رابط مدعوم" }: any) => {
  return (
    <div className="flex flex-col items-center my-8">
      <div className="relative group cursor-pointer" onClick={() => window.open(DIRECT_AD_LINK, '_blank')}>
        <span className="absolute -top-3 right-4 bg-pink-600 text-[9px] font-bold px-2 py-0.5 rounded-full z-10 animate-pulse">{label}</span>
        <div className="overflow-hidden rounded-[2rem] border-2 border-white/10 shadow-2xl group-hover:border-pink-500/50 transition-all duration-500">
          <img 
            src={imageUrl} 
            alt="Ad" 
            style={{ width, height, objectFit: 'cover' }} 
            className="group-hover:scale-110 transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <span className="text-xs font-bold text-white">انقر للمطالبة بالهدية 🎁</span>
        </div>
      </div>
    </div>
  );
};

const ApiCard = ({ api, isUnlocked, onUnlock }: any) => {
  return (
    <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col h-full relative group">
      {!isUnlocked && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full animate-pulse shadow-lg">LOCKED 🔒</span>
        </div>
      )}
      
      <div className={`p-6 ${isUnlocked ? 'bg-gradient-to-br from-indigo-600/10 to-transparent' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
            {CATEGORIES.find(c => c.id === api.category)?.icon || '🧩'}
          </div>
          <span className="text-white/10 font-mono text-[10px]">VERIFIED</span>
        </div>
        <h3 className={`font-black text-xl mb-2 ${!isUnlocked ? 'blur-md select-none' : 'text-indigo-300'}`}>
          {isUnlocked ? api.name : 'HIDDEN API'}
        </h3>
        <p className={`text-sm text-white/50 leading-relaxed line-clamp-3 mb-6 ${!isUnlocked ? 'blur-md' : ''}`}>
          {isUnlocked ? api.desc : 'المحتوى مشفر. انقر بالأسفل للحصول على الصلاحية الكاملة والوصول إلى الرابط.'}
        </p>
      </div>

      <div className="mt-auto p-6 pt-0">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
            <span className="block h-full bg-indigo-500 w-full animate-pulse"></span>
          </span>
          <span className="text-[10px] text-white/30">100% Uptime</span>
        </div>
        
        {isUnlocked ? (
          <a 
            href={DIRECT_AD_LINK}
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-black rounded-2xl shadow-xl transition-all transform active:scale-95 group/btn"
          >
            <span>استخدام الآن</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">🚀</span>
          </a>
        ) : (
          <button 
            onClick={() => onUnlock(api.id)}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black rounded-2xl shadow-2xl animate-glow transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>فك تشفير البيانات</span>
            <span className="text-lg">🔓</span>
          </button>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(18);

  useEffect(() => {
    const saved = localStorage.getItem('winapi_unlocked');
    if (saved) setUnlockedIds(new Set(JSON.parse(saved)));
  }, []);

  const handleUnlock = (id: string) => {
    window.open(DIRECT_AD_LINK, '_blank');
    const next = new Set(unlockedIds).add(id);
    setUnlockedIds(next);
    localStorage.setItem('winapi_unlocked', JSON.stringify(Array.from(next)));
  };

  const filtered = useMemo(() => {
    return INITIAL_APIS.filter(api => {
      const match = api.name.toLowerCase().includes(search.toLowerCase()) || 
                    api.desc.toLowerCase().includes(search.toLowerCase());
      const catMatch = activeCat === 'all' || api.category === activeCat;
      return match && catMatch;
    });
  }, [search, activeCat]);

  return (
    <div className="min-h-screen">
      {/* Floating Animated Gift Ad */}
      <div className="floating-ad" onClick={() => window.open(DIRECT_AD_LINK, '_blank')}>
        <div className="bg-gradient-to-br from-pink-600 to-indigo-600 p-4 rounded-full cursor-pointer shadow-2xl border-4 border-white/20 hover:scale-110 transition-transform relative">
          <span className="text-3xl">🎁</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">1</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-10">
        {/* Top Branding Section */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <div className="absolute -z-10 w-full h-full opacity-20 blur-[100px] bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 rounded-full"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8 animate-float">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <span className="text-xs font-bold tracking-widest text-white/70 uppercase">WinAPI v2.0 Global Portal</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter neon-text">
            winapi
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200/60 max-w-3xl font-medium leading-relaxed">
            المنصة الأذكى عالمياً لتمكين المبرمجين. آلاف الـ APIs المجانية بضغطة زر واحدة. 
            <span className="text-pink-400 block mt-2 font-black">اربح، برمج، وتفوق مع winapi.</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'APIs المتوفرة', val: APP_STATS.totalApis, color: 'text-indigo-400' },
            { label: 'فئات برمجية', val: APP_STATS.totalCategories, color: 'text-pink-400' },
            { label: 'مستخدم نشط', val: APP_STATS.activeUsers, color: 'text-cyan-400' },
            { label: 'أرباح المطورين', val: APP_STATS.monthlyEarnings, color: 'text-yellow-400' }
          ].map((stat, i) => (
            <div key={i} className="glass p-8 rounded-[2rem] text-center border-b-4 border-white/5 hover:border-white/20 transition-all">
              <div className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.val}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/30">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="main-grid">
          <main>
            <GeminiAssistant />

            {/* Powerful Filter UI */}
            <div className="mb-12 sticky top-6 z-50">
              <div className="glass p-3 rounded-[2rem] flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <input 
                    type="text" 
                    placeholder="ابحث عن أي خدمة برمجية..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-12 py-4 text-lg outline-none focus:border-indigo-500 transition-all"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-30">🔍</span>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto px-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCat(cat.id)}
                      className={`px-6 py-4 rounded-2xl whitespace-nowrap transition-all font-bold border ${
                        activeCat === cat.id ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main API Grid with Injected Ads */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.slice(0, visibleCount).map((api, idx) => (
                <React.Fragment key={api.id}>
                  <ApiCard 
                    api={api} 
                    isUnlocked={unlockedIds.has(api.id)} 
                    onUnlock={handleUnlock} 
                  />
                  {(idx + 1) % 6 === 0 && (
                    <div className="col-span-1 md:col-span-2 xl:col-span-1 flex flex-col items-center justify-center p-4 glass rounded-[2rem] border-2 border-dashed border-pink-500/30">
                      <AdBanner imageUrl={BANNERS_300[idx % BANNERS_300.length]} width="300px" height="250px" label="هدية حصرية لمستخدمي winapi" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="text-center mt-20">
                <button 
                  onClick={() => setVisibleCount(v => v + 12)}
                  className="px-12 py-6 bg-white text-black font-black rounded-3xl text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
                >
                  استكشاف المزيد من الكنوز ↓
                </button>
              </div>
            )}
          </main>

          {/* Magical Sidebar */}
          <aside>
            <div className="sticky top-6 space-y-8">
              <div className="glass p-8 rounded-[2.5rem] border border-white/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/20 blur-3xl"></div>
                <h4 className="text-xl font-black mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-sm">🔥</span>
                  روابط سريعة ذكية
                </h4>
                <div className="space-y-4">
                  {ADDITIONAL_LINKS.map((link, i) => (
                    <a 
                      key={i} 
                      href={DIRECT_AD_LINK} 
                      target="_blank"
                      className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-indigo-600 hover:translate-x-2 transition-all group"
                    >
                      <span className="font-bold text-sm text-white/80 group-hover:text-white">{link.text}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </a>
                  ))}
                </div>

                <div className="mt-10 p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl border border-yellow-500/20 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-sm font-black text-yellow-500 mb-1">Win Rewards!</div>
                  <p className="text-[10px] text-white/40">استخدم 5 APIs يومياً للدخول في سحب $50</p>
                </div>
              </div>

              <AdBanner imageUrl={BANNERS_160[0]} width="100%" height="500px" label="Sponsor Vertical" />
              
              <div className="glass p-6 rounded-[2rem] text-center border border-white/5">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] mb-4">WinAPI News</p>
                <div className="text-sm font-bold text-indigo-300 animate-pulse">تم إضافة 50 API جديد اليوم! 🚀</div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-32 pt-16 border-t border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {SPLASH_LINKS.map((s, idx) => (
              <a key={idx} href={DIRECT_AD_LINK} target="_blank" className="p-6 glass rounded-2xl text-xs font-bold text-center hover:bg-indigo-600 transition-all border border-white/5">
                {s.text}
              </a>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10">
            <div className="text-4xl font-black neon-text">winapi</div>
            <div className="flex gap-8 text-xs font-bold text-white/30 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">API Keys</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
            </div>
            <div className="text-xs text-white/20 font-medium">
              &copy; 2024 winapi Next-Gen Platform.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;