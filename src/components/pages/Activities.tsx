/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import getImageName from '../../utils/imageAttractionsFormat';
import { Helmet } from 'react-helmet-async';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
}

interface Category {
  category_id: number;
  name: string;
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loadingActivities, setLoadingActivities] = useState<boolean>(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/activities`
        );
        setActivities(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des activités:', error);
      } finally {
        setLoadingActivities(false);
      }
    };

    const loadCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/category`
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };

    loadActivities();
    loadCategories();
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const matchesCategory =
      selectedCategory === null ||
      activity.categories.some(
        (category) => category.category_id === selectedCategory
      );

    const matchesSearchTerm = activity.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <Helmet>
        <title>Les attractions | Parc Zombieland | Paris </title>
        <meta
          name="description"
          content="Découvrez nos attractions effrayantes et palpitantes à Zombieland. Frissons garantis avec des parcours immersifs et des expériences inoubliables !"
        />
      </Helmet>
      <main className=" h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto px-4">
        <h1 className="self-center md:self-start text-4xl md:text-6xl">
          LES <span className="text-redZombie">ATTRACTIONS</span>
        </h1>

        {/* Form with Search and Category Filters */}
        <form
          className="inline-flex justify-center items-center py-14 gap-10 w-full max-sm:block relative"
          onSubmit={handleFormSubmit}
        >
          {/* Search Input */}
          {loadingActivities ? (
            <Skeleton
              height={56}
              className="rounded-xl w-full max-w-[600px]"
            />
          ) : (
            <label
              htmlFor="activity"
              className="cursor-pointer input input-bordered flex items-center gap-2 relative w-full max-w-[600px]"
            >
              <input
                type="text"
                name="activity"
                id="activity"
                className="grow bg-white text-black p-2 md:p-3 pr-10 md:pr-14 text-xl md:text-2xl rounded-xl"
                placeholder="Votre recherche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#000000"
                className="size-10 absolute right-3"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          )}

          {/* Category Select */}
          {loadingActivities ? (
            <Skeleton width={250} className="rounded-xl h-14" />
          ) : (
            <select
              className="rounded-xl text-white mt-5 md:mt-0 text-xl md:text-3xl pl-5 pr-10 h-12 md:h-14 bg-redZombie focus:outline-none cursor-pointer"
              onChange={(e) => {
                const categoryId =
                  e.currentTarget.value === ''
                    ? null
                    : Number(e.currentTarget.value);
                setSelectedCategory(categoryId);
              }}
              value={selectedCategory ?? ''}
            >
              <option value="">Catégories</option>
              {categories.map((currentCategory) => (
                <option
                  key={currentCategory.category_id}
                  value={currentCategory.category_id}
                >
                  {currentCategory.name}
                </option>
              ))}
            </select>
          )}
        </form>

        {/* Activities Section */}
        <section className="py-10 flex justify-center items-center gap-5 md:gap-10 flex-wrap">
          {loadingActivities ? (
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-[100%] sm:w-[400px] h-[100vw] sm:h-[400px] max-w-[400px] max-h-[400px]"
              >
                <Skeleton width="100%" height="100%" />
              </div>
            ))
          ) : filteredActivities.length > 0 ? (
            filteredActivities.map((currentActivity) => (
              <div
                key={currentActivity.activity_id}
                style={{
                  backgroundImage: `url(/img/desktop/attractions/${getImageName(
                    currentActivity.name
                  )})`,
                }}
                className="w-[100%] sm:w-[400px] h-[100vw] sm:h-[400px] max-w-[400px] max-h-[400px] bg-cover bg-center bg-no-repeat rounded-xl relative flex justify-center items-center activity_card"
              >
                <h2 className="badgrunge text-white text-3xl md:text-6xl text-center [text-shadow:_2px_2px_1px_rgb(0_0_0_/_80%)]">
                  {currentActivity.name}
                </h2>
                <Link
                  to={`/attractions/${currentActivity.slug}`}
                  type="button"
                  className="text-white text-xl md:text-2xl bg-darkGreenZombie hover:bg-red-700 hover:outline-none hover:text-white focus:outline-none focus:ring-black font-bold rounded-xl px-2 py-1 md:px-3 md:py-1 text-center absolute bottom-1/4 shadow-md"
                >
                  En savoir plus
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-xl">Aucune attraction ne correspond à vos critères.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Activities;