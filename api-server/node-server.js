/**
 * Node.js Express API Server for Food Slot Machine
 * 
 * This server serves food data to the slot machine application.
 * It includes CORS support and serves data from a JSON array.
 * 
 * Usage:
 *   npm install express cors
 *   node node-server.js
 * 
 * The server will start on http://localhost:8001
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Sample food data
const FOODS_DATA = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=800&fit=crop",
        description: "Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil.",
        price: "$16.00",
        restaurant: "The Golden Spoon",
        stars: 4.5,
        cuisine: "Italian",
        ply_path: "/splats/pizza.ply"
    },
    {
        id: 2,
        name: "Spicy Ramen",
        category: "Noodles",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=800&fit=crop",
        description: "Rich tonkotsu broth with handmade noodles, tender chashu pork, and soft-boiled egg.",
        price: "$18.00",
        restaurant: "Urban Eats",
        stars: 4.7,
        cuisine: "Japanese"
    },
    {
        id: 3,
        name: "Classic Cheeseburger",
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop",
        description: "Juicy Angus beef patty, aged cheddar, lettuce, tomato, and special sauce.",
        price: "$15.50",
        restaurant: "Flavor Street",
        stars: 4.6,
        cuisine: "American"
    },
    {
        id: 4,
        name: "Sushi Platter",
        category: "Sushi",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=800&fit=crop",
        description: "Chef's selection featuring salmon nigiri, tuna rolls, and California rolls.",
        price: "$28.00",
        restaurant: "Taste Haven",
        stars: 4.8,
        cuisine: "Japanese"
    },
    {
        id: 5,
        name: "Caesar Salad",
        category: "Salads",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=800&fit=crop",
        description: "Crisp romaine lettuce with house-made Caesar dressing and Parmesan.",
        price: "$12.00",
        restaurant: "Gourmet Corner",
        stars: 4.3,
        cuisine: "American"
    },
    {
        id: 6,
        name: "Pad Thai",
        category: "Thai",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=800&fit=crop",
        description: "Stir-fried rice noodles with shrimp, tofu, and tamarind sauce.",
        price: "$14.50",
        restaurant: "The Spice Route",
        stars: 4.6,
        cuisine: "Thai"
    },
    {
        id: 7,
        name: "Chicken Tikka Masala",
        category: "Indian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=800&fit=crop",
        description: "Tender chicken in rich, creamy tomato curry sauce.",
        price: "$16.50",
        restaurant: "The Spice Route",
        stars: 4.7,
        cuisine: "Indian"
    },
    {
        id: 8,
        name: "Beef Tacos",
        category: "Mexican",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=800&fit=crop",
        description: "Soft corn tortillas with seasoned beef, salsa, and guacamole.",
        price: "$13.00",
        restaurant: "Flavor Street",
        stars: 4.5,
        cuisine: "Mexican"
    },
    {
        id: 9,
        name: "Chocolate Lava Cake",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&h=800&fit=crop",
        description: "Decadent chocolate cake with molten center and vanilla ice cream.",
        price: "$9.00",
        restaurant: "The Chef's Table",
        stars: 4.9,
        cuisine: "French"
    },
    {
        id: 10,
        name: "Greek Gyro",
        category: "Mediterranean",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&h=800&fit=crop",
        description: "Warm pita with seasoned lamb, tzatziki, and fresh vegetables.",
        price: "$11.50",
        restaurant: "Delicious Moments",
        stars: 4.4,
        cuisine: "Greek"
    }
];

// Home endpoint
app.get('/', (req, res) => {
    res.json({
        message: "Food Slot Machine API Server",
        version: "1.0.0",
        endpoints: {
            "/api/v1/foods": "Get all food items",
            "/api/v1/foods/:id": "Get food item by ID",
            "/api/v1/splats": "Get all food items (alias)",
            "/api/v1/random": "Get random food items",
            "/health": "Health check"
        }
    });
});

// Get all foods with optional filtering
app.get('/api/v1/foods', (req, res) => {
    const { category, cuisine } = req.query;
    
    let filteredFoods = FOODS_DATA;
    
    if (category) {
        filteredFoods = filteredFoods.filter(f => 
            f.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    if (cuisine) {
        filteredFoods = filteredFoods.filter(f => 
            f.cuisine && f.cuisine.toLowerCase() === cuisine.toLowerCase()
        );
    }
    
    res.json(filteredFoods);
});

// Get food by ID
app.get('/api/v1/foods/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const food = FOODS_DATA.find(f => f.id === id);
    
    if (food) {
        res.json(food);
    } else {
        res.status(404).json({ error: "Food item not found" });
    }
});

// Alias for compatibility with feastfind3d
app.get('/api/v1/splats', (req, res) => {
    res.json(FOODS_DATA);
});

// Get random foods
app.get('/api/v1/random', (req, res) => {
    const count = Math.min(parseInt(req.query.count) || 3, FOODS_DATA.length);
    
    // Shuffle and get random items
    const shuffled = [...FOODS_DATA].sort(() => 0.5 - Math.random());
    const randomFoods = shuffled.slice(0, count);
    
    res.json(randomFoods);
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: "healthy",
        total_items: FOODS_DATA.length
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🎰 Food Slot Machine API Server');
    console.log('='.repeat(60));
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Serving ${FOODS_DATA.length} food items`);
    console.log('\nAvailable endpoints:');
    console.log(`  - http://localhost:${PORT}/`);
    console.log(`  - http://localhost:${PORT}/api/v1/foods`);
    console.log(`  - http://localhost:${PORT}/api/v1/splats`);
    console.log(`  - http://localhost:${PORT}/api/v1/random`);
    console.log(`  - http://localhost:${PORT}/health`);
    console.log('\nPress Ctrl+C to stop the server');
    console.log('='.repeat(60));
});
