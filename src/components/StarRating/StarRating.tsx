import React from 'react';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => setRating(i + 1)} // Met à jour la note quand l'utilisateur clique sur une étoile
        style={{ cursor: 'pointer', fontSize: '2rem' }} // Ajoute un style de curseur pour indiquer que c'est cliquable
      >
        {i < rating ? '★' : '☆'}{' '}
        {/* Étoile pleine ou vide en fonction de la note actuelle */}
      </span>
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;
