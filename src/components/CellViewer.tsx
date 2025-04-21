import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function ModelLoader() {
  const groupRef = useRef(null);

  // Estado para control de errores y de "cargando"
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Creamos un loader para GLTF
    const loader = new GLTFLoader();

    // Cargamos el archivo scene.gltf
    loader.load(
      '/scene.gltf',
      (gltf) => {
        // Obtenemos el "scene" principal del GLTF
        const model = gltf.scene;

        // 1. Calcular el bounding box para centrar el modelo en (0,0,0)
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // 2. Escalar el modelo - aumentamos el tamaño
        model.scale.set(35, 35, 35);

        // 3. Modificar materiales para quitar efecto metálico
        model.traverse((node) => {
          if (node.isMesh && node.material) {
            // Crear un material más natural para la célula roja
            const newMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#bb0000'), // Rojo más suave y natural
              roughness: 0.8, // Alta rugosidad (menos reflejo)
              metalness: 0.0, // Sin efecto metálico
              flatShading: false, // Para una apariencia más suave
            });

            // Conservamos solo el mapa normal si existe
            if (node.material.normalMap) {
              const textureLoader = new THREE.TextureLoader();
              const normalTex = textureLoader.load(
                '/textures/RBCtexture_normal.png'
              );
              newMaterial.normalMap = normalTex;
              newMaterial.normalScale = new THREE.Vector2(0.5, 0.5); // Reducir intensidad del normal map
            }

            // Añadir un poco de translucidez
            newMaterial.transparent = true;
            newMaterial.opacity = 0.9;

            // Aplicar el nuevo material
            node.material = newMaterial;
          }
        });

        // Añadimos el modelo al "groupRef"
        if (groupRef.current) {
          groupRef.current.add(model);
        }

        // Terminó de cargar
        setIsLoading(false);
      },
      (xhr) => {
        // Progreso de carga
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (err) => {
        console.error('Error al cargar el modelo:', err);
        setError(err);
        setIsLoading(false);
      }
    );

    // Cleanup al desmontar
    return () => {
      if (groupRef.current) {
        while (groupRef.current.children.length) {
          groupRef.current.remove(groupRef.current.children[0]);
        }
      }
    };
  }, []);

  // Rotación continua en el eje Y (giro "horizontal")
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Ajusta la velocidad a tu gusto
    }
  });

  return (
    <group ref={groupRef}>
      {/* Mientras está cargando y no hay error, mostramos una esfera en wireframe */}
      {isLoading && !error && (
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="orange" wireframe />
        </mesh>
      )}
      {/* Si hay error, mostramos un cubo rojo */}
      {error && (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </group>
  );
}

export default function CellViewer() {
  return (
    <Canvas
      className="h-full w-full bg-transparent"
      camera={{
        // Alejamos la cámara para poder ver el modelo completo a pesar de ser más grande
        position: [120, -500, 0],
        fov: 8, // Aumentamos ligeramente el campo de visión
        near: 1,
        far: 1000,
      }}
    >
      {/* Iluminación suavizada para material no metálico */}
      <ambientLight intensity={2} />

      {/* Luz direccional más suave */}
      <directionalLight position={[120, 10, 20]} intensity={3} />

      {/* Luz de relleno suave */}
      <hemisphereLight groundColor="#330000" intensity={2} />

      {/* Componente que carga el modelo y aplica materiales no metálicos */}
      <ModelLoader />
    </Canvas>
  );
}
