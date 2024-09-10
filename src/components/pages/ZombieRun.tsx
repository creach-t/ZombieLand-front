import React, { useState, useEffect } from 'react';

// Layers du background
import layer1 from '../../assets/img/zombie-run/Background layers/Layer-1.webp';
import layer2 from '../../assets/img/zombie-run/Background layers/Layer-2.webp';

// frames de l'animation courrir
import run1 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run1.webp';
import run2 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run2.webp';
import run3 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run3.webp';
import run4 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run4.webp';
import run5 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run5.webp';
import run6 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run6.webp';
import run7 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run7.webp';
import run8 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run8.webp';
import run9 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run9.webp';
import run10 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Run10.webp';

// frames de l'animation sauter
import jump1 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump1.webp';
import jump2 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump2.webp';
import jump3 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump3.webp';
import jump4 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump4.webp';
import jump5 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump5.webp';
import jump6 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump6.webp';
import jump7 from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Jump7.webp';

import idle from '../../assets/img/zombie-run/Zombies/Zombie1/animation/Idle1.webp';

// obstacles
import obstacle1 from '../../assets/img/zombie-run/obstacles/tombe1.webp';
import obstacle2 from '../../assets/img/zombie-run/obstacles/tombe2.webp';
import obstacle3 from '../../assets/img/zombie-run/obstacles/tombe3.webp';
import obstacle4 from '../../assets/img/zombie-run/obstacles/tombe4.webp';
import obstacle5 from '../../assets/img/zombie-run/obstacles/tombe5.webp';
import obstacle6 from '../../assets/img/zombie-run/obstacles/tombe6.webp';

const obstacles = [
  obstacle1,
  obstacle2,
  obstacle3,
  obstacle4,
  obstacle5,
  obstacle6,
];

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

//Constante pour la taille du background du jeu
const BACKGROUND_WIDTH = 928;

type AnimationState = 'run' | 'jump' | '';

type LayerPositionState = {
  layer1: number;
  layer2: number;
};

function ZombieRun() {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [layerPositions, setLayerPositions] = useState<LayerPositionState>({
    layer1: 0,
    layer2: 0,
  });

  // Gestion du défilement des frames des animations du zombie
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

  // Gestion du défilement du background
  useEffect(() => {
    let animationFrame: number;

    const updatePositions = () => {
      setLayerPositions((prev) => ({
        layer1: (prev.layer1 - 3.5) % BACKGROUND_WIDTH,
        layer2: (prev.layer2 - 2.8) % BACKGROUND_WIDTH,
      }));
      animationFrame = requestAnimationFrame(updatePositions);
    };

    if (isRunning) {
      animationFrame = requestAnimationFrame(updatePositions);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isRunning]);

  // Reset de l'animation du zombie à l'arrêt
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentAnimation]);

  // Gestion des classes CSS pour les animations
  const getClassName = () => {
    if (isJumping) return 'animate-jump';
    return '';
  };

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
        className="background-container relative overflow-hidden"
        style={{ height: '580px', width: `${BACKGROUND_WIDTH}px` }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom bg-repeat"
          style={{
            backgroundImage: `url(${layer1})`,
            zIndex: 2,
            transform: `translateX(${layerPositions.layer1}px)`,
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom bg-repeat"
          style={{
            backgroundImage: `url(${layer1})`,
            zIndex: 2,
            transform: `translateX(${layerPositions.layer1 + BACKGROUND_WIDTH - 1}px)`,
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom bg-repeat"
          style={{
            backgroundImage: `url(${layer2})`,
            zIndex: 1,
            transform: `translateX(${layerPositions.layer2}px)`,
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-auto bg-bottom bg-repeat"
          style={{
            backgroundImage: `url(${layer2})`,
            zIndex: 1,
            transform: `translateX(${layerPositions.layer2 + BACKGROUND_WIDTH}px)`,
          }}
        ></div>
        <img src={obstacle6} className="absolute z-10 bottom-14" alt="" />
        <img
          className={`Zombie h-1/4 absolute bottom-14 left-24 ${getClassName()}`} // Applique la classe de l'animation en cours
          style={{ zIndex: 3 }}
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
