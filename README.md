# Food Slot Machine 🎰

A fun, interactive web application that randomly recommends three food items with a slot machine animation. Inspired by the feastfind3d project.

## Features

- 🎲 **Random Selection**: Randomly picks 3 unique food items from a database of 30+ items
- 🎬 **Smooth Animations**: Engaging slot machine spinning effects
- 🎨 **Beautiful UI**: Modern gradient design with responsive layout
- 📱 **Mobile Friendly**: Works seamlessly on all device sizes
- 💰 **Discount Display**: Shows special discounts when available
- ⭐ **Rating System**: Displays star ratings for each food item
- 🏪 **Restaurant Info**: Shows which restaurant offers each item

## Project Structure

```
FoodSlotMachine/
├── index.html          # Main HTML file with structure and styles
├── app.js              # Application logic and animations
├── foodsData.js        # Food database (30+ items)
├── README.md           # This file
└── api-version/        # Optional: API-connected version
    ├── index.html
    ├── app.js
    └── README.md
```

## Quick Start

### Option 1: Direct File Opening (Simplest)

1. Navigate to the FoodSlotMachine folder
2. Open `index.html` in any modern web browser
3. Click the "Spin Now!" button to discover three random food items

### Option 2: Using a Local Web Server (Recommended)

Using Python:
```bash
cd FoodSlotMachine
python3 -m http.server 8000
```

Then open your browser and navigate to: `http://localhost:8000`

Using Node.js (with http-server):
```bash
cd FoodSlotMachine
npx http-server -p 8000
```

Then open your browser and navigate to: `http://localhost:8000`

### Option 3: Using Live Server in VS Code

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## How It Works

1. **Data Loading**: The application loads 30+ food items from `foodsData.js`
2. **Random Selection**: When you click "Spin Now!", it randomly selects 3 unique items
3. **Animation**: Each slot spins with a shake animation
4. **Sequential Reveal**: Items are revealed one by one (500ms delay between each)
5. **Display**: Shows food image, name, category, description, price, rating, and restaurant

## Data Structure

Each food item includes:

```javascript
{
  id: 1,
  name: "Margherita Pizza",
  category: "Pizza",
  image: "https://...",           // Food image URL
  description: "Classic...",       // Detailed description
  price: "$16.00",                 // Price
  restaurant: "The Golden Spoon", // Restaurant name
  stars: 4.5,                      // Rating (0-5)
  cuisine: "Italian",              // Cuisine type
  discount: {                      // Optional discount info
    percentage: 15,
    expiryTime: "...",
    validHours: 12
  }
}
```

## Customization

### Adding More Food Items

Edit `foodsData.js` and add new items to the `foodsDataFromFile` array:

```javascript
{
  id: 31,
  name: "Your Food Name",
  category: "Your Category",
  image: "https://your-image-url.com/image.jpg",
  description: "Your description...",
  price: "$XX.XX",
  restaurant: restaurants[0],
  stars: 4.5,
  cuisine: "Your Cuisine",
  discount: generateDiscountData(10, 10, 12)
}
```

### Changing Colors

Edit the CSS in `index.html`:

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adjusting Animation Speed

Edit timing values in `app.js`:

```javascript
await sleep(1000);  // Spinning duration
await sleep(500);   // Delay between reveals
```

## Integration with feastfind3d

This slot machine uses a simplified version of the feastfind3d food data structure. To integrate with the full feastfind3d dataset:

1. Export the food data from feastfind3d:
   ```javascript
   import { foodsData } from '../feastfind3d/src/data/foodsData';
   ```

2. Use the API version (see `api-version/` folder) to fetch from a remote server

## API Version

An API-connected version is available in the `api-version/` folder that can:
- Fetch food items from a remote server (e.g., `http://localhost:8001/api/v1/splats`)
- Fall back to local data if the API is unavailable
- Dynamically load data without page refresh

See `api-version/README.md` for details.

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and responsive design
- **Vanilla JavaScript**: Application logic (no frameworks needed!)
- **ES6+**: Modern JavaScript features (async/await, arrow functions, etc.)

## Tips for Best Experience

1. Use a modern browser for best performance
2. For mobile testing, serve via HTTP and access using your local network IP
3. Images are loaded from Unsplash CDN - requires internet connection
4. Spin multiple times to see different combinations!

## Future Enhancements

- [ ] Add filter options (cuisine, price range, category)
- [ ] Save favorite combinations
- [ ] Share results on social media
- [ ] Add sound effects
- [ ] Allow custom number of slots (2-5 items)
- [ ] Integration with QR/barcode scanning
- [ ] User preferences and dietary restrictions

## Credits

- Built as part of the feastfind3d ecosystem
- Food images from [Unsplash](https://unsplash.com)
- Inspired by online ordering systems and food discovery apps

## License

This project is part of the feastfind3d repository. See the main repository for license information.

---

**Enjoy discovering new food! 🍕🍜🍔**
