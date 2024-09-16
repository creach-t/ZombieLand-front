/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import map from '/img/desktop/plan-du-parc-zombieland-v2.webp';
import { Helmet } from 'react-helmet-async';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Attraction {
  activity_id: number;
  name: string;
  description_short: string;
  x: number;
  y: number;
  slug: string;
}

function ParcMap() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [hoveredAttraction, setHoveredAttraction] = useState<Attraction | null>(
    null
  );
  const [loadingMap, setLoadingMap] = useState<boolean>(true);

  // Fetch attractions data from the endpoint
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/activities`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch attractions data');
        }
        const data: Attraction[] = await response.json();
        setAttractions(data);
      } catch (error) {
        console.error('Error fetching attractions:', error);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchAttractions();
  }, []);

  const handleAttractionMouseEnter = (attraction: Attraction) => {
    setHoveredAttraction(attraction);
  };

  const handleAttractionMouseLeave = () => {
    setHoveredAttraction(null);
  };

  return (
    <div>
      <Helmet>
        <title>Plan du parc | Zombieland | Paris </title>
        <meta
          name="description"
          content="Naviguez facilement dans Zombieland grâce à notre plan interactif. Repérez rapidement vos attractions préférées et optimisez votre visite du parc."
        />
      </Helmet>
      <main className=" h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
        <h1 className="self-center md:self-start text-6xl">
          PLAN <span className="text-redZombie">DU PARC</span>
        </h1>
        {loadingMap ? (
          <Skeleton width={600} height={600} className="rounded-xl" />
        ) : (
          <div className="relative w-full sm:w-[500px] md:w-[600px]">
            {/* Image de la carte */}
            <img
              className="w-full sm:w-[500px] md:w-[600px] h-auto"
              src={map}
              alt="Plan des attractions de ZombieLand"
            />

            {/* Points interactifs */}
            {attractions.map((attraction) => (
              <div
                key={attraction.activity_id}
                className={`absolute divide-y divide-red-800 pt-0 text-center text-lg font-medium p-2 transition-all duration-300 ease-in-out rounded ${
                  hoveredAttraction &&
                  hoveredAttraction.activity_id === attraction.activity_id
                    ? 'bg-redZombie w-[200px]' // Taille étendue et couleur lorsqu'elle est survolée
                    : 'bg-red-800 inline-block w-[110px] h-[25px]' // Taille par défaut et couleur pour les non-survolés
                }`}
                style={{
                  left: `${attraction.x}%`,
                  top: `${attraction.y}%`,
                  transform: 'translate(-50%, 0)', // Centrer horizontalement, ne pas déplacer verticalement
                  minWidth: '50px', // Taille minimale pour les points interactifs par défaut
                  minHeight: '27px', // Taille minimale pour les points interactifs par défaut
                  display: 'flex',
                  flexDirection: 'column', // Empile les enfants verticalement
                  alignItems: 'center', // Centre horizontalement le contenu
                  zIndex:
                    hoveredAttraction &&
                    hoveredAttraction.activity_id === attraction.activity_id
                      ? 10
                      : 1, // Set higher z-index on hover
                }}
                onMouseEnter={() => handleAttractionMouseEnter(attraction)}
                onMouseLeave={handleAttractionMouseLeave}
              >
                {/* Nom de l'attraction */}
                <div className="text-s sm:text-sm md:text-base">
                  {attraction.name}
                </div>

                {/* Contenu déroulant pour la description */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    hoveredAttraction &&
                    hoveredAttraction.activity_id === attraction.activity_id
                      ? 'max-h-60 mt-2 opacity-100 delay-100' // Dérouler le contenu avec un délai
                      : 'max-h-0 opacity-0' // Cacher le contenu par défaut
                  }`}
                  style={{
                    width: '100%', // Prend toute la largeur de la div principale
                    textAlign: 'center', // Centre le texte de la description
                    transition: 'max-height 0.1s ease, opacity 0.1s ease 0.1s', // Animer l'opacité après l'expansion
                  }}
                >
                  {/* Texte de description */}
                  {hoveredAttraction &&
                    hoveredAttraction.activity_id ===
                      attraction.activity_id && (
                      <div className="divide-y divide-red-800">
                        <p className="text-white font-light pt-2">
                          {attraction.description_short}
                        </p>
                        <Link
                          className="mt-4 p-1 rounded bg-white visited:text-redZombie text-redZombie hover:text-redZombie hover:bg-red-100"
                          to={`../attractions/${attraction.slug}`}
                        >
                          En savoir plus
                        </Link>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ParcMap;
