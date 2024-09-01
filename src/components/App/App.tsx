// App.tsx
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import Home from '../pages/Home';
import MyAccount from '../pages/MyAccount';
import Signin from '../pages/Signin';
import ParcMap from '../pages/ParcMap';
import NotFoundPage from '../pages/404';
import Infos from '../pages/Infos';
import Booking from '../pages/Booking';
import Activities from '../pages/Activities';
import Login from '../pages/Login';
import Chat from '../Chat/Chat';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <NavBar />
      <button
        type="button"
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-redZombie text-white p-4 rounded-full"
      >
        Chat
      </button>
      {isChatOpen && <Chat />}{' '}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mon-compte" element={<MyAccount />} />
        <Route path="/inscription" element={<Signin />} />
        <Route path="/se-connecter" element={<Login />} />
        <Route path="/plan-du-parc" element={<ParcMap />} />
        <Route path="/infos-pratiques" element={<Infos />} />
        <Route path="/reserver" element={<Booking />} />
        <Route path="/attractions" element={<Activities />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
