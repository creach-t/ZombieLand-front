import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

function Signin() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState<{
    [key: string]: boolean;
  }>({});
  const [flashClass, setFlashClass] = useState('text-sm text-gray-500');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(errorMessages).length > 0) {
      const interval = setInterval(() => {
        setFlashClass((prevClass) =>
          prevClass === 'text-sm text-gray-500'
            ? 'text-sm text-redZombie'
            : 'text-sm text-gray-500'
        );
      }, 500);

      return () => clearInterval(interval);
    }
  }, [errorMessages]);

  const validateForm = () => {
    const errors: { [key: string]: boolean } = {};

    if (!firstName) {
      errors.firstName = true;
      toast.warning('Le prénom est requis.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });
    }

    if (!lastName) {
      errors.lastName = true;
      toast.warning('Le nom est requis.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });
    }

    if (!email) {
      errors.email = true;
      toast.warning("L'email est requis.", {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = true;
      toast.warning("L'email doit être valide (ex: adresse@provider.com).", {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });
    }

    if (!password) {
      errors.password = true;
      toast.warning('Le mot de passe est requis.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });
    } else {
      if (password.length < 6) {
        errors.password = true;
        toast.warning('Le mot de passe doit contenir au moins 6 caractères.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          className: 'bg-redZombie text-white text-2xl',
          style: { fontFamily: 'League Gothic', top: '104px' },
        });
      }
      if (!/[0-9]/.test(password)) {
        errors.password = true;
        toast.warning('Le mot de passe doit contenir au moins un chiffre.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          className: 'bg-redZombie text-white text-2xl',
          style: { fontFamily: 'League Gothic', top: '104px' },
        });
      }
      if (!/[A-Z]/.test(password)) {
        errors.password = true;
        toast.warning('Le mot de passe doit contenir au moins une majuscule.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          className: 'bg-redZombie text-white text-2xl',
          style: { fontFamily: 'League Gothic', top: '104px' },
        });
      }
      if (!/[a-z]/.test(password)) {
        errors.password = true;
        toast.warning('Le mot de passe doit contenir au moins une minuscule.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          className: 'bg-redZombie text-white text-2xl',
          style: { fontFamily: 'League Gothic', top: '104px' },
        });
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrorMessages(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/signin', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setErrorMessages({});
      setIsLoading(false);

      navigate('/se-connecter', { state: { showToast: true } });
    } catch (error: unknown) {
      setIsLoading(false);

      if (error instanceof Error) {
        setErrorMessages({ general: true });
        toast.warning('Il y a eu un souci pendant la création du compte.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          className: 'bg-redZombie text-white text-2xl',
          style: { fontFamily: 'League Gothic', top: '104px' },
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Inscription | Zombieland | Paris </title>
        <meta
          name="description"
          content="Inscrivez-vous dès maintenant au Parc Zombieland et accédez à nos attractions uniques. Créez votre compte en quelques étapes simples et profitez d'offres exclusives pour planifier votre visite inoubliable."
        />
      </Helmet>
      <main className=" h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
        <h1 className="self-center md:self-start text-6xl">
          Sign<em className="text-redZombie">In</em>
        </h1>
        <form
          onSubmit={handleSubmit}
          action="#"
          className="md:flex md:flex-col w-4/5 py-14"
        >
          <div className="mb-6 flex flex-col">
            <label htmlFor="first_name" className="text-3xl leading-loose">
              Prénom{' '}
              <span
                className={`${
                  errorMessages.firstName ? flashClass : 'text-sm text-gray-500'
                }`}
              >
                * champs requis
              </span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Entrez votre prénom"
              className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label htmlFor="last_name" className="text-3xl leading-loose">
              Nom{' '}
              <span
                className={`${
                  errorMessages.lastName ? flashClass : 'text-sm text-gray-500'
                }`}
              >
                * champs requis
              </span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Entrez votre nom"
              className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label htmlFor="mail" className="text-3xl leading-loose">
              E-mail{' '}
              <span
                className={`${
                  errorMessages.email ? flashClass : 'text-sm text-gray-500'
                }`}
              >
                * champs requis, au format adresse@provider.com
              </span>
            </label>
            <input
              type="email"
              id="mail"
              name="mail"
              placeholder="Entrez votre E-mail"
              className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-10 flex flex-col">
            <label htmlFor="password" className="text-3xl leading-loose">
              Mot de passe{' '}
              <span
                className={`${
                  errorMessages.password ? flashClass : 'text-sm text-gray-500'
                }`}
              >
                * minimum 6, chiffre, majuscule, minuscule
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessages.general && (
            <p className="bg-redZombie rounded-xl p-2 mb-2 text-white">
              Il y a eu un souci pendant la création du compte
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl self-center"
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
              "M'inscrire"
            )}
          </button>
        </form>
        <ToastContainer />
      </main>
    </div>
  );
}

export default Signin;
