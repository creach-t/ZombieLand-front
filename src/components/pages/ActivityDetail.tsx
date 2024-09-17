/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import getImageName from '../../utils/imageAttractionsFormat';
import { Helmet } from 'react-helmet-async';
import StarRating from '../StarRating/StarRating';
import ReviewCard from '../ReviewCard/ReviewCard';
import { useUser } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Slider configuration
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  centerMode: true,
  centerPadding: '20%',
  responsive: [
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        centerPadding: '10%',
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: '0',
      },
    },
  ],
};

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
  slug: string;
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
  const { slug } = useParams<{ slug: string }>();
  const token = localStorage.getItem('token');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: attraction } = await axios.get(
          `${import.meta.env.VITE_API_URL}/activities/${slug}`
        );
        setAttractionDetail(attraction);

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
        setNotFound(true);
      }
    };

    loadData();
  }, [slug]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté pour laisser un avis', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        style: {
          fontFamily: 'League Gothic',
          top: '104px',
          backgroundColor: '#C90000',
          fontSize: '1.5rem',
          color: '#fff',
        },
      });
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        {
          rating,
          content: newContent,
          client_id: user?.user_id,
          activity_id: attractionDetail?.activity_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(false);
      setNewContent('');
      setRating(0);
      toast.success(
        'Merci pour votre avis il sera affiché après modération par notre équipe',
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          style: {
            fontFamily: 'League Gothic',
            top: '104px',
            backgroundColor: '#62F974',
            fontSize: '1.5rem',
            color: '#000',
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error);

      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          (error.response.data as { message: string }).message
        ) {
          toast.error((error.response.data as { message: string }).message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            style: {
              fontFamily: 'League Gothic',
              top: '104px',
              backgroundColor: '#C90000',
              fontSize: '1.5rem',
              color: '#fff',
            },
          });
        } else {
          toast.error("Une erreur est survenue lors de l'envoi de votre avis", {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            style: {
              fontFamily: 'League Gothic',
              top: '104px',
              backgroundColor: '#C90000',
              fontSize: '1.5rem',
              color: '#fff',
            },
          });
        }
      } else {
        // Si ce n'est pas une erreur Axios
        toast.error('Une erreur inconnue est survenue', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          style: {
            fontFamily: 'League Gothic',
            top: '104px',
            backgroundColor: '#C90000',
            fontSize: '1.5rem',
            color: '#fff',
          },
        });
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (notFound) {
    return <Navigate to="/404" />;
  }

  if (!attractionDetail) {
    return <div>Chargement...</div>;
  }

  const categoryName =
    attractionDetail.categories.length > 0
      ? attractionDetail.categories[0].name
      : 'Non spécifié';

  const desktopImage = `/img/desktop/attractions/${getImageName(attractionDetail.name)}`;
  const mobileImage = `/img/mobile/attractions/${getImageName(attractionDetail.name)}`;

  return (
    <div>
      <Helmet>
        <title>{attractionDetail.name} | Parc Zombieland | Paris</title>
        <meta
          name="description"
          content={`${attractionDetail.name} : ${attractionDetail.description_short}`}
        />
      </Helmet>
      <main className="w-full mt-[104px] flex flex-col items-center md:items-start pt-10 max-w-screen-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left">
          {attractionDetail.name}{' '}
          <span className="text-redZombie">ATTRACTIONS</span>
        </h1>
        <ToastContainer />
        <p className="mt-4 text-lg md:text-2xl text-white bg-red-700 font-bold rounded-xl px-4 py-2">
          {categoryName}
        </p>
        <section className="mt-6 w-full flex flex-col md:flex-row justify-center items-center gap-6">
          <picture className="w-full md:w-1/2">
            <source media="(min-width: 465px)" srcSet={desktopImage} />
            <img
              src={mobileImage}
              alt={attractionDetail.name}
              className="w-full h-auto rounded-lg"
            />
          </picture>
          <div className="w-full md:w-1/2 p-4">
            <p className="text-white text-xl md:text-2xl mb-6">
              {attractionDetail.description}
            </p>

            {/* Section des avis */}
            <div className="bg-redZombie rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Avis des survivants
              </h2>
              <div className="sliderCss my-6">
                {attractionDetail.reviews.length > 0 ? (
                  attractionDetail.reviews.length > 1 ? (
                    <Slider {...sliderSettings} className="w-full">
                      {attractionDetail.reviews.map((review: Review) => (
                        <ReviewCard
                          key={review.review_id}
                          content={review.content}
                          rating={review.rating}
                          clientName={`${review.client.first_name} ${review.client.last_name}`}
                        />
                      ))}
                    </Slider>
                  ) : (
                    <ReviewCard
                      content={attractionDetail.reviews[0].content}
                      rating={attractionDetail.reviews[0].rating}
                      clientName={`${attractionDetail.reviews[0].client.first_name} ${attractionDetail.reviews[0].client.last_name}`}
                    />
                  )
                ) : (
                  <p className="text-white text-xl">
                    Aucun avis pour l&apos;instant. Laissez le premier avis !
                  </p>
                )}
              </div>

              <button
                onClick={openModal}
                className="text-lg md:text-2xl text-white bg-darkGreenZombie font-bold rounded-xl px-4 py-2 mt-4"
              >
                Laisser un avis
              </button>
            </div>
          </div>
        </section>

        <div className="flex flex-col w-full justify-center items-center">
          <Link
            to="/reserver"
            className="text-lg md:text-2xl text-white font-bold bg-transparent border-2 border-white rounded-xl px-6 py-2 mt-6"
          >
            Acheter un billet
          </Link>
        </div>

        {/* Section for similar attractions */}
<section className="py-10 flex flex-col w-full justify-center items-center gap-10 flex-wrap">
  <h2 className="text-white text-2xl mt-4">
    D’autres attractions qui pourraient vous plaire
  </h2>
  <div className="flex gap-10 flex-wrap justify-center">
    {similarAttractions.length > 0 ? (
      similarAttractions.map((currentActivity) => (
        <div
          key={currentActivity.activity_id}
          style={{
            backgroundImage: `url(/img/desktop/attractions/${getImageName(
              currentActivity.name
            )})`,
          }}
          className="w-full sm:w-[300px] md:w-[200px] lg:w-[400px] h-[400px] md:h-[350px] lg:h-[400px] bg-cover bg-center bg-no-repeat rounded-xl relative flex justify-center items-center"
        >
          <h2 className="badgrunge text-6xl text-center text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_80%)]">
            {currentActivity.name}
          </h2>
          <Link
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            to={`/attractions/${currentActivity.slug}`}
            className="text-white text-2xl bg-darkGreenZombie hover:bg-red-700 font-bold rounded-xl px-3 py-1 text-center absolute bottom-1/4 [box-shadow:_1px_1px_0_rgb(0_0_0_/_40%)]"
          >
            En savoir plus
          </Link>
        </div>
      ))
    ) : (
      <p className="text-white text-xl">Aucune attraction similaire trouvée.</p>
    )}
  </div>
</section>
      </main>

      {/* Modal for adding a review */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-black p-6 rounded-lg w-96">
            <h2 className="text-2xl mb-4 text-white">Laisser un avis</h2>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                className="w-full p-2 border border-gray-400 rounded mb-4 bg-gray-700 text-white"
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
