import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const MODEL_PATHS = {
  '3DS': '/models/3ds.glb',
  NDS: '/models/nds.glb',
  PSP: '/models/psp.glb',
  'PS Vita': '/models/psvita.glb',
};

const DeviceModel = ({
  device,
  isHovered = false,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const groupRef = useRef();
  const modelPath = MODEL_PATHS[device];

  // Each selected device loads only its corresponding GLB file.
  const { scene } = useGLTF(modelPath);
  const model = useMemo(() => scene.clone(true), [scene]);

  // Keep a subtle hover scale animation. OrbitControls handles rotation.
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetScale = isHovered ? 1.06 : 1;
    const nextScale = 1 - Math.exp(-5 * delta);
    groupRef.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale },
      nextScale
    );
  });

  if (!modelPath) {
    console.warn(`No GLB model configured for device: ${device}`);
    return null;
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={model} dispose={null} />
    </group>
  );
};

Object.values(MODEL_PATHS).forEach((path) => useGLTF.preload(path));

export default DeviceModel;
