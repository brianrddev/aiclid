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
    <header className="absolute right-0 left-0 mx-auto mt-4 flex w-full max-w-7xl items-center justify-between gap-8 overflow-hidden p-4 px-8 text-[14px]">
      <Logo className="h-8 w-8 text-white" />
      <GooeyNav items={items} />
    </header>
  );
}
