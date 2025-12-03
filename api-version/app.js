/**
 * Food Slot Machine Application - API Version
 * 
 * This version can fetch food items from a remote API server
 * and falls back to local data if the API is unavailable.
 */

// Testing configuration: Use fewer items for higher jackpot probability
// Set to 5 for ~4% chance (1 in 25), or 10 for ~1% chance (1 in 100)
// Set to 0 to use all items (default: 1 in 900 with 30 items)
const TESTING_POOL_SIZE = 5; // Change this to adjust probability!

let isSpinning = false;
let foodsData = [];
let testingPool = []; // Subset of foods for testing
let apiEndpoint = "http://localhost:8001/api/v1/splats";
let isApiConnected = false;

// Mock restaurants for API data
const MOCK_RESTAURANTS = [
    { id: "r1", name: "Backyard" },
    { id: "r2", name: "Trash Can" },
    { id: "r3", name: "The Golden Spoon" },
    { id: "r4", name: "Urban Eats" },
    { id: "r5", name: "Flavor Street" }
];

// Fallback local data (simplified)
const localFallbackData = [
    {
        id: "local-1",
        name: "Margherita Pizza",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=800&fit=crop",
        description: "Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
        price: "$16.00",
        restaurant: "The Golden Spoon",
        stars: 4.5,
        cuisine: "Italian",
        source: "local"
    },
    {
        id: "local-2",
        name: "Spicy Ramen",
        category: "Noodles",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=800&fit=crop",
        description: "Rich tonkotsu broth with handmade noodles and tender chashu pork.",
        price: "$18.00",
        restaurant: "Urban Eats",
        stars: 4.7,
        cuisine: "Japanese",
        source: "local"
    },
    {
        id: "local-3",
        name: "Classic Cheeseburger",
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop",
        description: "Juicy Angus beef patty with aged cheddar and special sauce.",
        price: "$15.50",
        restaurant: "Flavor Street",
        stars: 4.6,
        cuisine: "American",
        source: "local"
    },
    {
        id: "local-4",
        name: "Sushi Platter",
        category: "Sushi",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=800&fit=crop",
        description: "Chef's selection featuring salmon nigiri, tuna rolls, and California rolls.",
        price: "$28.00",
        restaurant: "Taste Haven",
        stars: 4.8,
        cuisine: "Japanese",
        source: "local"
    },
    {
        id: "local-5",
        name: "Caesar Salad",
        category: "Salads",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=800&fit=crop",
        description: "Crisp romaine lettuce with house-made Caesar dressing and croutons.",
        price: "$12.00",
        restaurant: "Gourmet Corner",
        stars: 4.3,
        cuisine: "American",
        source: "local"
    }
];

/**
 * Transform API data to match our food item structure
 */
function transformApiData(apiItems) {
    return apiItems.map((item, index) => {
        const restaurant = MOCK_RESTAURANTS[index % MOCK_RESTAURANTS.length];
        
        return {
            id: item.id || `api-${index}`,
            name: item.name || item.title || "Mystery Dish",
            category: item.category || "Specialty",
            image: item.thumbnail || item.image || "https://via.placeholder.com/400x200?text=Food",
            description: item.description || "Delicious food item from our collection!",
            price: item.price || `$${(Math.random() * 20 + 10).toFixed(2)}`,
            restaurant: restaurant.name,
            stars: item.rating || (Math.random() * 1 + 4).toFixed(1),
            cuisine: item.cuisine || "International",
            splatUrl: item.ply_path || null,
            source: "api"
        };
    });
}

/**
 * Fetch data from API
 */
async function fetchApiData() {
    try {
        console.log(`Attempting to fetch from API: ${apiEndpoint}`);
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API data received:', data);

        // Handle different response formats
        let items = [];
        if (Array.isArray(data)) {
            items = data;
        } else if (data.items && Array.isArray(data.items)) {
            items = data.items;
        } else if (data.data && Array.isArray(data.data)) {
            items = data.data;
        }

        if (items.length === 0) {
            throw new Error('API returned no items');
        }

        return transformApiData(items);
    } catch (error) {
        console.error('API fetch failed:', error);
        return null;
    }
}

/**
 * Update API status indicator
 */
function updateStatusIndicator(connected, message) {
    const indicator = document.getElementById('statusIndicator');
    if (connected) {
        indicator.className = 'status-indicator online';
        indicator.innerHTML = `🟢 ${message}`;
    } else {
        indicator.className = 'status-indicator offline';
        indicator.innerHTML = `🟡 ${message}`;
    }
}

/**
 * Initialize the application
 */
