import GooeyNav from './GooeyNav/GooeyNav';

export default function Header() {
  const items = [
    { label: 'Inicio', href: '#' },
    { label: 'Nuestra Misión', href: '#' },
    { label: 'Galería de Células', href: '#' },
    { label: '¿Cómo Funciona la IA?', href: '#' },
    { label: 'El Equipo', href: '#' },
    { label: 'Contacto', href: '#' },
  ];
  return (
    <header className="absolute top-0 flex w-full items-center justify-between overflow-hidden p-4 text-white">
      <h1 className="text-2xl font-bold">AICLID</h1>
      <GooeyNav items={items} />
    </header>
  );
}
