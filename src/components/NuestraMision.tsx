import { useEffect, useState } from 'react';
import BlurText from './BlurText/BlurText';
import CellViewer, { CellViewerProps } from './CellViewer'; // Importar también el tipo

// Props de CellViewer:
// cellSize: Escala/tamaño del modelo 3D de la célula.
// cellX, cellY, cellZ: Posición del modelo en el canvas (ejes X, Y, Z).
// rotX, rotY, rotZ: Rotación inicial del modelo en radianes (ejes X, Y, Z).
// opacity: Opacidad del material de la célula (0 a 1).
// color: Color principal del material de la célula (hex o nombre).
// metalness: Nivel de metalicidad del material (0 = no metálico, 1 = muy metálico).
// roughness: Rugosidad del material (0 = muy brillante, 1 = mate).
// wireframe: Si es true, muestra el modelo en modo wireframe (solo líneas).
// rotateYSpeed: Velocidad de rotación automática en Y (grados por frame).
// rotateXSpeed: Velocidad de rotación automática en X (grados por frame).

// --- Propiedades de Producción ---
// TODO: Ajustar estos valores con los definitivos
const prodPropsMobile: Omit<CellViewerProps, 'devMode' | 'disableRotation'> = {
  cellSize: 80,
  cellX: 0,
  cellY: -10, // Ligeramente más abajo en móvil
  cellZ: 0,
  rotX: 0, // Grados
  rotY: 15, // Grados
  rotZ: 0, // Grados
  opacity: 1,
  color: '#c51d1d',
  metalness: 0.1,
  roughness: 0.65,
  wireframe: false,
  rotateYSpeed: 0.1, // Rotación sutil
  rotateXSpeed: 0,
};

// TODO: Ajustar estos valores con los definitivos
const prodPropsDesktop: Omit<CellViewerProps, 'devMode' | 'disableRotation'> = {
  cellSize: 160,
  cellX: 100,
  cellY: 20,
  cellZ: 0,
  rotX: 30, // Grados
  rotY: 0, // Grados
  rotZ: 180, // Grados
  opacity: 1,
  color: '#bb0000',
  metalness: 0.7,
  roughness: 0.4,
  wireframe: false,
  rotateYSpeed: 0.15, // Rotación sutil
  rotateXSpeed: 0,
};
// --- Fin Propiedades de Producción ---

