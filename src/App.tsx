import './App.css';

function App() {
  return (
    <>
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">AICLID</h1>
          <nav className="space-x-4">
            <a href="#inicio" className="hover:underline">
              Inicio
            </a>
            <a href="#mision" className="hover:underline">
              Nuestra Misión
            </a>
            <a href="#galeria" className="hover:underline">
              Galería de Células
            </a>
            <a href="#ia" className="hover:underline">
              ¿Cómo Funciona la IA?
            </a>
            <a href="#equipo" className="hover:underline">
              El Equipo
            </a>
            <a href="#contacto" className="hover:underline">
              Contacto
            </a>
          </nav>
        </header>

        {/* Main Sections */}
        <main className="flex-grow">
          {/* Inicio */}
          <section id="inicio" className="p-8 text-center">
            <h2 className="mb-4 text-3xl font-semibold">Bienvenido a AICLID</h2>
            <p className="mx-auto max-w-2xl">
              Proyecto de etiquetado automático de imágenes de células como
              glóbulos rojos, linfocitos y más, mediante inteligencia
              artificial.
            </p>
          </section>

          {/* Nuestra Misión */}
          <section id="mision" className="bg-gray-100 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Nuestra Misión</h2>
            <p className="mx-auto max-w-3xl">
              Potenciar el diagnóstico y la investigación médica automatizando
              la clasificación celular a través de modelos de inteligencia
              artificial precisos y escalables.
            </p>
          </section>

          {/* Galería de Células */}
          <section id="galeria" className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">Galería de Células</h2>
            <p className="mx-auto max-w-3xl">
              Aquí se mostrarán ejemplos de imágenes etiquetadas automáticamente
              por nuestra IA.
            </p>
          </section>

          {/* ¿Cómo Funciona la IA? */}
          <section id="ia" className="bg-gray-100 p-8">
            <h2 className="mb-4 text-2xl font-semibold">
              ¿Cómo Funciona la IA?
            </h2>
            <p className="mx-auto max-w-3xl">
              Nuestra inteligencia artificial analiza imágenes microscópicas,
              extrae características visuales relevantes y clasifica las células
              con modelos de aprendizaje profundo.
            </p>
          </section>

          {/* El Equipo */}
          <section id="equipo" className="p-8">
            <h2 className="mb-4 text-2xl font-semibold">El Equipo</h2>
            <p className="mx-auto max-w-3xl">
              Conoce al equipo multidisciplinario de investigadores, ingenieros
              y médicos que hacen posible AICLID.
            </p>
          </section>

          {/* Contacto */}
          <section id="contacto" className="bg-gray-100 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Contacto</h2>
            <p className="mx-auto max-w-3xl">
              ¿Tienes preguntas o quieres colaborar? Escríbenos a
              contacto@aiclid.org
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white p-4 text-center">
          <p>&copy; 2025 AICLID. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
