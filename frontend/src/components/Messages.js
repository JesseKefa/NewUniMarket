import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  const searchUsers = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/users/search?query=${query}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setSearchResults(res.data);
      } catch (err) {
        console.error('Error searching users');
      }
    } else {
      setSearchResults([]);
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
          placeholder="Search for users..."
          value={searchQuery}
          onChange={(e) => searchUsers(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setReceiver(user._id);
                  setSearchQuery(user.username);
                  setSearchResults([]);
                }}
              >
                {user.username} ({user.email})
              </div>
            ))}
          </div>
        )}
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
