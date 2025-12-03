# 🎰 Food Slot Machine Project

A fun, interactive web application that randomly recommends three food items from your food database. Built as a companion to the **feastfind3d** project.

## 📁 Project Structure

```
FoodSlotMachine/
├── index.html              # Basic standalone version
├── app.js                  # Main application logic
├── foodsData.js           # Local food database (30+ items)
├── README.md              # Main documentation
│
├── api-version/           # API-connected version
│   ├── index.html         # API version UI
│   ├── app.js            # API logic with fallback
│   └── README.md         # API version docs
│
└── api-server/           # Optional API server implementations
    ├── simple-server.py  # Python/Flask server
    ├── node-server.js    # Node.js/Express server
    ├── requirements.txt  # Python dependencies
    ├── package.json      # Node.js dependencies
    └── README.md         # Server documentation
```

## 🚀 Quick Start

### Option 1: Basic Version (No Server Required)

1. Open `index.html` in your browser
2. Click "Spin Now!" to get 3 random food recommendations
3. That's it! No installation needed.

### Option 2: API Version (With Remote Data)

1. Start an API server (see below)
2. Open `api-version/index.html` in your browser
3. Spin to get recommendations from the API

### Option 3: With Python API Server

```bash
cd api-server
pip install -r requirements.txt
python simple-server.py
```

Then open `api-version/index.html`

### Option 4: With Node.js API Server

```bash
cd api-server
npm install
npm start
```

Then open `api-version/index.html`

## ✨ Features

### Basic Features (Both Versions)
- 🎲 Random selection of 3 unique food items
- 🎬 Smooth slot machine animations
- 🎨 Beautiful gradient UI
- 📱 Fully responsive design
- ⭐ Star rating display
- 💰 Discount badges (when available)
- 🏪 Restaurant information
- 🍽️ Cuisine tags

### API Version Additional Features
- 🌐 Fetch from remote server
- 🔄 Automatic fallback to local data
- 📊 Connection status indicator
- ⚙️ Configurable API endpoint
- 🏷️ Source badges (API vs Local)
- 🎮 3D model availability indicator

## 📖 Usage Guides

### For End Users

Simply click the "Spin Now!" button to discover three random food items. Each spin:
1. Shows a fun spinning animation
2. Reveals items one by one (0.5s delay)
3. Displays full details: image, name, price, rating, restaurant
4. Can be spun again for new recommendations

### For Developers

**Adding More Foods:**
Edit `foodsData.js` and add to the array:

```javascript
{
  id: 31,
  name: "Your Food",
  category: "Category",
  image: "https://...",
  description: "...",
  price: "$XX.XX",
  restaurant: "Restaurant Name",
  stars: 4.5,
  cuisine: "Cuisine Type"
}
```

**Customizing Appearance:**
Edit CSS in `index.html` - look for:
- `body { background: ... }` - Change gradient colors
- `.slot-machine { ... }` - Adjust card styles
- `.spin-button { ... }` - Modify button appearance

**Adjusting Animation:**
Edit timing in `app.js`:
```javascript
await sleep(1000);  // Spin duration
await sleep(500);   // Reveal delay
```

## 🔌 Integration with feastfind3d

### Method 1: Use Shared Data File

```bash
# Create symlink to feastfind3d data
ln -s ../feastfind3d/src/data/foodsData.js ./shared-foodsData.js
```

### Method 2: Use feastfind3d API

If feastfind3d has an API server running on `http://localhost:8001`:

1. Open `api-version/index.html`
2. Ensure endpoint is set to: `http://localhost:8001/api/v1/splats`
3. Click "Update & Reload Data" if needed
4. Start spinning!

### Method 3: Import Directly (for React/Vite projects)

```javascript
import { foodsData } from '../feastfind3d/src/data/foodsData';
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Animations, Grid, Flexbox
- **Vanilla JavaScript**: ES6+ features
- **Fetch API**: For API version
- **No frameworks**: Pure web technologies!

### Browser Support
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS/Android)

### Performance
- Lightweight: < 50KB total
- Fast loading: No dependencies
- Smooth animations: GPU-accelerated CSS
- Optimized images: Served from CDN

## 🎯 Use Cases

1. **Restaurant Menu Discovery**: Help customers discover menu items
2. **Food Events**: Fun way to suggest dishes at food festivals
3. **Meal Planning**: Random meal suggestions
4. **Barcode Integration**: Show recommendations after scanning
5. **Promotional Tool**: Highlight featured items with discounts
6. **Mobile Apps**: Embed in food ordering apps

## 📱 Mobile Deployment

### Test on Mobile Device

1. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```

