import BlurText from './BlurText/BlurText';

export default function NuestraMision() {
  return (
    <section id="mision" className="relative h-[100dvh] bg-black p-8">
      <h2 className="mt-8 text-7xl font-medium">Nuestra Misión</h2>
      <div className="absolute inset-x-0 top-1/2 max-w-[900px] -translate-y-1/2 px-8 text-5xl leading-16 tracking-wide text-pretty">
        <BlurText text="Nuestra misión es proporcionar herramientas y servicios que permitan a las personas identificar y clasificar las células en las  imágenes de manera precisa y eficiente." />
      </div>
    </section>
  );
}
