/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ticketImg from '../../assets/img/desktop/Rectangle-8.webp';
import axios from 'axios';
import getStripe from '../../utils/getStripe';

function Booking() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');
  const [numberOfVisitors, setNumberOfVisitors] = useState(
    location.state?.numberOfVisitors || 0
  );
  const [visitDate, setVisitDate] = useState(location.state?.visitDate || '');
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const refInputTickets = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const bookingId = Number(searchParams.get('bookingId'));

    if (status && bookingId) {
      if (status === 'success') {
        // Mettre à jour la réservation en 'confirmed'
        updateReservationStatus(bookingId, 'confirmed');
      } else if (status === 'cancel') {
        setMessage('Le paiement a été annulé.');
      }
    }
  }, [location.search]);

  const updateReservationStatus = async (
    booking_id: number,
    status: string
  ) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/booking/${booking_id}`,
        {
          status,
        }
      );
      if (status === 'confirmed') {
        navigate('/mes-reservations');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(
          'Il y a eu un souci pendant la mise à jour de votre réservation.'
        );
      }
    }
  };

  useEffect(() => {
    const price = 6666;
    setTotalPrice((price * numberOfVisitors) / 100);
  }, [numberOfVisitors]);

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = Number(event.target.value);
    setNumberOfVisitors(inputValue);
  }

  async function handleCheckout(bookingId: number) {
    const stripe = await getStripe();
    if (stripe) {
      try {
        const { error } = await stripe.redirectToCheckout({
          lineItems: [
            {
              price: 'price_1PvhABAYcocwkm1zNWt849Uq',
              quantity: numberOfVisitors,
            },
          ],
          mode: 'payment',
          successUrl: `${window.location.origin}/reserver?status=success&bookingId=${bookingId}`,
          cancelUrl: `${window.location.origin}/reserver?status=cancel&bookingId=${bookingId}`,
          customerEmail: user?.email,
        });

        if (error) {
          console.warn(error.message);
          setMessage('Le paiement a échoué. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Erreur lors de la redirection Stripe:', error);
        setMessage('Une erreur est survenue lors de la tentative de paiement.');
      }
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
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/booking`,
        {
          date: visitDate,
          status: 'pending',
          nb_tickets: numberOfVisitors,
          client_id: user.user_id,
        }
      );

      const bookingId = response.data.booking_id;

      handleCheckout(bookingId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(
          'Il y a eu un souci pendant la création de votre réservation.'
        );
      }
    }
  };

  return (
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
      <h1 className="self-center md:self-start text-6xl">
        Réser<span className="text-redZombie">vation</span>
      </h1>
      {message && (
        <p
          className={`${
            status === 'success' ? 'bg-darkGreenZombie' : 'bg-redZombie'
          } rounded-xl p-2 mb-2 text-white`}
        >
          {message}
        </p>
      )}
      <section className="flex flex-wrap mt-4 justify-center w-full">
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
                ref={refInputTickets}
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
