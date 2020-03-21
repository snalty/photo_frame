#! env/bin/python
from flask import Flask
app = Flask(__name__)

from classes import Photos
    
@app.route('/api/get_photos')
def get_photos():
    photos = Photos()
    return photos.json()

if __name__ == "__main__":
    app.debug = True
    Flask.run(app, host="0.0.0.0")