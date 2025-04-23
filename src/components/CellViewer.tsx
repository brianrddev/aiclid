// Props de CellViewer:
// cellSize: Escala/tamaño del modelo 3D de la célula.
// cellX, cellY, cellZ: Posición del modelo en el canvas (ejes X, Y, Z).
// rotX, rotY, rotZ: Rotación inicial del modelo en radianes (ejes X, Y, Z).
// opacity: Opacidad del material de la célula (0 a 1).
// color: Color principal del material de la célula (hex o nombre).
// metalness: Nivel de metalicidad del material (0 = no metálico, 1 = muy metálico).
// roughness: Rugosidad del material (0 = muy brillante, 1 = mate).
// wireframe: Si es true, muestra el modelo en modo wireframe (solo líneas).

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, Object3D, Mesh } from 'three';

export interface CellViewerProps {
  devMode?: boolean; // <-- Nueva prop para controlar ayudas visuales
  cellSize?: number;
  cellX?: number;
  cellY?: number;
  cellZ?: number;
  rotX?: number; // Radianes
  rotY?: number; // Radianes
  rotZ?: number; // Radianes
  opacity?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  wireframe?: boolean;
  disableRotation?: boolean;
  rotateYSpeed?: number; // Grados/frame
  rotateXSpeed?: number; // Grados/frame
}

function ModelLoader({
  cellSize = 35,
  cellX = 0,
  cellY = 0,
  cellZ = 0,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  opacity = 0.9,
  color = '#bb0000',
  metalness = 0.0,
  roughness = 0.8,
  wireframe = false,
  disableRotation = false,
  rotateYSpeed = 0.001,
  rotateXSpeed = 0,
}: Omit<CellViewerProps, 'devMode'>) {
  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Group>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); // Centrar el modelo en el grupo
        model.scale.set(cellSize, cellSize, cellSize);
        model.rotation.set(rotX, rotY, rotZ);
        model.traverse((node: Object3D) => {
          const mesh = node as Mesh;
          if (mesh.isMesh && mesh.material) {
            const newMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(color),
              roughness,
              metalness,
              flatShading: false,
              wireframe,
            });
            if ((mesh.material as any).normalMap) {
              const textureLoader = new THREE.TextureLoader();
              const normalTex = textureLoader.load(
                '/textures/RBCtexture_normal.png'
              );
              newMaterial.normalMap = normalTex;
              newMaterial.normalScale = new THREE.Vector2(0.5, 0.5);
            }
            newMaterial.transparent = opacity < 1;
            newMaterial.opacity = opacity;
            mesh.material = newMaterial;
          }
        });
        if (modelRef.current) {
          // Limpiar modelos anteriores
          while (modelRef.current.children.length) {
            modelRef.current.remove(modelRef.current.children[0]);
          }
          modelRef.current.add(model);
        }
        setIsLoading(false);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (err) => {
        console.error('Error al cargar el modelo:', err);
        setError(
          err instanceof Error
            ? err
            : new Error('Error desconocido al cargar modelo')
        );
        setIsLoading(false);
      }
    );
    return () => {
      if (modelRef.current) {
        while (modelRef.current.children.length) {
          modelRef.current.remove(modelRef.current.children[0]);
        }
      }
    };
  }, [
    cellSize,
    rotX,
    rotY,
    rotZ,
    opacity,
    color,
    metalness,
    roughness,
    wireframe,
  ]);

  useFrame(() => {
    if (modelRef.current && !disableRotation) {
      modelRef.current.rotation.y += (rotateYSpeed * Math.PI) / 180;
      modelRef.current.rotation.x += (rotateXSpeed * Math.PI) / 180;
    }
    if (groupRef.current) {
      groupRef.current.position.set(cellX, cellY, cellZ);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={modelRef}>
        {isLoading && !error && (
          <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="orange" wireframe />
          </mesh>
        )}
        {error && (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        )}
      </group>
    </group>
  );
}

export default function CellViewer({
  devMode = false,
  ...props
}: CellViewerProps = {}) {
  return (
    <div
      id="cell-viewer"
      // Permitir interacción con OrbitControls solo en modo dev
      className={`absolute z-0 h-full w-full ${devMode ? '' : 'pointer-events-none'}`}
    >
      <Canvas
        className="h-full w-full bg-transparent"
        camera={{
          position: [0, 0, 300],
          fov: 60,
          near: 1,
          far: 1000,
        }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[120, 10, 20]} intensity={3} />
        <hemisphereLight groundColor="#330000" intensity={2} />

        {/* --- Ayudas visuales condicionales --- */}
        {devMode && (
          <>
            <gridHelper args={[200, 20, '#888', '#ccc']} />
            <axesHelper args={[100]} />
            {/* Habilitar OrbitControls solo en modo dev */}
            <OrbitControls />
            <Stats />
          </>
        )}
        {/* --- Fin Ayudas visuales --- */}

        {/* Pasamos el resto de props a ModelLoader */}
        <ModelLoader {...props} />
      </Canvas>
    </div>
  );
}
