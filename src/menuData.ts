export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// সব ইউনিক ফুড ইমেজ
const IMG = {
  madoxBurger: 'https://image.qwenlm.ai/generated-images/0de716d9-8cc5-455d-b349-f93a101e967a/_result.png',
  beefCheeseDelight: 'https://image.qwenlm.ai/generated-images/e6af0404-8e78-417a-8439-342621ee1e6b/_result.png',
  fries: 'https://image.qwenlm.ai/generated-images/bcf23eda-d156-4409-aaef-9a1a90d89de8/_result.png',
  shake: 'https://image.qwenlm.ai/generated-images/0a7ec72c-6a74-4764-ae67-df90010d825b/_result.png',
  spicyCrunch: 'https://image.qwenlm.ai/generated-images/60d877e7-7b03-4115-810a-ef6f4e469c8d/_result.png',
  cheesyBites: 'https://image.qwenlm.ai/generated-images/ce92af15-9f45-452a-a70d-7cd623830f05/_result.png',
  sandwich: 'https://image.qwenlm.ai/generated-images/8902548a-f427-44ac-95d9-8e2c83aa6605/_result.png',
  smashBurger: 'https://image.qwenlm.ai/generated-images/e9574915-713c-4020-b343-ff4d2023b5e9/_result.png',
  chickenHotSalsa: 'https://image.qwenlm.ai/generated-images/29490227-d337-4f9b-a29a-f7be27346953/_result.png',
  hero: 'https://image.qwenlm.ai/generated-images/d66d5cb8-70de-4121-ad94-05cdbee8396b/_result.png',
  nashville: 'https://image.qwenlm.ai/generated-images/20c87aa1-5878-42a3-a8f0-05afd247960d/_result.png',
  eggorino: 'https://image.qwenlm.ai/generated-images/d2e5d677-0fd4-48e4-923f-ea6802741085/_result.png',
  chickenKatsu: 'https://image.qwenlm.ai/generated-images/ca21fbdf-35da-41e1-915b-fc20dd681a26/_result.png',
  loadedFries: 'https://image.qwenlm.ai/generated-images/e9e84d3f-f3b6-4570-be38-38a9ed24c7d8/_result.png',
  strawberryShake: 'https://image.qwenlm.ai/generated-images/6d8d3cd6-6839-44e6-8d5a-c32ea6d724ea/_result.png',
  brownieShake: 'https://image.qwenlm.ai/generated-images/e6ea435c-91af-43af-84e0-2f2c64faf42e/_result.png',
  thaiWings: 'https://image.qwenlm.ai/generated-images/72fef177-5eb1-4c28-b5b6-8a253c1f6c9a/_result.png',
  hangoutBox: 'https://image.qwenlm.ai/generated-images/9186c292-cacb-4c73-a8d8-57c54517f745/_result.png',
  coldBrew: 'https://image.qwenlm.ai/generated-images/410b3d21-bcc9-4516-8fe1-2556d43201b5/_result.png',
  mangoLassi: 'https://image.qwenlm.ai/generated-images/46e60c32-f86a-47ed-a2f9-87c688c9e4b5/_result.png',
};

export const heroImage = IMG.hero;
export const logoUrl = 'https://images.deliveryhero.io/image/fd-bd/bd-logos/ca3ho-logo.jpg';

export const categories: Category[] = [
  { id: 'all', name: 'সব', icon: '🍽️' },
  { id: 'burgers', name: 'বার্গার', icon: '🍔' },
  { id: 'chicken', name: 'চিকেন', icon: '🍗' },
  { id: 'fries', name: 'ফ্রাইজ ও সাইডস', icon: '🍟' },
  { id: 'sandwiches', name: 'স্যান্ডউইচ', icon: '🥪' },
  { id: 'shakes', name: 'শেক ও ড্রিংকস', icon: '🥤' },
  { id: 'combos', name: 'কম্বো', icon: '📦' },
  { id: 'desserts', name: 'ডেজার্ট', icon: '🍫' },
];

