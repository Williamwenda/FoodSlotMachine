#!/usr/bin/env python3
"""
Simple Flask API Server for Food Slot Machine

This server serves food data to the slot machine application.
It includes CORS support and serves data from a JSON file or Python list.

Usage:
    python simple-server.py

The server will start on http://localhost:8001
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample food data (you can replace this with data from a file or database)
FOODS_DATA = [
    {
        "id": 1,
        "name": "Margherita Pizza",
        "category": "Pizza",
        "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=800&fit=crop",
        "description": "Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil.",
        "price": "$16.00",
        "restaurant": "The Golden Spoon",
        "stars": 4.5,
        "cuisine": "Italian",
        "ply_path": "/splats/pizza.ply"
    },
    {
        "id": 2,
        "name": "Spicy Ramen",
        "category": "Noodles",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=800&fit=crop",
        "description": "Rich tonkotsu broth with handmade noodles, tender chashu pork, and soft-boiled egg.",
        "price": "$18.00",
        "restaurant": "Urban Eats",
        "stars": 4.7,
        "cuisine": "Japanese"
    },
    {
        "id": 3,
        "name": "Classic Cheeseburger",
        "category": "Burgers",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop",
        "description": "Juicy Angus beef patty, aged cheddar, lettuce, tomato, and special sauce.",
        "price": "$15.50",
        "restaurant": "Flavor Street",
        "stars": 4.6,
        "cuisine": "American"
    },
    {
        "id": 4,
        "name": "Sushi Platter",
        "category": "Sushi",
        "image": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=800&fit=crop",
        "description": "Chef's selection featuring salmon nigiri, tuna rolls, and California rolls.",
        "price": "$28.00",
        "restaurant": "Taste Haven",
        "stars": 4.8,
        "cuisine": "Japanese"
    },
    {
        "id": 5,
        "name": "Caesar Salad",
        "category": "Salads",
        "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=800&fit=crop",
        "description": "Crisp romaine lettuce with house-made Caesar dressing and Parmesan.",
        "price": "$12.00",
        "restaurant": "Gourmet Corner",
        "stars": 4.3,
        "cuisine": "American"
    },
    {
        "id": 6,
        "name": "Pad Thai",
        "category": "Thai",
        "image": "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=800&fit=crop",
        "description": "Stir-fried rice noodles with shrimp, tofu, and tamarind sauce.",
        "price": "$14.50",
        "restaurant": "The Spice Route",
        "stars": 4.6,
        "cuisine": "Thai"
    },
    {
        "id": 7,
        "name": "Chicken Tikka Masala",
        "category": "Indian",
        "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=800&fit=crop",
        "description": "Tender chicken in rich, creamy tomato curry sauce.",
        "price": "$16.50",
        "restaurant": "The Spice Route",
        "stars": 4.7,
        "cuisine": "Indian"
    },
    {
        "id": 8,
        "name": "Beef Tacos",
        "category": "Mexican",
        "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=800&fit=crop",
        "description": "Soft corn tortillas with seasoned beef, salsa, and guacamole.",
        "price": "$13.00",
        "restaurant": "Flavor Street",
        "stars": 4.5,
        "cuisine": "Mexican"
    },
    {
        "id": 9,
        "name": "Chocolate Lava Cake",
        "category": "Desserts",
        "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&h=800&fit=crop",
        "description": "Decadent chocolate cake with molten center and vanilla ice cream.",
        "price": "$9.00",
        "restaurant": "The Chef's Table",
        "stars": 4.9,
        "cuisine": "French"
    },
    {
        "id": 10,
        "name": "Greek Gyro",
        "category": "Mediterranean",
        "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&h=800&fit=crop",
        "description": "Warm pita with seasoned lamb, tzatziki, and fresh vegetables.",
        "price": "$11.50",
        "restaurant": "Delicious Moments",
        "stars": 4.4,
        "cuisine": "Greek"
    }
]


@app.route('/')
def home():
    """Home endpoint with API information"""
    return jsonify({
        "message": "Food Slot Machine API Server",
        "version": "1.0.0",
        "endpoints": {
            "/api/v1/foods": "Get all food items",
            "/api/v1/foods/<id>": "Get food item by ID",
            "/api/v1/splats": "Get all food items (alias)",
            "/api/v1/random": "Get random food items"
        }
    })


@app.route('/api/v1/foods', methods=['GET'])
def get_foods():
    """Get all food items with optional filtering"""
    category = request.args.get('category')
    cuisine = request.args.get('cuisine')
    
    filtered_foods = FOODS_DATA
    
    if category:
        filtered_foods = [f for f in filtered_foods if f.get('category', '').lower() == category.lower()]
    
    if cuisine:
        filtered_foods = [f for f in filtered_foods if f.get('cuisine', '').lower() == cuisine.lower()]
    
    return jsonify(filtered_foods)


@app.route('/api/v1/foods/<int:food_id>', methods=['GET'])
def get_food_by_id(food_id):
    """Get a specific food item by ID"""
    food = next((f for f in FOODS_DATA if f['id'] == food_id), None)
    
    if food:
        return jsonify(food)
    else:
        return jsonify({"error": "Food item not found"}), 404


@app.route('/api/v1/splats', methods=['GET'])
def get_splats():
    """Alias for /api/v1/foods (for compatibility with feastfind3d)"""
    return get_foods()


@app.route('/api/v1/random', methods=['GET'])
def get_random_foods():
    """Get random food items"""
    count = request.args.get('count', default=3, type=int)
    count = min(count, len(FOODS_DATA))  # Don't exceed available items
    
    random_foods = random.sample(FOODS_DATA, count)
    return jsonify(random_foods)


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "total_items": len(FOODS_DATA)
    })


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    print("=" * 60)
    print("🎰 Food Slot Machine API Server")
    print("=" * 60)
    print(f"Server starting on http://localhost:8001")
    print(f"Serving {len(FOODS_DATA)} food items")
    print("\nAvailable endpoints:")
    print("  - http://localhost:8001/")
    print("  - http://localhost:8001/api/v1/foods")
    print("  - http://localhost:8001/api/v1/splats")
    print("  - http://localhost:8001/api/v1/random")
    print("  - http://localhost:8001/health")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 60)
    
    app.run(debug=True, port=8001, host='0.0.0.0')
