import { useState } from 'react';
import ticketImg from '../../assets/img/desktop/Rectangle-8.webp';

function Booking() {
  const [totalPrice, setTotalPrice] = useState(0);

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = Number(event.target.value);
    const price = 6666;

    if (inputValue < 0) {
      setTotalPrice(0);
    } else {
      setTotalPrice((price * inputValue) / 100);
    }
  }

  return (
    <div className="m-auto mt-40 md:max-w-7xl">
      <h2 className="text-6xl text-center md:text-left uppercase md:w-4/5 md:mx-auto mb-8">
        Réser<span className="text-redZombie">vation</span>
      </h2>
      <img
        src={ticketImg}
        className="w-4/5 m-auto mb-6 max-w-md"
        alt="ticket pour zombieLand"
      />
      <h3 className="text-center text-5xl mb-6">Ticket pour ZombieLand</h3>
      <form action="#" className="w-4/5 md:flex md:flex-col m-auto">
        <div className="mb-6 flex flex-col">
          <label htmlFor="firstname" className="text-3xl leading-loose">
            Nombre de visiteurs
          </label>
          <input
            type="number"
            id="numberOfVisitors"
            name="numberOfVisitors"
            placeholder="Entrez le nombre de visiteurs"
            min={0}
            max={100}
            onChange={handlePriceChange}
            className="w-full text-3xl border-white border-2 rounded-xl p-2 text-center"
          />
        </div>
        <div className="mb-6 flex flex-col">
          <label htmlFor="firstname" className="text-3xl leading-loose">
            Votre date de visite
          </label>
          <input
            type="date"
            id="date"
            name="date"
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
  );
}

export default Booking;
