
import { API, Category, Stats } from './types';

export const SHRINKME_BASE = 'https://shrinkme.click/IT1FfKju?url=';

export const APP_STATS: Stats = {
  totalApis: 1000,
  totalCategories: 50,
  activeUsers: '24/7',
  monthlyEarnings: '$5000+'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل', icon: '🌐' },
  { id: 'crypto', name: 'الكريبتو', icon: '💰' },
  { id: 'games', name: 'الألعاب', icon: '🎮' },
  { id: 'weather', name: 'الطقس', icon: '☁️' },
  { id: 'images', name: 'الصور', icon: '🖼️' },
  { id: 'news', name: 'الأخبار', icon: '📰' },
  { id: 'movies', name: 'الأفلام', icon: '🎬' },
  { id: 'ai', name: 'الذكاء الاصطناعي', icon: '🤖' },
  { id: 'social', name: 'التواصل الاجتماعي', icon: '📱' },
  { id: 'dev', name: 'تطوير المواقع', icon: '💻' }
];

// Banners (Merged Herculist + 10KHits)
export const BANNERS_728 = [
  "http://www.herculist.com/img/1.png",
  "http://www.herculist.com/img/9.png",
  "http://www.herculist.com/img/8.png",
  "http://www.herculist.com/img/7.png",
  "http://www.herculist.com/img/6.png",
  "http://www.herculist.com/img/purpleblack.png",
  "http://www.herculist.com/img/pureblack.png",
  "http://www.herculist.com/img/blackpurple.png",
  "http://www.herculist.com/img/blackgreenpurple.png",
  "https://www.10khits.com/banners/720x90.png"
];

export const BANNERS_468 = [
  "http://www.herculist.com/img/small5.png",
  "http://www.herculist.com/img/small4.png",
  "http://www.herculist.com/img/small3.png",
  "http://www.herculist.com/img/small2.png",
  "http://www.herculist.com/img/small1.png",
  "http://www.herculist.com/img/small8.png",
  "http://www.herculist.com/img/small7.png",
  "http://www.herculist.com/img/small6.png",
  "https://www.10khits.com/banners/468x60.png"
];

export const BANNERS_300 = [
  "http://www.herculist.com/img/300x250-1.jpg",
  "http://www.herculist.com/img/300x250-2.jpg",
  "http://www.herculist.com/img/300x250-3.jpg",
  "http://www.herculist.com/img/300x250-4.jpg",
  "http://www.herculist.com/img/300x250-5",
  "http://www.herculist.com/img/300x250-6.jpg",
  "http://www.herculist.com/img/300x250-7.jpg",
  "http://www.herculist.com/img/300x250-8.jpg",
  "https://www.10khits.com/banners/300x250.png",
  "https://www.10khits.com/banners/250x250.png"
];

export const BANNERS_120 = [
  "http://www.herculist.com/img/120x600-1.jpg",
  "http://www.herculist.com/img/120x600-2.jpg",
  "http://herculist.com/img/120x600-3.jpg",
  "http://www.herculist.com/img/120x600-4.jpg",
  "http://www.herculist.com/img/120x600-5.jpg",
  "https://www.10khits.com/banners/120x600.png"
];

export const BANNERS_160 = [
  "http://www.herculist.com/img/160x600-1.jpg",
  "http://www.herculist.com/img/160x600-2.jpg",
  "http://www.herculist.com/img/160x600-3.jpg",
  "http://www.herculist.com/img/160x600-4.jpg",
  "http://www.herculist.com/img/160x600-5.jpg",
  "http://www.herculist.com/img/160x600-6.jpg"
];

export const ADDITIONAL_LINKS = [
  { href: "https://herculist.com/members/powerhub.cgi?Allapi", text: "PowerHub - 5 أنظمة حركة مرور" },
  { href: "https://www.herculist.com/members/20deal.cgi?Allapi", text: "$20 Deal - الأفضل مبيعًا" },
  { href: "https://www.herculist.com/members/newprimepage.cgi?Allapi", text: "PRIME Ads - ترافيك مباشر" },
  { href: "https://www.10khits.com/?ref=781647", text: "10KHits - ترافيك مجاني لموقعك" }
];

export const SPLASH_LINKS = [
  { href: "http://www.herculist.com/splash/splash01.cgi?Allapi", text: "Splash 01 - الافتراضية" },
  { href: "http://www.herculist.com/splash/splash02.cgi?Allapi", text: "Splash 02 - الخضراء" },
  { href: "http://www.herculist.com/splash/splash03.cgi?Allapi", text: "Splash 03 - الزرقاء" },
  { href: "http://www.herculist.com/splash/splash04.cgi?Allapi", text: "Splash 04 - الحمراء" },
  { href: "http://www.herculist.com/splash/splash05.cgi?Allapi", text: "Splash 05 - الذهبية" },
  { href: "http://www.herculist.com/splash/splash06.cgi?Allapi", text: "Splash 06 - مودرن" },
  { href: "http://www.herculist.com/splash/splash07.cgi?Allapi", text: "Splash 07 - فاخرة" },
  { href: "http://www.herculist.com/splash/splash08.cgi?Allapi", text: "Splash 08 - تقنية" },
  { href: "http://www.herculist.com/splash/splash09.cgi?Allapi", text: "Splash 09 - بسيطة" },
  { href: "http://www.herculist.com/splash/splash10.cgi?Allapi", text: "Splash 10 - جريئة" },
  { href: "http://www.herculist.com/splash/splash11.cgi?Allapi", text: "Splash 11 - احترافية" },
  { href: "http://www.herculist.com/splash/splash12.cgi?Allapi", text: "Splash 12 - ملونة" },
  { href: "http://www.herculist.com/splash/splash13.cgi?Allapi", text: "Splash 13 - داكنة" },
  { href: "http://www.herculist.com/splash/splash14.cgi?Allapi", text: "Splash 14 - فيديو" },
  { href: "http://www.herculist.com/splash/splash15.cgi?Allapi", text: "Splash 15 - شهادات" },
  { href: "http://www.herculist.com/splash/splash16.cgi?Allapi", text: "Splash 16 - عاجلة" },
  { href: "http://www.herculist.com/splash/splash17.cgi?Allapi", text: "Splash 17 - VIP" },
  { href: "http://www.herculist.com/splash/splash18.cgi?Allapi", text: "Splash 18 - نهائية" }
];

