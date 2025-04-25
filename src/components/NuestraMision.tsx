import { useEffect, useState } from 'react';
import BlurText from './BlurText/BlurText';
import CellViewer, { CellViewerProps } from './CellViewer';
import SectionLayout from '../Layouts/SectionLayout';

// Props de CellViewer para producción
const prodPropsMobile: Omit<CellViewerProps, 'devMode' | 'disableRotation'> = {
  cellSize: 80,
  cellX: 0,
  cellY: -10,
  cellZ: 0,
  rotX: 0,
  rotY: 15,
  rotZ: 0,
  opacity: 1,
  color: '#c51d1d',
  metalness: 0.1,
  roughness: 0.65,
  wireframe: false,
  rotateYSpeed: 0.1,
  rotateXSpeed: 0,
};

const prodPropsDesktop: Omit<CellViewerProps, 'devMode' | 'disableRotation'> = {
  cellSize: 160,
  cellX: 100,
  cellY: 20,
  cellZ: 0,
  rotX: 30,
  rotY: 0,
  rotZ: 180,
  opacity: 1,
  color: '#bb0000',
  metalness: 0.7,
  roughness: 0.4,
  wireframe: false,
  rotateYSpeed: 0.15,
  rotateXSpeed: 0,
};

export default function NuestraMision() {
  // Estado reactivo para detectar si es móvil (ancho < 640px)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prodProps = isMobile ? prodPropsMobile : prodPropsDesktop;
  const currentProps: CellViewerProps = {
    disableRotation: false,
    ...prodProps,
    rotX: (prodProps.rotX ?? 0) * (Math.PI / 180),
    rotY: (prodProps.rotY ?? 0) * (Math.PI / 180),
    rotZ: (prodProps.rotZ ?? 0) * (Math.PI / 180),
    rotateYSpeed: prodProps.rotateYSpeed ?? 0,
    rotateXSpeed: prodProps.rotateXSpeed ?? 0,
  };

  return (
    <SectionLayout ScrollId="mision" BackgroundColor="white">
      <div className="relative h-full w-full">
        {/* Gradiente decorativo en el fondo */}
        <div className="absolute inset-0 before:absolute before:top-1/2 before:left-1/2 before:z-0 before:h-[80vh] before:w-[80vw] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-red-200 before:opacity-60 before:blur-[100px] before:content-['']"></div>

        {/* Texto por delante del gradiente */}
        <div className="relative z-10 mr-0 flex flex-col gap-4 sm:mr-12">
          <h2 className="text-left text-3xl font-medium text-black sm:text-6xl">
            Nuestra Misión
          </h2>
          <div className="leading-wide max-w-120 text-base font-light tracking-wide text-pretty sm:text-xl">
            <BlurText
              delay={50}
              text="Nuestra misión es proporcionar herramientas y servicios que permitan a las personas identificar y clasificar las células en las imágenes de manera precisa y eficiente."
            />
          </div>
        </div>

        {/* Canvas o modelo 3D, detrás del texto pero encima del fondo */}
        <div className="absolute inset-0 z-0">
          <CellViewer {...currentProps} />
        </div>
      </div>
    </SectionLayout>
  );
}
