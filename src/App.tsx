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
        <ScrollDots />
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
