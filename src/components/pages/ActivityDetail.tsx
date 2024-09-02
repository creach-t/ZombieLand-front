import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getImageName from '../../utils/imageAttractionsFormat';

interface AttractionDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  category_id: number;
}
interface CategoryDetail {
  id: number;
  name: string;
}

// dynamisation
function ActivityDetail() {
  const [attractionDetail, setAttractionDetail] =
    useState<AttractionDetail | null>(null);
  const [categoryDetail, setCategoryDetail] = useState<CategoryDetail | null>(
    null
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:3000/activities/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAttractionDetail(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, [id]);
  useEffect(() => {
    fetch(`http://localhost:3000/category/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryDetail(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, [attractionDetail?.category_id]);
  if (!attractionDetail || !categoryDetail) {
    return <div>Chargement...</div>;
  }

  const desktopImage = `/src/assets/img/desktop/attractions/${getImageName(attractionDetail.name)}`;
  const mobileImage = `/src/assets/img/mobile/attractions/${getImageName(attractionDetail.name)} `;
  return (
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-xl mx-auto ">
      <h1 className="self-start text-6xl">
        {attractionDetail.name}{' '}
        <span className="text-redZombie ali">ATTRACTIONS</span>
      </h1>
      <button className="text-white text-2xl bg-red-700 font-bold rounded-xl px-3 py-1 self-start	">
        {categoryDetail.name}
      </button>
      <section className="flex flex-wrap mt-4 justify-center">
        <picture className="md:w-1/2">
          <source media="(min-width:465px)" srcSet={desktopImage} />
          <img src={mobileImage} alt="Zombie City" />
        </picture>

        <p className="md:w-1/2 self-center p-8 text-white text-2xl">
          {attractionDetail.description}
        </p>
        <Link
          to="/booking"
          type="button"
          className="text-white text-2xl text-center font-bold rounded-xl w-5/6 py-1 self-center mt-4 bg-transparent border-2 border-white "
        >
          Acheter un billet
        </Link>
      </section>

      <section className="flex flex-col	justify-start self-start p-8">
        <h2 className="text-white text-2xl mt-4 ">
          D’autres attractions qui pourraient vous plaire
        </h2>

        <p className="text-white">Lien des autres attractions</p>
      </section>
    </main>
  );
}
export default ActivityDetail;
