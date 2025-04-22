import BlurText from './BlurText/BlurText';
import CellViewer from './CellViewer';

export default function NuestraMision() {
  return (
    <section
      id="mision"
      className="relative flex h-[100dvh] w-full snap-start flex-col overflow-hidden bg-gray-100 mask-t-from-99% p-4 text-black backdrop-blur-sm sm:flex-row sm:p-8"
    >
      <div className="mt-4 flex w-full flex-col gap-12 sm:mt-8 sm:ml-12 sm:w-1/2 sm:gap-24">
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
      <div className="before:bg-opacity-5 z-10 flex w-full items-center justify-center before:absolute before:top-1/2 before:-z-10 before:size-[300px] before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-red-300 before:blur-3xl before:content-[''] sm:w-1/2 sm:before:size-[400px]">
        <CellViewer />
      </div>
    </section>
  );
}
