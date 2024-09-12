import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../context/UserContext';
import { User } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedUser = jwtDecode<User>(token);
        const currentTime = Date.now() / 1000;

        if (decodedUser.exp && decodedUser.exp < currentTime) {
          localStorage.removeItem('token');
        } else {
          setUser(decodedUser);
          navigate(`/mon-compte/${decodedUser.user_id}`);
        }
      } catch (error) {
        console.error('Token is invalid', error);
        localStorage.removeItem('token');
      }
    }
  }, [setUser, navigate]);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success('Compte créé avec succès', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-greenZombie text-black text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);

      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);

      const redirectTo = location.state?.from || '/';
      const numberOfVisitors = location.state?.numberOfVisitors || 0;
      const visitDate = location.state?.visitDate || '';

      if (redirectTo === '/reserver') {
        navigate('/reserver', {
          state: { numberOfVisitors, visitDate, showToast: true },
        });
      } else {
        navigate(redirectTo, { state: { showToast: true } });
      }
    } catch (error) {
      console.error("Nom d'utilisateur ou mot de passe non reconnu", error);
      setError("Nom d'utilisateur ou mot de passe non reconnu");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Connexion | Parc Zombieland | Paris </title>
        <meta
          name="description"
          content="Connectez-vous à votre compte Zombieland pour gérer vos réservations, consulter vos avantages et préparer votre prochaine visite dans notre univers terrifiant."
        />
      </Helmet>

      <main className=" h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
        <h1 className="self-center md:self-start text-6xl">
          Log<em className="text-redZombie">in</em>
        </h1>
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="md:flex md:flex-col py-14 w-4/5"
        >
          <div className="mb-6 flex flex-col">
            <label htmlFor="mail" className="text-3xl leading-loose">
              E-mail
            </label>
            <input
              type="email"
              id="mail"
              name="mail"
              placeholder="Entrez votre E-mail"
              className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-10 flex flex-col">
            <label htmlFor="password" className="text-3xl leading-loose">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to="/password-reset"
              className="text-redZombie visited:text-redZombie text-2xl text-right underline cursor-pointer"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          {error && (
            <p className="bg-redZombie text-2xl rounded-xl p-2 mb-2">{error}</p>
          )}
          <button
            type="submit"
            className="mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl w-full"
          >
            Me connecter
          </button>
        </form>
        <p className="text-center text-2xl mb-40">
          Pas de compte ?
          <Link
            className="text-redZombie visited:text-redZombie underline text-4xl ml-4"
            to="/inscription"
          >
            Créer un compte
          </Link>
        </p>
      </main>
    </div>
  );
}

export default Login;
