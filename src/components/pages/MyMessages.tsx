/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import ChatBox from '../ChatBox/ChatBox';
import { useEffect } from 'react';

let HelmetPackage: {
  Helmet: unknown;
  default?: unknown;
  HelmetData?: unknown;
  HelmetProvider?: unknown;
};
// import conditionnel des styles pour SSR
if (typeof window !== 'undefined') {
  HelmetPackage = await import('react-helmet-async');
}

function MyMessages() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/se-connecter';
    }
  }, []);

  return (
    <div>
      <HelmetPackage.Helmet>
        <title>Mon compte 🧟 | Zombieland | Paris </title>
      </HelmetPackage.Helmet>
      <main className="h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
        <h1 className="self-center md:self-start text-6xl">
          MON <em className="text-redZombie">COMPTE</em>
        </h1>
        <div className="flex gap-4">
          <Link
            to={`/mon-compte`}
            className="text-3xl text-white border-white border-2 rounded-xl px-5 py-2 text-center mb-10"
          >
            Mes <em className="text-redZombie ">Informations</em>
          </Link>
          <Link
            to="/mes-reservations"
            className="text-3xl text-white border-white border-2 rounded-xl px-5 py-2 text-center mb-10"
          >
            Mes <em className="text-redZombie ">Réservations</em>
          </Link>
        </div>
        <ChatBox />
      </main>
    </div>
  );
}

export default MyMessages;
