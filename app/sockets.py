from flask_socketio import SocketIO, emit

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("message")
def handle_message(msg):

    emit("message", msg, broadcast=True)
