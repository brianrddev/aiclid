import BlurText from './BlurText/BlurText';
import CellViewer from './CellViewer';

export default function NuestraMision() {
  return (
    <section
      id="mision"
      className="relative flex h-[100dvh] w-full overflow-hidden bg-gray-100 mask-t-from-99% p-8 text-black backdrop-blur-sm"
    >
      <div className="mt-8 ml-12 flex w-1/2 flex-col gap-24">
        <h2 className="text-6xl font-medium tracking-wider">Nuestra Misión</h2>
        <div className="leading-wide text-xl font-light tracking-wide text-pretty">
          <BlurText
            delay={50}
            text="Nuestra misión es proporcionar herramientas y servicios que permitan a las personas identificar y clasificar las células en las  imágenes de manera precisa y eficiente."
          />
        </div>
      </div>
      <div className="before:bg-opacity-5 z-10 w-1/2 before:absolute before:top-1/2 before:-z-10 before:size-[400px] before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-red-300 before:blur-3xl before:content-['']">
        <CellViewer />
      </div>
    </section>
  );
}
