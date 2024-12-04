import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  // Vérifie si 'window' est défini avant de l'utiliser
  const hasWindow = typeof window !== 'undefined';

  // Initialise les dimensions en utilisant des valeurs par défaut si 'window' n'est pas défini
  const getWindowDimensions = () => ({
    width: hasWindow ? window.innerWidth : 1024, // Largeur par défaut pour le SSR
    height: hasWindow ? window.innerHeight : 768, // Hauteur par défaut pour le SSR
  });

  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setDimensions(getWindowDimensions());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return dimensions;
};

export default useWindowDimensions;
