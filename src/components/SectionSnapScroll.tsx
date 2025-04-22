import { useEffect, useMemo, useRef } from 'react';

// Este componente escucha el wheel global y hace snap inmediato a la siguiente o anterior sección
export function SectionSnapScroll() {
  // IDs de las secciones principales (deben coincidir con ScrollDots)
  const sections = useMemo(
    () => ['inicio', 'mision', 'galeria', 'ia', 'equipo', 'contacto', 'footer'],
    []
  );
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    function getCurrentSectionIndex() {
      let found = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            found = i;
          }
        }
      }
      return found;
    }

    function onWheel(e: WheelEvent) {
      // Evita scroll rápido o repetido
      const now = Date.now();
      if (isScrolling.current && now - lastScrollTime.current < 500) {
        e.preventDefault();
        return;
      }
      isScrolling.current = true;
      lastScrollTime.current = now;
      e.preventDefault();
      const current = getCurrentSectionIndex();
      let next = current;
      if (e.deltaY > 0 && current < sections.length - 1) {
        next = current + 1;
      } else if (e.deltaY < 0 && current > 0) {
        next = current - 1;
      }
      if (next !== current) {
        const el = document.getElementById(sections[next]);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }
      setTimeout(() => {
        isScrolling.current = false;
      }, 500); // Evita doble scroll muy rápido
    }
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [sections]);
  return null;
}
