import Dither from '../backgrounds/Dither/Dither';

export default function Inicio() {
  return (
    <>
      <div className="absolute -z-10 h-[100dvh] w-full mask-b-from-70% blur-[.5px] backdrop-blur-2xl">
        <Dither
          pixelSize={1.2}
          colorNum={5}
          waveColor={[0.5, 0.5, 0.5]}
          waveSpeed={0.02}
          waveAmplitude={0.3}
        />
      </div>
      <section
        id="inicio"
        className="z-10 flex h-[100dvh] items-center justify-center p-8 text-center"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-9xl font-semibold tracking-wide">AICLID</h2>
          <p className="mx-auto max-w-2xl text-xl">
            Proyecto de etiquetado automático de imágenes de células como
            glóbulos rojos, linfocitos y más, mediante inteligencia artificial.
          </p>
        </div>
      </section>
    </>
  );
}
