import React, { useState } from 'react';
import api from '../api/api';

function Signin() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/signin', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      console.log('User created successfully:', response.data);

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage('il y a eu un souci pendant la création du compte');
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
          <label htmlFor="mail" className="text-3xl leading-loose">
            Prénom
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
          <label htmlFor="mail" className="text-3xl leading-loose">
            Nom
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
            E-mail
          </label>
          <input
            type="text"
            id="mail"
            name="mail"
            placeholder="Entrez votre E-mail"
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-10 flex flex-col">
          <label htmlFor="mail" className="text-3xl leading-loose">
            Mot de passe
          </label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="bg-redZombie rounded-xl p-2 mb-2 invisible">
          Nom d&apos;utilisateur ou mot de passe non reconnu
        </p>
        <button
          type="submit"
          className="w-full mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl self-center"
        >
          M&apos;inscrire
        </button>
      </form>
    </main>
  );
}

export default Signin;
