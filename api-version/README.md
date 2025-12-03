# Food Slot Machine - API Version 🎰

This is an API-connected version of the Food Slot Machine that can fetch food items from a remote server.

## Features

All the features from the basic version, plus:

- 🌐 **API Integration**: Fetches food items from a remote API endpoint
- 🔄 **Fallback System**: Automatically uses local data if API is unavailable
- 📊 **Status Indicator**: Shows connection status (online/offline)
- ⚙️ **Configurable Endpoint**: Change API URL without editing code
- 🏷️ **Source Badges**: Shows whether items are from API or local data
- 🎮 **3D Model Support**: Displays if a 3D Gaussian Splat is available

## Setup

### Quick Start

1. Open `index.html` in a web browser
2. The app will attempt to connect to the default API endpoint
3. If connection fails, it will automatically use local fallback data

### Configure API Endpoint

The default API endpoint is: `http://localhost:8001/api/v1/splats`

To change it:

1. Enter the new URL in the "API Endpoint" field
2. Click "Update & Reload Data"

Or edit directly in `app.js`:

```javascript
let apiEndpoint = "http://your-server.com/api/v1/foods";
```

## API Requirements

### Expected Response Format

The API should return JSON in one of these formats:

**Format 1: Direct array**
```json
[
  {
    "id": "item1",
    "name": "Pizza",
    "category": "Italian",
    "image": "https://...",
    "description": "Delicious pizza",
    "price": "$15.00",
    "rating": 4.5
  }
]
```

**Format 2: Wrapped in 'items' or 'data'**
```json
{
  "items": [ /* array of food items */ ]
}
```

or

```json
{
  "data": [ /* array of food items */ ]
}
```

### Supported Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Optional | Unique identifier |
| `name` | string | Optional | Food name (defaults to "Mystery Dish") |
| `title` | string | Optional | Alternative to `name` |
| `category` | string | Optional | Food category (defaults to "Specialty") |
| `image` | string | Optional | Image URL |
| `thumbnail` | string | Optional | Alternative to `image` |
| `description` | string | Optional | Food description |
| `price` | string | Optional | Price (generated if missing) |
| `rating` | number | Optional | Rating 0-5 (generated if missing) |
| `cuisine` | string | Optional | Cuisine type |
| `ply_path` | string | Optional | Path to 3D model file |

## Integration with feastfind3d

### Option 1: Use the feastfind3d API Server

If you have the feastfind3d API server running:

```bash
# In the feastfind3d project
cd /path/to/feastfind3d
# Start your API server (adjust command as needed)
npm run api-server
```

Then the slot machine will automatically fetch data from `http://localhost:8001/api/v1/splats`

### Option 2: Create a Simple Proxy Server

Create a Node.js server to serve the food data:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const { foodsData } = require('./path/to/foodsData');

const app = express();
app.use(cors());

app.get('/api/v1/foods', (req, res) => {
  res.json(foodsData);
});

app.listen(8001, () => {
  console.log('API server running on http://localhost:8001');
});
```

### Option 3: Use Static JSON File

Create a `foods.json` file and serve it:

```bash
# Convert foodsData.js to JSON
node -e "const {foodsData} = require('./foodsData.js'); console.log(JSON.stringify(foodsData))" > foods.json

# Serve with Python
python3 -m http.server 8001
```

Update API endpoint to: `http://localhost:8001/foods.json`

## Fallback Data

If the API is unavailable, the app uses 5 built-in food items:

1. Margherita Pizza
2. Spicy Ramen
3. Classic Cheeseburger
4. Sushi Platter
5. Caesar Salad

To customize fallback data, edit the `localFallbackData` array in `app.js`.

## CORS Issues

If you encounter CORS errors:

### For Development

1. **Use a CORS proxy**:
   ```javascript
   apiEndpoint = "https://cors-anywhere.herokuapp.com/http://your-api.com/data";
   ```

2. **Run Chrome with CORS disabled** (Mac/Linux):
   ```bash
   google-chrome --disable-web-security --user-data-dir="/tmp/chrome_dev"
   ```

3. **Use a local server** with CORS enabled (see Option 2 above)

### For Production

Ensure your API server sends proper CORS headers:

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
```

## Data Transformation

The app automatically transforms API data to match the expected format:

- Maps various field names (`title` → `name`, `thumbnail` → `image`)
- Generates missing data (price, rating, restaurant)
- Adds source tracking (`source: "api"` or `source: "local"`)
- Supports 3D model URLs

## Testing

### Test with Mock API

Create a simple test JSON file:

```json
[
  {
    "name": "Test Burger",
    "category": "Test",
    "image": "https://picsum.photos/400/200",
    "description": "This is a test item from the API",
    "price": "$99.99",
    "rating": 5.0
  }
]
```

Serve it and update the API endpoint to test the connection.

### Check Browser Console

Open browser DevTools (F12) to see:
- Connection attempts
- API responses
- Error messages
- Data transformation logs

## Troubleshooting

### Issue: "Using Local Data" message shown

**Possible causes:**
- API server is not running
- Wrong API endpoint URL
- CORS blocking the request
- API returning invalid JSON

**Solutions:**
1. Check if API server is running: `curl http://localhost:8001/api/v1/splats`
2. Verify the URL in settings
3. Check browser console for errors
4. Try accessing the API URL directly in your browser

### Issue: No items spinning

**Possible causes:**
- API returned empty array
- Data transformation failed

**Solutions:**
1. Check browser console for errors
2. Verify API response format matches expected structure
3. Check that API returns at least 3 items

### Issue: Images not loading

**Possible causes:**
- Invalid image URLs
- CORS issues with image host
- Network connection problems

**Solutions:**
- Images will show placeholder if loading fails
- Verify image URLs are accessible
- Check network tab in DevTools

## Deployment

### Deploy to Static Hosting

This app can be deployed to any static hosting service:

- **GitHub Pages**: Push to gh-pages branch
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repo
- **AWS S3**: Upload files with public read access

### Deploy with API Server

If deploying with an API backend:

1. Deploy your API server first
2. Get the production API URL
3. Update the default `apiEndpoint` in `app.js`
4. Deploy the frontend

## Advanced Usage

### Custom Data Transformation

Modify the `transformApiData()` function to handle your specific API format:

```javascript
function transformApiData(apiItems) {
  return apiItems.map((item) => ({
    id: item.custom_id,
    name: item.food_name,
    // ... your custom mappings
  }));
}
```

### Add Authentication

To add API authentication:

```javascript
const response = await fetch(apiEndpoint, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
});
```

### Cache API Data

To reduce API calls, add localStorage caching:

```javascript
// Save to cache
localStorage.setItem('foodsCache', JSON.stringify(foodsData));
localStorage.setItem('cacheTime', Date.now());

// Load from cache if recent
const cacheTime = localStorage.getItem('cacheTime');
if (Date.now() - cacheTime < 3600000) { // 1 hour
  foodsData = JSON.parse(localStorage.getItem('foodsCache'));
}
```

## Performance Tips

1. **Optimize images**: Use thumbnails or compressed images
2. **Lazy load images**: Only load images when slot is revealed
3. **Pagination**: If API has many items, paginate the requests
4. **Caching**: Cache API responses to reduce server load
5. **CDN**: Host images on a CDN for faster loading

## Security Considerations

- Never expose sensitive API keys in frontend code
- Use environment variables for configuration
- Validate and sanitize all API data
- Implement rate limiting on your API
- Use HTTPS for production deployments

---

**Happy spinning! 🎰**
