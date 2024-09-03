import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface User {
  user_id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

function MyAccount() {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    content: string;
  } | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/account/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        setMessage({
          type: 'error',
          content: 'Impossible de récupérer les informations utilisateur.',
        });
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/account/${id}/update`,
        {
          /* données utilisateur mises à jour */
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      setMessage({
        type: 'success',
        content: 'Vos informations ont été mises à jour avec succès.',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        content:
          "Une erreur s'est produite lors de la mise à jour de vos informations.",
      });
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/account/${user?.user_id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('token');
      setUser(null);
      setMessage({
        type: 'success',
        content: 'Votre compte a été supprimé avec succès.',
      });
      navigate('/login');
    } catch (error) {
      setMessage({
        type: 'error',
        content:
          "Une erreur s'est produite lors de la suppression de votre compte.",
      });
    }
  };

  return (
    <div className="w-3/4 mt-32 m-auto">
      <h2 className="text-6xl text-center md:text-left mb-12">
        MON <em className="text-redZombie">COMPTE</em>
      </h2>
      <Link
        to="/mes-reservations"
        className="md:ml-40 sm:ml-0 text-3xl text-white border-white border-2 rounded-xl px-8 py-2 text-center"
      >
        Mes <em className="text-redZombie">Réservations</em>
      </Link>

      {/* Display success or error messages */}
      {message && (
        <p
          className={
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }
        >
          {message.content}
        </p>
      )}

      <form onSubmit={handleSubmit} className="md:flex md:flex-col mt-10">
        <div className="w-3/4 flex justify-between items-center m-auto gap-8">
          <div className="w-1/2 mt-8">
            <div className="mb-6 flex flex-col">
              <label htmlFor="lastName" className="text-3xl leading-loose">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Entrez votre Nom"
                className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
                defaultValue={user?.lastName || ''}
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
                placeholder="Entrez votre Prénom"
                className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
                defaultValue={user?.firstName || ''}
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
                placeholder="Entrez votre E-mail"
                className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
                defaultValue={user?.email || ''}
              />
            </div>
          </div>
        </div>

        <div className="my-6 m-auto flex gap-10">
          <button
            type="submit"
            className="min-w-max bg-greenZombie text-white text-2xl border-white border-2 rounded-xl self-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]"
          >
            Sauvegarder mes infos
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="min-w-max bg-redZombie text-white text-2xl border-white border-2 rounded-xl self-center [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]"
          >
            Supprimer mon compte
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyAccount;
