import { useEffect, useState } from 'react';
import useWindowDimensions from './dimensions';

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isNavOpen && width > 768) {
      setIsNavOpen(false);
    }
  }, [width, isNavOpen]);

  return (
    <nav className="bg-black fixed w-full z-20 top-0 start-0 border-none">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="badgrunge self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            ZOMBIELAND
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-10 fill-redZombie"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>

          <button
            type="button"
            className="text-white bg-redZombie hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-dark-300 font-bold rounded-lg text-sm px-4 py-2 text-center"
          >
            Réservation
          </button>
          <button
            onClick={() => setIsNavOpen((prev) => !prev)}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={
            isNavOpen
              ? 'absolute right-0 top-16 bg-black w-1/2'
              : 'items-center justify-between w-full md:flex md:w-auto md:order-1 hidden'
          }
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white hover:text-red-400 rounded md:bg-transparent md:p-0"
                aria-current="page"
              >
                Les attractions
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white hover:text-red-400 rounded md:bg-transparent md:p-0"
              >
                Infos Pratiques
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white hover:text-red-400 rounded md:bg-transparent md:p-0"
              >
                Plan du Parc
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white hover:text-red-400 rounded md:bg-transparent md:p-0"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
