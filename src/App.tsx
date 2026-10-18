import { useEffect, useRef, useState, type FormEvent } from 'react'
import emailjs from "@emailjs/browser";
import angularIcon from "./assets/angular.svg";
import calculatorImage from "./assets/calculator.png";
import cssIcon from "./assets/css.svg";
import dockerIcon from "./assets/docker.svg";
import goIcon from "./assets/golang.svg";
import htmlIcon from "./assets/html5.svg";
import javaIcon from "./assets/java.svg";
import javascriptIcon from "./assets/javascript.svg";
import kotlinIcon from "./assets/kotlin.svg";
import legoImage from "./assets/lego.png";
import photoImage from "./assets/photo.png";
import phpIcon from "./assets/php.svg";
import pikaImage from "./assets/pika.png";
import pongImage from "./assets/pong.png";
import pythonIcon from "./assets/python.svg";
import quadtreeImage from "./assets/quadtree1.png";
import quiestceImage from "./assets/quiestce.png";
import reactIcon from "./assets/react.svg";
import typescriptIcon from "./assets/typescript.svg";
import './App.css'

// Ratio between the background and the foreground
const scrollRatio = 0.8;

function scrollToSection(event: React.MouseEvent<HTMLAnchorElement>) {
  const hash = event.currentTarget.getAttribute("href");
  if (!hash?.startsWith("#") || hash.length === 1) return;

  const section = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!section) return;

  event.preventDefault();

  const sectionTop = window.scrollY + section.getBoundingClientRect().top;
  const scrollMargin = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const targetScroll = Math.min(maxScroll, Math.max(0, sectionTop - scrollMargin));

  if (Math.abs(window.scrollY - targetScroll) < 2) return;

  window.scrollTo({
    top: targetScroll,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

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
      <img className="profile_picture" src={photoImage} alt="Portrait d'Angelo" />
      <div>
        <h1>Salut ! Je m'appelle <strong>Angelo</strong>.</h1>
        <h2>Bienvenue sur mon <strong>portfolio</strong> !</h2>
        <a className="button" href="#presentation" onClick={scrollToSection}>Découvrir mon univers</a>
      </div>
    </header>
  );
}

const skills = [
  { name: "HTML5", category: "Langage & web", icon: htmlIcon },
  { name: "CSS", category: "Langage & web", icon: cssIcon },
  { name: "JavaScript", category: "Langage", icon: javascriptIcon },
  { name: "TypeScript", category: "Langage", icon: typescriptIcon },
  { name: "Python", category: "Langage", icon: pythonIcon },
  { name: "Java", category: "Langage", icon: javaIcon },
  { name: "Kotlin", category: "Langage", icon: kotlinIcon },
  { name: "PHP", category: "Langage", icon: phpIcon },
  { name: "React", category: "Framework", icon: reactIcon },
  { name: "Angular", category: "Framework", icon: angularIcon },
  { name: "Go", category: "Langage", icon: goIcon },
  { name: "Docker", category: "Outil", icon: dockerIcon },
];