// Generating initial APIs
export const INITIAL_APIS: API[] = [
  { id: 'c1', category: 'crypto', name: 'CoinGecko BTC', endpoint: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', desc: 'سعر البيتكوين المباشر مقابل الدولار' },
  { id: 'c2', category: 'crypto', name: 'Eth Gas Station', endpoint: 'https://ethgasstation.info/api/ethgasAPI.json', desc: 'أسعار الغاز الحالية لشبكة إيثريوم' },
  { id: 'c3', category: 'crypto', name: 'Crypto Fear & Greed', endpoint: 'https://api.alternative.me/fng/', desc: 'مؤشر الخوف والطمع للعملات الرقمية' },
  { id: 'c4', category: 'crypto', name: 'Binance Ticker', endpoint: 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', desc: 'سعر تداول بايننس المباشر' },
  { id: 'g1', category: 'games', name: 'Random Joke', endpoint: 'https://official-joke-api.appspot.com/random_joke', desc: 'الحصول على نكتة عشوائية مضحكة' },
  { id: 'g2', category: 'games', name: 'Advice Slip', endpoint: 'https://api.adviceslip.com/advice', desc: 'نصائح حياتية عشوائية مفيدة' },
  { id: 'g3', category: 'games', name: 'PokeAPI', endpoint: 'https://pokeapi.co/api/v2/pokemon/ditto', desc: 'قاعدة بيانات شاملة للبوكيمون' },
  { id: 'g4', category: 'games', name: 'Number Facts', endpoint: 'http://numbersapi.com/random', desc: 'حقائق مذهلة عن الأرقام عشوائياً' },
  { id: 'w1', category: 'weather', name: 'OpenWeather', endpoint: 'https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=demo', desc: 'طقس القاهرة الحالي' },
  { id: 'w2', category: 'weather', name: '7Timer!', endpoint: 'https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json', desc: 'بيانات الأرصاد الجوية الفلكية' },
  { id: 'i1', category: 'images', name: 'The Cat API', endpoint: 'https://api.thecatapi.com/v1/images/search', desc: 'صور قطط لطيفة وعشوائية' },
  { id: 'i2', category: 'images', name: 'Dog CEO API', endpoint: 'https://dog.ceo/api/breeds/image/random', desc: 'صور كلاب من جميع السلالات' },
  { id: 'i3', category: 'images', name: 'Unsplash Random', endpoint: 'https://source.unsplash.com/random', desc: 'صور احترافية عشوائية من انسبلاش' },
  { id: 'i4', category: 'images', name: 'Picsum Photos', endpoint: 'https://picsum.photos/v2/list', desc: 'قائمة صور عشوائية للنماذج' },
  { id: 'n1', category: 'news', name: 'Hacker News API', endpoint: 'https://hacker-news.firebaseio.com/v0/item/8863.json', desc: 'أهم أخبار التكنولوجيا من هاكر نيوز' },
  { id: 'n2', category: 'news', name: 'Current News', endpoint: 'https://api.currentsapi.services/v1/latest-news?language=en&apiKey=demo', desc: 'آخر الأخبار العالمية بلغات متعددة' },
  { id: 'm1', category: 'movies', name: 'Star Wars API', endpoint: 'https://swapi.dev/api/people/1/', desc: 'بيانات كاملة عن عالم حرب النجوم' },
  { id: 'm2', category: 'movies', name: 'Ghibli API', endpoint: 'https://ghibliapi.herokuapp.com/films', desc: 'أفلام استوديو جيبلي الشهيرة' },
  { id: 'd1', category: 'dev', name: 'JSONPlaceholder', endpoint: 'https://jsonplaceholder.typicode.com/posts', desc: 'بيانات تجريبية لعمليات CRUD' },
  { id: 'd2', category: 'dev', name: 'IPify', endpoint: 'https://api.ipify.org?format=json', desc: 'معرفة عنوان IP الخاص بالمستخدم' },
  { id: 'd3', category: 'dev', name: 'HTTPBin', endpoint: 'https://httpbin.org/get', desc: 'خدمة لاختبار طلبات HTTP' },
  { id: 'd4', category: 'dev', name: 'Robohash', endpoint: 'https://robohash.org/test', desc: 'توليد صور آليين فريدة للبروفايلات' },
  { id: 'a1', category: 'ai', name: 'Generative AI Test', endpoint: 'https://api.ai/test', desc: 'واجهة لاختبار استجابات الذكاء الاصطناعي' },
  { id: 'a2', category: 'ai', name: 'ChatBot Mock', endpoint: 'https://api.mock/chatbot', desc: 'نموذج محاكاة لدردشة ذكية' }
];

for (let i = 1; i <= 60; i++) {
  INITIAL_APIS.push({
    id: `mock-${i}`,
    category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1].id,
    name: `API إضافي رقم ${i}`,
    endpoint: `https://api.example.com/v1/service-${i}`,
    desc: `واجهة برمجة تطبيقات مجانية توفر خدمات متميزة للبرمجة رقم ${i}`
  });
}
