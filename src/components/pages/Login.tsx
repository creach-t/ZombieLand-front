import { useState, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);

      const decodedUser = jwtDecode(token);
      setUser(decodedUser);

      // Redirection vers la home page en attendant la page de profil
      navigate('/');
      console.log('User logged in successfully:', response.data);
    } catch (err) {
      setError("Nom d'utilisateur ou mot de passe non reconnu");
    }
  };

  return (
    <div className="w-4/5 md:max-w-5xl mt-40 m-auto">
      <h2 className="text-6xl uppercase text-center md:text-left mb-12">
        Log<em className="text-redZombie">in</em>
      </h2>
      <form onSubmit={handleSubmit} className="md:flex md:flex-col">
        <div className="mb-6 flex flex-col">
          <label htmlFor="mail" className="text-3xl leading-loose">
            E-mail
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            placeholder="Entrez votre E-mail"
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
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
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a
            href="#"
            className="text-redZombie text-2xl text-right underline cursor-pointer"
          >
            Mot de passe oublié ?
          </a>
        </div>
        {error && (
          <p className="bg-redZombie text-2xl rounded-xl p-2 mb-2">{error}</p>
        )}
        <button
          type="submit"
          className="w-full mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl md:max-w-xs self-center"
        >
          Me connecter
        </button>
      </form>
      <p className="text-center text-2xl mb-40">
        Pas de compte ?
        <Link className="text-redZombie" to="/inscription">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}

export default Login;
