/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import user_icon_red from '/icons/user_red.svg';
import user_icon_green from '/icons/user_green.svg';
import useWindowDimensions from './utils/dimensions';

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useUser();
  const { width } = useWindowDimensions();
  const navRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close the menu if the window width is larger than 1024px
  useEffect(() => {
    if (isNavOpen && width > 1024) {
      setIsNavOpen(false);
    }
  }, [width, isNavOpen]);

  // Handle click outside the navbar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Vérifie si le clic est à l'extérieur du menu et du bouton
      if (
        navRef.current &&
        buttonRef.current &&
        !navRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        setIsNavOpen(false);
      }
    };

    // Ajoute l'écouteur d'événements pour `mousedown` (avant `click`)
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Nettoie l'écouteur d'événements
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);

  // Close the burger menu when a link is clicked
  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <header>
      <nav
        className={`fixed w-full z-20 top-0 start-0 border-b border-red-700 bg-black ${
          width > 490 ? 'px-10' : 'px-6'
        } h-[103px]`}
        ref={navRef}
      >
        <div className="max-w-screen-2xl h-full flex flex-wrap items-center justify-between mx-auto py-4">
          <Link
            to="/"
            className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse"
          >
            <span
              className={`badgrunge font-semibold whitespace-nowrap dark:text-white ${
                width > 490 ? 'text-5xl sm:text-7xl' : 'text-4xl'
              }`}
            >
              Zombieland
            </span>
          </Link>

          <div className="flex items-center lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            {/* Show the account icon only if width > 490px */}
            {width > 490 &&
              (user ? (
                <>
                  {width > 1024 && (
                    <p className="text-white text-xl">
                      Bonjour {user.first_name} !
                    </p>
                  )}
                  <Link
                    to={`/mon-compte`}
                    aria-label="account"
                    className="text-white text-2xl hover:text-red-500 px-3"
                  >
                    <img src={user_icon_green} width="42px" alt="profile" />
                  </Link>
                </>
              ) : (
                <Link to="/se-connecter" aria-label="login" className="px-3">
                  <img src={user_icon_red} width="42px" alt="profile" />
                </Link>
              ))}

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
              ref={buttonRef}
              onClick={() => setIsNavOpen((prev) => !prev)}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-redZombie rounded-lg lg:hidden "
              aria-controls="navbar-sticky"
              aria-expanded={isNavOpen}
            >
              <span className="sr-only">
                {isNavOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {isNavOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  fill="#C90000"
                  width="100%"
                  height="100%"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
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

          {/* Burger Menu Content */}
          <div
            className={
              isNavOpen
                ? 'absolute right-5 top-20 bg-black w-auto border border-red-700'
                : 'items-center justify-between w-full lg:flex lg:w-auto lg:order-1 hidden'
            }
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-black">
              <li>
                <Link
                  to="/attractions"
                  className="block py-2 px-3 text-white text-2xl hover:text-red-500 rounded lg:bg-transparent lg:p-0"
                  onClick={handleLinkClick}
                >
                  Les attractions
                </Link>
              </li>
              <li>
                <Link
                  to="/infos-pratiques"
                  className="block py-2 px-3 text-white text-2xl hover:text-red-500 rounded lg:bg-transparent lg:p-0"
                  onClick={handleLinkClick}
                >
                  Infos Pratiques
                </Link>
              </li>
              <li>
                <Link
                  to="/plan-du-parc"
                  className="block py-2 px-3 text-white text-2xl hover:text-red-500 rounded lg:bg-transparent lg:p-0"
                  onClick={handleLinkClick}
                >
                  Plan du Parc
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-white text-2xl hover:text-red-500 rounded lg:bg-transparent lg:p-0"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
              {/* Show the account icon inside the burger menu when width < 471px */}
              {width <= 490 &&
                (user ? (
                  <li className="self-center">
                    <Link
                      to={`/mon-compte`}
                      aria-label="account"
                      className="text-white text-2xl px-3"
                      onClick={handleLinkClick}
                    >
                      <img src={user_icon_green} width="42px" alt="profile" />
                    </Link>
                  </li>
                ) : (
                  <li className="self-center">
                    <Link
                      to="/se-connecter"
                      aria-label="login"
                      className="px-3"
                      onClick={handleLinkClick}
                    >
                      <img src={user_icon_red} width="42px" alt="profile" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
