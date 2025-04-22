import TiltedCard from './TiltedCard';

export default function Galeria() {
  const celulas = [
    'BASOFILO',
    'EOSINOFILO',
    'ERITROCITO',
    'LINFOCITO',
    'MONOCITO',
    'NEUTROFILO',
    'TROMBOCITO',
  ];

  return (
    <section
      id="galeria"
      className="flex h-[100dvh] snap-start flex-col bg-gray-100 p-4 sm:p-8"
    >
      <div className="mr-0 sm:mr-12">
        <h2 className="text-right text-3xl font-medium text-black sm:text-6xl">
          Galería de Células
        </h2>
        <div className="mt-2 text-right text-base font-light text-pretty sm:mt-4 sm:text-xl">
          <p className="leading-wide tracking-wide">
            Explora nuestra galería de imágenes de células sanguíneas. Haz clic
            en cada celda para ver más detalles.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="celulas mx-auto grid w-full max-w-5xl grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {celulas.map((celula, i) => (
            <TiltedCard
              key={i}
              className="z-0 rounded-xl bg-gray-300 shadow-lg"
              imageSrc={`./${celula.toLowerCase()}.png`}
              altText={celula}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="text-xs font-medium sm:text-sm">{celula}</p>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
