/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';

let layer1: string | undefined;
let layer2: string | undefined;
let run1: string | undefined;
let run2: string | undefined;
let run3: string | undefined;
let run4: string | undefined;
let run5: string | undefined;
let run6: string | undefined;
let run7: string | undefined;
let run8: string | undefined;
let run9: string | undefined;
let run10: string | undefined;
let jump1: string | undefined;
let jump2: string | undefined;
let jump3: string | undefined;
let jump4: string | undefined;
let jump5: string | undefined;
let jump6: string | undefined;
let jump7: string | undefined;
let death1: string | undefined;
let death2: string | undefined;
let death3: string | undefined;
let death4: string | undefined;
let death5: string | undefined;
let death6: string | undefined;
let death7: string | undefined;
let death8: string | undefined;
let idle: string | undefined;
let obstacle1: string | undefined;
let obstacle2: string | undefined;
let obstacle3: string | undefined;

if (typeof window !== 'undefined') {
  // Layers du background
  layer1 = require('../../../public/img/zombie-run/Background layers/Layer-1.webp');
  layer2 = require('../../../public/img/zombie-run/Background layers/Layer-2.webp');

  // Frames de l'animation courir
  run1 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run1.webp');
  run2 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run2.webp');
  run3 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run3.webp');
  run4 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run4.webp');
  run5 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run5.webp');
  run6 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run6.webp');
  run7 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run7.webp');
  run8 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run8.webp');
  run9 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run9.webp');
  run10 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Run10.webp');

  // Frames de l'animation sauter
  jump1 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Jump1.webp');
  jump2 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Jump2.webp');
  jump3 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Jump3.webp');
  jump4 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Jump4.webp');
  jump5 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Jump5.webp');
  jump6 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Jump6.webp');
  jump7 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Jump7.webp');

  // Frames de l'animation de mort
  death1 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Dead1.webp');
  death2 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Dead2.webp');
  death3 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Dead3.webp');
  death4 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Dead4.webp');
  death5 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Dead5.webp');
  death6 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Dead6.webp');
  death7 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Dead7.webp');
  death8 = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Dead8.webp');

  // Frame du zombie à l'arrêt
  idle = require('../../../public/img/zombie-run/Zombies/Zombie1/animation/Idle1.webp');

  // Obstacles
  obstacle1 = require('../../../public/img/zombie-run/obstacles/tombe3.webp');
  obstacle2 = require('../../../public/img/zombie-run/obstacles/tombe4.webp');
  obstacle3 = require('../../../public/img/zombie-run/obstacles/tombe6.webp');
}

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
const deathImgs: string[] = [
  death1,
  death2,
  death3,
  death4,
  death5,
  death6,
  death7,
  death8,
];
const idleImg = idle;
const obstacleList = [
  { image: obstacle1, width: 50, height: 90 },
  { image: obstacle2, width: 30, height: 50 },
  { image: obstacle3, width: 30, height: 20 },
];

const animationFrames: { [key: string]: string[] } = {
  run: runImgs,
  jump: jumpImgs,
  death: deathImgs,
};

// Constantes pour les phases de l'animation de course
const STARTING_PHASE_END = 3; // Index de la dernière image de la phase de lancement de course
const RUNNING_PHASE_START = 4; // Index de la première image de la phase de course (boucle infinie)

//Constante pour la taille du background du jeu
const BACKGROUND_WIDTH = 928;

const ZOMBIE_X_POSITION = 100;

type AnimationState = 'run' | 'jump' | 'death' | '';

type LayerPositionState = {
  layer1: number;
  layer2: number;
};

type Obstacle = {
  image: string;
  positionX: number;
  width: number;
  height: number;
};

