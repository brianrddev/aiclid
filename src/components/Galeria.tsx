import TiltedCard from "./TiltedCard";

export default function Galeria() {
  const celulas = [
    'BASOFILO',
    'EOSINOFILO',
    'ERITROCITO',
    'LINFOCITO',
    'MONOCITO',
    'NEUTROFILO',
    'TROMBOCITO'
  ];

  return (
    <section id="galeria" className="h-[100dvh] p-8 bg-gray-100">
      <h2 className="mb-4 text-2xl font-semibold">Galería de Células</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {celulas.map((celula, i) => (
          <TiltedCard
            key={i}
            className="bg-gray-300 rounded-xl shadow-lg"
            imageSrc={`./${celula.toLowerCase()}.png`} // asumiendo que el nombre del archivo coincide
            altText={celula}
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p>{celula}</p>
            }
          />
        ))}
      </div>
    </section>
  );
}
