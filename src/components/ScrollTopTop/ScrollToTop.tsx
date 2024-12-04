/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

let backToTopImg: string | undefined;
if (typeof window !== 'undefined') {
  backToTopImg = require('../../../public/img/desktop/back-to-top-zombieland.webp');
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400 && window.innerWidth > 768) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button className="backToTop" onClick={scrollToTop}>
      <img
        src={backToTopImg}
        alt="Bouton retour en haut"
        style={{ width: 70, height: 70 }}
      />
    </button>
  );
}

export default ScrollToTop;
