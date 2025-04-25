import SectionLayout from '../Layouts/SectionLayout';
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
    <SectionLayout ScrollId="galeria" BackgroundColor="white">
      <div className="flex h-full w-full flex-col lg:flex-row-reverse">
        {/* Encabezado centrado en móvil, alineado a la derecha en pantallas más grandes */}
        <div className="flex flex-col gap-4 text-center md:text-right">
          <h2 className="text-3xl font-medium text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Galería de Células
          </h2>
          <div className="mt-2 text-sm font-light text-pretty sm:text-right sm:text-lg md:text-xl">
            <p className="leading-wide ml-auto max-w-120 tracking-wide">
              Explora nuestra galería de imágenes de células sanguíneas. Haz
              clic en cada celda para ver más detalles.
            </p>
          </div>
        </div>

        {/* Contenedor de la galería con más espacio vertical en móvil */}
        <div className="mt-16 flex w-full items-center justify-center">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-5 sm:gap-6 md:gap-8">
            {celulas.map((celula, i) => (
              <div
                key={i}
                className="xs:h-[100px] xs:w-[100px] xxl:h-[220px] xxl:w-[220px] flex h-[100px] w-[100px] items-center justify-center p-1 sm:h-[120px] sm:w-[120px] md:h-[120px] md:w-[120px] lg:h-[160px] lg:w-[160px] xl:h-[160px] xl:w-[160px]"
              >
                <TiltedCard
                  className="z-0 rounded-xl bg-gray-300 shadow-lg"
                  imageSrc={`./${celula.toLowerCase()}.png`}
                  altText={celula}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <p className="xs:text-[9px] text-[8px] font-medium sm:text-[10px] md:text-[11px] lg:text-xs">
                      {celula}
                    </p>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
