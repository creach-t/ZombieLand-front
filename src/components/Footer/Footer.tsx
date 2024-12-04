/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useUser } from '../../context/UserContext';

function Footer() {
  const { user } = useUser();

  useEffect(() => {
    const links = document.querySelectorAll('a');

    links.forEach((link) => {
      link.addEventListener('click', () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      });
    });
  }, []);

  return (
    <footer className="w-screen  text-white">
      <div className="flex flex-wrap gap-2 justify-around p-4 pb-0">
        <div className="w-[150px] ">
          <h2 className="badgrunge text-3xl">ZombieLand</h2>
          <p className="">
            A seulement quelques minutes de Paris, ZombieLand est un parc de
            zombies immersif où l&apos;horreur devient réalité !
          </p>
        </div>
        <div className="w-[150px] ">
          <h3 className="text-2xl uppercase">
            Liens <span className="text-redZombie">utiles</span>
          </h3>
          <ul>
            <li>
              <Link
                className="text-white hover:text-red-500"
                to="/infos-pratiques"
              >
                Infos pratiques
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-red-500" to="/attractions">
                Attractions
              </Link>
            </li>
            <li>
              {user ? (
                <Link
                  className="text-white hover:text-red-500"
                  to="/mon-compte"
                >
                  Mon compte
                </Link>
              ) : (
                <Link
                  className="text-white hover:text-red-500"
                  to="/se-connecter"
                >
                  Se connecter
                </Link>
              )}
            </li>
            {!user ? (
              <li>
                <Link
                  className="text-white hover:text-red-500"
                  to="/inscription"
                >
                  Créer un compte
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="w-[150px]">
          <h3 className="text-2xl uppercase">
            Nous <span className="text-redZombie">Contacter</span>
          </h3>
          <ul>
            {/* Contact links */}
            <li className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#C90000"
                className="size-6"
              >
                <path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" />
              </svg>
              <a
                className="text-white hover:text-red-500"
                href="tel:+330666666666"
              >
                +33 0666 666 666
              </a>
            </li>
            {/* Address and contact form */}
            <li className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#C90000"
                className="size-6"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
              <Link className="text-white hover:text-red-500" to="/contact">
                Formulaire de contact
              </Link>
            </li>
            <li className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#C90000"
                className="size-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <HashLink
                to="infos-pratiques#venirAuParc"
                className="text-white hover:text-red-500"
              >
                66 rue de l&apos;enfer <br /> 75000 Paris
              </HashLink>
            </li>
          </ul>
        </div>
        <div className="w-[150px]">
          <h3 className="text-2xl uppercase">
            Suivez-<span className="text-redZombie">nous</span>
          </h3>
          <ul className="flex gap-2">
            {/* Social media links */}
            <li>
              <a
                href="http://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="hover:fill-white"
                  fill="#C90000"
                  width="30"
                  height="30"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M59.5 1H4.5C2.5 1 1 2.6 1 4.5V59.5C1 61.5 2.6 63 4.5 63H34.1V38.9H26.1V29.6H34.1V22.7C34.1 14.7 38.9 10.3 46.1 10.3C48.5 10.3 50.9 10.4 53.3 10.7V19H48.5C44.7 19 43.9 20.8 43.9 23.6V29.6H52.8L51.7 38.9H43.9V63H59.5C61.5 63 63 61.5 63 59.5V4.5C63 2.5 61.5 1 59.5 1Z" />
                </svg>
              </a>
            </li>
            {/* Instagram link */}
            <li>
              <a
                href="http://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="hover:fill-white"
                  fill="#C90000"
                  width="30"
                  height="30"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M44.9 4H19.1C10.5 4 4 10.6 4 19.1V44.9C4 53.5 10.6 60 19.1 60H44.9C53.5 60 60 53.4 60 44.9V19.1C60 10.5 53.4 4 44.9 4ZM32 46.9C25.5 46.9 20.1 41.5 20.1 35C20.1 28.5 25.5 23.1 32 23.1C38.5 23.1 43.9 28.5 43.9 35C43.9 41.5 38.5 46.9 32 46.9ZM50.9 19.6C50.9 21.6 49.3 23.1 47.3 23.1C45.3 23.1 43.8 21.6 43.8 19.6C43.8 17.6 45.3 16.1 47.3 16.1C49.3 16.1 50.9 17.6 50.9 19.6ZM48.7 44.9C48.7 50.6 44.7 54.7 39.1 54.7H24.9C19.3 54.7 15.3 50.6 15.3 44.9V24.9C15.3 19.3 19.3 15.3 24.9 15.3H39.1C44.7 15.3 48.7 19.3 48.7 24.9V44.9Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;