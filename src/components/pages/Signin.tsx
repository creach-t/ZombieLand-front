import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // This will style the toast

function Signin() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: boolean }>({});
  const [flashClass, setFlashClass] = useState('text-sm text-gray-500');
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(errorMessages).length > 0) {
      const interval = setInterval(() => {
        setFlashClass((prevClass) =>
          prevClass === 'text-sm text-gray-500' ? 'text-sm text-redZombie' : 'text-sm text-gray-500'
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
      toast.warning('L\'email est requis.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = true;
      toast.warning('L\'email doit être valide (ex: adresse@provider.com).', {
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
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrorMessages(formErrors);
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

      navigate('/se-connecter', { state: { showToast: true } });
    } catch (error: unknown) {
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
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
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
            <span className={`${errorMessages.firstName ? flashClass : 'text-sm text-gray-500'}`}>
              * champs requis
            </span>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Entrez votre prénom"
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-6 flex flex-col">
          <label htmlFor="last_name" className="text-3xl leading-loose">
            Nom{' '}
            <span className={`${errorMessages.lastName ? flashClass : 'text-sm text-gray-500'}`}>
              * champs requis
            </span>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Entrez votre nom"
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-6 flex flex-col">
          <label htmlFor="mail" className="text-3xl leading-loose">
            E-mail{' '}
            <span className={`${errorMessages.email ? flashClass : 'text-sm text-gray-500'}`}>
              * champs requis, doit correspondre au format adresse@provider.com
            </span>
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            placeholder="Entrez votre E-mail"
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-10 flex flex-col">
          <label htmlFor="password" className="text-3xl leading-loose">
            Mot de passe{' '}
            <span className={`${errorMessages.password ? flashClass : 'text-sm text-gray-500'}`}>
              * doit contenir au minimum 6 caractères, dont 1 chiffre, 1 majuscule et 1 minuscule
            </span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
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
          className="w-full mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl self-center"
        >
          M&apos;inscrire
        </button>
      </form>
      <ToastContainer />
    </main>
  );
}

export default Signin;