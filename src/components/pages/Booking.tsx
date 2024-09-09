/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ticketImg from '../../assets/img/desktop/Rectangle-8.webp';
import axios from 'axios';
import getStripe from '../../utils/getStripe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Booking() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');
  const [numberOfVisitors, setNumberOfVisitors] = useState(
    location.state?.numberOfVisitors || 0
  );
  const [visitDate, setVisitDate] = useState(location.state?.visitDate || '');
  const [totalPrice, setTotalPrice] = useState(0);
  const [visitorError, setVisitorError] = useState('');
  const [dateError, setDateError] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();
  const refInputTickets = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bookingId = Number(searchParams.get('bookingId'));

    if (status && bookingId) {
      if (status === 'success') {
        updateReservationStatus(bookingId, 'confirmed');
      } else if (status === 'cancel') {
        toast.warning('Le paiement a été annulé.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          className: 'bg-redZombie text-white text-2xl',
          style: { fontFamily: 'League Gothic', top: '104px' },
        });
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
        navigate('/mes-reservations', {
          state: { showToast: true, bookingId: booking_id },
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.warning(
          'Il y a eu un soucis pendant la mise à jour de votre réservation.',
          {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            className: 'bg-redZombie text-white text-2xl',
            style: { fontFamily: 'League Gothic', top: '104px' },
          }
        );
      }
    }
  };
  // Alert user connection

  useEffect(() => {
    const price = 6666;
    setTotalPrice((price * numberOfVisitors) / 100);
  }, [numberOfVisitors]);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.warning('Vous êtes connecté', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-greenZombie text-black text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });
    }
  }, [location.state]);

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = Number(event.target.value);
    setNumberOfVisitors(inputValue);

    if (inputValue <= 0 || inputValue > 100) {
      setVisitorError("Merci d'indiquer un nombre de visiteurs valide");
    } else {
      setVisitorError('');
    }
  }

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedDate = event.target.value;
    setVisitDate(selectedDate);

    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      setDateError("Merci d'indiquer une date valide pour votre visite");
    } else {
      setDateError('');
    }
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
          toast.warning('Le paiement a échoué. Veuillez réessayer.', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            className: 'bg-redZombie text-white text-2xl',
            style: { fontFamily: 'League Gothic', top: '104px' },
          });
        }
      } catch (error) {
        console.error('Erreur lors de la redirection Stripe:', error);
        toast.warning(
          'Une erreur est survenue lors de la tentative de paiement.',
          {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            className: 'bg-redZombie text-white text-2xl',
            style: { fontFamily: 'League Gothic', top: '104px' },
          }
        );
      }
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error(
        "Vous n'êtes pas connecté(e) ! Vous allez être redirigé(e) sur la page de connexion",
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'bg-redZombie text-white text-2xl',
          style: { fontFamily: 'League Gothic', top: '104px' },
        }
      );
      setTimeout(() => {
        navigate('/se-connecter', {
          state: {
            from: '/reserver',
            numberOfVisitors,
            visitDate,
          },
        });
      }, 3000);
      return;
    }

    if (visitorError || dateError) {
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

      toast.success('Merci pour votre réservation', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        className: 'bg-greenZombie text-black text-2xl',
        style: { fontFamily: 'League Gothic', top: '104px' },
      });

      handleCheckout(bookingId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.warning(
          'Il y a eu un souci pendant la création de votre réservation.',
          {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            className: 'bg-redZombie text-white text-2xl',
            style: { fontFamily: 'League Gothic', top: '104px' },
          }
        );
      }
    }
  };

  return (
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
      <ToastContainer />
      <h1 className="self-center md:self-start text-6xl">
        Réser<span className="text-redZombie">vation</span>
      </h1>
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
                Nombre de visiteurs{' '}
                <span className="text-sm text-redZombie">{visitorError}</span>
              </label>
              <input
                ref={refInputTickets}
                type="number"
                id="numberOfVisitors"
                name="numberOfVisitors"
                placeholder="Entrez le nombre de visiteurs"
                min={0}
                max={100}
                value={numberOfVisitors === 0 ? '' : numberOfVisitors}
                onChange={handlePriceChange}
                className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
              />
            </div>
            <div className="mb-6 flex flex-col">
              <label htmlFor="date" className="text-3xl leading-loose">
                Votre date de visite{' '}
                <span className="text-sm text-redZombie">{dateError}</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={visitDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={handleDateChange}
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
