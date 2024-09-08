import React, { useState, useEffect } from 'react';

// Layers du background
import ground from '../../assets/img/zombie-run/Background layers/Layer_0000_9.png';
import grass from '../../assets/img/zombie-run/Background layers/Layer_0001_8.png';
import leaves from '../../assets/img/zombie-run/Background layers/Layer_0002_7.png';
import trees_1 from '../../assets/img/zombie-run/Background layers/Layer_0003_6.png';
import lights_1 from '../../assets/img/zombie-run/Background layers/Layer_0004_Lights.png';
import trees_2 from '../../assets/img/zombie-run/Background layers/Layer_0005_5.png';
import trees_3 from '../../assets/img/zombie-run/Background layers/Layer_0006_4.png';
import lights_2 from '../../assets/img/zombie-run/Background layers/Layer_0007_Lights.png';
import trees_4 from '../../assets/img/zombie-run/Background layers/Layer_0008_3.png';
import trees_5 from '../../assets/img/zombie-run/Background layers/Layer_0009_2.png';
import mist from '../../assets/img/zombie-run/Background layers/Layer_0010_1.png';
import mist_2 from '../../assets/img/zombie-run/Background layers/Layer_0011_0.png';

// frames de l'animation courrir
import run1 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run1.png';
import run2 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run2.png';
import run3 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run3.png';
import run4 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run4.png';
import run5 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run5.png';
import run6 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run6.png';
import run7 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run7.png';
import run8 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run8.png';
import run9 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run9.png';
import run10 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run10.png';

// frames de l'animation sauter
import jump1 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump1.png';
import jump2 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump2.png';
import jump3 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump3.png';
import jump4 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump4.png';
import jump5 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump5.png';
import jump6 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump6.png';
import jump7 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump7.png';

import idle from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Idle1.png';

const runImgs: string[] = [
  run1,
  run2,
  run3,
  run4,
  run5,
  run6,
  run7,
  run8,
  run9,
  run10,
];

const jumpImgs: string[] = [jump1, jump2, jump3, jump4, jump5, jump6, jump7];
const idleImg = idle;

const animationFrames: { [key: string]: string[] } = {
  run: runImgs,
  jump: jumpImgs,
};

// Constantes pour les phases de l'animation de course
const STARTING_PHASE_END = 3; // Index de la dernière image de la phase de lancement de course
const RUNNING_PHASE_START = 4; // Index de la première image de la phase de course (boucle infinie)

type AnimationState = 'run' | 'jump' | '';

function ZombieRun() {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);

  // Gestion du défilement des frames des animations
  useEffect(() => {
    let interval: number | undefined;

    const frames = animationFrames[currentAnimation];
    if (frames) {
      interval = window.setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          // Lorsque la phase de lancement de course est terminée, on passe à la phase de course => boucle infinie
          if (currentAnimation === 'run') {
            if (prevIndex < STARTING_PHASE_END) {
              return prevIndex + 1;
            }
            return prevIndex + 1 === frames.length
              ? RUNNING_PHASE_START
              : prevIndex + 1;
          }

          return prevIndex + 1 === frames.length ? 0 : prevIndex + 1;
        });
      }, 100); // 100ms correspond à la durée de chaque frame
    } else {
      setCurrentImageIndex(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentAnimation]);

  useEffect(() => {
    if (currentAnimation === 'jump') {
      const jumpDuration = 700; // Doit correspondre à la durée de l'animation CSS (dans le fichier tailwind.config.js) ici 700ms car on a 7 frames dans l'animation de saut
      const timeout = setTimeout(() => {
        setIsJumping(false);
        setCurrentAnimation(isRunning ? 'run' : '');
      }, jumpDuration);

      return () => clearTimeout(timeout);
    }
  }, [currentAnimation]);

  const getClassName = () => {
    if (isJumping) return 'animate-jump';
    return '';
  };

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentAnimation]);

  const handleRunClick = () => {
    setIsRunning((state) => !state);
    setCurrentAnimation((prev) => (prev === 'run' ? '' : 'run'));
  };

  const handleJumpClick = () => {
    setIsJumping(true);
    setCurrentAnimation('jump');
  };

  return (
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-xl mx-auto">
      <div
        className="background-container relative w-full overflow-hidden"
        style={{ height: '580px' }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${ground})`, zIndex: 12 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${grass})`, zIndex: 11 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${leaves})`, zIndex: 10 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${trees_1})`, zIndex: 9 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${lights_1})`, zIndex: 8 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${trees_2})`, zIndex: 7 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${trees_3})`, zIndex: 6 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${lights_2})`, zIndex: 5 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${trees_4})`, zIndex: 4 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${trees_5})`, zIndex: 3 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${mist})`, zIndex: 2 }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom"
          style={{ backgroundImage: `url(${mist_2})`, zIndex: 1 }}
        ></div>
        <img
          className={`Zombie h-1/4 absolute bottom-14 left-24 ${getClassName()}`} // Applique la classe de l'animation en cours
          style={{ zIndex: 11 }}
          src={
            currentAnimation === ''
              ? idleImg
              : animationFrames[currentAnimation][currentImageIndex]
          }
          alt="Zombie"
        />
      </div>
      <div className="flex gap-2">
        <button
          className="mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRunClick}
        >
          {currentAnimation === 'run' ? 'Arrêter' : 'Courir'}
        </button>
        <button
          className="mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleJumpClick}
          disabled={isJumping}
        >
          Sauter
        </button>
      </div>
    </main>
  );
}

export default ZombieRun;
