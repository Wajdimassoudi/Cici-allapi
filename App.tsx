
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { API } from './types';
import { CATEGORIES, INITIAL_APIS, APP_STATS, DIRECT_AD_LINK } from './constants';

const CiciAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    try {
      // Always initialize GoogleGenAI with the named parameter and process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are cici, the official AI system for the cici API platform. Answer this developer query in professional English, focusing on technical clarity: ${input}`,
      });
      // Use the .text property directly from GenerateContentResponse
      setOutput(response.text || 'Process completed with no output.');
    } catch (e) {
      setOutput('Connection to cici core failed. Check your network or API status.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 mb-20 relative group overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
        <span className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-sm shadow-xl shadow-indigo-600/30">AI</span>
        Consult Cici Expert
      </h3>
      <div className="flex flex-col md:flex-row gap-4 relative z-10">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="What are we building today?"
          className="flex-1 bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 outline-none focus:border-indigo-500 transition-all text-white placeholder-white/20 text-lg"
        />
        <button 
          onClick={handleAsk}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 px-12 py-5 rounded-[1.5rem] font-black transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 uppercase tracking-widest"
        >
          {loading ? 'Thinking...' : 'Consult'}
        </button>
      </div>
      {output && (
        <div className="mt-10 p-8 bg-white/5 rounded-[1.5rem] text-lg leading-relaxed border-l-4 border-indigo-500 text-indigo-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {output}
        </div>
      )}
    </div>
  );
};

const ApiCard: React.FC<{ api: API, isUnlocked: boolean, onUnlock: (id: string) => void }> = ({ api, isUnlocked, onUnlock }) => (
  <div className="neo-card p-8 rounded-[2.5rem] flex flex-col h-full group relative overflow-hidden">
    <div className="flex justify-between items-start mb-8">
      <div className="text-4xl bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/5">
        {CATEGORIES.find(c => c.id === api.category)?.icon || '🔧'}
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${isUnlocked ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
        {isUnlocked ? 'DECRYPTED' : 'LOCKED'}
      </span>
    </div>
    
    <div className="flex-1">
      <h4 className={`text-xl font-bold mb-3 transition-all ${!isUnlocked && 'blur-md select-none opacity-40'}`}>
        {isUnlocked ? api.name : 'Classified Endpoint'}
      </h4>
      <p className={`text-sm text-white/50 leading-relaxed transition-all ${!isUnlocked && 'blur-md select-none opacity-20'}`}>
        {isUnlocked ? api.desc : 'Detailed technical specifications and integration parameters for this service are currently restricted for security.'}
      </p>
    </div>

    <div className="mt-8 pt-6 border-t border-white/5">
      {isUnlocked ? (
        <button 
          onClick={() => window.open(DIRECT_AD_LINK, '_blank')}
          className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 border border-white/5"
        >
          View Documentation <span>↗</span>
        </button>
      ) : (
        <button 
          onClick={() => onUnlock(api.id)}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Unlock Access <span>🔓</span>
        </button>
      )}
    </div>
  </div>
);

const App: React.FC = () => {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cici_vault');
    if (saved) {
      try {
        setUnlocked(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse cici vault", e);
      }
    }
  }, []);

  const handleUnlock = (id: string) => {
    window.open(DIRECT_AD_LINK, '_blank');
    const next = new Set(unlocked).add(id);
    setUnlocked(next);
    localStorage.setItem('cici_vault', JSON.stringify(Array.from(next)));
  };

  // Fixed missing useMemo import and optimized filtering
  const filtered = useMemo(() => {
    return INITIAL_APIS.filter(api => {
      const matchesFilter = filter === 'all' || api.category === filter;
      const matchesSearch = api.name.toLowerCase().includes(search.toLowerCase()) || 
                           api.desc.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Brand Header */}
      <header className="mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-600/20 rounded-full mb-8">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">System Online</span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter uppercase italic leading-none">cici</h1>
        <p className="text-lg md:text-2xl text-white/40 font-medium max-w-2xl mx-auto leading-relaxed">
          The world's most comprehensive catalog of free APIs and digital building blocks.
        </p>
      </header>

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {Object.entries(APP_STATS).map(([key, value]) => (
          <div key={key} className="glass p-8 rounded-3xl text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-1">{value}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>

      <CiciAI />

      {/* Directory Controls */}
      <div className="flex flex-col lg:flex-row gap-6 items-center mb-16">
        <div className="relative flex-1 w-full">
          <input 
            type="text" 
            placeholder="Search API directory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 outline-none focus:border-indigo-500 transition-all text-white text-lg"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20">🔍</div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full lg:w-auto">
          {CATEGORIES.map(c => (
            <button 
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-8 py-4 rounded-2xl whitespace-nowrap text-xs font-bold transition-all border ${
                filter === c.id 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
              }`}
            >
              <span className="mr-2">{c.icon}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* API Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {filtered.length > 0 ? (
          filtered.map(api => (
            <ApiCard 
              key={api.id} 
              api={api} 
              isUnlocked={unlocked.has(api.id)} 
              onUnlock={handleUnlock} 
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center opacity-40">
            <div className="text-5xl mb-4">🛰️</div>
            <p className="text-xl font-medium">No services found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="pt-20 border-t border-white/5 text-center">
        <div className="mb-12">
          <h2 className="text-5xl font-black mb-2 italic opacity-20">cici</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">Advanced API Distribution</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-10 mb-20">
          {['Developers', 'Governance', 'Status', 'Legal', 'Privacy'].map(item => (
            <a 
              key={item} 
              href={DIRECT_AD_LINK} 
              target="_blank" 
              className="text-xs font-bold text-white/30 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        
        <p className="text-[10px] text-white/10 font-medium">
          &copy; 2025 CICI SYSTEMS GLOBAL INC. ALL TRADEMARKS ARE PROPERTY OF THEIR RESPECTIVE OWNERS.
        </p>
      </footer>

      {/* Floating Offer Widget */}
      <div 
        className="fixed bottom-10 right-10 z-50 cursor-pointer animate-bounce"
        onClick={() => window.open(DIRECT_AD_LINK, '_blank')}
      >
        <div className="bg-indigo-600 w-16 h-16 rounded-full shadow-2xl shadow-indigo-600/50 flex items-center justify-center border-4 border-white/10">
          <span className="text-2xl">💰</span>
        </div>
      </div>
    </div>
  );
};

export default App;
