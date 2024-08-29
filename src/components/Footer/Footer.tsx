function Footer() {
  return (
    <footer className="flex justify-around w-screen bg-black">
      <div className="w-1/4">
        <h3 className="badgrunge">ZombieLand</h3>
        <p>
          A seulement quelques minutes de Paris, ZombieLand est un parc de
          zombies immersif où l&apos;horreur devient réalité !
        </p>
      </div>
      <div className="w-1/4">
        <h3 className="leaguegothic">
          Liens <span className="text-redZombie">utiles</span>
        </h3>
        <ul>
          <li>
            <a href="/leparc">Le Parc</a>
          </li>
          <li>
            <a href="/attractions">Attractions</a>
          </li>
          <li>
            <a href="/reservations">Réservations</a>
          </li>
          <li>
            <a href="/connection">Se connecter</a>
          </li>
        </ul>
      </div>
      <div className="w-1/4">
        <h3 className="leaguegothic">
          Nous<span className="text-redZombie">Contacter</span>
        </h3>
        <ul>
          <li>+33 0666 666 666</li>
          <li>Formulaire de contact</li>
          <li>66 rue de l'enfer</li>
        </ul>
      </div>
      <div className="w-1/4">
        <h3 className="text-redZombie">
          Suivez-<span>nous</span>
        </h3>
        <ul>
          <li>FB</li>
          <li>INSTA</li>
          <li>TIKTOK</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
