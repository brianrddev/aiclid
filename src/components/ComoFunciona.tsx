import SectionLayout from '../Layouts/SectionLayout';

function ListItem({
  number,
  text,
}: {
  number: number;
  text: string;
  className?: string;
}) {
  return (
    <li className="flex items-center rounded-lg bg-white/90 p-3 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:rounded-xl sm:p-4 md:p-5">
      <div className="mr-2 hidden h-6 w-6 items-center justify-center rounded-full bg-[#F62F63] text-xs text-white shadow-sm sm:mr-3 sm:h-8 sm:w-8 sm:text-sm md:mr-4 md:flex md:h-10 md:w-10 md:text-base">
        {number}
      </div>
      <span className="text-gray-800">{text}</span>
    </li>
  );
}

const listItems = [
  {
    number: 1,
    text: 'Recibe imágenes de células de muestras médicas.',
  },
  {
    number: 2,
    text: 'Extrae características visuales relevantes de las imágenes procesadas.',
  },
  {
    number: 3,
    text: 'Clasifica las células utilizando modelos de aprendizaje profundo.',
  },
  {
    number: 4,
    text: 'Proporciona resultados precisos que ayudan en el diagnóstico médico.',
  },
];

export default function ComoFunciona() {
  return (
    <SectionLayout ScrollId="como-funciona" BackgroundColor="white" Relative>
      <div className="flex h-full w-full flex-col gap-16">
        <h2 className="z-10 text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl">
          ¿Cómo funciona la IA?
        </h2>
        <ol className="z-10 mx-auto max-w-3xl space-y-3 px-4 text-sm sm:space-y-6 sm:px-6 sm:text-base md:text-lg lg:text-xl">
          {/* Mobile: más compacto, menos padding */}
          {listItems.map((item) => (
            <ListItem key={item.number} number={item.number} text={item.text} />
          ))}
        </ol>
        <div className="absolute top-0 right-0 bottom-0 left-0 -z-0 h-full before:absolute before:top-1/2 before:left-1/2 before:-z-10 before:h-[600px] before:w-[800px] before:-translate-y-1/2 before:rounded-full before:bg-violet-500 before:opacity-15 before:blur-3xl"></div>
      </div>
    </SectionLayout>
  );
}
