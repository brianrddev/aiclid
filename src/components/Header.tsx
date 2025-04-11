export default function Header() {
  return (
    <header className="absolute top-0 flex w-full items-center justify-between bg-white p-4 shadow-md">
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
  );
}
