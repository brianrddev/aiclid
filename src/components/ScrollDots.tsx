import { useEffect, useState } from 'react';

// ScrollDots: indicador de sección lateral
export function ScrollDots() {
  // IDs de las secciones principales en orden
  const sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'mision', label: 'Misión' },
    { id: 'galeria', label: 'Galería' },
    { id: 'ia', label: 'IA' },
    { id: 'equipo', label: 'Equipo' },
    { id: 'contacto', label: 'Contacto' },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    function onScroll() {
      let found = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            found = i;
          }
        }
      }
      setActive(found);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-1/2 right-6 z-50 flex -translate-y-1/2 flex-col items-center gap-4">
      {sections.map((s, i) => (
        <button
          key={s.id}
          aria-label={s.label}
          onClick={() => handleClick(s.id)}
          className={`h-5 w-5 rounded-full border-2 transition-all focus:outline-none ${
            active === i
              ? 'scale-125 border-[#ff0044] bg-[#ff0044] shadow-lg'
              : 'border-[#171435] bg-white/80 hover:border-[#F62F63] hover:bg-[#f62f648f]'
          } `}
        />
      ))}
    </div>
  );
}
