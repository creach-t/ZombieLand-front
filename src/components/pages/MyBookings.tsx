/* eslint-disable react/react-in-jsx-scope */
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { differenceInDays } from 'date-fns';

interface Booking {
  booking_id: number;
  client_id: number;
  date: string;
  status: string;
  nb_tickets: string;
  created_at: string;
}

function MyBookings() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const formatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' });
  const location = useLocation();
  const [loadingBookings, setLoadingBookings] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/se-connecter';
    }
  }, []);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success('Merci, pour votre réservation.', {
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
      });
    }
  }, [location.state]);

  useEffect(() => {
    const loadUserBookings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/account`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data.booking);
      } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
      } finally {
        setLoadingBookings(false);
      }
    };

    loadUserBookings();
  }, [user?.user_id]);

  const translateStatus = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'canceled':
        return 'Annulée';
      case 'completed':
        return 'Terminée';
      default:
        return status;
    }
  };

  const handleDelete = async (bookingId: number) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {

        setBookings((prevBookings) => prevBookings.filter((booking) => booking.booking_id !== bookingId));
  
        toast.success('Réservation supprimée avec succès.', {
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
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
  
      toast.warning('Échec de la suppression de la réservation.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        style: {
          fontFamily: 'League Gothic',
          top: '104px',
          backgroundColor: '#C90000',
          fontSize: '1.5rem',
          color: '#000',
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Mes réservations | Zombieland | Paris </title>
      </Helmet>
      <main className=" h-full w-full mt-[104px] flex flex-col items-center pt-5 max-w-screen-2xl mx-auto">
        <h1 className="self-center md:self-start text-6xl">
          MON <em className="text-redZombie">COMPTE</em>
        </h1>
        <ToastContainer />
        <div className="flex gap-4">
          <Link
            to={`/mon-compte`}
            className="text-3xl text-white border-white border-2 rounded-xl px-8 py-2 text-center mb-10"
          >
            Mes <em className="text-redZombie ">Informations</em>
          </Link>
          <Link
            to="/mes-messages"
            className="text-3xl text-white border-white border-2 rounded-xl px-8 py-2 text-center mb-10"
          >
            Mes <em className="text-redZombie ">Messages</em>
          </Link>
        </div>

        <div className="w-3/4 mx-auto py-1 max-sm:w-full max-sm:px-2">
          <div className="relative flex flex-col w-full h-full text-white bg-clip-border">
            <div className="overflow-y-auto max-h-[400px]">
              {' '}
              {loadingBookings ? (
                <Skeleton height={188} className="rounded-xl w-full" />
              ) : (
                <table className="w-full text-left table-auto mb-[100px] min-w-max">
                  <thead>
                    <tr>
                      <th className="p-3 border-b border-slate-200 bg-white">
                        <p className="text-md font-semibold leading-none text-black">
                          #
                        </p>
                      </th>
                      <th className="p-3 border-b border-slate-200 bg-white">
                        <p className="text-md font-semibold leading-none text-black">
                          Nombre de billet(s)
                        </p>
                      </th>
                      <th className="p-3 border-b border-slate-200 bg-white">
                        <p className="text-md font-semibold leading-none text-black">
                          Status
                        </p>
                      </th>
                      <th className="p-3 border-b border-slate-200 bg-white">
                        <p className="text-md font-semibold leading-none text-black">
                          Date de visite
                        </p>
                      </th>
                      <th className="p-3 border-b border-slate-200 bg-white">
                        <p className="text-md font-semibold leading-none text-black">
                          Réservé le
                        </p>
                      </th>
                      <th className="p-3 border-b border-slate-200 bg-white">
                        <p className="text-md font-semibold leading-none text-black">
                          Action
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
  {bookings.map((booking) => {
    const isDeletable =
      differenceInDays(new Date(booking.date), new Date()) >= 10 &&
      translateStatus(booking.status) === 'En attente';

    return (
      <tr key={booking.booking_id} className="hover:bg-redZombie border-b border-slate-200">
        <td className="p-3">
          <p className="block font-semibold text-sm text-white">{booking.booking_id}</p>
        </td>
        <td className="p-3">
          <p className="text-md text-white">{booking.nb_tickets}</p>
        </td>
        <td className="p-3">
          <p className="text-md text-white">{translateStatus(booking.status)}</p>
        </td>
        <td className="p-3 ">
          <p className="text-md text-white">{formatter.format(new Date(booking.date))}</p>
        </td>
        <td className="p-3 ">
          <p className="text-md text-white">{formatter.format(new Date(booking.created_at))}</p>
        </td>
        <td className="p-3">
          <button
            onClick={() => handleDelete(booking.booking_id)}
            disabled={!isDeletable}
            className={`text-white px-4 py-2 rounded-xl ${
              isDeletable ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Supprimer la réservation
          </button>
        </td>
      </tr>
    );
  })}
</tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyBookings;
