import BlurText from './BlurText/BlurText';
import CellViewer, { CellViewerProps } from './CellViewer';

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
  // Detectar si es móvil (ancho < 640px)
  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const prodProps = isMobile ? prodPropsMobile : prodPropsDesktop;
  const currentProps: CellViewerProps = {
    devMode: false,
    disableRotation: false,
    ...prodProps,
    rotX: (prodProps.rotX ?? 0) * (Math.PI / 180),
    rotY: (prodProps.rotY ?? 0) * (Math.PI / 180),
    rotZ: (prodProps.rotZ ?? 0) * (Math.PI / 180),
    rotateYSpeed: prodProps.rotateYSpeed ?? 0,
    rotateXSpeed: prodProps.rotateXSpeed ?? 0,
  };

  return (
    <section
      id="mision"
      className="relative flex h-[100dvh] w-full snap-start flex-col overflow-hidden bg-gray-100 mask-t-from-99% text-black backdrop-blur-sm sm:flex-row sm:p-8"
    >
      <div className="relative z-10 m-4 mt-4 flex w-full flex-col gap-12 select-none sm:mt-8 sm:ml-12 sm:w-1/2 sm:gap-24">
        <h2 className="text-3xl font-medium tracking-wider sm:text-6xl">
          Nuestra Misión
        </h2>
        <div className="leading-wide text-base font-light tracking-wide text-pretty sm:text-xl">
          <BlurText
            delay={50}
            text="Nuestra misión es proporcionar herramientas y servicios que permitan a las personas identificar y clasificar las células en las  imágenes de manera precisa y eficiente."
          />
        </div>
      </div>
      <CellViewer {...currentProps} />
    </section>
  );
}
