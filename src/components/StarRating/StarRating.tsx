import React from 'react';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => setRating && setRating(i + 1)}
        style={{ cursor: 'pointer', fontSize: '2rem' }}
      >
        {i < rating ? '★' : '☆'}{' '}
      </span>
    );
  }

  return <div className="ratingFont">{stars}</div>;
};

export default StarRating;
