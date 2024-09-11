import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

function MyMessages() {
  const { user } = useUser();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('TODO: handle form submission');
  }

  return (
    <div>
      <Helmet>
        <title>Mon compte 🧟 | Zombieland | Paris </title>
      </Helmet>
      <main className="h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-2xl mx-auto">
        <h1 className="self-center md:self-start text-6xl">
          MON <em className="text-redZombie">COMPTE</em>
        </h1>
        <div className="flex gap-4">
          <Link
            to={`/mon-compte`}
            className="text-3xl text-white border-white border-2 rounded-xl px-8 py-2 text-center mb-10"
          >
            Mes <em className="text-redZombie ">Informations</em>
          </Link>
          <Link
            to="/mes-reservations"
            className="text-3xl text-white border-white border-2 rounded-xl px-8 py-2 text-center mb-10"
          >
            Mes <em className="text-redZombie ">Réservations</em>
          </Link>
        </div>
        <div
          className="messages-container w-11/12 h-full border-2 border-white rounded-xl m-auto p-4 text-2xl"
          style={{ maxHeight: '663px' }}
        >
          <div
            className="overflow-y-scroll flex flex-col"
            style={{ maxHeight: '550px' }}
          >
            <div className="message bg-zinc-900 text-white p-4 my-2 mr-20 rounded-xl w-fit">
              <p>
                Message de : <span className="text-redZombie">Admin</span>
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                ab ducimus. Vero earum nesciunt nulla veniam voluptate
                architecto similique aspernatur!
              </p>
            </div>
            <div className="message bg-zinc-700 text-white p-4 my-2 mr-4 rounded-xl w-fit self-end">
              <p>
                Message de :{' '}
                <span className="text-greenZombie">Utilisateur</span>
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta,
                libero.
              </p>
            </div>
            <div className="message bg-zinc-900 text-white p-4 my-2 mr-20 rounded-xl w-fit">
              <p>
                Message de : <span className="text-redZombie">Admin</span>
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
                maxime saepe dolorem delectus! Veritatis nihil cupiditate quo
                quam sequi, dolore quaerat repellendus. Perspiciatis, iusto.
                Itaque optio nisi exercitationem sint at recusandae quae
                asperiores enim saepe quaerat distinctio, est fuga eos ad
                dignissimos modi. Accusantium fuga perferendis id eius molestias
                recusandae fugiat enim a sint itaque illum nesciunt placeat
                velit maiores saepe, culpa quisquam dolores? Adipisci maxime
                illo laborum facilis delectus corporis sed numquam tempora
                velit. Mollitia quasi ex modi, nihil sed blanditiis et eius eos
                harum aliquid inventore iusto, vitae perferendis delectus a est
                ratione sint impedit. Molestiae ut saepe,
              </p>
            </div>
            <div className="message bg-zinc-700 text-white p-4 my-2 mr-4 ml-20 rounded-xl w-fit self-end">
              <p>
                Message de :{' '}
                <span className="text-greenZombie">Utilisateur</span>
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat reiciendis architecto sint enim iusto. Alias impedit
                aperiam expedita autem repellendus laudantium distinctio
                delectus, dicta qui reprehenderit. Labore exercitationem dolorum
                dolorem reiciendis, quam magni perspiciatis cum numquam cumque
                aspernatur qui expedita? Pariatur, dolore, quidem doloremque
                neque, ipsum quasi minus alias expedita magni fuga obcaecati
                rerum harum sunt mollitia ipsam dolor nulla vitae consequatur.
                Itaque velit accusamus consequatur sunt consequuntur harum illo
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-container relative w-full h-full">
              <textarea
                placeholder="Envoyer votre message, un admin vous répondra dans les plus brefs délais"
                className="w-full h-20 border-2 border-white rounded-xl m-auto text-2xl p-2 resize-none"
                style={{ backgroundColor: '#121212' }}
              ></textarea>
              <button
                type="submit"
                className="absolute h-4/5 bg-zinc-900 m top-1/2 right-2 text-white text-2xl font-bold px-3 py-1 border-none border-white rounded-xl hover:bg-zinc-700 z-10"
                style={{
                  transform: 'translateY(-55%)',
                }}
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default MyMessages;
