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
import MyMessages from '../pages/MyMessages';
import PasswordReset from '../pages/passwordReset';
import NewPassword from '../pages/newPassword';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ZombieRun from '../pages/ZombieRun';
import ScrollToTop from '../ScrollTopTop/ScrollToTop';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const helmetContext = {};

  return (
    <div>
      <HelmetProvider context={helmetContext}>
        <UserProvider>
          <PriceProvider>
            <NavBar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mes-reservations" element={<MyBookings />} />
              <Route path="/mes-messages" element={<MyMessages />} />
              <Route path="/mon-compte" element={<MyAccount />} />
              <Route path="/inscription" element={<Signin />} />
              <Route path="/se-connecter" element={<Login />} />
              <Route path="/plan-du-parc" element={<ParcMap />} />
              <Route path="/infos-pratiques" element={<Infos />} />
              <Route path="/reserver" element={<Booking />} />
              <Route path="/attractions" element={<Activities />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/new-password" element={<NewPassword />} />
              <Route path="/attractions/:slug" element={<ActivityDetail />} />
              <Route
                path="/politique-de-confidentialite"
                element={<PrivacyPolicy />}
              />
              <Route path="/pancakes" element={<ZombieRun />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </PriceProvider>
        </UserProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
