// import Dither from '../backgrounds/Dither/Dither';

import Aurora from '../backgrounds/Aurora/Aurora';

export default function Inicio() {
  return (
    <>
      <div className="absolute -z-10 h-[100dvh] w-full">
        {/* <Dither
          pixelSize={1.2}
          colorNum={5}
          waveColor={[0.5, 0.5, 0.5]}
          waveSpeed={0.02}
          waveAmplitude={0.3}
        /> */}
        <Aurora />
      </div>
      <section
        id="inicio"
        className="z-10 flex h-[100dvh] items-center justify-center p-8 text-center"
      >
        <div className="flex flex-col gap-8 text-white">
          <h2 className="text-8xl font-semibold tracking-wide">AICLID</h2>
          <p className="mx-auto max-w-2xl text-lg">
            Proyecto de etiquetado automático de imágenes de células como
            glóbulos rojos, linfocitos y más, mediante inteligencia artificial.
          </p>
        </div>
      </section>
    </>
  );
}
