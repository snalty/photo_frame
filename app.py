#! env/bin/python
from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'fdkfgjrigjierjgijsdrdigksdopk03i504i560334654235'
app.debug = True
socketio = SocketIO(app, engineio_logger=True, logger=True, debug=True, cors_allowed_origins=[])

from classes import Photos
# from interface import next_photo, mouse_click
import json


# @app.route('/api/update_active_photo')
# def update_active_photo():
#     index = request.args.get('index')
#     filename = request.args.get('filename')
#     print(f'Updated current index to {index}')
#     response = {
#         "status": "success",
#         "index": index,
#         "filename": filename
#     }
#     with open("current", "w+") as f:
#         f.write(filename)
#     return json.dumps(response)

# @app.route('/api/get_active_photo')
# def get_active_photo():   
#     with open("current", "r") as f:
#         filename = f.read()
#     response = {
#         "status": "success",
#         "filename": filename
#     }
#     return json.dumps(response)

# @app.route('/api/get_photos')
# def get_photos():
#     photos = Photos()
#     return photos.json()

# @app.route('/api/next')
# def api_next_photo():
#     next_photo()
#     return '{"status": "success"}'

# @app.route('/api/mouseclick')
# def api_mouse_click():
#     mouse_click()
#     return '{"status": "success"}'

@socketio.on('get_photos')
def socket_return_photos(message):
    photos = Photos()
    print('Returning photos list.')
    emit('photos', photos.json())
    return True

@app.route('/api/next')
def api_next_photo():
    print('Sending next photo command')
    socketio.emit('next', '')
    return 'true'

@socketio.on('connect')
def on_connect():
    photos = Photos()
    emit('photos', photos.json())


if __name__ == "__main__":
    app.debug = True
    engineio_logger=True
    cors_allowed_origins=[]
    logger=True
    socketio.run(app, debug=True, host="0.0.0.0")
