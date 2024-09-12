/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from '../../context/UserContext';

interface Message {
  message_id: number;
  message: string;
  sender_id: number;
  receiver_id: number;
  created_at: string;
  updated_at: string;
  adminId: number;
}

function ChatBox() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const ref = useChatScroll(messages);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(newSocket);

    newSocket.emit('joinClient');

    newSocket.on('message', (message: Message) => {
      setMessages((prevMessages) => {
        if (
          !prevMessages.some((msg) => msg.message_id === message.message_id)
        ) {
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

  //charger les messages de la base de données
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(response.data.messages);

      console.log(user?.user_id);
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages`,
      {
        message: newMessage,
        sender_id: user?.user_id,
        receiver_id: messages[0].adminId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    if (socket && newMessage.trim()) {
      const message: Message = response.data;
      socket.emit('message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

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
            key={msg.message_id}
            className={
              msg.sender_id === Number(user?.user_id)
                ? 'flex justify-end p-2'
                : 'flex justify-start p-2'
            }
          >
            <div
              className={
                msg.sender_id === Number(user?.user_id)
                  ? 'bg-zinc-700 text-white p-3 rounded-xl w-fit max-w-xl mr-4'
                  : 'bg-zinc-900 text-white p-3 rounded-xl w-fit max-w-xl ml-4'
              }
            >
              <p className="text-2xl">
                Message de :{' '}
                <span
                  className={
                    msg.sender_id === Number(user?.user_id)
                      ? 'text-greenZombie'
                      : 'text-redZombie'
                  }
                >
                  {msg.sender_id === Number(user?.user_id)
                    ? 'Utilisateur'
                    : 'Admin'}
                </span>
              </p>
              <p className="text-xl">{msg.message}</p>
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