const projects = [
  {
    title: "Calculatrice",
    description: "Une calculatrice réalisée avec Slint.",
    image: calculatorImage,
    href: "https://github.com/AngeloSalgueiro/calculator_slint.git",
    tags: ["Slint", "Calculatrice"],
  },
  {
    title: "Site web e-commerce",
    description: "Un site web de vente de Lego réalisé dans le cadre d'un projet de groupe.",
    image: legoImage,
    href: "https://github.com/AngeloSalgueiro/lego-ecommerce-website.git",
    tags: ["E-commerce", "Projet de groupe"],
  },
  {
    title: "Application côté client",
    description: "Un projet de groupe : réaliser une application côté client pour le jeu Qui-est-ce ?.",
    image: quiestceImage,
    href: "https://github.com/AngeloSalgueiro/Client-sided-whoswho.git",
    tags: ["TypeScript", "Projet de groupe"],
  },
  {
    title: "Projet quadtree",
    description: "Amélioration en équipe d'un petit jeu en Go, avec l'implémentation de nouvelles fonctionnalités.",
    image: quadtreeImage,
    href: "https://github.com/AngeloSalgueiro/smallgameinGo.git",
    tags: ["Go", "Quadtree"],
  },
  {
    title: "Marketplace de cartes Pokémon",
    description: "Petit projet d'équipe autour d'une marketplace de cartes Pokémon.",
    image: pikaImage,
    href: "https://github.com/AngeloSalgueiro/pokemonTCGmarketplace.git",
    tags: ["Marketplace", "Projet de groupe"],
  },
  {
    title: "Expériences en Python",
    description: "Quelques jeux et expériences réalisés avec Pygame.",
    image: pongImage,
    href: "https://github.com/AngeloSalgueiro/python_experiences.git",
    tags: ["Python", "Pygame"],
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

function ContactForm() {
  const [sendStatus, setSendStatus] = useState<"sending" | "success" | "error" | null>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSendStatus("sending");

    emailjs
      .sendForm(
        "service_portfolio",
        "template_ihgjhcc",
        form,
        { publicKey: "nL3U2yAwWoEuzQp2l" }
      )
      .then(() => {
        form.reset();
        setSendStatus("success");
      })
      .catch(() => setSendStatus("error"));
  };

  return (
    <section id="contact" className="section contact_section">
      <div className="section_heading">
        <span className="eyebrow">Entrée en communication</span>
        <h2>Faisons connaissance</h2>
        <p>Une idée, une question ou simplement envie d’échanger ? Écrivez-moi.</p>
      </div>
      <div className="contact_layout">
        <aside className="contact_intro">
          <span className="contact_status">
            <span aria-hidden="true" />
            Ouvert aux nouvelles idées
          </span>
          <h3>Votre prochain projet commence par une conversation.</h3>
          <p>
            Décrivez-moi ce que vous avez en tête. Je vous répondrai dès que
            possible pour en discuter.
          </p>
          <div className="contact_signature" aria-hidden="true">
            <span>AS</span>
            <span>Angelo Salgueiro</span>
          </div>
        </aside>
        <form className="contact_form" onSubmit={sendEmail} aria-busy={sendStatus === "sending"}>
          <div className="form_fields">
            <div className="form_field">
              <label htmlFor="contact-name">Votre nom</label>
              <input
                id="contact-name"
                name="from_name"
                type="text"
                placeholder="Ex. Camille Martin"
                autoComplete="name"
                required
              />
            </div>
            <div className="form_field">
              <label htmlFor="contact-email">Votre adresse e-mail</label>
              <input
                id="contact-email"
                name="reply_to"
                type="email"
                placeholder="vous@exemple.fr"
                autoComplete="email"
                required
              />
            </div>
            <div className="form_field form_field_wide">
              <label htmlFor="contact-subject">Sujet</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="De quoi souhaitez-vous parler ?"
                required
              />
            </div>
            <div className="form_field form_field_wide">
              <label htmlFor="contact-message">Votre message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Quelques mots sur votre idée..."
                rows={5}
                required
              />
            </div>
          </div>
          <div className="form_footer">
            <p>Je vous répondrai dans les meilleurs délais.</p>
            <button className="contact_submit" type="submit" disabled={sendStatus === "sending"}>
              {sendStatus === "sending" ? "Envoi en cours..." : "Envoyer le message"}
              {sendStatus !== "sending" && <span aria-hidden="true">↗</span>}
            </button>
          </div>
          {sendStatus && sendStatus !== "sending" && (
            <div
              className={`form_feedback form_feedback_${sendStatus}`}
              role={sendStatus === "error" ? "alert" : "status"}
              aria-live={sendStatus === "error" ? "assertive" : "polite"}
            >
              <span className="feedback_icon" aria-hidden="true">
                {sendStatus === "success" ? "✓" : "!"}
              </span>
              <div>
                <strong>
                  {sendStatus === "success" ? "Message envoyé !" : "L’envoi a échoué"}
                </strong>
                <p>
                  {sendStatus === "success"
                    ? "Merci pour votre message. Je vous répondrai dès que possible."
                    : "Une erreur est survenue. Veuillez réessayer dans quelques instants."}
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}


function App() {
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

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
          <a href="#intro" className="nav_logo" onClick={scrollToSection}>AS<span>.</span></a>
          <div className="nav_links">
            <a href="#presentation" onClick={scrollToSection}>À propos</a>
            <a href="#skills" onClick={scrollToSection}>Compétences</a>
            <a href="#projects" onClick={scrollToSection}>Projets</a>
            <a href="#contact" onClick={scrollToSection}>Contact</a>
          </div>
        </nav>
        <main>
          <Intro />
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
                  <a className="project_image" href={project.href} target="_blank" rel="noreferrer" aria-label={`Voir ${project.title} sur GitHub`}>
                    <img src={project.image} alt="" />
                  </a>
                  <div className="project_content">
                    <h3><a href={project.href} target="_blank" rel="noreferrer">{project.title}</a></h3>
                    <p>{project.description}</p>
                    <div className="tag_list">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <ContactForm />
        </main>
        <footer>© 2026 Angelo Salgueiro · <a href="https://github.com/AngeloSalgueiro">Github</a> · Exploration en cours </footer>
      </div>
    </>
  );
}

export default App
