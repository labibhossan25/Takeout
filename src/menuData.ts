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

// Image URLs from generated images
const IMAGES = {
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
};

export const heroImage = IMAGES.hero;

export const categories: Category[] = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'chicken', name: 'Chicken', icon: '🍗' },
  { id: 'fries', name: 'Fries & Sides', icon: '🍟' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
  { id: 'shakes', name: 'Shakes & Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍫' },
];

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: 'madox-burger',
    name: 'Madox Burger',
    description: 'Double smash patty, American cheese, pickles, special sauce',
    price: 465,
    category: 'burgers',
    image: IMAGES.madoxBurger,
    badge: 'Bestseller',
  },
  {
    id: 'beef-cheese-delight',
    name: 'Beef Cheese Delight',
    description: 'Juicy beef patty, melted cheese, caramelised onions, signature sauce',
    price: 465,
    category: 'burgers',
    image: IMAGES.beefCheeseDelight,
    badge: 'Popular',
  },
  {
    id: 'smash-burger',
    name: 'Smash Burger',
    description: 'Classic smash patty with melted cheese, fresh veggies, signature sauce',
    price: 435,
    category: 'burgers',
    image: IMAGES.smashBurger,
  },
  {
    id: 'spicy-dhaka-crunch',
    name: 'Spicy Dhaka Crunch',
    description: 'Crispy fried chicken, desi chili sauce, coleslaw, brioche bun',
    price: 395,
    category: 'burgers',
    image: IMAGES.spicyCrunch,
    badge: 'Spicy 🌶️',
  },
  {
    id: 'beef-burger',
    name: 'Beef Burger',
    description: 'Classic beef patty with fresh lettuce, tomato, onion, house sauce',
    price: 285,
    category: 'burgers',
    image: IMAGES.madoxBurger,
  },
  {
    id: 'veggie-royale',
    name: 'Veggie Royale',
    description: 'Seasoned veggie patty, fresh lettuce, tomato, herb mayo',
    price: 295,
    category: 'burgers',
    image: IMAGES.smashBurger,
  },
  // Chicken
  {
    id: 'chicken-hot-salsa',
    name: 'Chicken Hot Salsa',
    description: 'Spicy chicken tossed in hot salsa sauce with fresh herbs',
    price: 195,
    category: 'chicken',
    image: IMAGES.chickenHotSalsa,
  },
  {
    id: 'chicken-cheese-delight',
    name: 'Chicken Cheese Delight',
    description: 'Crispy fried chicken with melted cheese and signature sauce',
    price: 355,
    category: 'chicken',
    image: IMAGES.spicyCrunch,
    badge: 'Popular',
  },
  {
    id: 'double-the-chicken',
    name: 'Double the Chicken',
    description: 'Double chicken patty with cheese, lettuce, and creamy sauce',
    price: 435,
    category: 'chicken',
    image: IMAGES.madoxBurger,
  },
  {
    id: 'chicken-supreme',
    name: 'Chicken Supreme',
    description: 'Premium grilled chicken with supreme toppings and herb mayo',
    price: 515,
    category: 'chicken',
    image: IMAGES.sandwich,
    badge: 'Premium',
  },
  {
    id: 'chicken-run',
    name: 'Chicken RUN',
    description: 'Tender crispy fried chicken thigh with white mayo in warm bun',
    price: 175,
    category: 'chicken',
    image: IMAGES.spicyCrunch,
    badge: 'Pocket Friendly',
  },
  {
    id: 'twister',
    name: 'Twister',
    description: 'Crispy chicken strip wrapped in tortilla with fresh veggies and sauce',
    price: 295,
    category: 'chicken',
    image: IMAGES.sandwich,
  },
  // Fries & Sides
  {
    id: 'french-fries',
    name: 'French Fries',
    description: 'Classic golden crispy fries, perfectly seasoned',
    price: 195,
    category: 'fries',
    image: IMAGES.fries,
  },
  {
    id: 'cheesy-bites',
    name: 'Cheesy Bites',
    description: 'Golden crispy cheese bites with marinara dipping sauce',
    price: 195,
    category: 'fries',
    image: IMAGES.cheesyBites,
    badge: 'Bestseller',
  },
  {
    id: 'cheese-fries',
    name: 'Cheese Fries',
    description: 'Crispy fries loaded with melted cheese sauce',
    price: 245,
    category: 'fries',
    image: IMAGES.fries,
  },
  {
    id: 'bbq-fries',
    name: 'BBQ Fries',
    description: 'Golden fries tossed in smoky BBQ seasoning',
    price: 225,
    category: 'fries',
    image: IMAGES.fries,
  },
  {
    id: 'desi-fries',
    name: 'Desi Fries',
    description: 'Crispy fries with special desi spice blend',
    price: 215,
    category: 'fries',
    image: IMAGES.fries,
  },
  // Sandwiches
  {
    id: 'roast-chicken-sandwich',
    name: 'Roast Chicken Sandwich',
    description: 'Toasted bread with roasted chicken, fresh veggies, and mayo',
    price: 210,
    category: 'sandwiches',
    image: IMAGES.sandwich,
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    description: 'Grilled chicken with lettuce, tomato, cheese on toasted bun',
    price: 245,
    category: 'sandwiches',
    image: IMAGES.sandwich,
  },
  // Shakes & Drinks
  {
    id: 'brownie-shake',
    name: 'Brownie Shake',
    description: 'Thick creamy milkshake blended with chocolate brownie chunks',
    price: 245,
    category: 'shakes',
    image: IMAGES.shake,
    badge: 'Bestseller',
  },
  {
    id: 'chocolate-shake',
    name: 'Chocolate Shake',
    description: 'Rich and creamy classic chocolate milkshake',
    price: 225,
    category: 'shakes',
    image: IMAGES.shake,
  },
  {
    id: 'vanilla-shake',
    name: 'Vanilla Shake',
    description: 'Smooth and creamy vanilla bean milkshake',
    price: 225,
    category: 'shakes',
    image: IMAGES.shake,
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Slow-brewed cold coffee, smooth and refreshing',
    price: 195,
    category: 'shakes',
    image: IMAGES.shake,
  },
  {
    id: 'mango-lassi',
    name: 'Mango Lassi',
    description: 'Fresh mango blended with creamy yogurt, a classic favorite',
    price: 175,
    category: 'shakes',
    image: IMAGES.shake,
  },
  {
    id: 'strawberry-lassi',
    name: 'Strawberry Lassi',
    description: 'Fresh strawberry blended with creamy yogurt',
    price: 175,
    category: 'shakes',
    image: IMAGES.shake,
  },
  // Desserts
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    description: 'Warm fudgy chocolate brownie, rich and indulgent',
    price: 150,
    category: 'desserts',
    image: IMAGES.cheesyBites,
  },
  {
    id: 'brookie',
    name: 'Brookie',
    description: 'Half brownie, half cookie — the best of both worlds',
    price: 175,
    category: 'desserts',
    image: IMAGES.cheesyBites,
    badge: 'New',
  },
];
