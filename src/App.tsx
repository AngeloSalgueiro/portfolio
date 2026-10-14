import { useEffect, useRef, useState } from 'react'
import './App.css'

// Ratio between the background and the foreground
const scrollRatio = 0.8;

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

    const windowHeight = Math.round(window.innerHeight);

    if (bodyHeight * scrollRatio <= windowHeight) {
      canvas.height = bodyHeight;
    } else {
      canvas.height = bodyHeight * scrollRatio;
    }

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

function Intro() {
  return (
    <header id="intro">
      <img className="profile_picture" src="src/assets/photo.png" alt="Portrait d'Angelo" />
      <div>
        <h1>Salut ! Je m'appelle <strong>Angelo</strong>.</h1>
        <h2>Bienvenue sur mon <strong>portfolio</strong> !</h2>
        <a className="button" href="#skills">Découvrir mon univers</a>
      </div>
    </header>
  );
}

const skills = [
  { name: "HTML5", category: "Langage & web", icon: "/src/assets/html5.svg" },
  { name: "CSS", category: "Langage & web", icon: "/src/assets/css.svg" },
  { name: "JavaScript", category: "Langage", icon: "/src/assets/javascript.svg" },
  { name: "TypeScript", category: "Langage", icon: "/src/assets/typescript.svg" },
  { name: "Python", category: "Langage", icon: "/src/assets/python.svg" },
  { name: "Java", category: "Langage", icon: "/src/assets/java.svg" },
  { name: "Kotlin", category: "Langage", icon: "/src/assets/kotlin.svg" },
  { name: "PHP", category: "Langage", icon: "/src/assets/php.svg" },
  { name: "React", category: "Framework", icon: "/src/assets/react.svg" },
  { name: "Angular", category: "Framework", icon: "/src/assets/angular.svg" },
  { name: "Go", category: "Langage", icon: "/src/assets/golang.svg" },
  { name: "Docker", category: "Outil", icon: "/src/assets/docker.svg" },
];

const projects = [
  {
    title: "Jeu de Pong",
    description: "Une version rétro du célèbre jeu d'arcade, pensée pour travailler la logique et les interactions.",
    image: "/images/pong.png",
    tags: ["JavaScript", "Canvas"],
  },
  {
    title: "Pokédex",
    description: "Une interface de consultation autour de l'univers Pokémon et de ses créatures.",
    image: "/images/pika.png",
    tags: ["React", "API"],
  },
  {
    title: "Quadtree",
    description: "Exploration visuelle d'une structure de données pour optimiser la recherche spatiale.",
    image: "/images/quadtree1.png",
    tags: ["Python", "Algorithmique"],
  },
  {
    title: "Qui est-ce ?",
    description: "Un jeu de déduction qui met l'accent sur l'expérience utilisateur et la gestion d'état.",
    image: "/images/quiestce.png",
    tags: ["TypeScript", "UI"],
  },
];

function SkillsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

  const scrollTrack = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>(".skill_card");
    const cardWidth = firstCard?.offsetWidth ?? 220;
    const gap = 16;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const startDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const track = event.currentTarget;
    dragStart.current = {
      x: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.classList.add("is_dragging");
    track.setPointerCapture(event.pointerId);
  };

  const dragTrack = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStart.current;
    if (!drag) return;

    event.preventDefault();
    event.currentTarget.scrollLeft = drag.scrollLeft - (event.clientX - drag.x);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = null;
    event.currentTarget.classList.remove("is_dragging");
  };

  return (
    <div className="skills_carousel" aria-roledescription="carrousel">
      <div
        className="carousel_track"
        ref={trackRef}
        tabIndex={0}
        onPointerDown={startDragging}
        onPointerMove={dragTrack}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={stopDragging}
      >
        {skills.map((skill) => (
          <article className="skill_card carousel_card" key={skill.name}>
            <div className="skill_icon">
              <img src={skill.icon} alt="" />
            </div>
            <div>
              <h3>{skill.name}</h3>
              <span>{skill.category}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="carousel_hint">Faites défiler horizontalement pour parcourir la stack.</p>
      <div className="carousel_controls">
        <button
          className="carousel_button"
          type="button"
          onClick={() => scrollTrack(-1)}
          aria-label="Compétence précédente"
        >
          ←
        </button>
        <button
          className="carousel_button"
          type="button"
          onClick={() => scrollTrack(1)}
          aria-label="Compétence suivante"
        >
          →
        </button>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const updateParallax = () => {
      const content = document.querySelector<HTMLDivElement>(".content");
      if (!content) return;

      const background = document.querySelector<HTMLDivElement>(".starfield");
      if (!background) return;

      const rect = content.getBoundingClientRect();
      const offset = -rect.top * scrollRatio;
      console.log(-rect.top);

      background.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener("scroll", updateParallax);

    return () => {
      window.removeEventListener("scroll", updateParallax);
    };
  });

  return (
    <>
      <Starfield />
      <div className="content">
        <nav className="site_nav" aria-label="Navigation principale">
          <a href="#intro" className="nav_logo">AS<span>.</span></a>
          <div className="nav_links">
            <a href="#presentation">À propos</a>
            <a href="#skills">Compétences</a>
            <a href="#projects">Projets</a>
          </div>
        </nav>
        <Intro />
        <main>
          <section id="presentation" className="section presentation_section">
            <div className="section_heading">
            <span className="eyebrow">Transmission depuis la Terre</span>
            <h2>À propos de moi</h2>
            </div>
            <div className="text_section">
            <h3>Courte présentation</h3>
            <br />
            <p>
              Étudiant en informatique, je transforme les idées en expériences
              numériques. J'aime comprendre comment les choses fonctionnent,
              apprendre de nouvelles technologies et construire des projets utiles,
              avec une attention particulière portée à la qualité et aux détails.
            </p>
            </div>
          </section>

          <section id="skills" className="section">
            <div className="section_heading">
            <span className="eyebrow">Ma constellation technique</span>
            <h2>Langages &amp; frameworks</h2>
            <p>Les technologies que j'utilise pour donner vie à mes idées.</p>
            </div>
            <SkillsCarousel />
          </section>

          <section id="projects" className="section">
            <div className="section_heading">
            <span className="eyebrow">Missions accomplies</span>
            <h2>Mes projets</h2>
            <p>Quelques réalisations qui retracent mon parcours et ma curiosité.</p>
            </div>
            <div className="projects_grid">
            {projects.map((project) => (
              <article className="project_card" key={project.title}>
                <div className="project_image">
                  <img src={project.image} alt="" />
                </div>
                <div className="project_content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag_list">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
            </div>
          </section>
        </main>
        <footer>© 2026 Angelo Salgueiro · Exploration en cours</footer>
      </div>
    </>
  );
}

export default App
