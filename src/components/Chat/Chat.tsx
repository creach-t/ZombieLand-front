import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: number;
  text: string;
  sender: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
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
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <div className="chat-window absolute p-5 bg-white rounded-xl h-[400px] w-[400px] z-50 right-8 bottom-20">
      <h3>Chat</h3>
      <div className="chat-messages h-3/4 w-full bg-slate-400 rounded-xl overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="absolute right-1 bottom-1 w-full flex justify-end"
      >
        <input
          type="text"
          className="rounded-xl w-3/4 px-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
        />
        <button type="submit" className="ml-5">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Chat;
