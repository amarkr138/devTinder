import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState('');
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessage = async () => {
    const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, {
      withCredentials: true,
    });
    const chatMessage = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;

      return {
        firstName: senderId?.firstName,
        text,
      };
    });
    setMessages(chatMessage);
  };
  useEffect(() => {
    fetchChatMessage();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit('joinChat', {
      firstName: user.firstName,
      userId,
      targetUserId,
    });
    socket.on('messageReceived', ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessages = () => {
     if (!user) return;
    const socket = createSocketConnection();
    socket.emit('sendMessages', {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessages,
    });
    setNewMessages('');
  };

  return (
    <div className="flex flex-col h-[70vh] w-1/2 mx-auto border border-gray-600 m-5 mt-10 rounded-xl">
      <h1 className="p-5 border-b border-gray-600 ">Chat</h1>
      <div className="flex-1 overflow-y-scroll  p-5">
        {messages?.map((msg, index) => {
          return (
            <div
              key={index}
             className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          className="text-white border border-white w-10/12 py-2   rounded-lg "
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
        ></input>
        <button
          className="btn ml-2 rounded-lg bg-gray-600 "
          onClick={sendMessages}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
