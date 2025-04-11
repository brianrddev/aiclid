import './App.css';
import ComoFunciona from './components/ComoFunciona';
import Contacto from './components/Contacto';
import Equipo from './components/Equipo';
import Footer from './components/Footer';
import Galeria from './components/Galeria';
import Header from './components/Header';
import Inicio from './components/Inicio';
import NuestraMision from './components/NuestraMision';

function App() {
  return (
    <>
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        {/* Header */}
        <Header />

        {/* Main Sections */}
        <main className="flex-grow">
          {/* Inicio */}
          <Inicio />

          {/* Nuestra Misión */}
          <NuestraMision />

          {/* Galería de Células */}
          <Galeria />

          {/* ¿Cómo Funciona la IA? */}
          <ComoFunciona />

          {/* El Equipo */}
          <Equipo />

          {/* Contacto */}
          <Contacto />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