export default function NuestraMision() {
  // --- Modo Desarrollo ---
  // Cambiar a 'false' para build de producción
  const [isDevMode, setIsDevMode] = useState(true);
  const [rotationEnabled, setRotationEnabled] = useState(true);

  // --- ESTILOS PARA EL MENÚ DEV ---
  // Definir estilos fuera del JSX
  const inputRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    width: '100%',
  };
  const rangeInputStyle = { flexGrow: 1 };
  const numberInputStyle = {
    width: '60px',
    background: '#555',
    color: 'white',
    border: '1px solid #777',
    borderRadius: '3px',
    padding: '2px 4px',
    fontSize: '11px',
  };

  // Hook para detectar si es móvil (ancho < 640px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- Estados para controlar CellViewer en modo DEV ---
  // Usamos los valores de desktop como iniciales para el modo dev
  const [cellSize, setCellSize] = useState(prodPropsDesktop.cellSize ?? 90);
  const [cellX, setCellX] = useState(prodPropsDesktop.cellX ?? 0);
  const [cellY, setCellY] = useState(prodPropsDesktop.cellY ?? 0);
  const [cellZ, setCellZ] = useState(prodPropsDesktop.cellZ ?? 0);
  const [rotX, setRotX] = useState(prodPropsDesktop.rotX ?? 0); // Grados
  const [rotY, setRotY] = useState(prodPropsDesktop.rotY ?? 0); // Grados
  const [rotZ, setRotZ] = useState(prodPropsDesktop.rotZ ?? 0); // Grados
  const [opacity, setOpacity] = useState(prodPropsDesktop.opacity ?? 1);
  const [color, setColor] = useState(prodPropsDesktop.color ?? '#bb0000');
  const [metalness, setMetalness] = useState(prodPropsDesktop.metalness ?? 0);
  const [roughness, setRoughness] = useState(prodPropsDesktop.roughness ?? 0.7);
  const [wireframe, setWireframe] = useState(
    prodPropsDesktop.wireframe ?? false
  );
  const [rotateYSpeed, setRotateYSpeed] = useState(
    prodPropsDesktop.rotateYSpeed ?? 0
  );
  const [rotateXSpeed, setRotateXSpeed] = useState(
    prodPropsDesktop.rotateXSpeed ?? 0
  );

  // Función para copiar propiedades al portapapeles (solo disponible en modo dev)
  const copyPropsToClipboard = () => {
    const propsToCopy = {
      cellSize,
      cellX,
      cellY,
      cellZ,
      rotX,
      rotY,
      rotZ,
      opacity,
      color,
      metalness,
      roughness,
      wireframe,
      rotateYSpeed,
      rotateXSpeed,
    };
    const propsString = JSON.stringify(propsToCopy, null, 2);
    navigator.clipboard
      .writeText(propsString)
      .then(() => alert('Propiedades copiadas!'))
      .catch((err) => console.error(err));
  };

  // --- Selección de Props para CellViewer ---
  let currentProps: CellViewerProps;

  if (isDevMode) {
    // Modo DEV: Usar los estados controlados por el menú
    currentProps = {
      devMode: true, // Pasar el modo dev a CellViewer
      disableRotation: !rotationEnabled,
      cellSize,
      cellX,
      cellY,
      cellZ,
      // Convertir grados a radianes para CellViewer
      rotX: rotX * (Math.PI / 180),
      rotY: rotY * (Math.PI / 180),
      rotZ: rotZ * (Math.PI / 180),
      opacity,
      color,
      metalness,
      roughness,
      wireframe,
      rotateYSpeed,
      rotateXSpeed,
    };
  } else {
    // Modo PROD: Usar las props predefinidas
    const prodProps = isMobile ? prodPropsMobile : prodPropsDesktop;
    currentProps = {
      devMode: false, // Pasar el modo dev a CellViewer
      disableRotation: !rotationEnabled,
      ...prodProps, // Incluir todas las props de prod
      // Convertir grados a radianes también para las props de prod
      rotX: (prodProps.rotX ?? 0) * (Math.PI / 180),
      rotY: (prodProps.rotY ?? 0) * (Math.PI / 180),
      rotZ: (prodProps.rotZ ?? 0) * (Math.PI / 180),
      rotateYSpeed: prodProps.rotateYSpeed ?? 0,
      rotateXSpeed: prodProps.rotateXSpeed ?? 0,
    };
  }

  return (
    <section
      id="mision"
      className="relative flex h-[100dvh] w-full snap-start flex-col overflow-hidden bg-gray-100 mask-t-from-99% text-black backdrop-blur-sm sm:flex-row sm:p-8"
    >
      {/* --- UI de Desarrollo (Condicional) --- */}
      {isDevMode && (
        <>
          {/* --- Botón para Activar/Desactivar Modo Dev --- */}
          <button
            onClick={() => setIsDevMode(!isDevMode)}
            style={{
              position: 'fixed',
              top: '80px',
              right: '270px', // Asume que el menú está visible
              zIndex: 1001,
              padding: '5px 10px',
              background: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            Dev Off
          </button>

          {/* --- Menú de Desarrollo --- */}
          <div
            style={{
              position: 'fixed',
              top: '80px',
              right: '10px',
              background: 'rgba(40, 40, 40, 0.85)',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              zIndex: 1000,
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              fontSize: '12px',
              width: '250px',
            }}
          >
            <h4
              style={{
                marginBottom: '10px',
                borderBottom: '1px solid #555',
                paddingBottom: '5px',
              }}
            >
              Dev Controls
            </h4>

            {/* Input Row Helper Style */}
            {/* Las constantes de estilo ahora están fuera del JSX */}

            {/* Cell Size */}
            <div style={{ marginBottom: '8px' }}>
              <label>Cell Size: {cellSize.toFixed(0)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="1"
                  value={cellSize}
                  onChange={(e) => setCellSize(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="10"
                  max="300"
                  step="1"
                  value={cellSize}
                  onChange={(e) => setCellSize(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Position X */}
            <div style={{ marginBottom: '8px' }}>
              <label>Position X: {cellX.toFixed(2)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  step="0.1"
                  value={cellX}
                  onChange={(e) => setCellX(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="-100"
                  max="100"
                  step="0.1"
                  value={cellX}
                  onChange={(e) => setCellX(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Position Y */}
            <div style={{ marginBottom: '8px' }}>
              <label>Position Y: {cellY.toFixed(2)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  step="0.1"
                  value={cellY}
                  onChange={(e) => setCellY(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="-100"
                  max="100"
                  step="0.1"
                  value={cellY}
                  onChange={(e) => setCellY(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Position Z */}
            <div style={{ marginBottom: '8px' }}>
              <label>Position Z: {cellZ.toFixed(2)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  step="0.1"
                  value={cellZ}
                  onChange={(e) => setCellZ(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="-100"
                  max="100"
                  step="0.1"
                  value={cellZ}
                  onChange={(e) => setCellZ(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Rotation X */}
            <div style={{ marginBottom: '8px' }}>
              <label>Rotation X (°): {rotX.toFixed(0)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotX}
                  onChange={(e) => setRotX(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotX}
                  onChange={(e) => setRotX(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Rotation Y */}
            <div style={{ marginBottom: '8px' }}>
              <label>Rotation Y (°): {rotY.toFixed(0)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotY}
                  onChange={(e) => setRotY(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotY}
                  onChange={(e) => setRotY(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Rotation Z */}
            <div style={{ marginBottom: '8px' }}>
              <label>Rotation Z (°): {rotZ.toFixed(0)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotZ}
                  onChange={(e) => setRotZ(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotZ}
                  onChange={(e) => setRotZ(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Opacity */}
            <div style={{ marginBottom: '8px' }}>
              <label>Opacity: {opacity.toFixed(2)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Color (solo picker) */}
            <div style={{ marginBottom: '8px' }}>
              <label>Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{
                  width: '100%',
                  height: '30px',
                  border: 'none',
                  padding: 0,
                }}
              />
            </div>
            {/* Metalness */}
            <div style={{ marginBottom: '8px' }}>
              <label>Metalness: {metalness.toFixed(2)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={metalness}
                  onChange={(e) => setMetalness(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={metalness}
                  onChange={(e) => setMetalness(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Roughness */}
            <div style={{ marginBottom: '8px' }}>
              <label>Roughness: {roughness.toFixed(2)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={roughness}
                  onChange={(e) => setRoughness(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={roughness}
                  onChange={(e) => setRoughness(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Wireframe (solo checkbox) */}
            <div style={{ marginBottom: '8px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={wireframe}
                  onChange={(e) => setWireframe(e.target.checked)}
                  style={{ marginRight: '5px' }}
                />
                Wireframe
              </label>
            </div>
            {/* Rotate Y Speed */}
            <div style={{ marginBottom: '8px' }}>
              <label>Rotate Y Speed: {rotateYSpeed.toFixed(2)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.01"
                  value={rotateYSpeed}
                  onChange={(e) => setRotateYSpeed(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="-5"
                  max="5"
                  step="0.01"
                  value={rotateYSpeed}
                  onChange={(e) => setRotateYSpeed(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Rotate X Speed */}
            <div style={{ marginBottom: '8px' }}>
              <label>Rotate X Speed: {rotateXSpeed.toFixed(2)}</label>
              <div style={inputRowStyle}>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.01"
                  value={rotateXSpeed}
                  onChange={(e) => setRotateXSpeed(Number(e.target.value))}
                  style={rangeInputStyle}
                />
                <input
                  type="number"
                  min="-5"
                  max="5"
                  step="0.01"
                  value={rotateXSpeed}
                  onChange={(e) => setRotateXSpeed(Number(e.target.value))}
                  style={numberInputStyle}
                />
              </div>
            </div>
            {/* Activar/desactivar rotación */}
            <div style={{ marginBottom: '8px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={rotationEnabled}
                  onChange={(e) => setRotationEnabled(e.target.checked)}
                  style={{ marginRight: '5px' }}
                />
                Rotación activa
              </label>
            </div>

            {/* --- Botón Copiar Props --- */}
            <button
              onClick={copyPropsToClipboard}
              style={{
                marginTop: '15px',
                padding: '8px 12px',
                width: '100%',
                background: '#5a5a5a',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Copiar Props (Dev)
            </button>
          </div>
        </>
      )}
      {/* --- Fin UI de Desarrollo --- */}

      <div className="relative z-10 m-4 mt-4 flex w-full flex-col gap-12 select-none sm:mt-8 sm:ml-12 sm:w-1/2 sm:gap-24">
        <h2 className="text-3xl font-medium tracking-wider sm:text-6xl">
          Nuestra Misión
        </h2>
        <div className="leading-wide text-base font-light tracking-wide text-pretty sm:text-xl">
          <BlurText
            delay={50}
            text="Nuestra misión es proporcionar herramientas y servicios que permitan a las personas identificar y clasificar las células en las  imágenes de manera precisa y eficiente."
          />
        </div>
      </div>

      {/* Pasamos las props seleccionadas (dev o prod) */}
      <CellViewer {...currentProps} />
    </section>
  );
}
