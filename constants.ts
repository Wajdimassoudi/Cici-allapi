
import { API, Category, Stats } from './types';

export const DIRECT_AD_LINK = "https://elderly-foot.com/b/3sVM0nP.3/pLvLbtmYV/JRZEDK0P2bNIzHQA1yN_Tec/zuL/THY/3RNXD/UB1/NpzlQO";

export const APP_STATS: Stats = {
  totalApis: 1500,
  totalCategories: 45,
  activeUsers: 'Live 24/7',
  monthlyEarnings: '$18.4K+'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Services', icon: '🌌' },
  { id: 'ai', name: 'Intelligence', icon: '🧠' },
  { id: 'crypto', name: 'Blockchain', icon: '⛓️' },
  { id: 'dev', name: 'Dev Tools', icon: '⚙️' },
  { id: 'games', name: 'Play', icon: '🕹️' },
  { id: 'data', name: 'Analytics', icon: '📊' }
];

export const INITIAL_APIS: API[] = [
  { id: 'cici-ai-1', category: 'ai', name: 'Gemini 3 Pro', endpoint: 'https://api.google.com/gemini/v1', desc: 'Enterprise-grade multimodal intelligence for complex reasoning.' },
  { id: 'cici-eth-1', category: 'crypto', name: 'Ethereum Gas Tracker', endpoint: 'https://api.etherscan.io/v1', desc: 'Real-time network congestion and transaction fee analysis.' },
  { id: 'cici-dev-1', category: 'dev', name: 'Cici Cloud Gateway', endpoint: 'https://cici.io/v1/gate', desc: 'Secure entry point for global API distribution and management.' },
  { id: 'cici-geo-1', category: 'data', name: 'Neural Geo-Locator', endpoint: 'https://api.geoneural.com/v2', desc: 'High-precision location intelligence using satellite imagery.' },
];

for (let i = 1; i <= 60; i++) {
  const cat = CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1];
  INITIAL_APIS.push({
    id: `cici-gen-${i}`,
    category: cat.id,
    name: `${cat.name} Service ${i}`,
    endpoint: `https://api.cici.io/endpoint-${i}`,
    desc: `Scalable and reliable high-performance endpoint serving millions of concurrent requests for ${cat.name.toLowerCase()} developers.`
  });
}
