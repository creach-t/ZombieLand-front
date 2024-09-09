/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import user_icon_red from '../../assets/icons/user_red.svg';
import user_icon_green from '../../assets/icons/user_green.svg';
import useWindowDimensions from './utils/dimensions';

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useUser();
  const { width } = useWindowDimensions();
  const navRef = useRef(null);

  // Close the menu if the window width is larger than 1024px
  useEffect(() => {
    if (isNavOpen && width > 1024) {
      setIsNavOpen(false);
    }
  }, [width, isNavOpen]);

  // Handle click outside the navbar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNavOpen]);

  // Close the burger menu when a link is clicked
  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <header>
      <nav
        className="px-10 bg-black fixed w-full z-20 top-0 start-0 border-b border-red-700"
        ref={navRef}
      >
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="badgrunge self-center text-5xl sm:text-7xl font-semibold whitespace-nowrap dark:text-white">
              ZOMBIELAND
            </span>
          </Link>
          <div className="flex items-center lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            {user ? (
              <>
                {width > 1024 && (
                  <p className="text-white text-xl">
                    Bonjour {user.first_name} !
                  </p>
                )}
                <Link
                  to={`/mon-compte/${user.user_id}`}
                  aria-label="account"
                  className="text-white text-2xl hover:text-red-500 mx-3"
                >
                  <img src={user_icon_green} width="42px" alt="profile" />
                </Link>
              </>
            ) : (
              <Link to="/se-connecter" aria-label="login">
                <img src={user_icon_red} width="42px" alt="profile" />
              </Link>
            )}

            <Link
              to="/reserver"
              type="button"
              className="text-white text-2xl bg-redZombie hover:bg-red-700 hover:outline-none hover:text-white focus:outline-none focus:ring-black font-bold rounded-xl px-3 py-1 text-center blood"
            >
              Réservation
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
            </Link>
            <button
              onClick={() => setIsNavOpen((prev) => !prev)}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex bg-black items-center p-2 w-10 h-10 justify-center text-sm text-redZombie rounded-lg lg:hidden hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={isNavOpen}
            >
              <span className="sr-only">
                {isNavOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {isNavOpen ? (
                // Close (X) icon when the menu is open
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Burger icon when the menu is closed
                <svg
                  fill="#C90000"
                  width="70"
                  height="70"
                  version="1.1"
                  id="lni_lni-menu"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 64 64"
                >
                  <g>
                    <path d="M60,29.8H4c-1.2,0-2.3,1-2.3,2.3c0,1.2,1,2.3,2.3,2.3h56c1.2,0,2.3-1,2.3-2.3C62.3,30.8,61.2,29.8,60,29.8z" />
                    <path d="M60,46.8H4c-1.2,0-2.3,1-2.3,2.3s1,2.3,2.3,2.3h56c1.2,0,2.3-1,2.3-2.3S61.2,46.8,60,46.8z" />
                    <path d="M4,17.2h56c1.2,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3H4c-1.2,0-2.3,1-2.3,2.3S2.8,17.2,4,17.2z" />
                  </g>
                </svg>
              )}
            </button>
          </div>
          <div
            className={
              isNavOpen
                ? 'absolute right-5 top-20 bg-black w-auto border border-red-700' // Added border when menu is open
                : 'items-center justify-between w-full lg:flex lg:w-auto lg:order-1 hidden'
            }
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-black">
              <li>
                <Link
                  to="/attractions"
                  className="block py-2 px-3 text-white text-2xl hover:text-red-500 rounded lg:bg-transparent lg:p-0"
                  onClick={handleLinkClick} // Close menu when clicked
                >
                  Les attractions
                </Link>
              </li>
              <li>
                <Link
                  to="/infos-pratiques"
                  className="block py-2 px-3 text-white text-2xl hover:text-red-500 rounded lg:bg-transparent lg:p-0"
                  onClick={handleLinkClick} // Close menu when clicked
                >
                  Infos Pratiques
                </Link>
              </li>
              <li>
                <Link
                  to="/plan-du-parc"
                  className="block py-2 px-3 text-white text-2xl hover:text-red-500 rounded lg:bg-transparent lg:p-0"
                  onClick={handleLinkClick} // Close menu when clicked
                >
                  Plan du Parc
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-white text-2xl hover:text-red-500 rounded lg:bg-transparent lg:p-0"
                  onClick={handleLinkClick} // Close menu when clicked
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
