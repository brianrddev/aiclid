import Aurora from '../backgrounds/Aurora/Aurora';
import SectionLayout from '../Layouts/SectionLayout';

export default function Inicio() {
  return (
    <>
      <div className="absolute -z-10 h-[100dvh] w-full">
        <Aurora />
      </div>
      <SectionLayout ScrollId="inicio" BackgroundColor="transparent">
        <div className="flex w-full flex-col items-center justify-center gap-6 text-center text-white sm:gap-8">
          <h2 className="text-5xl font-semibold tracking-wide sm:text-8xl">
            AICLID
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg">
            Proyecto de etiquetado automático de imágenes de células como
            glóbulos rojos, linfocitos y más, mediante inteligencia artificial.
          </p>
        </div>
      </SectionLayout>
    </>
  );
}
