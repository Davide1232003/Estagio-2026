function Highlights() {
  return (
    <section className="bg-black py-20 px-6 text-white" id="design">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho da Secção */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Design Revolucionário</h2>
          <p className="text-xl text-gray-400">
            Cada detalhe foi pensado para criar a melhor experiência
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900 rounded-3xl p-8">
            <img
              className="w-full rounded-2xl mb-4"
              src="../src/assets/img/titanium-design.jpg"
              alt="IPhone-Titanium"
            />
            <h3 className="font-bold mb-2 text-3xl">Titânio Premium</h3>
            <p className="text-gray-300">
              Estrutura em titânio de grau aeroespacial. O smartphone mais forte
              e leve.
            </p>
          </div>

          <div className="bg-gray-900 rounded-3xl p-8">
            <img
              className="w-full rounded-2xl mb-4"
              src="../src/assets/img/ios-features.jpg"
              alt="IOS-2025"
            />
            <h3 className="font-bold mb-2 text-3xl">iOS 26</h3>
            <p className="text-gray-300">
              O sistema operacional mais avançado do mundo com IA integrada.
            </p>
          </div>
        </div>

        <div
          className="bg-gray-900 rounded-3xl p-10 md:p-16 mb-16 flex flex-col md:flex-row items-center gap-12"
          id="performance"
        >
          <div className="flex-1 text-left">
            <h3 className="text-5xl font-bold mb-6 text-gradient inline-block">
              A18 PRO
            </h3>
            <p className="text-gray-200 text-xl mb-8">
              O chip mais poderoso em um smartphone.
            </p>

            <ul className="space-y-4 text-gray-300 border-l-2 border-orange-500/50 pl-6">
              <li>
                <span className="text-white font-bold">CPU</span> 20% mais
                rápida
              </li>
              <li>
                <span className="text-white font-bold">GPU</span> 25% mais
                eficiente
              </li>
              <li>Neural Engine com 16 núcleos</li>
              <li>Ray tracing acelerado por hardware</li>
            </ul>
          </div>

          <div className="flex-1">
            <img
              className="w-full max-w-4xl h-auto object-contain rounded-2xl transition-transform duration-500 hover:scale-105"
              src="../src/assets/img/chip-a18-pro.png"
              alt="chip a18"
            />
          </div>
        </div>

        <div id="camera" className="text-center">
          <h3 className="text-4xl font-bold mb-10">
            Sistema de câmera Pro avançado
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-2xl p-8 hover:scale-105 cursor-pointer transition-all duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-4">48MP</div>
              <h4 className="text-2xl font-semibold mb-2">Principal</h4>
              <p className="text-gray-400">
                Sensor quad-pixel com foco automático
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 hover:scale-105 cursor-pointer transition-all duration-300">
              <div className="text-4xl font-bold text-orange-600 mb-4">
                12MP
              </div>
              <h4 className="text-2xl font-semibold mb-2">Ultra Wide</h4>
              <p className="text-gray-400">
                Campo de visão de 120º com modo noturno
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 hover:scale-105 cursor-pointer transition-all duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-4">12MP</div>
              <h4 className="text-2xl font-semibold mb-2">Telefoto 5x</h4>
              <p className="text-gray-400">
                Zoom óptico de 5x com estabilização
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
