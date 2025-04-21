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
    <section id="galeria" className="h-[100dvh] bg-gray-100 p-8">
      <h2 className="mb-4 text-7xl font-medium text-black">
        Galería de Células
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {celulas.map((celula, i) => (
          <TiltedCard
            key={i}
            className="z-0 rounded-xl bg-gray-300 shadow-lg"
            imageSrc={`./${celula.toLowerCase()}.png`} // asumiendo que el nombre del archivo coincide
            altText={celula}
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="250px"
            imageWidth="250px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={<p>{celula}</p>}
          />
        ))}
      </div>
    </section>
  );
}
