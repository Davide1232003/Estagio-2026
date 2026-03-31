function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center gap-8 ">
        <a href="#design" className="text-gray-200 hover:text-gray-100 text-x">
          Design
        </a>
        <a
          href="#performance"
          className="text-gray-200 hover:text-gray-100 text-x"
        >
          Performance
        </a>
        <a href="#camera" className="text-gray-200 hover:text-gray-100 text-x">
          Câmara
        </a>
        <a href="#cores" className="text-gray-200 hover:text-gray-100 text-x">
          Cores
        </a>
        <button className="bg-blue-700 hover:bg-blue-500 text-white px-6 py-2 rounded-full cursor-pointer">
          Comprar
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
