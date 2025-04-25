# Instrucciones para Integrar Resultados del Puzzle con un Backend

Esta guía describe los pasos necesarios para reemplazar el almacenamiento local (`localStorage`) con un sistema de backend y base de datos para guardar y recuperar los resultados del juego de puzzle deslizante.

## 1. Configuración del Backend

Necesitarás crear un servidor (backend) que gestione la lógica de negocio y la interacción con la base de datos.

- **Elegir Tecnología:**
  - **Node.js:** Con frameworks como Express.js o NestJS. Es una opción popular si ya estás familiarizado con JavaScript/TypeScript.
  - **Python:** Con frameworks como Flask o Django.
  - Otras opciones: Ruby on Rails, Go, Java Spring, etc.
- **Elegir Base de Datos:**
  - **Relacional (SQL):** PostgreSQL, MySQL, MariaDB, SQLite (para desarrollo). Son buenas si tienes una estructura de datos clara y relaciones definidas.
  - **No Relacional (NoSQL):** MongoDB, Couchbase. Pueden ser más flexibles si la estructura de datos puede variar. Para este caso (guardar resultados estructurados), una base de datos SQL suele ser una buena elección.
- **Configurar Conexión:** Establece la conexión entre tu aplicación backend y la base de datos elegida (usando un ORM como Prisma, TypeORM, SQLAlchemy, Mongoose, o drivers nativos).
- **Crear Modelo/Tabla:** Define la estructura para almacenar los resultados en tu base de datos. Debería incluir campos como:
  - `id` (Clave primaria, autoincremental o UUID)
  - `name` (String)
  - `imageName` (String)
  - `imagePath` (String)
  - `difficulty` (Integer)
  - `time` (Integer o Float, para segundos)
  - `date` (Timestamp o DateTime)
  - `createdAt` (Timestamp, opcional, para registrar cuándo se guardó)

## 2. Definir Endpoints de la API REST

Tu backend debe exponer al menos dos endpoints (rutas) para que el frontend interactúe:

- **`POST /api/results` (Guardar Resultado):**
  - **Propósito:** Recibir un nuevo resultado del juego desde el frontend y guardarlo en la base de datos.
  - **Request Body:** Debería esperar un objeto JSON con la estructura de `GameResult` (name, imageName, imagePath, difficulty, time, date).
  - **Respuesta:** Devolver un código `201 Created` si tiene éxito, opcionalmente con el objeto guardado (incluyendo su nuevo `id`). Devolver códigos de error (`400 Bad Request`, `500 Internal Server Error`) si algo falla.
- **`GET /api/results` (Obtener Resultados):**
  - **Propósito:** Devolver una lista de resultados guardados, permitiendo filtrar y ordenar.
  - **Query Parameters (Opcionales):**
    - `difficulty` (e.g., `?difficulty=3`): Filtrar por tamaño de rejilla.
    - `imageName` (e.g., `?imageName=Basofilo`): Filtrar por nombre de imagen.
    - `sortBy` (e.g., `?sortBy=time`): Campo por el cual ordenar (`time` o `date`).
    - `order` (e.g., `?order=asc`): Dirección de ordenación (`asc` o `desc`).
    - `limit` (e.g., `?limit=10`): Limitar el número de resultados devueltos (para paginación o top scores).
  - **Lógica del Backend:** Construir la consulta a la base de datos basándose en los query parameters recibidos.
  - **Respuesta:** Devolver un código `200 OK` con un array JSON de objetos `GameResult` que coincidan con los filtros y el orden. Devolver un array vacío si no hay resultados. Devolver códigos de error si falla la consulta.

## 3. Modificar el Código Frontend (React)

Adapta tu aplicación React para usar los nuevos endpoints de la API en lugar de `localStorage`.

