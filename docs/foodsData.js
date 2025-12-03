/**
 * Food Database for Slot Machine
 * 
 * This is a simplified version of the food data from feastfind3d
 * Adapted for the Food Slot Machine application
 */

// Restaurant name generator helper
const restaurants = [
  "The Golden Spoon",
  "Urban Eats",
  "Flavor Street",
  "Culinary Canvas",
  "The Food Lab",
  "Taste Haven",
  "Gourmet Corner",
  "The Chef's Table",
  "Delicious Moments",
  "Foodie Paradise",
  "The Kitchen",
  "Savory Bites",
  "Epic Eats",
  "The Dining Room",
  "Food Street",
  "Taste Makers",
  "The Spice Route",
  "Fresh & Fast",
  "The Grill House",
  "Flavor Town"
];

/**
 * Generates random rating between min and max
 */
const generateRating = (min = 4.0, max = 5.0) => {
  return Number((Math.random() * (max - min) + min).toFixed(1));
};

/**
 * Generates a random discount percentage
 */
const generateDiscount = (mean = 10, stdDev = 10) => {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const discount = mean + z * stdDev;

  if (discount <= 0) return 0;
  return Math.min(Math.round(discount), 90);
};

/**
 * Generates discount data for a food item
 */
const generateDiscountData = (discountMean = 10, discountStd = 10, validHours = 12) => {
  const percentage = generateDiscount(discountMean, discountStd);

  if (percentage === 0) return null;

  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + validHours);

  return {
    percentage,
    expiryTime: expiryTime.toISOString(),
    validHours
  };
};

/**
 * Main food data array
 */
