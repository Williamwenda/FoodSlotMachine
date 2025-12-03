#!/usr/bin/env python3
"""
Simple HTTP server for Food Slot Machine
Accessible from any device on the same network
"""
import http.server
import socketserver
import socket
import os

PORT = 8080

def get_ip():
    """Get the local IP address"""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow access from any origin
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

# Change to the FoodSlotMachine directory
os.chdir('/home/wenda/cybird_repo/FoodSlotMachine')

# Create server
Handler = MyHTTPRequestHandler
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    ip = get_ip()
    print("\n" + "="*60)
    print("🎰 Food Slot Machine Server Started!")
    print("="*60)
    print(f"\n📱 Access from your phone:")
    print(f"\n   http://{ip}:{PORT}")
    print(f"\n💻 Access from this computer:")
    print(f"\n   http://localhost:{PORT}")
    print("\n" + "="*60)
    print("\n⚠️  IMPORTANT: Make sure your phone is on the same WiFi!")
    print("\n🛑 Press Ctrl+C to stop the server")
    print("="*60 + "\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped!")
