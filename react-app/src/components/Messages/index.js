import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'

let socket;

const Messaging = () => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        socket = io()

        socket.on('message', (message) => {
            setMessages(messages => [...messages, message])
        })
        return (() => {
            socket.disconnect()
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()

        socket.emit('message', { user: user.username, msg: input })
        setInput('')
    }

    return (
        <>
            <div>
                {messages.map((message, i) => (
                    <div key={i}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
        </>
    )
}

export default Messaging
