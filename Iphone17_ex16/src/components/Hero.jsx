function Hero() {
  const baixar = () => {
    window.scrollBy({
      top: 700,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <div className="absolute top-18 bottom-0 right-0 left-0 z-0">
        <img
          src="../src/assets/img/hero.jpg"
          className="w-full h-full object-cover object-[center_22%] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
      </div>

      <button
        onClick={baixar}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer text-white outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8" // Aumentei um pouco para ser mais fácil de clicar
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
          />
        </svg>
      </button>
    </section>
  );
}

export default Hero;
