import React from 'react';
import { Link } from 'react-router-dom';

/*
1. clique sur mot de passe oublié 
2. une page avec un input email ou envoyé le renouvellement du mdp
3. envoi d'un mail à l'adresse entré dans l'input :

e-mail type : 

"
Quelqu'un – peut-être vous – demande un nouveau mot de passe pour ZombieLand.
Pour confirmer ce changement de mot de passe, cliquez sur ce lien :

boardgamearena.com/account?page=newpassword&user=84234983&code=1dTFDCQbMzGZvB1TpceS

Sinon, merci d'ignorer cet e-mail.

Note : si le lien ci-dessus ne fonctionne pas, vous pouvez le copier-coller dans la barre d'adresse de votre navigateur internet.


Amusez-vous bien !

Mickael Jackson from ZombieLand
"

4. au clique sur le lien de l'email : 

  2 inputs :
  - choisissez un mot de passe
  - Confirmez le mot de passe

5. au submit redirige vers le login
*/

function PasswordReset() {
  
  return (
    <div className="w-4/5 md:max-w-5xl mt-40 m-auto">
      <h2 className="text-6xl uppercase text-center md:text-left mb-12">
        Changement de <em className="text-redZombie">mot de passe</em>
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
        
        <button
          type="submit"
          className="w-full mb-6 bg-greenZombie text-black text-3xl border-white border-2 rounded-xl md:max-w-xs self-center"
        >
          Récupérer mon mot de passe
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

export default PasswordReset;
