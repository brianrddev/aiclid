import './App.css';
import ComoFunciona from './components/ComoFunciona';
import Contacto from './components/Contacto';
import Equipo from './components/Equipo';
import Footer from './components/Footer';
import Galeria from './components/Galeria';
import Header from './components/Header';
import Inicio from './components/Inicio';
import NuestraMision from './components/NuestraMision';
import { ScrollDots } from './components/ScrollDots';
import { SectionSnapScroll } from './components/SectionSnapScroll';

function App() {
  return (
    <>
      <div className="grid min-h-screen w-full min-w-full grid-rows-[auto_1fr_auto]">
        <Header />
        {/* ScrollDots: ocultar en móvil, mostrar en desktop/tablet y ajustar tamaño en móvil */}
        <div className="hidden sm:block">
          <ScrollDots />
        </div>
        {/* ScrollDots móvil: dots pequeños y abajo */}
        <div className="pointer-events-none fixed right-0 bottom-6 left-0 z-50 flex justify-center gap-2 sm:hidden">
          <ScrollDots mobile />
        </div>
        <SectionSnapScroll />
        <main className="w-full min-w-full flex-grow snap-y snap-mandatory overflow-y-auto">
          <Inicio />
          <NuestraMision />
          <Galeria />
          <ComoFunciona />
          <Equipo />
          <Contacto />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
