/* eslint-disable react/react-in-jsx-scope */
import StarRating from '../StarRating/StarRating';

interface ReviewCardProps {
  content: string;
  rating: number;
  clientName: string;
}

function ReviewCard({ content, rating, clientName }: ReviewCardProps) {
  return (
    <div className="review-card bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between h-full mr-3  w-80">
      <p className="text-xl mb-4">{content}</p>
      <p className="text-md text-gray-400 mb-2">Posté par : {clientName}</p>
      <StarRating rating={rating} />
    </div>
  );
}

export default ReviewCard;
