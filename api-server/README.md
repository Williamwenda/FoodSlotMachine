# Example API Server for Food Slot Machine

This folder contains example server implementations that can serve food data to the slot machine.

## Option 1: Simple Python Server (Recommended for Quick Testing)

### Prerequisites
```bash
pip install flask flask-cors
```

### Run the server
```bash
python simple-server.py
```

The server will start on `http://localhost:8001`

## Option 2: Node.js Express Server

### Prerequisites
```bash
npm install express cors
```

### Run the server
```bash
node node-server.js
```

## Option 3: Using feastfind3d Data Directly

If you want to use the actual feastfind3d data:

### Method 1: Copy the data file
```bash
# From FoodSlotMachine directory
cp ../feastfind3d/src/data/foodsData.js ./api-server/
```

Then modify one of the servers above to import and serve that data.

### Method 2: Symlink (Linux/Mac)
```bash
ln -s ../../feastfind3d/src/data/foodsData.js ./api-server/foodsData.js
```

## Testing the Server

### Using curl
```bash
curl http://localhost:8001/api/v1/foods
```

### Using browser
Open: `http://localhost:8001/api/v1/foods`

### Using the Slot Machine
1. Open the API version: `FoodSlotMachine/api-version/index.html`
2. Make sure endpoint is set to: `http://localhost:8001/api/v1/foods`
3. Click "Spin Now!"

## Troubleshooting

### Port already in use
Change the port number in the server file:

**Python:**
```python
app.run(debug=True, port=8002)  # Change 8001 to 8002
```

**Node.js:**
```javascript
const PORT = 8002;  // Change 8001 to 8002
```

### CORS errors
Both example servers have CORS enabled. If you still see errors:

1. Check that the server is running
2. Verify the URL in the slot machine matches the server URL
3. Check browser console for specific error messages

### Module not found errors
Make sure you've installed the dependencies:

```bash
# Python
pip install -r requirements.txt

# Node.js
npm install
```

## Data Format

The servers expect/serve data in this format:

```json
[
  {
    "id": 1,
    "name": "Food Name",
    "category": "Category",
    "image": "https://image-url.com/image.jpg",
    "description": "Food description",
    "price": "$XX.XX",
    "restaurant": "Restaurant Name",
    "stars": 4.5,
    "cuisine": "Cuisine Type"
  }
]
```

## Customization

### Add authentication
```python
# Python
from functools import wraps

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if api_key != 'your-secret-key':
            return jsonify({'error': 'Invalid API key'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/v1/foods')
@require_api_key
def get_foods():
    # ...
```

### Add filtering
```python
@app.route('/api/v1/foods')
def get_foods():
    category = request.args.get('category')
    cuisine = request.args.get('cuisine')
    
    filtered = foods_data
    if category:
        filtered = [f for f in filtered if f['category'] == category]
    if cuisine:
        filtered = [f for f in filtered if f['cuisine'] == cuisine]
    
    return jsonify(filtered)
```

### Add pagination
```python
@app.route('/api/v1/foods')
def get_foods():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    
    start = (page - 1) * per_page
    end = start + per_page
    
    return jsonify({
        'items': foods_data[start:end],
        'total': len(foods_data),
        'page': page,
        'per_page': per_page
    })
```

## Production Deployment

For production use:

1. **Use a production server**: Gunicorn (Python) or PM2 (Node.js)
2. **Add HTTPS**: Use Let's Encrypt certificates
3. **Add rate limiting**: Prevent abuse
4. **Add logging**: Track usage and errors
5. **Use environment variables**: For configuration
6. **Add database**: For dynamic data
7. **Add caching**: Redis or similar
8. **Monitor**: Use tools like New Relic or DataDog
