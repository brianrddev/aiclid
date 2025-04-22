export default function ComoFunciona() {
  return (
    <section
      id="ia"
      className="relative flex h-[100dvh] snap-start flex-col items-center bg-gray-100 p-4 text-gray-950 sm:p-8"
    >
      <h2 className="mb-12 text-3xl font-semibold sm:mb-24 sm:text-6xl">
        ¿Cómo Funciona la IA?
      </h2>
      <ol className="mx-auto max-w-3xl space-y-4 text-base sm:space-y-6 sm:text-xl">
        <li className="flex rounded-md bg-gray-200 p-2 sm:p-4">
          <span className="mr-2 font-bold sm:mr-4">1.</span>
          <span>
            Nuestra inteligencia artificial analiza imágenes microscópicas de
            células.
          </span>
        </li>
        <li className="flex rounded-md bg-gray-200 p-2 sm:p-4">
          <span className="mr-2 font-bold sm:mr-4">2.</span>
          <span>
            Extrae características visuales relevantes de las imágenes
            procesadas.
          </span>
        </li>
        <li className="flex rounded-md bg-gray-200 p-2 sm:p-4">
          <span className="mr-2 font-bold sm:mr-4">3.</span>
          <span>
            Clasifica las células utilizando modelos de aprendizaje profundo.
          </span>
        </li>
        <li className="flex rounded-md bg-gray-200 p-2 sm:p-4">
          <span className="mr-2 font-bold sm:mr-4">4.</span>
          <span>
            Proporciona resultados precisos que ayudan en el diagnóstico médico.
          </span>
        </li>
      </ol>
    </section>
  );
}
