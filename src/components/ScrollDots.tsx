import { useEffect, useState, useMemo } from 'react';

// Componente ScrollDots: barra de navegación lateral por secciones
// Muestra un círculo por cada sección y permite navegar haciendo click
export function ScrollDots() {
  // IDs y etiquetas de las secciones principales
  const sections = useMemo(
    () => [
      { id: 'inicio', label: 'Inicio' },
      { id: 'mision', label: 'Misión' },
      { id: 'galeria', label: 'Galería' },
      { id: 'ia', label: 'IA' },
      { id: 'equipo', label: 'Equipo' },
      { id: 'contacto', label: 'Contacto' },
    ],
    []
  );

  // Estado: índice de la sección actualmente visible
  const [active, setActive] = useState(0);

  // Efecto: actualiza el círculo activo al hacer scroll
  useEffect(() => {
    function onScroll() {
      let found = 0;
      // Busca la sección más cercana a la parte superior de la ventana
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
    onScroll(); // Inicializa el estado al montar
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  // Navega suavemente a la sección al hacer click en un círculo
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="fixed top-1/2 left-8 z-50 flex -translate-y-1/2 flex-col items-center gap-4"
      aria-label="Navegación por secciones"
    >
      {sections.map((s, i) => (
        <div key={s.id} className="group relative flex flex-col items-center">
          <button
            aria-label={s.label}
            onClick={() => handleClick(s.id)}
            className={`h-5 w-5 scale-75 rounded-full border-2 transition-all focus:outline-none ${
              active === i
                ? 'scale-125 border-[#F62F63] bg-[#F62F63] shadow-lg'
                : 'border-[#171435] bg-white/80 hover:border-[#ffa7bf] hover:bg-[#F62F63]'
            } `}
          />
          {/* Tooltip al hacer hover */}
          <span
            className="pointer-events-none absolute top-1/2 left-7 -translate-y-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-2 group-hover:opacity-100"
            style={{
              boxShadow: ' 0 0 2px 1px #fff',
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
