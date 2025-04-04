/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';
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
                    <svg
                      width="110.81029mm"
                      height="105.48504mm"
                      viewBox="0 0 110.81029 105.48504"
                      version="1.1"
                      id="svg1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:svg="http://www.w3.org/2000/svg">
                      <defs
                        id="defs1" />
                      <g
                        id="layer1"
                        transform="translate(-31.152245,-92.283887)">
                        <g
                          id="g81"
                          transform="translate(-12.822253,-13.67707)">
                          <g
                            id="g80"
                            transform="translate(49.864315,15.101764)"
                            style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-opacity:1">
                            <g
                              id="g78"
                              transform="matrix(0.96509863,-0.24455737,0.28390354,1.1203707,-76.240323,-2.1571098)"
                              style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-opacity:1">
                              <path
                                d="m 89.530521,117.87448 a 11.579912,7.9825174 80.013599 0 1 -0.226297,-1.80464 11.579912,7.9825174 80.013599 0 1 0.356449,-4.47093 11.808636,4.1803935 55.695283 0 0 -6.627156,-3.8971 11.808636,4.1803935 55.695283 0 0 -1.083635,4.27914 13.366979,5.0710228 44.109741 0 1 7.580641,5.89353 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:1.7383;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path78" />
                              <path
                                d="m 89.041044,122.78837 a 6.6741482,11.609455 0 0 1 -1.289771,-5.20382 11.727095,4.8450797 52.963239 0 0 -5.942496,-5.64923 10.846273,3.8150384 64.607336 0 0 2.066459,6.75417 10.846273,3.8150384 64.607336 0 0 0.326813,0.66307 12.999117,5.4774241 31.033513 0 1 1.294479,0.76866 12.999117,5.4774241 31.033513 0 1 3.544516,2.66715 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:1.89201;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path71" />
                              <path
                                d="m 81.808777,111.93532 a 11.727095,4.8450797 52.963239 0 0 -4.208904,-1.14586 11.727095,4.8450797 52.963239 0 0 -1.30053,5.57391 12.999117,5.4774241 31.033513 0 1 7.902706,2.98919 10.846273,3.8150384 64.607336 0 1 -0.326813,-0.66307 10.846273,3.8150384 64.607336 0 1 -2.066459,-6.75417 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:1.89201;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path70" />
                              <path
                                d="m 91.902347,126.53317 a 6.6741482,11.609455 0 0 1 -2.861303,-3.7448 12.999117,5.4774241 31.033513 0 0 -3.544516,-2.66715 12.999117,5.4774241 31.033513 0 0 -1.294479,-0.76866 10.846273,3.8150384 64.607336 0 0 7.745352,7.90536 11.727095,4.8450797 52.963239 0 0 -0.04505,-0.72475 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:2.08769;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path73" />
                              <path
                                d="m 84.202049,119.35256 a 12.999117,5.4774241 31.033513 0 0 -7.902706,-2.98919 11.727095,4.8450797 52.963239 0 0 2.57887,5.42207 11.727095,4.8450797 52.963239 0 0 11.316767,8.44923 11.727095,4.8450797 52.963239 0 0 1.752421,-2.97675 10.846273,3.8150384 64.607336 0 1 -7.745352,-7.90536 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:2.08769;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path72" />
                              <path
                                d="m 92.562025,126.92283 a 6.6741482,11.609455 0 0 1 -0.02959,-0.0118 10.846273,3.8150384 64.607336 0 1 -0.522498,0.33866 10.846273,3.8150384 64.607336 0 1 -0.06254,0.008 11.727095,4.8450797 52.963239 0 1 -1.752421,2.97674 11.727095,4.8450797 52.963239 0 1 -11.316767,-8.44923 11.727095,4.8450797 52.963239 0 1 -2.57887,-5.42207 12.999117,5.4774241 31.033513 0 0 -5.276092,1.01241 12.999117,5.4774241 31.033513 0 0 7.38895,11.24033 12.999117,5.4774241 31.033513 0 0 14.473276,2.74544 12.999117,5.4774241 31.033513 0 0 -0.323452,-4.43872 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:2.08769;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path69" />
                              <path
                                d="m 87.751273,117.58455 a 11.727095,4.8450797 52.963239 0 1 1.165367,1.65414 11.727095,4.8450797 52.963239 0 1 2.858612,6.48312 12.999117,5.4774241 31.033513 0 1 0.77198,1.17552 10.846273,3.8150384 64.607336 0 0 -1.455868,-10.78781 10.846273,3.8150384 64.607336 0 0 -2.867353,-4.89422 6.6741482,11.609455 0 0 0 -0.55545,4.54905 6.6741482,11.609455 0 0 0 0.08271,1.8202 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:1.5915;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path77" />
                              <path
                                d="m 93.490292,106.92167 a 9.6312942,6.5999937 80.560722 0 0 -5.723388,5.5619 9.7871682,3.4685097 56.038569 0 1 3.135559,4.14718 9.7871682,3.4685097 56.038569 0 1 2.051025,8.94165 12.972259,4.5029294 26.501175 0 1 0.0162,0.0216 9.6312942,6.5999937 80.560722 0 0 1.804125,0.44416 9.6312942,6.5999937 80.560722 0 0 6.026897,-9.2845 9.6312942,6.5999937 80.560722 0 0 -7.310416,-9.83203 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:1.44151;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path76" />
                              <path
                                d="m 89.041044,122.78837 a 12.999117,5.4774241 31.033513 0 1 2.734208,2.93344 11.727095,4.8450797 52.963239 0 0 -2.858612,-6.48312 11.727095,4.8450797 52.963239 0 0 -1.165367,-1.65414 6.6741482,11.609455 0 0 0 1.289771,5.20382 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:1.5915;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path75" />
                              <path
                                d="m 91.902347,126.53317 a 11.727095,4.8450797 52.963239 0 0 -0.127096,-0.81136 12.999117,5.4774241 31.033513 0 0 -2.734208,-2.93344 6.6741482,11.609455 0 0 0 2.861304,3.7448 z"
                                style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:1.5915;stroke-linecap:round;stroke-miterlimit:3.7;stroke-opacity:1"
                                id="path74" />
                            </g>
                            <ellipse
                              style="fill:#952628;fill-opacity:1;stroke:#952628;stroke-width:2.11667;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                              id="path80"
                              cx="16.953403"
                              cy="119.00804"
                              rx="3.277828"
                              ry="9.6889544"
                              transform="rotate(-16.027286)" />
                          </g>
                          <rect
                            style="fill:#952628;fill-opacity:1;stroke:none;stroke-width:2.81556;stroke-linecap:square;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                            id="rect10"
                            width="38.782368"
                            height="26.172441"
                            x="45.506351"
                            y="167.16113"
                            ry="8.4222908" />
                          <path
                            d="m 72.770672,166.35108 -0.571025,7.99434 -4.835364,6.04459 -10.07432,2.8205 -11.99255,-1.66553 v 22.21725 c 0,3.52401 2.83736,6.36085 6.361369,6.36085 h 95.442238 c 3.52401,0 6.36085,-2.83684 6.36085,-6.36085 v -31.0503 c 0,-3.52401 -2.83684,-6.36085 -6.36085,-6.36085 z"
                            style="fill:#62f974;fill-opacity:1;stroke:#000000;stroke-width:2.64583;stroke-linecap:square;stroke-miterlimit:3.7"
                            id="path10" />
                          <ellipse
                            style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:2.96421;stroke-linecap:square;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                            id="path44"
                            cx="99.871094"
                            cy="171.24831"
                            rx="15.085045"
                            ry="8.6739187" />
                          <path
                            d="m 99.524001,107.27096 v 10.65019 l -2.517184,10.76368 -11.867837,2.39148 -12.1736,-1.8235 a 28.895138,32.029452 0 0 0 -1.492416,9.98048 28.895138,32.029452 0 0 0 28.895476,32.02931 28.895138,32.029452 0 0 0 28.89502,-32.02931 28.895138,32.029452 0 0 0 -28.89502,-32.0293 28.895138,32.029452 0 0 0 -0.844439,0.067 z"
                            style="fill:#62f974;fill-opacity:1;stroke:#000000;stroke-width:2.48607;stroke-linecap:square;stroke-miterlimit:3.7"
                            id="path8" />
                          <ellipse
                            style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:1.5477;stroke-linecap:square;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                            id="path2"
                            cx="111.49441"
                            cy="139.94926"
                            rx="8.7592812"
                            ry="8.690711" />
                          <path
                            d="M 96.530092,140.09805 81.36678,139.87391 a 7.6189377,7.1321686 0 0 0 -0.05443,0.7144 7.6189377,7.1321686 0 0 0 7.61854,7.1318 7.6189377,7.1321686 0 0 0 7.619142,-7.1318 7.6189377,7.1321686 0 0 0 -0.01989,-0.49026 z"
                            style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:1.87707;stroke-linecap:square;stroke-miterlimit:3.7"
                            id="path6" />
                          <path
                            style="fill:#c90000;fill-opacity:1;stroke:#000000;stroke-width:3.86925;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                            d="m 89.014079,157.67644 21.103831,2.56699"
                            id="path4" />
                          <path
                            style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:3.86925;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                            d="m 105.57798,112.52482 2.94236,1.03393 3.14528,1.46176 2.7304,2.01205 2.68084,2.33759 2.18903,2.3678 1.73413,2.48097"
                            id="path43" />
                          <path
                            style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:4.17721;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                            d="m 65.535957,192.83265 v 16.09859"
                            id="path79" />
                          <path
                            style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:4.37576;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                            d="m 135.62006,191.01945 v 17.66529"
                            id="path79-2" />
                        </g>
                      </g>
                    </svg>
                  </Link>
                </>
              ) : (
                <Link to="/se-connecter" aria-label="login" className="px-3">
                  <svg
                    width="111.54331mm"
                    height="105.73383mm"
                    viewBox="0 0 111.54331 105.73383"
                    version="1.1"
                    id="svg1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:svg="http://www.w3.org/2000/svg">
                    <defs
                      id="defs1" />
                    <g
                      id="layer1"
                      transform="translate(-30.785733,-92.163787)">
                      <rect
                        style="fill:#c90000;stroke:#000000;stroke-width:2.64583;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                        id="rect1"
                        width="108.89748"
                        height="44.245613"
                        x="32.10865"
                        y="152.32909"
                        ry="8.4176855" />
                      <ellipse
                        style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:2.96421;stroke-linecap:square;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                        id="path44"
                        cx="87.048843"
                        cy="157.57124"
                        rx="15.085045"
                        ry="8.6739187" />
                      <path
                        style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:4.17721;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                        d="m 52.713704,179.15558 v 16.09859"
                        id="path79" />
                      <path
                        style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:4.37576;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                        d="m 122.79781,177.34238 v 17.66529"
                        id="path79-2" />
                      <ellipse
                        style="fill:#c90000;stroke:#000000;stroke-width:2.64583;stroke-linecap:round;stroke-miterlimit:3.7;stroke-dasharray:none;stroke-opacity:1"
                        id="path1"
                        cx="86.331856"
                        cy="126.33887"
                        rx="29.920282"
                        ry="32.852165" />
                    </g>
                  </svg>
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
