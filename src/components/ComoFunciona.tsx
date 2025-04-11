export default function ComoFunciona() {
  return (
    <section
      id="ia"
      className="relative flex h-[100dvh] flex-col items-center bg-gray-100 p-8 text-gray-950"
    >
      <h2 className="mb-24 text-6xl font-semibold">¿Cómo Funciona la IA?</h2>
      <ol className="mx-auto max-w-3xl space-y-6 text-xl">
        <li className="flex rounded-md bg-gray-200 p-4">
          <span className="mr-4 font-bold">1.</span>
          <span>
            Nuestra inteligencia artificial analiza imágenes microscópicas de
            células.
          </span>
        </li>
        <li className="flex rounded-md bg-gray-200 p-4">
          <span className="mr-4 font-bold">2.</span>
          <span>
            Extrae características visuales relevantes de las imágenes
            procesadas.
          </span>
        </li>
        <li className="flex rounded-md bg-gray-200 p-4">
          <span className="mr-4 font-bold">3.</span>
          <span>
            Clasifica las células utilizando modelos de aprendizaje profundo.
          </span>
        </li>
        <li className="flex rounded-md bg-gray-200 p-4">
          <span className="mr-4 font-bold">4.</span>
          <span>
            Proporciona resultados precisos que ayudan en el diagnóstico médico.
          </span>
        </li>
      </ol>
    </section>
  );
}