export const menuItems: MenuItem[] = [
  // ===== বার্গার =====
  {
    id: 'madox-burger',
    name: 'ম্যাডক্স বার্গার',
    description: 'ডাবল স্ম্যাশ প্যাটি, আমেরিকান চিজ, আচার, স্পেশাল সস, টোস্টেড ব্রিওশ বানে',
    price: 465,
    category: 'burgers',
    image: IMG.madoxBurger,
    badge: 'বেস্টসেলার',
  },
  {
    id: 'beef-cheese-delight',
    name: 'বিফ চিজ ডিলাইট',
    description: 'রসালো বিফ প্যাটি, গলিত চিজ, ক্যারামেলাইজড পেঁয়াজ, সিগনেচার সস',
    price: 465,
    category: 'burgers',
    image: IMG.beefCheeseDelight,
    badge: 'জনপ্রিয়',
  },
  {
    id: 'smash-burger',
    name: 'স্ম্যাশ বার্গার',
    description: 'ক্লাসিক স্ম্যাশ প্যাটি, গলিত চিজ, তাজা সবজি, সিগনেচার সস',
    price: 435,
    category: 'burgers',
    image: IMG.smashBurger,
  },
  {
    id: 'nashville-burger',
    name: 'ন্যাশভিল হট চিকেন',
    description: 'ন্যাশভিল স্টাইল হট চিকেন, ট্যাঞ্জি স্পাইসি গ্লেজ, আচার, কোলসল',
    price: 425,
    category: 'burgers',
    image: IMG.nashville,
    badge: 'ঝাল 🌶️',
  },
  {
    id: 'eggorino',
    name: 'এগোরিনো',
    description: 'ডাবল লেয়ারড বার্গার, এগ মাফিন, ভেতরে চিজ, সবুজ মরিচের সাথে বিফ প্যাটি',
    price: 395,
    category: 'burgers',
    image: IMG.eggorino,
    badge: 'সিগনেচার',
  },
  {
    id: 'spicy-dhaka-crunch',
    name: 'স্পাইসি ঢাকা ক্রাঞ্চ',
    description: 'ক্রিস্পি ফ্রাইড চিকেন, দেশি চিলি সস, কোলসল, ব্রিওশ বান',
    price: 395,
    category: 'burgers',
    image: IMG.spicyCrunch,
  },
  {
    id: 'chicken-katsu',
    name: 'চিকেন কাটসু',
    description: 'ক্রিস্পি ব্রেডেড চিকেন কাটলেট, টনকাটসু সস, শ্রেডেড বাঁধাকপি, নরম বান',
    price: 385,
    category: 'burgers',
    image: IMG.chickenKatsu,
  },
  {
    id: 'beef-burger',
    name: 'ক্লাসিক বিফ বার্গার',
    description: 'ক্লাসিক বিফ প্যাটি, তাজা লেটুস, টমেটো, পেঁয়াজ, হাউস সস',
    price: 285,
    category: 'burgers',
    image: IMG.madoxBurger,
  },
  // ===== চিকেন =====
  {
    id: 'chicken-hot-salsa',
    name: 'চিকেন হট সালসা',
    description: 'স্পাইসি চিকেন, হট সালসা সসে মাখানো, তাজা ভেষজ',
    price: 195,
    category: 'chicken',
    image: IMG.chickenHotSalsa,
  },
  {
    id: 'chicken-cheese-delight',
    name: 'চিকেন চিজ ডিলাইট',
    description: 'ক্রিস্পি ফ্রাইড চিকেন, গলিত চিজ, সিগনেচার সস',
    price: 355,
    category: 'chicken',
    image: IMG.spicyCrunch,
    badge: 'জনপ্রিয়',
  },
  {
    id: 'double-the-chicken',
    name: 'ডাবল দ্য চিকেন',
    description: 'ডাবল চিকেন প্যাটি, চিজ, লেটুস, ক্রিমি সস',
    price: 435,
    category: 'chicken',
    image: IMG.chickenKatsu,
  },
  {
    id: 'chicken-supreme',
    name: 'চিকেন সুপ্রিম',
    description: 'প্রিমিয়াম গ্রিলড চিকেন, সুপ্রিম টপিংস, হার্ব মেয়ো',
    price: 515,
    category: 'chicken',
    image: IMG.sandwich,
    badge: 'প্রিমিয়াম',
  },
  {
    id: 'chicken-run',
    name: 'চিকেন রান',
    description: 'টেন্ডার ক্রিস্পি ফ্রাইড চিকেন থাই, হোয়াইট মেয়ো, গরম বানে',
    price: 175,
    category: 'chicken',
    image: IMG.nashville,
    badge: 'বাজেট পিক',
  },
  {
    id: 'thai-chili-wings',
    name: 'থাই চিলি উইংস',
    description: 'ক্রিস্পি উইংস, সুইট থাই চিলি সস, তিলের বীজ',
    price: 295,
    category: 'chicken',
    image: IMG.thaiWings,
    badge: 'ফ্যান ফেভারিট',
  },
  {
    id: 'twister',
    name: 'টুইস্টার',
    description: 'ক্রিস্পি চিকেন স্ট্রিপ, টর্টিলায় মোড়ানো, তাজা সবজি, সস',
    price: 295,
    category: 'chicken',
    image: IMG.sandwich,
  },
  // ===== ফ্রাইজ ও সাইডস =====
  {
    id: 'french-fries',
    name: 'ফ্রেঞ্চ ফ্রাইজ',
    description: 'ক্লাসিক গোল্ডেন ক্রিস্পি ফ্রাইজ, পারফেক্টলি সিজন্ড',
    price: 195,
    category: 'fries',
    image: IMG.fries,
  },
  {
    id: 'cheesy-bites',
    name: 'চিজি বাইটস',
    description: 'গোল্ডেন ক্রিস্পি চিজ বাইটস, মারিনারা ডিপিং সস',
    price: 195,
    category: 'fries',
    image: IMG.cheesyBites,
    badge: 'বেস্টসেলার',
  },
  {
    id: 'loaded-cheese-fries',
    name: 'লোডেড চিজ ফ্রাইজ',
    description: 'ক্রিস্পি ফ্রাইজ, গলিত চেডার, জালাপেনো, বেকন বিটস',
    price: 295,
    category: 'fries',
    image: IMG.loadedFries,
    badge: 'নতুন',
  },
  {
    id: 'bbq-fries',
    name: 'বিবিকিউ ফ্রাইজ',
    description: 'গোল্ডেন ফ্রাইজ, স্মোকি বিবিকিউ সিজনিং',
    price: 225,
    category: 'fries',
    image: IMG.fries,
  },
  {
    id: 'desi-fries',
    name: 'দেশি ফ্রাইজ',
    description: 'ক্রিস্পি ফ্রাইজ, স্পেশাল দেশি স্পাইস ব্লেন্ড',
    price: 215,
    category: 'fries',
    image: IMG.fries,
  },
  // ===== স্যান্ডউইচ =====
  {
    id: 'roast-chicken-sandwich',
    name: 'রোস্ট চিকেন স্যান্ডউইচ',
    description: 'টোস্টেড ব্রেড, রোস্টেড চিকেন, তাজা সবজি, মেয়ো',
    price: 210,
    category: 'sandwiches',
    image: IMG.sandwich,
  },
  {
    id: 'chicken-sandwich',
    name: 'চিকেন স্যান্ডউইচ',
    description: 'গ্রিলড চিকেন, লেটুস, টমেটো, চিজ, টোস্টেড বানে',
    price: 245,
    category: 'sandwiches',
    image: IMG.sandwich,
  },
  // ===== শেক ও ড্রিংকস =====
  {
    id: 'brownie-shake',
    name: 'ব্রাউনি শেক',
    description: 'থিক ক্রিমি মিল্কশেক, চকলেট ব্রাউনি চাঙ্কস ব্লেন্ডেড',
    price: 245,
    category: 'shakes',
    image: IMG.brownieShake,
    badge: 'বেস্টসেলার',
  },
  {
    id: 'chocolate-shake',
    name: 'চকলেট শেক',
    description: 'রিচ অ্যান্ড ক্রিমি ক্লাসিক চকলেট মিল্কশেক',
    price: 225,
    category: 'shakes',
    image: IMG.shake,
  },
  {
    id: 'strawberry-shake',
    name: 'স্ট্রবেরি শেক',
    description: 'ফ্রেশ স্ট্রবেরি মিল্কশেক, হুইপড ক্রিম টপিং',
    price: 225,
    category: 'shakes',
    image: IMG.strawberryShake,
  },
  {
    id: 'cold-brew',
    name: 'কোল্ড ব্রু',
    description: 'স্লো-ব্রুড কোল্ড কফি, স্মুথ অ্যান্ড রিফ্রেশিং',
    price: 195,
    category: 'shakes',
    image: IMG.coldBrew,
  },
  {
    id: 'mango-lassi',
    name: 'আমের লাচ্ছি',
    description: 'ফ্রেশ আম, ক্রিমি দইয়ের সাথে ব্লেন্ডেড, ক্লাসিক ফেভারিট',
    price: 175,
    category: 'shakes',
    image: IMG.mangoLassi,
  },
  {
    id: 'strawberry-lassi',
    name: 'স্ট্রবেরি লাচ্ছি',
    description: 'ফ্রেশ স্ট্রবেরি, ক্রিমি দইয়ের সাথে ব্লেন্ডেড',
    price: 175,
    category: 'shakes',
    image: IMG.strawberryShake,
  },
  // ===== কম্বো =====
  {
    id: 'hangout-box',
    name: 'হ্যাংআউট বক্স',
    description: 'আপনার পছন্দের বার্গার + ফ্রাইজ + ড্রিংক — আল্টিমেট কম্বো',
    price: 595,
    category: 'combos',
    image: IMG.hangoutBox,
    badge: 'ভ্যালু ডিল',
  },
  {
    id: 'delightful-combo',
    name: 'ডিলাইটফুল কম্বো (বিফ)',
    description: 'বিফ চিজ ডিলাইট + ফ্রেঞ্চ ফ্রাইজ + ব্রাউনি শেক',
    price: 695,
    category: 'combos',
    image: IMG.hangoutBox,
    badge: 'বেস্ট ভ্যালু',
  },
  // ===== ডেজার্ট =====
  {
    id: 'chocolate-brownie',
    name: 'চকলেট ব্রাউনি',
    description: 'ওয়ার্ম ফাজি চকলেট ব্রাউনি, রিচ অ্যান্ড ইনডালজেন্ট',
    price: 150,
    category: 'desserts',
    image: IMG.brownieShake,
  },
  {
    id: 'brookie',
    name: 'ব্রুকি',
    description: 'অর্ধেক ব্রাউনি, অর্ধেক কুকি — দুটোর সেরা',
    price: 175,
    category: 'desserts',
    image: IMG.cheesyBites,
    badge: 'নতুন',
  },
];
