import Aurora from '../backgrounds/Aurora/Aurora';

export default function Inicio() {
  return (
    <>
      <div className="absolute -z-10 h-[100dvh] w-full">
        <Aurora />
      </div>
      <section
        id="inicio"
        className="z-10 flex h-[100dvh] snap-start items-center justify-center p-4 text-center sm:p-8"
      >
        <div className="flex flex-col gap-6 text-white sm:gap-8">
          <h2 className="text-5xl font-semibold tracking-wide sm:text-8xl">
            AICLID
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg">
            Proyecto de etiquetado automático de imágenes de células como
            glóbulos rojos, linfocitos y más, mediante inteligencia artificial.
          </p>
        </div>
      </section>
    </>
  );
}
