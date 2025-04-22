import { useEffect, useState } from 'react';

// Componente ScrollDots: barra de navegación lateral por secciones
// Muestra un círculo por cada sección y permite navegar haciendo click
export function ScrollDots() {
  // IDs y etiquetas de las secciones principales
  const sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'mision', label: 'Misión' },
    { id: 'galeria', label: 'Galería' },
    { id: 'ia', label: 'IA' },
    { id: 'equipo', label: 'Equipo' },
    { id: 'contacto', label: 'Contacto' },
  ];

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
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed top-1/2 right-6 z-50 flex -translate-y-1/2 flex-col items-center gap-4"
      aria-label="Navegación por secciones"
    >
      {sections.map((s, i) => (
        <button
          key={s.id}
          aria-label={s.label}
          onClick={() => handleClick(s.id)}
          // Círculo activo: rojo, inactivos: blanco con borde oscuro
          className={`h-5 w-5 rounded-full border-2 transition-all focus:outline-none ${
            active === i
              ? 'scale-125 border-[#F62F63] bg-[#F62F63] shadow-lg'
              : 'border-[#171435] bg-white/80 hover:border-[#F62F63] hover:bg-[#F62F63]'
          } `}
        />
      ))}
    </div>
  );
}
