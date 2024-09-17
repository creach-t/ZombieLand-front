/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

interface Message {
  message_id: number;
  message: string;
  sender_id: number;
  receiver_id: number;
  isRead: boolean;
  created_at: string;
  updated_at: string;
  adminId: number;
}

function ChatBox() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [adminId, setAdminId] = useState<number>(0);
  const ref = useChatScroll(messages);
  const token = localStorage.getItem('token');

  // Charger les messages de la base de données et faire un polling toutes les 5 secondes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!token || !user?.user_id) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAdminId(response.data.adminId);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };

    fetchMessages(); // Fetch au montage du composant

    // Polling toutes les 5 secondes
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle à la destruction du composant
  }, [token, user?.user_id]);

  // Marquer les messages comme lus
  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!token || !messages.length) return;

      try {
        const unreadMessages = messages.filter(
          (msg) => !msg.isRead && msg.sender_id !== Number(user?.user_id)
        );

        if (unreadMessages.length > 0) {
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/messages/markAsRead`,
            {
              userId: user?.user_id,
              adminId: adminId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error) {
        console.error('Failed to mark messages as read', error);
      }
    };

    if (messages.some((msg) => !msg.isRead)) {
      markMessagesAsRead();
    }
  }, [messages, user?.user_id, token, adminId]);

  // Envoyer un message
  const handleSendMessage = async (e: React.FormEvent | React.KeyboardEvent) => {
    if (e instanceof KeyboardEvent && e.key !== 'Enter') return; // Only handle Enter key
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/messages`,
        {
          message: newMessage,
          sender_id: user?.user_id,
          receiver_id: adminId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const message: Message = response.data;
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  // Gérer le scroll automatique du chat
  function useChatScroll<T>(
    dep: T
  ): React.MutableRefObject<HTMLDivElement | null> {
    const ref = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);

    return ref;
  }

  // Handle Enter key press event
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chat-window m-auto p-4 border-white border-2 rounded-xl h-[550px] w-11/12 right-20 bottom-24 flex flex-col justify-between">
      <div
        ref={ref}
        className="chat-messages h-3/4 w-full rounded-xl overflow-y-auto p-2"
      >
        {messages.map((msg) => (
          <div
            key={`${msg.message_id}-${msg.sender_id}-${msg.created_at}`} // Clé unique
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
                    ? user?.first_name
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
            onKeyUp={handleKeyUp}
          ></textarea>
          <button
            type="submit"
            className="absolute h-4/5 bg-zinc-900 top-1/2 right-6 text-white text-2xl font-bold px-3 py-1 border-none border-white rounded-xl hover:bg-zinc-700 z-10"
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