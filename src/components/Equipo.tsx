import SectionLayout from '../Layouts/SectionLayout';
import Masonry from './Masonry/Masonry';

export default function Equipo() {
  const data = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=800',
      height: 400,
    }, // Médico con microscopio
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=800',
      height: 300,
    }, // Científico de datos trabajando
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=800',
      height: 300,
    }, // Enfermera con equipo médico
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800',
      height: 300,
    }, // Técnico de laboratorio
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=800',
      height: 300,
    }, // Programador trabajando
    {
      id: 6,
      image:
        'https://images.unsplash.com/photo-1576669801343-117bb4054118?w=800&h=600',
      height: 300,
    }, // Médico revisando imágenes
    {
      id: 7,
      image:
        'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&h=800',
      height: 200,
    }, // Equipo de científicos
    {
      id: 8,
      image:
        'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=800',
      height: 300,
    }, // Ingeniero biomédico
    {
      id: 9,
      image:
        'https://images.unsplash.com/photo-1676313414325-2a877a95dd10?&w=600&h=800',
      height: 200,
    }, // Analista de datos médicos
    {
      id: 10,
      image:
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&h=800',
      height: 400,
    }, // Investigador con microscopio
  ];
  return (
    <SectionLayout ScrollId="equipo" BackgroundColor="white" Relative>
      <div className="flex h-full w-full flex-col gap-16">
        <h2 className="z-10 text-right text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl">
          Nuestro Equipo
        </h2>
        <Masonry data={data} />
        <div className="absolute top-0 right-0 bottom-0 left-0 -z-0 h-full before:absolute before:top-1/2 before:left-1/2 before:-z-10 before:h-[600px] before:w-[1000px] before:-translate-x-1/1 before:-translate-y-1/1 before:rounded-full before:bg-red-500 before:opacity-15 before:blur-3xl"></div>
      </div>
    </SectionLayout>
  );
}
