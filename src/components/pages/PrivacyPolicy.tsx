/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */

const PrivacyPolicy = () => {
  return (
    <main className="text-white h-full w-full mt-[104px] p-10 flex flex-col items-center max-w-screen-2xl mx-auto">
      <h1 className="text-6xl mb-8">Politique de Confidentialité</h1>

      <section className="text-lg">
        <p>
          Bienvenue sur ZombieLand ! Nous prenons votre vie privée très au
          sérieux (contrairement aux zombies qui, eux, n’ont pas vraiment de
          scrupules). Voici comment nous protégeons vos données, afin que vous
          puissiez profiter de votre visite en toute tranquillité… ou presque !
        </p>

        <h2 className="text-4xl mt-10 mb-4">1. Collecte des Informations</h2>
        <p>
          Lorsque vous visitez ZombieLand, nous collectons quelques informations
          essentielles pour que vous puissiez passer un moment inoubliable (sans
          être poursuivi par des zombies). Ces informations incluent :
        </p>
        <ul className="list-disc ml-10 mt-2">
          <li>Nom et Prénom</li>
          <li>Adresse Email</li>
          <li>Coordonnées (adresse, numéro de téléphone)</li>
          <li>Informations de paiement</li>
        </ul>

        <h2 className="text-4xl mt-10 mb-4">2. Utilisation des Informations</h2>
        <p>
          Vos données sont précieuses, tout comme votre cerveau pour les
          zombies, mais nous, on s'en sert pour des raisons beaucoup plus
          civilisées :
        </p>
        <ul className="list-disc ml-10 mt-2">
          <li>Gestion des réservations</li>
          <li>Envoi de newsletters et promotions</li>
          <li>Amélioration de nos services</li>
        </ul>

        <h2 className="text-4xl mt-10 mb-4">3. Partage des Informations</h2>
        <p>
          Nous partageons vos données uniquement avec des partenaires de
          confiance qui aident à rendre votre expérience meilleure (et plus
          sûre). Par exemple :
        </p>
        <ul className="list-disc ml-10 mt-2">
          <li>Prestataires de paiement</li>
          <li>Hébergeurs de site et services techniques</li>
        </ul>

        <h2 className="text-4xl mt-10 mb-4">4. Sécurité des Informations</h2>
        <p>
          Chez ZombieLand, nous utilisons toutes les mesures de sécurité
          nécessaires pour protéger vos données. Nous avons des pare-feux
          (contre les attaques numériques, pas les zombies) et utilisons le
          chiffrement des informations sensibles.
        </p>

        <h2 className="text-4xl mt-10 mb-4">5. Vos Droits</h2>
        <p>En tant que survivant(e), vous avez certains droits :</p>
        <ul className="list-disc ml-10 mt-2">
          <li>Accéder à vos informations</li>
          <li>Modifier ou supprimer vos données</li>
          <li>Droit à l’oubli</li>
        </ul>

        <h2 className="text-4xl mt-10 mb-4">6. Cookies</h2>
        <p>
          Comme tout bon site web, nous utilisons des cookies pour améliorer
          votre navigation. Ces petits fichiers nous aident à personnaliser
          votre expérience.
        </p>

        <h2 className="text-4xl mt-10 mb-4">
          7. Modifications de cette Politique
        </h2>
        <p>
          ZombieLand peut mettre à jour cette politique de confidentialité de
          temps en temps. Toute modification sera publiée ici.
        </p>

        <h2 className="text-4xl mt-10 mb-4">8. Nous Contacter</h2>
        <p>
          Pour toute question concernant cette politique ou pour exercer vos
          droits, n’hésitez pas à nous contacter :
        </p>
        <ul className="list-disc ml-10 mt-2">
          <li>Email : support@zombieland.com</li>
          <li>Téléphone : +33 6 66 66 66 66</li>
          <li>Adresse : 123 Rue des Survivants, 75001 Paris</li>
        </ul>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
