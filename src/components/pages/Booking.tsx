/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { usePrice } from '../../context/PriceContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ticketImg from '/img/desktop/Rectangle-8.webp';
import axios from 'axios';
import getStripe from '../../utils/getStripe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
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
  const { price } = usePrice();
  const navigate = useNavigate();
  const refInputTickets = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const bookingId = Number(searchParams.get('bookingId'));
    setIsLoading(false);

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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  useEffect(() => {
    if (price && numberOfVisitors > 0) {
      setTotalPrice(price.price * numberOfVisitors);
    }
  }, [numberOfVisitors, price]);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.warning('Vous êtes connecté(e)', {
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
          style: {
            fontFamily: 'League Gothic',
            top: '104px',
            backgroundColor: '#C90000',
            fontSize: '1.5rem',
            color: '#fff',
          },
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bookingId = response.data.booking_id;

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
    <div>
      <Helmet>
        <title>Réservation Parc Zombieland | Paris | 0666 666 666 </title>
        <meta
          name="description"
          content="Réservez vos billets pour Zombieland en quelques clics ! Sécurisez votre place pour vivre une expérience unique dans notre parc à thème post-apocalyptique."
        />
      </Helmet>
      <main className=" h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
        <ToastContainer />
        <h1 className="self-center md:self-start text-6xl">
          Réser<span className="text-redZombie">vation</span>
        </h1>
        <section className="flex flex-wrap mt-4 justify-center w-full">
          <div className="md:w-1/2 flex items-center justify-start">
            <img src={ticketImg} className="" alt="ticket pour zombieLand" />
          </div>
          <div className="w-full md:w-1/2 items-center justify-start p-8 text-white text-2xl">
            <form
              onSubmit={handleSubmit}
              className="w-full md:flex md:flex-col"
            >
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
                  className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
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
                  className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center text-white bg-zinc-900"
                />
              </div>
              <p className="text-3xl">
                Tarif unique :{' '}
                <em className="text-redZombie">
                  {price ? price.price : 0.0} €
                </em>
              </p>
              <p className="text-5xl text-center my-12">
                Total :{' '}
                <em className="text-redZombie">
                  {totalPrice ? totalPrice.toFixed(2) : '0.00'} €
                </em>
              </p>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-greenZombie text-black text-3xl border-white border-2 rounded-xl md:max-w-xs self-center mb-8"
              >
                {isLoading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-6 h-6 me-3 text-redZombie animate-spin"
                    viewBox="0 0 100 101"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#666666"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  'Je réserve'
                )}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Booking;