function ZombieRun() {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isDying, setIsDying] = useState<boolean>(false);
  const [zombieY, setZombieY] = useState<number>(0);
  const [layerPositions, setLayerPositions] = useState<LayerPositionState>({
    layer1: 0,
    layer2: 0,
  });
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  useEffect(() => {
    let obstacleTimeout: number;

    const createObstacleLoop = () => {
      generateObstacle();
      obstacleTimeout = window.setTimeout(createObstacleLoop, getRandomDelay());
    };

    if (isRunning) {
      createObstacleLoop(); // Démarre la boucle de création des obstacles
    }

    return () => {
      clearTimeout(obstacleTimeout); // Nettoie le timeout lors de l'arrêt
    };
  }, [isRunning]);

  // Gestion du déplacement des obstacles
  useEffect(() => {
    let animationFrame: number;

    const moveObstacles = () => {
      setObstacles(
        (prevObstacles) =>
          prevObstacles
            .map((obstacle) => {
              const newPosX = obstacle.positionX - 3.5; // Déplacement de l'obstacle

              // Vérification de la collision avec la gestion de la largeur et la hauteur
              if (
                !isDying &&
                detectCollision(newPosX, obstacle.width, obstacle.height)
              ) {
                setCurrentAnimation('death'); // Lancer l'animation de mort
                setIsDying(true); // Empêcher d'autres actions
              }

              return {
                ...obstacle,
                positionX: newPosX, // Mise à jour de la position de l'obstacle
              };
            })
            .filter((obstacle) => obstacle.positionX > -100) // Filtrer les obstacles qui sortent de l'écran
      );

      animationFrame = requestAnimationFrame(moveObstacles);
    };

    if (isRunning && !isDying) {
      animationFrame = requestAnimationFrame(moveObstacles);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isRunning, isDying, zombieY]);

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
          } else if (currentAnimation === 'death') {
            setIsRunning(false);
            return prevIndex + 1 === frames.length ? prevIndex : prevIndex + 1;
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
      setLayerPositions((prev) => {
        // Mise à jour des positions des couches de fond
        const newLayer1 = (prev.layer1 - 3.5) % BACKGROUND_WIDTH;
        const newLayer2 = (prev.layer2 - 2) % BACKGROUND_WIDTH;

        // Mise à jour du score
        setScore((prevScore) => prevScore + 0.05); // Ajuste la vitesse du score ici

        return {
          layer1: newLayer1,
          layer2: newLayer2,
        };
      });

      animationFrame = requestAnimationFrame(updatePositions);
    };

    if (isRunning) {
      animationFrame = requestAnimationFrame(updatePositions);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isRunning]);

  // Reset de des animations du zombie à quand il s'arrête
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentAnimation]);

  const getRandomDelay = () => Math.random() * (1500 - 750) + 750;

  const generateObstacle = () => {
    const randomObstacle =
      obstacleList[Math.floor(Math.random() * obstacleList.length)];
    const newObstacle = {
      image: randomObstacle.image,
      width: randomObstacle.width,
      height: randomObstacle.height,
      positionX: BACKGROUND_WIDTH,
    };
    setObstacles((prev) => [...prev, newObstacle]);
  };

  const detectCollision = (
    obstacleX: number,
    obstacleWidth: number,
    obstacleHeight: number
  ) => {
    const zombieWidth = 35; // Largeur approximative du zombie
    const zombieX = ZOMBIE_X_POSITION;

    // Collision sur l'axe X
    const isCollidingX =
      obstacleX <= zombieX + zombieWidth &&
      obstacleX + obstacleWidth >= zombieX;

    // Collision sur l'axe Y
    const isCollidingY = zombieY <= obstacleHeight; // Le zombie doit être au-dessus du haut de l'obstacle

    return isCollidingX && isCollidingY; // Collision seulement si les deux axes se chevauchent
  };

  useEffect(() => {}, [zombieY]);

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

    setZombieY(100); // Hauteur du saut
    setTimeout(() => {
      setZombieY(0);
      setIsJumping(false);
    }, 500);
  };

  const resetGame = () => {
    setCurrentAnimation('');
    setCurrentImageIndex(0);
    setIsRunning(false);
    setIsJumping(false);
    setIsDying(false);
    setZombieY(0);
    setScore(0);
    setLayerPositions({
      layer1: 0,
      layer2: 0,
    });
    setObstacles([]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isDying) {
        if (e.key === 'ArrowRight') handleRunClick();
        if (e.key === 'ArrowUp') handleJumpClick();
      }
      if (e.key === 'r') resetGame();
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isDying]);

  return (
    <main className="bg-black h-full w-full mt-[104px] flex flex-col items-center pt-10 max-w-screen-xl mx-auto">
      <div
        className="background-container relative overflow-hidden"
        style={{ height: '580px', width: `${BACKGROUND_WIDTH}px` }}
      >
        <div
          className={`absolute z-30 p-4 text-greenZombie font-bold duration-300 ${!isDying ? 'top-0 left-0 text-xl' : 'top-1/2 left-1/2 text-4xl -translate-x-1/2 -translate-y-1/2 border-4 border-greenZombie rounded-xl p-8'}`}
        >
          Score: {Math.floor(score)} mètres
        </div>
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
        <img
          className={`Zombie ${currentAnimation === 'death' ? 'h-[80px]' : 'h-1/4'} absolute bottom-14 left-24 ${getClassName()}`} // Applique la classe de l'animation en cours
          style={{ zIndex: 3 }}
          src={
            currentAnimation === ''
              ? idleImg
              : animationFrames[currentAnimation][currentImageIndex]
          }
          alt="Zombie"
        />
        {/* Les obstacles */}
        {obstacles.map((obstacle, index) => (
          <img
            key={index}
            src={obstacle.image}
            className="absolute bottom-14"
            style={{
              left: `${obstacle.positionX}px`,
              zIndex: 2,
            }}
            alt="Obstacle"
          />
        ))}
      </div>
      <div className="flex gap-2">
        {!isDying && (
          <>
            <button
              className="mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleRunClick}
              onKeyDown={handleRunClick}
            >
              {currentAnimation === 'run' ? 'Arrêter' : 'Courir'}
            </button>
            <button
              className="mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleJumpClick}
              onKeyDown={handleJumpClick}
              disabled={isJumping}
            >
              Sauter
            </button>
          </>
        )}
        <button
          className="mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetGame}
          onKeyDown={resetGame}
        >
          Rejouer
        </button>
      </div>
    </main>
  );
}

export default ZombieRun;
