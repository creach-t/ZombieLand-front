/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import Star from './Star';

interface StarsProps {
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
}

function Stars({ maxRating = 5, onRatingChange, size = 40 }: StarsProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);

    if (onRatingChange) {
      onRatingChange(ratingValue);
    }
  };

  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex cursor-pointer gap-2">
      {Array.from({ length: maxRating }, (_, index) => index + 1).map(
        (star) => (
          <Star
            key={star}
            filled={hoverRating >= star || rating >= star}
            size={size}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          />
        )
      )}
    </div>
  );
}

export default Stars;