async function init() {
    console.log('Initializing Food Slot Machine (API Version)...');
    
    // Try to load from API first
    const apiData = await fetchApiData();
    
    if (apiData && apiData.length > 0) {
        foodsData = apiData;
        isApiConnected = true;
        updateStatusIndicator(true, `API Connected (${foodsData.length} items)`);
        console.log(`Loaded ${foodsData.length} items from API`);
    } else {
        // Fall back to local data
        foodsData = localFallbackData;
        isApiConnected = false;
        updateStatusIndicator(false, `Using Local Data (${foodsData.length} items)`);
        console.log('Using local fallback data');
    }

    // Check if we have enough foods
    if (foodsData.length < 3) {
        alert('Not enough food items available!');
        return;
    }

    // Setup testing pool if configured
    if (TESTING_POOL_SIZE > 0 && TESTING_POOL_SIZE < foodsData.length) {
        // Randomly select a subset for testing
        testingPool = [];
        const indices = new Set();
        while (testingPool.length < TESTING_POOL_SIZE) {
            const randomIndex = Math.floor(Math.random() * foodsData.length);
            if (!indices.has(randomIndex)) {
                indices.add(randomIndex);
                testingPool.push(foodsData[randomIndex]);
            }
        }
        const probability = (1 / (TESTING_POOL_SIZE * TESTING_POOL_SIZE) * 100).toFixed(2);
        console.log(`🎰 TESTING MODE: Using ${TESTING_POOL_SIZE} items`);
        console.log(`📊 Jackpot probability: ${probability}% (1 in ${TESTING_POOL_SIZE * TESTING_POOL_SIZE})`);
    } else {
        testingPool = foodsData;
        console.log(`📊 Using all ${foodsData.length} items - Jackpot: 0.11% (1 in 900)`);
    }

    console.log('Initialization complete!');
}

/**
 * Update API endpoint and reload data
 */
async function updateApiEndpoint() {
    const input = document.getElementById('apiEndpoint');
    apiEndpoint = input.value.trim();
    
    if (!apiEndpoint) {
        alert('Please enter a valid API endpoint!');
        return;
    }

    updateStatusIndicator(false, 'Connecting...');
    await init();
}

/**
 * Get random food items (can be repeated for jackpot chance!)
 */
function getRandomFoods(count = 3) {
    const selectedFoods = [];
    
    // Use testing pool if configured, otherwise use all foods
    const pool = testingPool.length > 0 ? testingPool : foodsData;

    // Randomly select items (allowing repeats for jackpot possibility)
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        selectedFoods.push(pool[randomIndex]);
    }

    return selectedFoods;
}

/**
 * Check if all three items are the same (JACKPOT!)
 */
function checkJackpot(foods) {
    return foods.length === 3 && 
           foods[0].id === foods[1].id && 
           foods[1].id === foods[2].id;
}

/**
 * Show celebration animation
 */
function showCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    overlay.classList.add('show');
    
    // Add celebration effect to all slots
    const slots = [
        document.getElementById('slot1'),
        document.getElementById('slot2'),
        document.getElementById('slot3')
    ];
    
    slots.forEach(slot => {
        slot.classList.add('celebrate');
    });
    
    // Create confetti
    createConfetti();
}

/**
 * Close celebration overlay
 */
function closeCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    overlay.classList.remove('show');
    
    // Remove celebration effect from slots
    const slots = [
        document.getElementById('slot1'),
        document.getElementById('slot2'),
        document.getElementById('slot3')
    ];
    
    slots.forEach(slot => {
        slot.classList.remove('celebrate');
    });
}

/**
 * Create confetti animation
 */
function createConfetti() {
    const overlay = document.getElementById('celebrationOverlay');
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff69b4', '#ff4757', '#7bed9f'];
    const shapes = ['circle', 'square', 'star'];
    
    // Create 100 large confetti pieces filling the entire screen
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random size between 20-60px for big fireworks
        const size = Math.random() * 40 + 20;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random horizontal position
        confetti.style.left = Math.random() * 100 + '%';
        
        // Random starting height (some start higher)
        confetti.style.top = (-Math.random() * 30) + 'vh';
        
        // Random color
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random shape
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'star') {
            confetti.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        }
        
        // Random drift for horizontal movement
        const drift = (Math.random() - 0.5) * 400 + 'px';
        confetti.style.setProperty('--drift', drift);
        
        // Random animation timing
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        
        overlay.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

/**
 * Render star rating
 */
