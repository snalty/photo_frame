#! env/bin/python
from flask import Flask, request
app = Flask(__name__)

from classes import Photos
from interface import next_photo, mouse_click
import json


@app.route('/api/update_active_photo')
def update_active_photo():
    index = request.args.get('index')
    filename = request.args.get('filename')
    print(f'Updated current index to {index}')
    response = {
        "status": "success",
        "index": index,
        "filename": filename
    }
    with open("current", "w+") as f:
        f.write(filename)
    return json.dumps(response)

@app.route('/api/get_active_photo')
def get_active_photo():   
    with open("current", "r") as f:
        filename = f.read()
    response = {
        "status": "success",
        "filename": filename
    }
    return json.dumps(response)

@app.route('/api/get_photos')
def get_photos():
    photos = Photos()
    return photos.json()

@app.route('/api/next')
def api_next_photo():
    next_photo()
    return '{"status": "success"}'

@app.route('/api/mouseclick')
def api_mouse_click():
    mouse_click()
    return '{"status": "success"}'

if __name__ == "__main__":
    app.debug = True
    Flask.run(app, host="0.0.0.0")
