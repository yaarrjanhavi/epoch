from http.server import BaseHTTPRequestHandler
import json
import sys
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        info = {
            "status": "ok",
            "python_version": sys.version,
            "cwd": os.getcwd(),
            "sys_path": sys.path,
            "files_in_cwd": os.listdir(os.getcwd()) if os.path.exists(os.getcwd()) else [],
            "has_backend": os.path.exists("backend"),
            "has_data": os.path.exists("data"),
        }
        self.wfile.write(json.dumps(info, indent=2).encode('utf-8'))
