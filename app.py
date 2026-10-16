#!/usr/bin/env python3
"""
Brillitos — Línea Capilar
Lanzador del Servidor Local y Visualizador
"""
import http.server
import socketserver
import webbrowser
import os
import urllib.parse
from threading import Timer

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def open_browser():
    webbrowser.open(f'http://localhost:{PORT}')

if __name__ == '__main__':
    print("=" * 60)
    print("✨ INICIANDO BRILLITOS — LÍNEA CAPILAR ✨")
    print(f"Servidor activo en: http://localhost:{PORT}")
    print("=" * 60)
    
    # Abrir navegador automáticamente tras 1 segundo
    Timer(1.0, open_browser).start()

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
