import { Link } from 'react-router-dom';

function Login() {
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
            id="mail"
            name="mail"
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
        <button
          type="submit"
          className="w-full mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl md:max-w-xs self-center"
        >
          Me connecter
        </button>
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
