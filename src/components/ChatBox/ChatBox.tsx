/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: number;
  text: string;
  sender: string;
}

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const ref = useChatScroll(messages);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(newSocket);

    newSocket.emit('joinClient');

    newSocket.on('message', (message: Message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.id === message.id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    return () => {
      if (newSocket) {
        newSocket.off('message');
        newSocket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        sender: 'client',
      };
      socket.emit('message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (socket === null) {
      const newSocket = io(`${import.meta.env.VITE_API_URL}`);
      setSocket(newSocket);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  function useChatScroll<T>(dep: T): React.MutableRefObject<HTMLDivElement> {
    const ref = React.useRef<HTMLDivElement>();
    React.useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);
    return ref;
  }

  return (
    <div className="chat-window absolute p-4 bg-black border-redZombie border-2 rounded-xl h-[400px] w-[400px] z-50 right-8 bottom-20">
      <h3>Chat</h3>
      <div
        ref={ref}
        className="chat-messages h-3/4 w-full bg-slate-400 rounded-xl overflow-y-auto"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.sender === 'client'
                ? 'flex justify-end p-2'
                : 'flex justify-start p-2'
            }
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="absolute right-1 bottom-1 w-full p-2 flex justify-end"
      >
        <input
          type="text"
          className="rounded-xl w-3/4 px-2 border-white border-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
        />
        <button type="submit" className="ml-5 border-white border-2">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
