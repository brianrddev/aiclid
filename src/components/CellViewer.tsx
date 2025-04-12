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

    // Cargamos el archivo scene.gltf (asegúrate de que esté en /public/ y
    // si requiere BIN, que esté en la misma carpeta con el nombre correcto).
    loader.load(
      '/scene.gltf',
      (gltf) => {
        // Obtenemos el "scene" principal del GLTF
        const model = gltf.scene;

        // 1. Calcular el bounding box para centrar el modelo en (0,0,0)
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // 2. Escalar el modelo (ajusta según tu necesidad)
        model.scale.set(2, 2, 2);

        // 4. Reasignar texturas "metalnessMap/roughnessMap" y "normalMap"
        //    a cada malla que tenga materiales (si esto no es necesario, puedes omitirlo).
        model.traverse((node) => {
          if (node.isMesh && node.material) {
            const textureLoader = new THREE.TextureLoader();

            // Cargamos la textura de metal/roughness (mismo archivo)
            const metalRoughTex = textureLoader.load(
              '/textures/RBCtexture_metallicRoughness.png'
            );
            node.material.metalnessMap = metalRoughTex;
            node.material.roughnessMap = metalRoughTex;

            // Cargamos la textura normal
            const normalTex = textureLoader.load(
              '/textures/RBCtexture_normal.png'
            );
            node.material.normalMap = normalTex;

            // (Opcional) Ajustar factores de metalness/roughness si lo deseas
            node.material.metalness = 1.0;
            node.material.roughness = 1.0;

            // Asegúrate de actualizar estos mapas para que se muestren
            node.material.needsUpdate = true;
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
      className="h-full w-full bg-black mask-t-from-80% mask-l-from-80%"
      camera={{
        position: [90, 80, 40],
        fov: 1.5,
        near: 0.1,
        far: 1000,
      }}
    >
      {/* Iluminación ambiente */}
      <ambientLight intensity={100} />

      {/* Luz direccional (simula el sol) */}
      <directionalLight position={[20, 20, 20]} intensity={7} />

      {/* Luz de foco */}
      <spotLight
        position={[5, 5, 5]}
        intensity={1}
        angle={0.9}
        penumbra={0.1}
      />

      {/* Componente que carga el modelo y aplica texturas */}
      <ModelLoader />
    </Canvas>
  );
}