const foodsDataFromFile = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=800&fit=crop",
    description: "Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil on a wood-fired thin crust.",
    price: "$16.00",
    restaurant: restaurants[0],
    stars: generateRating(),
    cuisine: "Italian",
    discount: generateDiscountData(15, 8, 12)
  },
  {
    id: 2,
    name: "Spicy Ramen",
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=800&fit=crop",
    description: "Rich tonkotsu broth with handmade noodles, tender chashu pork, soft-boiled egg, and a perfect blend of spices.",
    price: "$18.00",
    restaurant: restaurants[1],
    stars: generateRating(),
    cuisine: "Japanese",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 3,
    name: "Classic Cheeseburger",
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop",
    description: "Juicy Angus beef patty, aged cheddar, crisp lettuce, tomato, pickles, and special sauce on a toasted brioche bun.",
    price: "$15.50",
    restaurant: restaurants[2],
    stars: generateRating(),
    cuisine: "American",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 4,
    name: "Caesar Salad",
    category: "Salads",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=800&fit=crop",
    description: "Crisp romaine lettuce, house-made Caesar dressing, garlic croutons, and fresh shaved Parmesan cheese.",
    price: "$12.00",
    restaurant: restaurants[3],
    stars: generateRating(),
    cuisine: "American",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 5,
    name: "Pad Thai",
    category: "Thai",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=800&fit=crop",
    description: "Stir-fried rice noodles with shrimp, tofu, crushed peanuts, bean sprouts, and tamarind sauce.",
    price: "$14.50",
    restaurant: restaurants[3],
    stars: generateRating(),
    cuisine: "Thai",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 6,
    name: "Sushi Platter",
    category: "Sushi",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=800&fit=crop",
    description: "Chef's selection featuring salmon nigiri, tuna rolls, California rolls, and specialty handrolls.",
    price: "$28.00",
    restaurant: restaurants[4],
    stars: generateRating(),
    cuisine: "Japanese",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 7,
    name: "Chicken Tikka Masala",
    category: "Indian",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=800&fit=crop",
    description: "Tender chicken pieces in a rich, creamy tomato-based curry sauce with aromatic spices. Served with basmati rice.",
    price: "$16.50",
    restaurant: restaurants[5],
    stars: generateRating(),
    cuisine: "Indian",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 8,
    name: "Beef Tacos",
    category: "Mexican",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=800&fit=crop",
    description: "Three soft corn tortillas filled with seasoned ground beef, fresh salsa, guacamole, and cilantro.",
    price: "$13.00",
    restaurant: restaurants[6],
    stars: generateRating(),
    cuisine: "Mexican",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 9,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&h=800&fit=crop",
    description: "Decadent chocolate cake with a molten chocolate center. Served warm with vanilla ice cream.",
    price: "$9.00",
    restaurant: restaurants[7],
    stars: generateRating(),
    cuisine: "French",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 10,
    name: "Greek Gyro",
    category: "Mediterranean",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&h=800&fit=crop",
    description: "Warm pita bread filled with seasoned lamb, tzatziki sauce, tomatoes, onions, and fresh lettuce.",
    price: "$11.50",
    restaurant: restaurants[8],
    stars: generateRating(),
    cuisine: "Greek",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 11,
    name: "Pho Bo",
    category: "Vietnamese",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=800&fit=crop",
    description: "Traditional Vietnamese beef noodle soup with rice noodles, tender beef slices, and fresh herbs.",
    price: "$14.00",
    restaurant: restaurants[9],
    stars: generateRating(),
    cuisine: "Vietnamese",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 12,
    name: "BBQ Ribs",
    category: "BBQ",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=800&fit=crop",
    description: "Slow-cooked pork ribs with house-made BBQ sauce, served with coleslaw and cornbread.",
    price: "$24.00",
    restaurant: restaurants[10],
    stars: generateRating(),
    cuisine: "American",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 13,
    name: "Falafel Wrap",
    category: "Mediterranean",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=800&fit=crop",
    description: "Crispy falafel balls wrapped in warm flatbread with hummus, tahini, and fresh vegetables.",
    price: "$10.50",
    restaurant: restaurants[11],
    stars: generateRating(),
    cuisine: "Middle Eastern",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 14,
    name: "Lobster Roll",
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1612625173225-ddfbf6faa5fa?w=800&h=800&fit=crop",
    description: "Fresh Maine lobster meat on a buttered, toasted roll with a touch of mayo and lemon.",
    price: "$32.00",
    restaurant: restaurants[12],
    stars: generateRating(),
    cuisine: "American",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 15,
    name: "Mushroom Risotto",
    category: "Italian",
    image: "https://images.unsplash.com/photo-1476124369491-b79165a3c7e7?w=800&h=800&fit=crop",
    description: "Creamy Arborio rice cooked with porcini mushrooms, white wine, and Parmesan cheese.",
    price: "$19.00",
    restaurant: restaurants[13],
    stars: generateRating(),
    cuisine: "Italian",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 16,
    name: "Fish and Chips",
    category: "British",
    image: "https://images.unsplash.com/photo-1580217593608-61931cefc3df?w=800&h=800&fit=crop",
    description: "Beer-battered cod fillet with crispy chips, tartar sauce, and mushy peas.",
    price: "$17.00",
    restaurant: restaurants[14],
    stars: generateRating(),
    cuisine: "British",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 17,
    name: "Bibimbap",
    category: "Korean",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&h=800&fit=crop",
    description: "Korean rice bowl topped with seasoned vegetables, beef, fried egg, and gochujang sauce.",
    price: "$15.50",
    restaurant: restaurants[15],
    stars: generateRating(),
    cuisine: "Korean",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 18,
    name: "Croissant",
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=800&fit=crop",
    description: "Buttery, flaky French pastry, freshly baked and served warm.",
    price: "$4.50",
    restaurant: restaurants[16],
    stars: generateRating(),
    cuisine: "French",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 19,
    name: "Chicken Wings",
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&h=800&fit=crop",
    description: "Crispy chicken wings tossed in your choice of Buffalo, BBQ, or honey garlic sauce.",
    price: "$13.50",
    restaurant: restaurants[17],
    stars: generateRating(),
    cuisine: "American",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 20,
    name: "Tiramisu",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=800&fit=crop",
    description: "Classic Italian dessert with espresso-soaked ladyfingers layered with mascarpone cream.",
    price: "$8.50",
    restaurant: restaurants[18],
    stars: generateRating(),
    cuisine: "Italian",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 21,
    name: "Poke Bowl",
    category: "Hawaiian",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop",
    description: "Fresh ahi tuna with rice, edamame, seaweed salad, and sesame soy dressing.",
    price: "$16.00",
    restaurant: restaurants[19],
    stars: generateRating(),
    cuisine: "Hawaiian",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 22,
    name: "Pepperoni Pizza",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=800&fit=crop",
    description: "Classic pizza loaded with mozzarella cheese and premium pepperoni slices.",
    price: "$17.50",
    restaurant: restaurants[0],
    stars: generateRating(),
    cuisine: "Italian",
    discount: generateDiscountData(15, 8, 12)
  },
  {
    id: 23,
    name: "Salmon Teriyaki",
    category: "Japanese",
    image: "https://images.unsplash.com/photo-1580959375944-d269bbc956b2?w=800&h=800&fit=crop",
    description: "Grilled salmon fillet glazed with teriyaki sauce, served with steamed rice and vegetables.",
    price: "$22.00",
    restaurant: restaurants[1],
    stars: generateRating(),
    cuisine: "Japanese",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 24,
    name: "Shrimp Scampi",
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=800&h=800&fit=crop",
    description: "Succulent shrimp sautéed in garlic butter and white wine, served over linguine pasta.",
    price: "$21.00",
    restaurant: restaurants[2],
    stars: generateRating(),
    cuisine: "Italian",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 25,
    name: "Veggie Burger",
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&h=800&fit=crop",
    description: "Plant-based patty with lettuce, tomato, avocado, and special sauce on a whole wheat bun.",
    price: "$14.00",
    restaurant: restaurants[3],
    stars: generateRating(),
    cuisine: "American",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 26,
    name: "Tom Yum Soup",
    category: "Thai",
    image: "https://images.unsplash.com/photo-1604908815604-a2d6baa0a45f?w=800&h=800&fit=crop",
    description: "Spicy and sour Thai soup with shrimp, mushrooms, lemongrass, and kaffir lime leaves.",
    price: "$13.00",
    restaurant: restaurants[4],
    stars: generateRating(),
    cuisine: "Thai",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 27,
    name: "Beef Wellington",
    category: "Fine Dining",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&h=800&fit=crop",
    description: "Tender beef fillet coated with mushroom duxelles and wrapped in golden puff pastry.",
    price: "$42.00",
    restaurant: restaurants[5],
    stars: generateRating(),
    cuisine: "British",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 28,
    name: "Churros",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&h=800&fit=crop",
    description: "Crispy fried dough pastries dusted with cinnamon sugar, served with chocolate dipping sauce.",
    price: "$7.50",
    restaurant: restaurants[6],
    stars: generateRating(),
    cuisine: "Spanish",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 29,
    name: "Caprese Salad",
    category: "Salads",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&h=800&fit=crop",
    description: "Fresh mozzarella, ripe tomatoes, and basil leaves drizzled with balsamic glaze and olive oil.",
    price: "$11.00",
    restaurant: restaurants[7],
    stars: generateRating(),
    cuisine: "Italian",
    discount: generateDiscountData(10, 10, 12)
  },
  {
    id: 30,
    name: "Eggs Benedict",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&h=800&fit=crop",
    description: "Poached eggs on English muffins with Canadian bacon, topped with hollandaise sauce.",
    price: "$14.50",
    restaurant: restaurants[8],
    stars: generateRating(),
    cuisine: "American",
    discount: generateDiscountData(10, 10, 12)
  }
];

// Export for use in app.js
window.foodsDataFromFile = foodsDataFromFile;
