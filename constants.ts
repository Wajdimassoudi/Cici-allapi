import { API, Category, Stats } from './types';

export const SHRINKME_BASE = 'https://shrinkme.click/IT1FfKju?url=';

export const APP_STATS: Stats = {
  totalApis: 1200,
  totalCategories: 60,
  activeUsers: 'Live 24/7',
  monthlyEarnings: '$7500+'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'استكشاف الكل', icon: '🚀' },
  { id: 'crypto', name: 'المال والعملات', icon: '💎' },
  { id: 'ai', name: 'الذكاء الاصطناعي', icon: '🧠' },
  { id: 'games', name: 'الألعاب والترفيه', icon: '🎮' },
  { id: 'images', name: 'الفن والتصميم', icon: '🎨' },
  { id: 'weather', name: 'المناخ والبيئة', icon: '🌍' },
  { id: 'dev', name: 'أدوات المطورين', icon: '🛠️' },
  { id: 'social', name: 'بيانات التواصل', icon: '📣' }
];

export const BANNERS_300 = [
  "http://www.herculist.com/img/300x250-1.jpg",
  "http://www.herculist.com/img/300x250-2.jpg",
  "http://www.herculist.com/img/300x250-3.jpg",
  "http://www.herculist.com/img/300x250-4.jpg",
  "http://www.herculist.com/img/300x250-6.jpg",
  "https://www.10khits.com/banners/300x250.png"
];

export const BANNERS_160 = [
  "http://www.herculist.com/img/160x600-1.jpg",
  "http://www.herculist.com/img/160x600-2.jpg",
  "http://www.herculist.com/img/160x600-5.jpg"
];

export const ADDITIONAL_LINKS = [
  { href: "https://herculist.com/members/powerhub.cgi?Allapi", text: "اربح $100 يومياً من هنا" },
  { href: "https://www.herculist.com/members/20deal.cgi?Allapi", text: "أفضل عروض الترافيك 2024" },
  { href: "https://www.10khits.com/?ref=781647", text: "احصل على زوار لموقعك مجاناً" }
];

export const SPLASH_LINKS = [
  { href: "http://www.herculist.com/splash/splash01.cgi?Allapi", text: "دعم فني 24/7" },
  { href: "http://www.herculist.com/splash/splash08.cgi?Allapi", text: "سياسة الخصوصية" },
  { href: "http://www.herculist.com/splash/splash17.cgi?Allapi", text: "شروط الاستخدام" }
];

export const INITIAL_APIS: API[] = [
  { id: 'w-ai-1', category: 'ai', name: 'Gemini Pro API', endpoint: 'https://api.google.com/gemini/v1', desc: 'أقوى نموذج ذكاء اصطناعي من جوجل للدردشة والتحليل.' },
  { id: 'w-crypto-1', category: 'crypto', name: 'BTC Whale Tracker', endpoint: 'https://api.whale-alert.io/v1', desc: 'تتبع تحركات الحيتان في سوق العملات الرقمية لحظة بلحظة.' },
  { id: 'w-dev-1', category: 'dev', name: 'WinAPI Core Service', endpoint: 'https://winapi.io/v1/core', desc: 'الواجهة الأساسية لخدمات winapi السريعة.' },
  { id: 'c1', category: 'crypto', name: 'CoinGecko Live', endpoint: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', desc: 'أسعار العملات المشفرة المحدثة كل ثانية.' },
  { id: 'g3', category: 'games', name: 'PokeAPI Master', endpoint: 'https://pokeapi.co/api/v2/pokemon', desc: 'الوصول الكامل إلى بيانات البوكيمون للألعاب.' },
  { id: 'i1', category: 'images', name: 'Magic Cat Pix', endpoint: 'https://api.thecatapi.com/v1/images/search', desc: 'صور قطط عشوائية بتقنية HD للتطبيقات.' }
];

// Fill more APIs for WinAPI feel
for (let i = 1; i <= 80; i++) {
  INITIAL_APIS.push({
    id: `win-${i}`,
    category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1].id,
    name: `Win Service API #${i}`,
    endpoint: `https://winapi.io/v1/service-${i}`,
    desc: `خدمة برمجية متطورة توفر بيانات عالية الجودة لمشروعك البرمجي رقم ${i}.`
  });
}