import GooeyNav from './GooeyNav/GooeyNav';
import Logo from './Logo';
import { useState } from 'react';

export default function Header() {
  const items = [
    { label: 'Inicio', href: '#' },
    { label: 'Nuestra Misión', href: '#' },
    { label: 'Galería de Células', href: '#' },
    { label: '¿Cómo Funciona la IA?', href: '#' },
    { label: 'El Equipo', href: '#' },
    { label: 'Contacto', href: '#' },
  ];
  const [open, setOpen] = useState(false);
  const duration = 500; // ms

  return (
    <header className="absolute right-0 left-0 mx-auto mt-4 flex w-full max-w-7xl items-center justify-between gap-8 overflow-visible bg-transparent p-4 px-8 text-[14px]">
      <Logo className="h-8 w-8 text-white" />
      {/* Desktop nav */}
      <div className="hidden sm:block">
        <GooeyNav items={items} />
      </div>
      {/* Mobile hamburger/X button */}
      <button
        className={`top-4 right-6 z-50 flex h-10 w-10 items-center justify-center transition-all duration-200 sm:hidden`}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen((v) => !v)}
        style={{ transitionProperty: 'background, border, box-shadow' }}
      >
        <div className="p-auto relative h-6 w-7">
          <span
            className={`absolute left-0 h-1 w-7 rounded-full transition-all duration-200 ${open ? 'top-3.5 rotate-45 bg-black' : 'top-0 bg-white'}`}
            style={{ transitionProperty: 'background-color, transform, top' }}
          ></span>
          <span
            className={`absolute left-0 h-1 w-7 rounded-full transition-all duration-200 ${open ? 'top-3.5 bg-black opacity-0' : 'top-2.5 bg-white'}`}
            style={{ transitionProperty: 'background-color, opacity' }}
          ></span>
          <span
            className={`absolute left-0 h-1 w-7 rounded-full transition-all duration-200 ${open ? 'top-3.5 -rotate-45 bg-black' : 'top-5 bg-white'}`}
            style={{ transitionProperty: 'background-color, transform, top' }}
          ></span>
        </div>
        <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
      </button>
      {/* Mobile dropdown + background fade/blur */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-end transition-all duration-200 sm:hidden ${open ? 'pointer-events-auto bg-black/60 opacity-100 backdrop-blur-[6px]' : 'backdrop-blur-0 pointer-events-none bg-black/0 opacity-0'} `}
        style={{ transitionProperty: 'opacity, background-color, filter' }}
        aria-hidden={!open}
      >
        <nav
          className={`relative h-full w-64 transform bg-white p-6 pt-16 text-black shadow-lg transition-all duration-200 ${open ? 'translate-x-0' : 'translate-x-full'}`}
          style={{
            transitionProperty: 'transform, box-shadow, background-color',
          }}
        >
          <ul className="mt-4 flex flex-col gap-6">
            {items.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  className="block rounded px-4 py-2 transition hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
