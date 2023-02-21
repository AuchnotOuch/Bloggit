from flask_socketio import SocketIO

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("message")
def message(data):
    emit("message", data, broadcast=True)
