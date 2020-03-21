from os import listdir
import json

class Photos:
    def __init__(self): 
        self.photos = listdir("photos")

    def get_list(self):
        return self.photos
    
    def json(self):
        return json.dumps(self.photos)