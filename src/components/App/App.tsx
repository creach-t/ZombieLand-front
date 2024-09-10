/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import { PriceProvider } from '../../context/PriceContext';
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
import Contact from '../pages/Contact';
import ActivityDetail from '../pages/ActivityDetail';
import MyBookings from '../pages/MyBookings';
import PasswordReset from '../pages/passwordReset';
import NewPassword from '../pages/newPassword';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ZombieRun from '../pages/ZombieRun';
import ScrollToTop from '../ScrollTopTop/ScrollToTop';
import { useState } from 'react';
import ChatBox from '../ChatBox/ChatBox';
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div>
      <UserProvider>
        <PriceProvider>
          <NavBar />
          <button
            type="button"
            onClick={toggleChat}
            className="fixed bottom-5 right-5 bg-redZombie text-white p-4 rounded-full hover:border-greenZombie"
          >
            Chat
            <span className="absolute inline-flex rounded-full h-3 w-3 bg-red-600 top-0"></span>
            <span className="animate-ping absolute top-0 inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75"></span>
          </button>
          {isChatOpen && <ChatBox />} <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mon-compte/:id" element={<MyAccount />} />
            <Route path="/inscription" element={<Signin />} />
            <Route path="/se-connecter" element={<Login />} />
            <Route path="/plan-du-parc" element={<ParcMap />} />
            <Route path="/infos-pratiques" element={<Infos />} />
            <Route path="/reserver" element={<Booking />} />
            <Route path="/attractions" element={<Activities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/attractions/:id" element={<ActivityDetail />} />
            <Route path="/mes-reservations" element={<MyBookings />} />
            <Route
              path="/politique-de-confidentialite"
              element={<PrivacyPolicy />}
            />
            <Route path="/zombie-run" element={<ZombieRun />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </PriceProvider>
      </UserProvider>
    </div>
  );
}

export default App;
