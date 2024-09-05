/* eslint-disable react/react-in-jsx-scope */
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ticketImg from '../../assets/img/desktop/Rectangle-8.webp';
import axios from 'axios';

function Booking() {
  const location = useLocation();
  const [numberOfVisitors, setNumberOfVisitors] = useState(
    location.state?.numberOfVisitors || 0
  );
  const [visitDate, setVisitDate] = useState(location.state?.visitDate || '');
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = Number(event.target.value);
    const price = 6666;

    setNumberOfVisitors(inputValue);

    if (inputValue < 0) {
      setTotalPrice(0);
    } else {
      setTotalPrice((price * inputValue) / 100);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      navigate('/se-connecter', {
        state: {
          from: '/reserver',
          numberOfVisitors,
          visitDate,
        },
      });
    } else {
      /* navigate('/paiement-stripe', {
        state: { totalPrice, numberOfVisitors, visitDate },
      }); */
      //axios create booking in database
      try {
        await axios.post('/booking', {
          date: visitDate,
          status: 'pending',
          nb_tickets: numberOfVisitors,
          client_id: user.user_id,
        });

        navigate('/se-connecter');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(
            'il y a eu un souci pendant la création de votre réservation'
          );
        }
      }
    }
  };

  return (
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
      <h1 className="self-center md:self-start text-6xl">
        Réser<span className="text-redZombie">vation</span>
      </h1>
      <section className="flex flex-wrap mt-4 justify-center w-full">
        {errorMessage && (
          <p className="bg-redZombie rounded-xl p-2 mb-2 text-white">
            {errorMessage}
          </p>
        )}
        <div className="md:w-1/2 flex items-center justify-start">
          <img src={ticketImg} className="" alt="ticket pour zombieLand" />
        </div>
        <div className="w-full md:w-1/2 items-center justify-start p-8 text-white text-2xl">
          <form onSubmit={handleSubmit} className="w-full md:flex md:flex-col">
            <div className="mb-6 flex flex-col">
              <label
                htmlFor="numberOfVisitors"
                className="text-3xl leading-loose"
              >
                Nombre de visiteurs
              </label>
              <input
                type="number"
                id="numberOfVisitors"
                name="numberOfVisitors"
                placeholder="Entrez le nombre de visiteurs"
                min={0}
                max={100}
                value={numberOfVisitors}
                onChange={handlePriceChange}
                className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
              />
            </div>
            <div className="mb-6 flex flex-col">
              <label htmlFor="date" className="text-3xl leading-loose">
                Votre date de visite
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
              />
            </div>
            <p className="text-3xl">
              Tarif unique : <em className="text-redZombie">66.66€</em>
            </p>
            <p className="text-5xl text-center my-12">
              Total : <em className="text-redZombie">{totalPrice} €</em>
            </p>
            <button
              type="submit"
              className="w-full bg-greenZombie text-black text-3xl border-white border-2 rounded-xl md:max-w-xs self-center mb-8"
            >
              Je réserve
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Booking;
