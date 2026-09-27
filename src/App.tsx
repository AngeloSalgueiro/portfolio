import { useEffect, useRef, useState } from 'react'
import './App.css'

function useBodyDimension() {
  const [bodyWidth, setBodyWidth] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);

  useEffect(() => {
    const body = document.body;

    const update = () => {
      setBodyWidth(body.getBoundingClientRect().width);
      setBodyHeight(body.getBoundingClientRect().height);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(body);

    return () => observer.disconnect();
  }, []);

  return { bodyWidth, bodyHeight };
}

function Starfield() {
  const pixelDensity = 5000;
  const { bodyWidth, bodyHeight } = useBodyDimension();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = bodyWidth;
    canvas.height = bodyHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const numberOfStars = Math.floor(
      (bodyWidth * bodyHeight) / pixelDensity
    );

    const stars = Array.from({ length: numberOfStars }, () => ({
      x: Math.random() * bodyWidth,
      y: Math.random() * bodyHeight,
      radius: Math.random() * 1.5,
      pulseDuration: 4 + Math.random() * 8,
      phase: Math.random() * Math.PI * 2,
    }));

    let animationFrame: number;

    function draw(time: number) {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const progress =
          (time / 1000 / star.pulseDuration) * Math.PI * 2 +
          star.phase;

        const opacity = 0.55 + 0.45 * Math.cos(progress);

        ctx.globalAlpha = opacity;

        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(255, 255, 255, 0.35)";
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      animationFrame = requestAnimationFrame(draw);
    }

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [bodyWidth, bodyHeight]);

  return <canvas className="starfield" ref={canvasRef} />;
}


function App() {
  return (
    <>
      <Starfield />
      <div className='content'>
        <h1>Salut ! Je m'appelle Angelo.</h1>
        <h2>Bienvenue sur mon portfolio !</h2>
        <p>
          <h3>Courte présentation :</h3>
          <br />
          Étudiant en deuxième année de BUT Informatique, passionné par les nouvelles technologies, je possède de solides bases en développement, bases de données et gestion de projets. Curieux, rigoureux et motivé, je souhaite mettre mes compétences techniques et mon sens de l’analyse au service d’une équipe dynamique afin de contribuer à la réalisation de projets innovants lors d’un stage de 8 à 12 semaines à partir du 13 avril 2026.</p>
      </div>
    </>
  );
}

export default App
