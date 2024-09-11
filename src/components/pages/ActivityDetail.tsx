/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import getImageName from '../../utils/imageAttractionsFormat';
import { Helmet } from 'react-helmet-async';
import StarRating from '../StarRating/StarRating';
import { useUser } from '../../context/UserContext';

interface Category {
  category_id: number;
  name: string;
}

interface User {
  first_name: string;
  last_name: string;
}

interface Review {
  review_id: number;
  rating: number;
  content: string;
  client_id: number;
  client: User;
}

interface Activity {
  activity_id: number;
  name: string;
  description_short: string;
  description: string;
  minimal_age: number;
  capacity: number;
  x: number;
  y: number;
  categories: Category[];
  reviews: Review[];
}

function ActivityDetail() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [attractionDetail, setAttractionDetail] = useState<Activity | null>(
    null
  );
  const [similarAttractions, setSimilarAttractions] = useState<Activity[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: attraction } = await axios.get(
          `${import.meta.env.VITE_API_URL}/activities/${id}`
        );
        setAttractionDetail(attraction);
        console.log(attractionDetail);

        if (attraction.categories.length > 0) {
          const categoryId = attraction.categories[0].category_id;
          const { data: similarActivities } = await axios.get(
            `${import.meta.env.VITE_API_URL}/activities/category/${categoryId}`
          );
          const filteredAttractions = similarActivities.filter(
            (activity: Activity) =>
              activity.activity_id !== attraction.activity_id
          );
          setSimilarAttractions(filteredAttractions);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    loadData();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Vous devez être connecté pour soumettre un avis');
      return;
    }
    try {
      const newReviewData = {
        rating,
        content: newContent,
        client_id: user?.user_id,
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        newReviewData
      );
      setIsModalOpen(false);
      setNewContent(''); // Réinitialiser le contenu après soumission
      setRating(0); // Réinitialiser la note après soumission
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!attractionDetail) {
    return <div>Chargement...</div>;
  }

  const categoryName =
    attractionDetail.categories.length > 0
      ? attractionDetail.categories[0].name
      : 'Non spécifié';

  const desktopImage = `/src/assets/img/desktop/attractions/${getImageName(attractionDetail.name)}`;
  const mobileImage = `/src/assets/img/mobile/attractions/${getImageName(attractionDetail.name)}`;

  return (
    <div>
      <Helmet>
        <title>{attractionDetail.name} | Parc Zombieland | Paris</title>
        <meta
          name="description"
          content={`${attractionDetail.name} : ${attractionDetail.description_short}`}
        />
      </Helmet>
      <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
        <h1 className="self-center md:self-start text-6xl">
          {attractionDetail.name}{' '}
          <span className="text-redZombie">ATTRACTIONS</span>
        </h1>

        <button className="text-white text-2xl bg-red-700 font-bold rounded-xl px-3 py-1 md:self-start mt-4">
          {categoryName}
        </button>

        <section className="flex flex-wrap mt-4 justify-center">
          <div className="flex w-full justify-around items-center">
            <picture className="md:w-1/2">
              <source media="(min-width:465px)" srcSet={desktopImage} />
              <img src={mobileImage} alt={attractionDetail.name} />
            </picture>
            <div className="md:w-1/2 self-center p-8">
              <p className="text-white text-2xl">
                {attractionDetail.description}
              </p>

              {attractionDetail.reviews.map((review: Review) => (
                <div key={review.review_id} className="w-full">
                  <p className="text-white text-2xl">{review.content}</p>
                  <p>
                    {review.client.first_name} {review.client.last_name}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/reserver"
            className="text-white text-2xl text-center font-bold rounded-xl w-5/6 py-1 self-center mt-4 bg-transparent border-2 border-white"
          >
            Acheter un billet
          </Link>

          {/* Button to open modal */}
          <button
            onClick={openModal}
            className="text-white text-2xl bg-darkGreenZombie font-bold rounded-xl px-3 py-1 mt-4"
          >
            Laisser un avis
          </button>
        </section>

        <section className="bg-black py-10 flex flex-col justify-center items-center gap-10 flex-wrap">
          <h2 className="text-white text-2xl mt-4">
            D’autres attractions qui pourraient vous plaire
          </h2>
          <div className="flex gap-10 flex-wrap justify-center">
            {similarAttractions.length > 0 ? (
              similarAttractions.map((currentActivity) => (
                <div
                  key={currentActivity.activity_id}
                  style={{
                    backgroundImage: `url(/src/assets/img/desktop/attractions/${getImageName(currentActivity.name)})`,
                  }}
                  className="w-[400px] md:w-[200px] lg:w-[400px] h-[400px] md:h-[350px] lg:h-[400px] bg-cover bg-center bg-no-repeat rounded-xl relative flex justify-center items-center"
                >
                  <h2 className="badgrunge text-6xl text-center text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]">
                    {currentActivity.name}
                  </h2>
                  <Link
                    to={`/attractions/${currentActivity.activity_id}`}
                    className="text-white text-2xl bg-darkGreenZombie hover:bg-red-700 font-bold rounded-xl px-3 py-1 text-center absolute bottom-1/4 [box-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]"
                  >
                    En savoir plus
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-white text-xl">
                Aucune attraction similaire trouvée.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Modal for adding a review */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl mb-4">Laisser un avis</h2>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                className="w-full p-2 border border-gray-400 rounded mb-4"
                rows={5}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Écrivez votre avis..."
              />
              <StarRating rating={rating} setRating={setRating} />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-darkGreenZombie text-white font-bold py-2 px-4 rounded"
                >
                  Soumettre
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityDetail;
