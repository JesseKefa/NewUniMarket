import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiver, setReceiver] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/messages', {
          headers: {
            'x-auth-token': token,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching messages');
      }
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/messages/send', {
        receiver,
        content: newMessage,
      }, {
        headers: {
          'x-auth-token': token,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message');
    }
  };

  return (
    <div className="messages">
      <h2>Messages</h2>
      <div className="messages-list">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <p><strong>{message.sender.username}</strong>: {message.content}</p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="new-message">
        <input
          type="text"
          placeholder="Receiver ID"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <textarea
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
