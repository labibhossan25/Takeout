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

// All unique food images
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
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'chicken', name: 'Chicken', icon: '🍗' },
  { id: 'fries', name: 'Fries & Sides', icon: '🍟' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
  { id: 'shakes', name: 'Shakes & Drinks', icon: '🥤' },
  { id: 'combos', name: 'Combos', icon: '📦' },
  { id: 'desserts', name: 'Desserts', icon: '🍫' },
];

export const menuItems: MenuItem[] = [
  // ===== BURGERS =====
  {
    id: 'madox-burger',
    name: 'Madox Burger',
    description: 'Double smash patty, American cheese, pickles, special sauce on toasted brioche',
    price: 465,
    category: 'burgers',
    image: IMG.madoxBurger,
    badge: 'Bestseller',
  },
  {
    id: 'beef-cheese-delight',
    name: 'Beef Cheese Delight',
    description: 'Juicy beef patty, melted cheese, caramelised onions, signature sauce',
    price: 465,
    category: 'burgers',
    image: IMG.beefCheeseDelight,
    badge: 'Popular',
  },
  {
    id: 'smash-burger',
    name: 'Smash Burger',
    description: 'Classic smash patty with melted cheese, fresh veggies, signature sauce',
    price: 435,
    category: 'burgers',
    image: IMG.smashBurger,
  },
  {
    id: 'nashville-burger',
    name: 'Nashville Hot Chicken',
    description: 'Nashville-style hot chicken, tangy spicy glaze, pickles, coleslaw',
    price: 425,
    category: 'burgers',
    image: IMG.nashville,
    badge: 'Spicy 🌶️',
  },
  {
    id: 'eggorino',
    name: 'Eggorino',
    description: 'Double-layered burger with egg muffin, cheese inside, beef patty with green chilis',
    price: 395,
    category: 'burgers',
    image: IMG.eggorino,
    badge: 'Signature',
  },
  {
    id: 'spicy-dhaka-crunch',
    name: 'Spicy Dhaka Crunch',
    description: 'Crispy fried chicken, desi chili sauce, coleslaw, brioche bun',
    price: 395,
    category: 'burgers',
    image: IMG.spicyCrunch,
  },
  {
    id: 'chicken-katsu',
    name: 'Chicken Katsu',
    description: 'Crispy breaded chicken cutlet, tonkatsu sauce, shredded cabbage, soft bun',
    price: 385,
    category: 'burgers',
    image: IMG.chickenKatsu,
  },
  {
    id: 'beef-burger',
    name: 'Classic Beef Burger',
    description: 'Classic beef patty with fresh lettuce, tomato, onion, house sauce',
    price: 285,
    category: 'burgers',
    image: IMG.madoxBurger,
  },
  // ===== CHICKEN =====
  {
    id: 'chicken-hot-salsa',
    name: 'Chicken Hot Salsa',
    description: 'Spicy chicken tossed in hot salsa sauce with fresh herbs',
    price: 195,
    category: 'chicken',
    image: IMG.chickenHotSalsa,
  },
  {
    id: 'chicken-cheese-delight',
    name: 'Chicken Cheese Delight',
    description: 'Crispy fried chicken with melted cheese and signature sauce',
    price: 355,
    category: 'chicken',
    image: IMG.spicyCrunch,
    badge: 'Popular',
  },
  {
    id: 'double-the-chicken',
    name: 'Double the Chicken',
    description: 'Double chicken patty with cheese, lettuce, and creamy sauce',
    price: 435,
    category: 'chicken',
    image: IMG.chickenKatsu,
  },
  {
    id: 'chicken-supreme',
    name: 'Chicken Supreme',
    description: 'Premium grilled chicken with supreme toppings and herb mayo',
    price: 515,
    category: 'chicken',
    image: IMG.sandwich,
    badge: 'Premium',
  },
  {
    id: 'chicken-run',
    name: 'Chicken RUN',
    description: 'Tender crispy fried chicken thigh with white mayo in warm bun',
    price: 175,
    category: 'chicken',
    image: IMG.nashville,
    badge: 'Budget Pick',
  },
  {
    id: 'thai-chili-wings',
    name: 'Thai Chili Wings',
    description: 'Crispy wings tossed in sweet Thai chili sauce, sesame seeds',
    price: 295,
    category: 'chicken',
    image: IMG.thaiWings,
    badge: 'Fan Favorite',
  },
  {
    id: 'twister',
    name: 'Twister',
    description: 'Crispy chicken strip wrapped in tortilla with fresh veggies and sauce',
    price: 295,
    category: 'chicken',
    image: IMG.sandwich,
  },
  // ===== FRIES & SIDES =====
  {
    id: 'french-fries',
    name: 'French Fries',
    description: 'Classic golden crispy fries, perfectly seasoned',
    price: 195,
    category: 'fries',
    image: IMG.fries,
  },
  {
    id: 'cheesy-bites',
    name: 'Cheesy Bites',
    description: 'Golden crispy cheese bites with marinara dipping sauce',
    price: 195,
    category: 'fries',
    image: IMG.cheesyBites,
    badge: 'Bestseller',
  },
  {
    id: 'loaded-cheese-fries',
    name: 'Loaded Cheese Fries',
    description: 'Crispy fries loaded with melted cheddar, jalapeños, bacon bits',
    price: 295,
    category: 'fries',
    image: IMG.loadedFries,
    badge: 'New',
  },
  {
    id: 'bbq-fries',
    name: 'BBQ Fries',
    description: 'Golden fries tossed in smoky BBQ seasoning',
    price: 225,
    category: 'fries',
    image: IMG.fries,
  },
  {
    id: 'desi-fries',
    name: 'Desi Fries',
    description: 'Crispy fries with special desi spice blend',
    price: 215,
    category: 'fries',
    image: IMG.fries,
  },
  // ===== SANDWICHES =====
  {
    id: 'roast-chicken-sandwich',
    name: 'Roast Chicken Sandwich',
    description: 'Toasted bread with roasted chicken, fresh veggies, and mayo',
    price: 210,
    category: 'sandwiches',
    image: IMG.sandwich,
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    description: 'Grilled chicken with lettuce, tomato, cheese on toasted bun',
    price: 245,
    category: 'sandwiches',
    image: IMG.sandwich,
  },
  // ===== SHAKES & DRINKS =====
  {
    id: 'brownie-shake',
    name: 'Brownie Shake',
    description: 'Thick creamy milkshake blended with chocolate brownie chunks',
    price: 245,
    category: 'shakes',
    image: IMG.brownieShake,
    badge: 'Bestseller',
  },
  {
    id: 'chocolate-shake',
    name: 'Chocolate Shake',
    description: 'Rich and creamy classic chocolate milkshake',
    price: 225,
    category: 'shakes',
    image: IMG.shake,
  },
  {
    id: 'strawberry-shake',
    name: 'Strawberry Shake',
    description: 'Fresh strawberry milkshake with whipped cream topping',
    price: 225,
    category: 'shakes',
    image: IMG.strawberryShake,
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Slow-brewed cold coffee, smooth and refreshing',
    price: 195,
    category: 'shakes',
    image: IMG.coldBrew,
  },
  {
    id: 'mango-lassi',
    name: 'Mango Lassi',
    description: 'Fresh mango blended with creamy yogurt, a classic favorite',
    price: 175,
    category: 'shakes',
    image: IMG.mangoLassi,
  },
  {
    id: 'strawberry-lassi',
    name: 'Strawberry Lassi',
    description: 'Fresh strawberry blended with creamy yogurt',
    price: 175,
    category: 'shakes',
    image: IMG.strawberryShake,
  },
  // ===== COMBOS =====
  {
    id: 'hangout-box',
    name: 'Hangout Box',
    description: 'Your choice of burger + fries + drink — the ultimate combo',
    price: 595,
    category: 'combos',
    image: IMG.hangoutBox,
    badge: 'Value Deal',
  },
  {
    id: 'delightful-combo',
    name: 'Delightful Combo (Beef)',
    description: 'Beef Cheese Delight + French Fries + Brownie Shake',
    price: 695,
    category: 'combos',
    image: IMG.hangoutBox,
    badge: 'Best Value',
  },
  // ===== DESSERTS =====
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    description: 'Warm fudgy chocolate brownie, rich and indulgent',
    price: 150,
    category: 'desserts',
    image: IMG.brownieShake,
  },
  {
    id: 'brookie',
    name: 'Brookie',
    description: 'Half brownie, half cookie — the best of both worlds',
    price: 175,
    category: 'desserts',
    image: IMG.cheesyBites,
    badge: 'New',
  },
];
