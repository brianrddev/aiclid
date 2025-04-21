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
        <Header />
        <main className="flex-grow">
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
