import { Link } from 'react-router-dom';
import { useState } from 'react';
import desktopImage from '../../assets/img/desktop/attraction-zombie-city-zombieland.webp';
import mobileImage from '../../assets/img/mobile/attraction-zombie-city-mob-zombieland.webp';

interface AttractionDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}
// dynamisation
function ActivityDetail() {
  const [attractionDetail, setAttractionDetail] =
    useState<AttractionDetail>(null);
  return (
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-xl mx-auto ">
      <h1 className="self-start text-6xl">
        NOM <span className="text-redZombie ali">ATTRACTIONS</span>
      </h1>
      <button
        type="submit"
        className="text-white text-2xl bg-red-700 font-bold rounded-xl px-3 py-1 self-start	"
      >
        Nigthmare terror
      </button>
      <section className="flex flex-wrap mt-4 justify-center">
        <picture className="md:w-1/2">
          <source media="(min-width:465px)" srcSet={desktopImage} />
          <img src={mobileImage} alt="Zombie City" />
        </picture>

        <p className="md:w-1/2 self-center p-8 text-white text-2xl">
          Bienvenue à Zombie City, l'ultime épreuve de survie urbaine. La ville
          est en ruines, envahie par des hordes de zombies affamés. Votre
          mission : échapper à ce cauchemar en trouvant des indices, en
          décryptant des énigmes, et en évitant les pièges mortels qui se
          cachent à chaque coin de rue. Dans ce labyrinthe de bâtiments
          abandonnés, d’égouts obscurs, et de ruelles sinistres, le temps est
          votre pire ennemi. Vous avez 60 minutes pour trouver la sortie… ou
          devenir une proie de plus pour les morts-vivants.
        </p>
        <Link
          to="/booking"
          type="button"
          className="text-white text-2xl text-center font-bold rounded-xl w-5/6 py-1 self-center mt-4 bg-transparent border-2 border-white "
        >
          Acheter un billet
        </Link>
      </section>

      <section className="flex flex-col	justify-start self-start p-8">
        <h2 className="text-white text-2xl mt-4 ">
          D’autres attractions qui pourraient vous plaire
        </h2>

        <p className="text-white">Lien des autres atractions</p>
      </section>
    </main>
  );
}
export default ActivityDetail;