2. Find your computer's IP address:
   ```bash
   # Linux/Mac
   ifconfig | grep inet
   
   # Or
   ip addr show
   ```

3. On your phone, open: `http://YOUR_IP:8000`

### Deploy to Production

**GitHub Pages:**
```bash
git add FoodSlotMachine/
git commit -m "Add Food Slot Machine"
git push origin main
# Enable GitHub Pages in repo settings
```

**Netlify/Vercel:**
- Simply drag and drop the `FoodSlotMachine` folder
- Or connect your Git repository

**Custom Server:**
```bash
# Copy files to web server
scp -r FoodSlotMachine/ user@server:/var/www/html/
```

## 🛠️ Customization Examples

### Change Number of Slots

In `app.js`, modify:
```javascript
function getRandomFoods(count = 5) {  // Change from 3 to 5
```

In `index.html`, add more slot divs:
```html
<div class="slot" id="slot4">...</div>
<div class="slot" id="slot5">...</div>
```

### Add Sound Effects

```javascript
// In spin() function
const spinSound = new Audio('spin-sound.mp3');
spinSound.play();
```

### Add Filters

```javascript
// Filter by cuisine
function getRandomFoods(count = 3, cuisine = null) {
  let available = cuisine 
    ? foodsData.filter(f => f.cuisine === cuisine)
    : foodsData;
  // ... rest of logic
}
```

### Save Favorites

```javascript
function saveFavorite(foodId) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites.push(foodId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
```

## 🐛 Troubleshooting

### Issue: Blank screen
- **Solution**: Check browser console (F12) for errors
- **Check**: Is JavaScript enabled?
- **Try**: Open in a different browser

### Issue: Images not loading
- **Solution**: Check internet connection (images from Unsplash)
- **Check**: Browser console for CORS errors
- **Try**: Use local image URLs instead

### Issue: API version shows "Using Local Data"
- **Solution**: Check if API server is running
- **Check**: Try accessing API URL directly in browser
- **Debug**: Look at browser console for fetch errors

### Issue: Animations stuttering
- **Solution**: Close other browser tabs
- **Check**: CPU usage
- **Try**: Disable browser extensions

### Issue: Mobile display broken
- **Solution**: Check viewport meta tag is present
- **Check**: Test in responsive design mode (F12)
- **Try**: Different mobile browser

## 📊 Data Format Reference

Each food item should have:

```typescript
{
  id: number | string,          // Unique identifier
  name: string,                 // Food name
  category: string,             // Category (Pizza, Burgers, etc.)
  image: string,                // Image URL
  description: string,          // Detailed description
  price: string,                // Price as string (e.g., "$15.00")
  restaurant: string,           // Restaurant name
  stars: number,                // Rating 0-5
  cuisine?: string,             // Cuisine type (optional)
  discount?: {                  // Discount info (optional)
    percentage: number,
    expiryTime: string,
    validHours: number
  },
  splatUrl?: string,           // 3D model path (optional)
  source?: 'api' | 'local'     // Data source (optional)
}
```

## 🚀 Future Enhancements

Planned features:
- [ ] Filter by dietary restrictions (vegan, gluten-free, etc.)
- [ ] Share results on social media
- [ ] Save favorite combinations
- [ ] Sound effects and haptic feedback
- [ ] QR code scanning integration
- [ ] Multiple language support
- [ ] Dark mode
- [ ] Accessibility improvements
- [ ] PWA support (offline mode)
- [ ] Analytics dashboard

## 🤝 Contributing

This is part of the feastfind3d project. To contribute:

1. Test the application
2. Report bugs or suggest features
3. Submit pull requests with improvements
4. Share your customizations!

## 📄 License

This project is part of the feastfind3d repository. See main repository for license information.

## 🙏 Credits

- **Built for**: feastfind3d project
- **Images**: [Unsplash](https://unsplash.com)
- **Icons**: Unicode emoji
- **Inspiration**: Slot machines and food discovery apps

## 📞 Support

For questions or issues:
1. Check the README files in each folder
2. Review the troubleshooting section
3. Check browser console for errors
4. Refer to feastfind3d main repository

---

**Made with ❤️ for food lovers everywhere! 🍕🍜🍔🍰🍣**

**Happy Spinning! 🎰**
