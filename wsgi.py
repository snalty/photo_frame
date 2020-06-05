#! /home/sam/env/bin/python
from app import app as a
from flask_socketio import SocketIO
app = SocketIO(a, engineio_logger=True, logger=True, debug=True)


if __name__ == "__main__":
  socketio.run(app)
  
