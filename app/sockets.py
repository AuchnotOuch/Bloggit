from flask_socketio import SocketIO, emit

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("message")
def handleMessage(msg):
    emit("message", msg, broadcast=True)
