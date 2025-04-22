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
      className="flex h-[100dvh] snap-start flex-col bg-gray-100 p-8"
    >
      <div className="mr-12">
        <h2 className="text-right text-6xl font-medium text-black">
          Galería de Células
        </h2>
        <div className="mt-4 text-right text-xl font-light text-pretty">
          <p className="leading-wide tracking-wide">
            Explora nuestra galería de imágenes de células sanguíneas. Haz clic
            en cada celda para ver más detalles.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="celulas mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {celulas.map((celula, i) => (
            <TiltedCard
              key={i}
              className="z-0 rounded-xl bg-gray-300 shadow-lg"
              imageSrc={`./${celula.toLowerCase()}.png`}
              altText={celula}
              containerHeight="200px"
              containerWidth="200px"
              imageHeight="180px"
              imageWidth="180px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={<p className="text-sm font-medium">{celula}</p>}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
