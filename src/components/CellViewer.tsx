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
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, Object3D, Mesh } from 'three';

export interface CellViewerProps {
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
}: CellViewerProps) {
  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Group>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Guardar referencias a cada mesh para rotarlas individualmente
  const meshRefs = useRef<Mesh[]>([]);
  // Guardar datos aleatorios para cada mesh
  const meshRandoms = useRef<
    {
      speedX: number;
      speedY: number;
      dirX: number;
      dirY: number;
      basePos: [number, number, number];
      phase: number;
    }[]
  >([]);

  useEffect(() => {
    meshRefs.current = [];
    meshRandoms.current = [];
    const loader = new GLTFLoader();
    loader.load(
      '/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.scale.set(cellSize, cellSize, cellSize);
        model.rotation.set(rotX, rotY, rotZ);
        // Distribuir en círculo para evitar colisiones
        let meshIndex = 0;
        const totalMeshes: number[] = [];
        model.traverse((node: Object3D) => {
          if ((node as Mesh).isMesh) totalMeshes.push(1);
        });
        const meshCount = totalMeshes.length;
        model.traverse((node: Object3D) => {
          const mesh = node as Mesh;
          if (mesh.isMesh && mesh.material) {
            meshRefs.current.push(mesh);
            // Posición base en círculo (aún más cerca)
            const angle = (2 * Math.PI * meshIndex) / Math.max(1, meshCount);
            const radius = 0.5; // Más cerca para todos los dispositivos
            const baseX = Math.cos(angle) * radius;
            const baseY = Math.sin(angle) * radius;
            const baseZ = 0;
            mesh.position.set(baseX, baseY, baseZ);
            // Todas las células: mismo color y rugosidad, solo varía tamaño, rotación, posición
            const redColor = '#c51d1d';
            const commonRoughness = 0.55;
            const commonMetalness = 0.18;
            // Tamaño aleatorio para cada mesh
            const scale = 0.85 + Math.random() * 0.3; // entre 0.85 y 1.15
            mesh.scale.set(scale, scale, scale);
            const newMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(redColor),
              roughness: commonRoughness,
              metalness: commonMetalness,
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
            meshRandoms.current[meshIndex] = {
              speedX:
                (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
              speedY:
                (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
              dirX: Math.random() > 0.5 ? 1 : -1,
              dirY: Math.random() > 0.5 ? 1 : -1,
              basePos: [baseX, baseY, baseZ],
              phase: Math.random() * Math.PI * 2,
            };
            meshIndex++;
          }
        });
        if (modelRef.current) {
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
      meshRefs.current = [];
      meshRandoms.current = [];
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

  useFrame((state) => {
    if (!disableRotation && meshRefs.current.length > 0) {
      const t = state.clock.getElapsedTime();
      meshRefs.current.forEach((mesh, i) => {
        const rand = meshRandoms.current[i] || {
          speedX: 0.2,
          speedY: 0.2,
          dirX: 1,
          dirY: 1,
          basePos: [0, 0, 0],
          phase: 0,
        };
        // Oscilación alrededor de la posición base (más pequeña)
        mesh.position.x =
          rand.basePos[0] + Math.sin(t * rand.speedX + rand.phase) * 0.18;
        mesh.position.y =
          rand.basePos[1] + Math.cos(t * rand.speedY + rand.phase) * 0.18;
        mesh.rotation.y += rand.speedY * rand.dirY * 0.01;
        mesh.rotation.x += rand.speedX * rand.dirX * 0.01;
      });
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

export default function CellViewer({ ...props }: CellViewerProps = {}) {
  return (
    <div
      id="cell-viewer"
      className="cellviewer-shadow overflow-visibles lg:left-14"
      style={{
        position: 'absolute',
        top: -100,
        left: 0,
        width: '100dvw',
        height: '100dvh',
        zIndex: 100,
      }}
    >
      <Canvas
        className="overflow-visible bg-transparent"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        camera={{
          position: [0, 0, 300],
          fov: 60,
          near: 1,
          far: 1000,
        }}
        shadows // Habilita sombras en el canvas
      >
        <ambientLight intensity={2} />
        <directionalLight
          position={[120, 10, 20]}
          intensity={3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <hemisphereLight groundColor="#330000" intensity={2} />
        {/* Plano receptor de sombras */}
        <mesh
          receiveShadow
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.25} />
        </mesh>
        {/* Pasamos el resto de props a ModelLoader */}
        <ModelLoader {...props} />
      </Canvas>
    </div>
  );
}
