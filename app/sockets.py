from flask_socketio import SocketIO, emit
from flask import request

socketio = SocketIO(cors_allowed_origins="*")

user_sid = {}
sid_user = {}
@socketio.on("message")
def handle_message(msg):
    print("TEST")
    emit("message", msg, broadcast=True)

@socketio.on('connect')
def connect_user(user_id):
    user_sid[user_id] = request.sid
    sid_user[request.sid] = user_id
    print("USER ID", user_id)
