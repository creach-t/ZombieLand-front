import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../context/UserContext';
import { User } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

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
          navigate('/mon-compte');
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
        style: {
          fontFamily: 'League Gothic',
          top: '104px',
          backgroundColor: '#62F974',
          fontSize: '1.5rem',
          color: '#000',
        },
      });
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      // Utiliser toast.error au lieu de setError
      toast.error('Veuillez remplir tous les champs', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        style: {
          fontFamily: 'League Gothic',
          top: '104px',
          backgroundColor: '#C90000',
          fontSize: '1.5rem',
          color: '#fff',
        },
      });
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

      // Afficher un toast de succès après connexion
      toast.success('Connexion réussie', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        style: {
          fontFamily: 'League Gothic',
          top: '104px',
          backgroundColor: '#62F974',
          fontSize: '1.5rem',
          color: '#000',
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Nom d'utilisateur ou mot de passe non reconnu",
        axiosError
      );

      // Utiliser toast.error pour afficher un message d'erreur
      toast.error("Nom d'utilisateur ou mot de passe non reconnu", {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        style: {
          fontFamily: 'League Gothic',
          top: '104px',
          backgroundColor: '#C90000',
          fontSize: '1.5rem',
          color: '#fff',
        },
      });
    }
    setIsLoading(false);
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
          <button
            disabled={isLoading}
            type="submit"
            className="mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl w-full"
          >
            {isLoading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-6 h-6 me-3 text-redZombie animate-spin"
                viewBox="0 0 100 101"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#666666"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              'Me connecter'
            )}
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