function renderStars(rating) {
    const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    let starsHTML = '<div class="stars">';

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += '<span class="star">★</span>';
        } else if (i === fullStars && hasHalfStar) {
            starsHTML += '<span class="star">⯨</span>';
        } else {
            starsHTML += '<span class="star" style="color: #ddd;">★</span>';
        }
    }

    starsHTML += '</div>';
    return starsHTML;
}

/**
 * Render a food item in a slot
 */
function renderFoodCard(food) {
    const discountHTML = food.discount && food.discount.percentage > 0
        ? `<div class="discount-badge">${food.discount.percentage}% OFF</div>`
        : '';

    const sourceBadge = food.source === 'api'
        ? '<div class="api-badge">FROM API</div>'
        : '';

    const cuisineHTML = food.cuisine 
        ? `<span class="cuisine-tag">${food.cuisine}</span>`
        : '';

    const splatInfo = food.splatUrl
        ? `<div style="font-size: 0.85rem; color: #667eea; margin-top: 10px;">🎮 3D Model Available</div>`
        : '';

    return `
        ${sourceBadge}
        ${discountHTML}
        <img src="${food.image}" alt="${food.name}" class="food-image" onerror="this.src='https://via.placeholder.com/400x200?text=Food+Image'">
        <div class="food-name">${food.name}</div>
        <span class="food-category">${food.category}</span>
        ${cuisineHTML}
        ${renderStars(food.stars)}
        <div class="food-description">${food.description}</div>
        ${splatInfo}
        <div class="food-meta">
            <div>
                <div class="food-price">${food.price}</div>
                <div class="food-restaurant">📍 ${food.restaurant}</div>
            </div>
        </div>
    `;
}

/**
 * Create a spinning reel with multiple food items
 */
function createSpinningReel(slotId) {
    // Get 5 random foods to show while spinning
    const reelFoods = [];
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * foodsData.length);
        reelFoods.push(foodsData[randomIndex]);
    }
    
    let reelHTML = '<div class="slot-reel" style="filter: blur(2px);">';
    reelFoods.forEach(food => {
        reelHTML += `
            <div style="margin-bottom: 20px; padding: 10px;">
                <img src="${food.image}" alt="${food.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px;" onerror="this.src='https://via.placeholder.com/400x200?text=Food'">
                <div style="font-weight: bold; margin-top: 10px;">${food.name}</div>
            </div>
        `;
    });
    reelHTML += '</div>';
    
    return reelHTML;
}

/**
 * Main spin function
 */
async function spin() {
    if (isSpinning) return;

    isSpinning = true;
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;
    spinButton.classList.add('spinning');
    spinButton.textContent = '🎰 Spinning...';

    const slots = [
        document.getElementById('slot1'),
        document.getElementById('slot2'),
        document.getElementById('slot3')
    ];

    // Hide current content and show spinning reels
    slots.forEach((slot, index) => {
        const content = slot.querySelector('.slot-content');
        content.classList.remove('show');
        content.style.opacity = '0';
        
        // Create and insert spinning reel
        const existingReel = slot.querySelector('.slot-reel');
        if (existingReel) {
            existingReel.remove();
        }
        slot.insertAdjacentHTML('afterbegin', createSpinningReel(index));
        
        // Start spinning animation
        setTimeout(() => {
            slot.classList.add('spinning');
        }, 50);
    });

    // Fast spinning phase - spin all slots quickly
    await sleep(2000);

    // Get random foods
    const selectedFoods = getRandomFoods(3);

    // Reveal foods one by one with slowing down effect
    for (let i = 0; i < slots.length; i++) {
        await sleep(300);
        
        const slot = slots[i];
        const content = slot.querySelector('.slot-content');
        const reel = slot.querySelector('.slot-reel');
        
        // Transition from fast spinning to slowing down
        slot.classList.remove('spinning');
        slot.classList.add('slowing');
        
        // Wait for the slowing animation to complete
        await sleep(1500);
        
        // Remove the spinning reel
        if (reel) {
            reel.remove();
        }
        
        // Stop completely and update content
        slot.classList.remove('slowing');
        content.innerHTML = renderFoodCard(selectedFoods[i]);
        content.style.opacity = '1';
        
        // Wait a moment for the DOM to update and image to start loading
        await sleep(100);
        
        // Now show the content (image will continue loading and appear when ready)
        content.classList.add('show');
    }

    // Re-enable spin button
    await sleep(500);
    spinButton.disabled = false;
    spinButton.classList.remove('spinning');
    spinButton.textContent = '🎲 Spin Again!';
    isSpinning = false;
    
    // Check for jackpot!
    if (checkJackpot(selectedFoods)) {
        await sleep(500);
        showCelebration();
    }
}

/**
 * Sleep helper
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);
