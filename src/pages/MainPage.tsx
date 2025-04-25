import ComoFunciona from '../components/ComoFunciona';
import Equipo from '../components/Equipo';
import Footer from '../components/Footer';
import Galeria from '../components/Galeria';
import Header from '../components/Header';
import Inicio from '../components/Inicio';
import NuestraMision from '../components/NuestraMision';

export default function MainPage() {
  return (
    <div className="grid min-h-screen w-full min-w-full grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="h-full w-full min-w-full flex-grow overflow-x-hidden overflow-y-auto">
        <Inicio />
        <NuestraMision />
        <Galeria />
        <ComoFunciona />
        <Equipo />
      </main>
      <Footer />
    </div>
  );
}
