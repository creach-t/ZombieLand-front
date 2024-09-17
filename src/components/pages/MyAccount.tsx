/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

const validateNewPassword = (password: string) => {
  let errors = false;

  if (password.length < 6) {
    errors = true;
    toast.warning(
      'Votre nouveau mot de passe doit contenir au moins 6 caractères.',
      {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      }
    );
  }
  if (!/[0-9]/.test(password)) {
    errors = true;
    toast.warning(
      'Votre nouveau mot de passe doit contenir au moins un chiffre.',
      {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      }
    );
  }
  if (!/[A-Z]/.test(password)) {
    errors = true;
    toast.warning(
      'Votre nouveau mot de passe doit contenir au moins une majuscule.',
      {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      }
    );
  }
  if (!/[a-z]/.test(password)) {
    errors = true;
    toast.warning(
      'Votre nouveau mot de passe doit contenir au moins une minuscule.',
      {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-redZombie text-white text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      }
    );
  }

  return !errors;
};

function MyAccount() {
  const { setUser } = useUser();
  const [thisUser, setThisUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/se-connecter');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/account`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setThisUser(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des infos utilisateur:',
          error
        );
        toast.error('Impossible de récupérer les informations utilisateurs', {
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
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updateData: {
      first_name?: string;
      last_name?: string;
      email?: string;
      password?: string;
    } = {
      first_name: firstName !== thisUser?.first_name ? firstName : undefined,
      last_name: lastName !== thisUser?.last_name ? lastName : undefined,
      email: email !== thisUser?.email ? email : undefined,
    };

    try {
      if (oldPassword) {
        await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email,
          password: oldPassword,
        });

        const isNewPasswordValid = validateNewPassword(newPassword);

        if (!newPassword) {
          toast.error('Veuillez renseigner votre nouveau mot de passe', {
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

        if (!(newPassword === confirmPassword)) {
          toast.error('Les nouveaux mots de passe ne correspondent pas', {
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

        if (!isNewPasswordValid) return;

        updateData.password = newPassword;
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/account/${thisUser?.user_id}/update`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { newToken, newUser } = response.data;
      if (newToken && newUser) {
        localStorage.setItem('token', newToken);
        setUser(newToken);
        setThisUser(newUser);
      }

      setUser((prevUser) => prevUser && { ...prevUser, ...newUser });

      toast.success('Informations mises à jour avec succès', {
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
      console.error('Erreur lors de la mise à jour des informations:', error);
      toast.error(
        "Une erreur s'est produite lors de la mise à jour de vos informations",
        {
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
        }
      );
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/account/${thisUser?.user_id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
      toast.error(
        "Une erreur s'est produite lors de la suppression de votre compte",
        {
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
        }
      );
    }
  };

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/se-connecter');
  };

  return (
    <div>
      <Helmet>
        <title>Mon compte 🧟 | Zombieland | Paris </title>
      </Helmet>
      <main className="h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
        <ToastContainer />
        <h1 className="self-center md:self-start text-6xl">
          MON <em className="text-redZombie">COMPTE</em>
        </h1>
        <div className="flex max-sm:mt-5 gap-4">
          <Link
            to="/mes-reservations"
            className="text-3xl text-white border-white border-2 rounded-xl px-8 py-2 text-center"
          >
            Mes <em className="text-redZombie ">Réservations</em>
          </Link>
          <Link
            to="/mes-messages"
            className="text-3xl text-white border-white border-2 rounded-xl px-8 py-2 text-center"
          >
            Mes <em className="text-redZombie ">Messages</em>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-3/4 md:flex md:flex-col mt-10 max-sm:w-full max-sm:px-1 max-md:w-full"
        >
          <div className="w-3/4 flex flex-col md:flex-row justify-between items-center m-auto gap-8 max-sm:w-full">
            {/* Personal Information Section */}
            <div className="w-full md:w-1/2 mt-8">
              <div className="mb-6 flex flex-col">
                <label htmlFor="lastName" className="text-3xl leading-loose">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="votre Nom"
                  className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label htmlFor="firstName" className="text-3xl leading-loose">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="votre Prénom"
                  className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label htmlFor="email" className="text-3xl leading-loose">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="votre E-mail"
                  className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Change Section */}
            <div className="w-full md:w-1/2">
              <h4 className="text-center text-2xl">Changer de mot de passe</h4>
              <div className="mb-6 flex flex-col">
                <label htmlFor="oldPassword" className="text-3xl leading-loose">
                  Ancien mot de passe
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="votre ancien mot de passe"
                  className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label htmlFor="newPassword" className="text-3xl leading-loose">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="votre nouveau mot de passe"
                  className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-3xl leading-loose"
                >
                  Confirmez mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmez mot de passe"
                  className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="my-6 m-auto flex gap-10 flex-col md:flex-row">
            <button
              type="submit"
              className="min-w-max bg-greenZombie text-white text-2xl border-white border-2 rounded-xl self-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]"
            >
              Sauvegarder mes infos
            </button>
            <button
              onClick={openConfirmModal}
              type="button"
              className="min-w-max bg-redZombie text-white text-2xl border-white border-2 rounded-xl self-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]"
            >
              Supprimer mon compte
            </button>
            {isConfirmModalOpen && (
              <div
                className="modal-veil fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                onClick={closeConfirmModal}
              >
                <div
                  className="modal-container text-3xl p-8 rounded-xl flex flex-col gap-4"
                  onClick={(e) => e.stopPropagation()}
                  style={{ backgroundColor: '#121212' }}
                >
                  <h2>Êtes-vous sûr de vouloir supprimer votre compte ?</h2>
                  <p>Cette action est irréversible.</p>
                  <div className="btn-container flex items-center justify-center gap-4">
                    <button
                      className="min-w-max bg-greenZombie text-white text-2xl border-white border-2 rounded-xl self-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]"
                      onClick={handleDelete}
                    >
                      Confirmer
                    </button>
                    <button
                      className="min-w-max bg-redZombie text-white text-2xl border-white border-2 rounded-xl self-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]"
                      onClick={closeConfirmModal}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              type="button"
              className="min-w-max bg-darkGreenZombie text-white text-2xl border-white border-2 rounded-xl self-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]"
            >
              Se déconnecter
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default MyAccount;
