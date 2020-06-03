#! /home/sam/env/bin/python
from app import app
from flask_socketio import SocketIO
socketio = SocketIO(app)


if __name__ == "__main__":
  cors_allowed_origins=[]
  socketio.run()
  
