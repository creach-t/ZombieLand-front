/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import getImageName from '../../utils/imageAttractionsFormat';

interface ActivityCardProps {
  activity: {
    activity_id: number;
    name: string;
    slug: string;
  };
}

function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div
      className="relative flex justify-center items-center w-full max-w-[400px] max-h-[400px] aspect-square"
      style={{
        backgroundImage: `url(/img/desktop/attractions/${getImageName(activity.name)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-6xl text-center text-shadow-md text-white">
        {activity.name.toUpperCase()}
      </h2>
      <Link
        to={`/attractions/${activity.slug}`}
        type="button"
        className="text-white text-2xl bg-darkGreenZombie hover:bg-red-700 hover:outline-none hover:text-white focus:outline-none focus:ring-black font-bold rounded-xl px-3 py-1 text-center absolute bottom-1/4 shadow-md"
        aria-label={`Learn more about ${activity.name}`}
      >
        En savoir plus
      </Link>
    </div>
  );
}

export default ActivityCard;
