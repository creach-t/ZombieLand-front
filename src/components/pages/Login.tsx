import { useState } from 'react';
import { Link } from 'react-router-dom';
import blood from '../../assets/img/desktop/blood-splatter-clip-art-pictures-19.png';

function Login() {
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  function handleAnimationOnMouseDown() {
    setIsAnimationActive(true);
    setTimeout(() => {
      setIsAnimationActive(false);
    }, 2000);
  }
  return (
    <div className="w-4/5 md:max-w-5xl mt-40 m-auto">
      <h2 className="text-6xl uppercase text-center md:text-left mb-12">
        Log<em className="text-redZombie">in</em>
      </h2>
      <form action="#" className="md:flex md:flex-col">
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
          />
          <a
            href="#"
            className="text-redZombie text-2xl text-right underline cursor-pointer"
          >
            Mot de passe oublié ?
          </a>
        </div>
        <p className="bg-redZombie rounded-xl p-2 mb-2 invisible">
          Nom d'utilisateur ou mot de passe non reconnu
        </p>
        <div className="relative inline-block text-center">
          {isAnimationActive && (
            <>
              <img
                src={blood}
                alt="éclaboussure de sang"
                className="absolute inset-0 z-0 w-fit h-fit left-1/2 -top-1/2 pointer-events-none animate-fade-out"
              />
              <img
                src={blood}
                alt="éclaboussure de sang"
                className="absolute inset-0 z-0 w-fit h-fit rotate-90 left-1/4 pointer-events-none animate-fade-out"
              />
            </>
          )}
          <button
            type="submit"
            className="relative z-10 w-full mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl md:max-w-xs self-center transition active:scale-95 hover:border-redZombie"
            onMouseDown={handleAnimationOnMouseDown}
          >
            Me connecter
          </button>
        </div>
      </form>
      <p className="text-center text-2xl mb-40">
        Pas de compte ?{' '}
        <Link className="text-redZombie" to="/inscription">
          Créer un compte
        </Link>{' '}
      </p>
    </div>
  );
}

export default Login;
