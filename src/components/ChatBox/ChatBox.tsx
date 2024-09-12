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
    <div className="chat-window m-auto p-4 border-white border-2 rounded-xl h-[550px] w-11/12 z-50 right-20 bottom-24 flex flex-col justify-between">
      <div
        ref={ref}
        className="chat-messages h-3/4 w-full rounded-xl overflow-y-auto p-2"
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
            <div
              className={
                msg.sender === 'client'
                  ? 'bg-zinc-700 text-white p-3 rounded-xl w-fit max-w-xl mr-4'
                  : 'bg-zinc-900 text-white p-3 rounded-xl w-fit max-w-xl ml-4'
              }
            >
              <p className="text-2xl">
                Message de :{' '}
                <span
                  className={
                    msg.sender === 'client'
                      ? 'text-greenZombie'
                      : 'text-redZombie'
                  }
                >
                  {msg.sender === 'client' ? 'Utilisateur' : 'Admin'}
                </span>
              </p>
              <p className="text-xl">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="w-full flex justify-between"
      >
        <div className="input-container relative w-full h-full">
          <textarea
            placeholder="Envoyer votre message, un admin vous répondra dans les plus brefs délais"
            className="w-full h-20 bg-zinc-900 border-2 border-white rounded-xl m-auto text-2xl p-2 pr-20 duration-300 focus:h-40 resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="absolute h-4/5 bg-zinc-900 m top-1/2 right-6 text-white text-2xl font-bold px-3 py-1 border-none border-white rounded-xl hover:bg-zinc-700 z-10"
            style={{
              transform: 'translateY(-55%)',
            }}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatBox;
