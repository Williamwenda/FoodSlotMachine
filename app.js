/**
 * Food Slot Machine Application
 * 
 * This application randomly selects and displays 3 food items
 * with a slot machine animation effect.
 */

// Testing configuration: Use fewer items for higher jackpot probability
// Set to 5 for ~4% chance (1 in 25), or 10 for ~1% chance (1 in 100)
// Set to 0 to use all items (default: 1 in 900 with 30 items)
const TESTING_POOL_SIZE = 2; // Change this to adjust probability!

let isSpinning = false;
let foodsData = [];
let testingPool = []; // Subset of foods for testing

/**
 * Initialize the application
 */
async function init() {
    // Load food data
    if (typeof window.foodsDataFromFile !== 'undefined') {
        foodsData = window.foodsDataFromFile;
        console.log(`Loaded ${foodsData.length} food items`);
        
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
    } else {
        console.error('Food data not loaded!');
        alert('Error: Food data could not be loaded. Please check foodsData.js');
        return;
    }

    // Check if we have enough foods
    if (foodsData.length < 3) {
        alert('Not enough food items in the database!');
        return;
    }
}

/**
 * Get random food items (can be repeated for jackpot chance!)
 * @param {number} count - Number of items to select
 * @returns {Array} Array of random food items
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
 * Render star rating
 * @param {number} rating - Rating value (0-5)
 * @returns {string} HTML string for stars
 */
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
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
 * @param {Object} food - Food item data
 * @returns {string} HTML string for the food card
 */
function renderFoodCard(food) {
    const discountHTML = food.discount && food.discount.percentage > 0
        ? `<div class="discount-badge">${food.discount.percentage}% OFF</div>`
        : '';

    const cuisineHTML = food.cuisine 
        ? `<span class="cuisine-tag">${food.cuisine}</span>`
        : '';

    return `
        ${discountHTML}
        <img src="${food.image}" alt="${food.name}" class="food-image" onerror="this.src='https://via.placeholder.com/400x200?text=Food+Image'">
        <div class="food-name">${food.name}</div>
        <span class="food-category">${food.category}</span>
        ${cuisineHTML}
        ${renderStars(food.stars)}
        <div class="food-description">${food.description}</div>
        <div class="food-meta">
            <div>
                <div class="food-price">${food.price}</div>
                <div class="food-restaurant">📍 ${food.restaurant}</div>
            </div>
        </div>
    `;
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
                <img src="${food.image}" alt="${food.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px;">
                <div style="font-weight: bold; margin-top: 10px;">${food.name}</div>
            </div>
        `;
    });
    reelHTML += '</div>';
    
    return reelHTML;
}

/**
 * Main spin function - triggers the slot machine animation
 */
async function spin() {
    if (isSpinning) return;

    isSpinning = true;
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;
    spinButton.classList.add('spinning');
    spinButton.textContent = '🎰 Spinning...';

    // Get the slot elements
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
 * Sleep helper function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);
