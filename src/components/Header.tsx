import GooeyNav from './GooeyNav/GooeyNav';
import Logo from './Logo';

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
    <header className="absolute top-0 flex w-full items-center justify-between overflow-hidden px-16 pt-8">
      <Logo className="h-14 w-14 text-white" />
      <GooeyNav items={items} />
    </header>
  );
}
