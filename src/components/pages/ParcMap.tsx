import { useState } from 'react';
import map from '../../assets/img/desktop/Rectangle-9-_1_.webp';

interface Attraction {
  id: number;
  name: string;
  description: string;
  x: number; // Utilisation de number pour x
  y: number; // Utilisation de number pour y
}

function ParcMap() {
  // [TODO] Récupérer les attractions avec axios
  const attractions: Attraction[] = [
    {
      id: 1,
      name: 'Zombie House',
      description: "Visiter l'antre des zombies",
      x: 21, // Utilisation de nombres
      y: 14, // Utilisation de nombres
    },
    {
      id: 2,
      name: 'Haunted Mansion',
      description: "Explorez l'inquiétante maison hantée",
      x: 76.4, // Utilisation de nombres
      y: 38, // Utilisation de nombres
    },
    // Ajoutez d'autres attractions ici
  ];

  const [hoveredAttraction, setHoveredAttraction] = useState<Attraction | null>(
    null
  );

  const handleMouseEnter = (attraction: Attraction) => {
    setHoveredAttraction(attraction);
  };

  const handleMouseLeave = () => {
    setHoveredAttraction(null);
  };

  return (
    <div className="relative mt-[104px] max-w-[1200px] mx-auto flex gap-4 flex-wrap justify-center mb-4">
      <h2 className="ml-4 w-full uppercase text-6xl text-white mb-8">
        Plan<span className="text-redZombie"> du parc</span>
      </h2>
      <div className="relative w-[500px] h-[500px]">
        {' '}
        {/* Ajout d'une taille fixe */}
        {/* Image de la carte */}
        <img
          className="w-full h-full"
          src={map}
          alt="Plan des attractions de ZombieLand"
        />
        {/* Points interactifs */}
        {attractions.map((attraction) => (
          <div
            key={attraction.id}
            className="absolute"
            style={{ left: `${attraction.x}%`, top: `${attraction.y}%` }}
            onMouseEnter={() => handleMouseEnter(attraction)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="bg-redZombie tracking-widest px-1 py-0 text-lg font-medium text-center text-white"
            >
              {attraction.name}
            </button>
          </div>
        ))}
        {/* Infobulle centrée au milieu de l'image */}
        {hoveredAttraction && (
          <div
            className="absolute bg-white text-black p-4 border border-gray-300 rounded shadow-lg"
            style={{
              left: '50%', // Centré horizontalement
              top: '50%', // Centré verticalement
              transform: 'translate(-50%, -50%)', // Centrer au milieu de l'élément parent
            }}
          >
            <h3 className="text-xl text-redZombie uppercase">
              {hoveredAttraction.name}
            </h3>
            <p>{hoveredAttraction.description}</p>
          </div>
        )}
      </div>
      <ul className="ml-4 max-w-max grid grid-cols-2 lg:grid-cols-1 gap-1">
        {attractions.map((attraction) => (
          <li key={attraction.id}>
            <h3 className="text-xl text-redZombie uppercase">
              {attraction.name}
            </h3>
            <p>{attraction.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParcMap;