- **Actualizar `src/utils/puzzleUtils.ts`:**
  - Descomenta las funciones `saveResult` y `loadResults` que usan `fetch` (proporcionadas como ejemplo comentado en el archivo).
  - **Importante:** Reemplaza `API_BASE_URL` con la URL real de tu servidor backend. Si tu frontend y backend se sirven desde el mismo dominio (usando un proxy en desarrollo con Vite), puedes usar una ruta relativa como `/api`.
  - Asegúrate de que la estructura del objeto enviado en `saveResult` coincida con lo que espera el backend.
  - Asegúrate de que los parámetros enviados en `loadResults` coincidan con los query parameters que implementaste en el backend.
- **Actualizar Componentes (`PuzzlePage.tsx`, etc.):**

  - **Llamar a `saveResult`:** Cuando el puzzle se resuelva (`handlePuzzleSolved`), llama a la nueva función `saveResult` (que ahora es `async`). Puedes usar `await saveResult(result);` dentro de una función `async` o usar `.then()`.
  - **Llamar a `loadResults`:**
    - En el componente que muestra la tabla de clasificación (probablemente `PuzzlePage` o un nuevo componente `Leaderboard`), usa `useEffect` para llamar a `loadResults` cuando el componente se monte.
    - Añade elementos UI (selects, botones) para que el usuario seleccione filtros (dificultad, imagen, orden).
    - Guarda los filtros seleccionados en el estado del componente.
    - Cuando un filtro cambie, vuelve a llamar a `loadResults` con los nuevos parámetros de filtro y actualiza el estado que contiene los resultados mostrados.

  ```typescript
  // Ejemplo conceptual en PuzzlePage.tsx o Leaderboard.tsx

  import React, { useState, useEffect, useCallback } from 'react';
  import { GameResult, loadResults } from '../utils/puzzleUtils'; // Asegúrate de importar la versión con fetch

  const Leaderboard: React.FC = () => {
    const [results, setResults] = useState<GameResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
      difficulty: null, // o un valor por defecto
      imageName: null, // o un valor por defecto
      sortBy: 'time',
      order: 'asc',
    });

    const fetchResults = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadResults(filters); // Pasa los filtros actuales
        setResults(data);
      } catch (err) {
        setError('Error al cargar resultados.'); // O un mensaje más específico
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, [filters]); // Depende de los filtros

    useEffect(() => {
      fetchResults(); // Carga inicial y cuando cambian los filtros
    }, [fetchResults]);

    const handleFilterChange = (newFilters) => {
       setFilters(prev => ({ ...prev, ...newFilters }));
    };

    // ... Renderizar UI para filtros, tabla de resultados, estado de carga/error ...

    return (
        <div>
            {/* UI para cambiar filtros (ej. selects que llaman a handleFilterChange) */}
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <ul>
                    {results.map((res, index) => (
                        <li key={index /* o res.id si lo devuelve el backend */}>
                            {res.name} - {res.difficulty}x{res.difficulty} - {res.time}s
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
  }
  ```

## 4. Consideraciones Adicionales

- **CORS (Cross-Origin Resource Sharing):** Si tu frontend y backend se sirven desde dominios diferentes (ej. `localhost:5173` y `localhost:3001`), necesitarás configurar CORS en tu backend para permitir peticiones desde el origen del frontend.
- **Manejo de Errores:** Implementa un manejo de errores robusto tanto en el backend (validación de datos, errores de base de datos) como en el frontend (mostrar mensajes al usuario si falla una petición API).
- **Seguridad:** Si vas a añadir autenticación de usuarios en el futuro, asegúrate de proteger tus endpoints de API adecuadamente.
- **Optimización:** Para tablas de clasificación muy grandes, considera la paginación en el backend (`limit` y `offset` query parameters) para no cargar todos los resultados a la vez.
- **Entorno de Desarrollo:** Usa herramientas como `nodemon` para reiniciar automáticamente tu backend Node.js durante el desarrollo. Configura el proxy de Vite para redirigir las peticiones `/api` a tu servidor backend local y evitar problemas de CORS en desarrollo.
