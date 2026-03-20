/* Componentes */
import PillNav from "./components/Menu/PillNav.jsx";
import LogoLoop from "./components/LogosLoop/LogoLoop.jsx";
import Plasma from "./components/Fundo/Plasma.jsx";
import ToDoApp from "./components/ToDoApp.jsx";
import CircularGallery from "./components/Galeria/CircularGallery.jsx";
import ProfileCard from "./components/Card/ProfileCard.jsx";
import { useState, useEffect } from "react";
/* Estilos */
import "./index.css";

/* Importe dos Logos */
import flutter from "./assets/logos/flutter.svg";
import css3 from "./assets/logos/css3.svg";
import html5 from "./assets/logos/html5.svg";
import javascript from "./assets/logos/javascript.svg";
import react from "./assets/logos/react.svg";

/* Importe dos Fotos */
import davide from "./assets/fotos/davide.png";

function App() {

  const imageLogos = [
    { src: flutter, alt: "Flutter" },
    { src: css3, alt: "CSS3" },
    { src: html5, alt: "HTML5" },
    { src: javascript, alt: "JavaScript" },
    { src: react, alt: "React" },
  ];

  return (
    <div className="main-layout">
      {/* Camada 0: O Fundo */}
      <Plasma />

      {/* Camada 1: O Conteúdo */}
      <main className="content-container">
        <PillNav
          className="menu"
          logo={flutter}
          logoAlt="Company Logo"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
          ]}
          ease="power2.easeOut"
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
          theme="light"
          initialLoadAnimation={false}
        />

        <ToDoApp />

        <LogoLoop
          className="logo-loop"
          logos={imageLogos}
          speed={150}
          direction="left"
          logoHeight={60}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />

        <CircularGallery
          className="circular-gallery"
          bend={5}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
          scrollSpeed={2.5}
        />

        <ProfileCard
          name="Davide Cerqueira"
          title="Web Developer"
          handle="davide_cerqueira"
          status="Online"
          contactText="Contact Me"
          avatarUrl={davide}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={true}
          onContactClick={() => console.log("Contact clicked")}
          behindGlowColor="rgba(41, 2, 2, 0.67)"
          iconUrl="/assets/demo/iconpattern.png"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />
      </main>
    </div>
  );
}

export default App;
