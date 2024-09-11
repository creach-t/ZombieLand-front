import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i}>★</span>); // Étoile pleine
    } else {
      stars.push(<span key={i}>☆</span>); // Étoile vide
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
