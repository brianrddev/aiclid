import BlurText from './BlurText/BlurText';
import CellViewer from './CellViewer';

export default function NuestraMision() {
  return (
    <section
      id="mision"
      className="relative flex h-[100dvh] w-full p-8 text-white"
    >
      <div className="mt-8 ml-12 flex w-1/2 flex-col gap-24">
        <h2 className="text-6xl font-bold tracking-wider">Nuestra Misión</h2>
        <div className="leading-wide text-xl font-light tracking-wide text-pretty">
          <BlurText
            delay={50}
            text="Nuestra misión es proporcionar herramientas y servicios que permitan a las personas identificar y clasificar las células en las  imágenes de manera precisa y eficiente."
          />
        </div>
      </div>
      <div className="w-1/2">
        <CellViewer />
      </div>
    </section>
  );
}
