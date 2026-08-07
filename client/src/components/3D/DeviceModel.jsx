import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, RoundedBox } from '@react-three/drei';

const DeviceModel = ({ device, color, isHovered, position, rotation }) => {
  const meshRef = useRef();

  // Auto-rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  // Render different shapes for different devices
  const renderDevice = () => {
    switch(device) {
      case 'PSP':
        return (
          <group position={position}>
            {/* PSP Body */}
            <RoundedBox 
              args={[1.8, 0.3, 1.2]} 
              radius={0.05}
              position={[0, 0, 0]}
              ref={meshRef}
            >
              <meshStandardMaterial 
                color={color} 
                roughness={0.4} 
                metalness={0.6}
              />
            </RoundedBox>
            {/* Screen */}
            <RoundedBox 
              args={[1.2, 0.2, 0.8]} 
              radius={0.02}
              position={[0, 0.25, 0]}
            >
              <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
            {/* Buttons */}
            <Sphere args={[0.08]} position={[0.6, -0.15, 0.4]}>
              <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.7} />
            </Sphere>
            <Sphere args={[0.08]} position={[0.6, -0.15, -0.4]}>
              <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.7} />
            </Sphere>
          </group>
        );

      case 'DS Lite':
        return (
          <group position={position}>
            {/* DS Lite Body - Top Screen */}
            <RoundedBox 
              args={[1.6, 0.15, 1.0]} 
              radius={0.05}
              position={[0, 0.25, 0]}
              ref={meshRef}
            >
              <meshStandardMaterial 
                color={color} 
                roughness={0.3} 
                metalness={0.2}
              />
            </RoundedBox>
            {/* DS Lite Body - Bottom */}
            <RoundedBox 
              args={[1.6, 0.15, 1.0]} 
              radius={0.05}
              position={[0, -0.25, 0]}
            >
              <meshStandardMaterial 
                color={color} 
                roughness={0.3} 
                metalness={0.2}
              />
            </RoundedBox>
            {/* Screens */}
            <RoundedBox 
              args={[1.0, 0.02, 0.6]} 
              radius={0.02}
              position={[0, 0.35, 0]}
            >
              <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
            <RoundedBox 
              args={[1.0, 0.02, 0.6]} 
              radius={0.02}
              position={[0, -0.15, 0]}
            >
              <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
          </group>
        );

      case 'PS Vita':
        return (
          <group position={position}>
            {/* PS Vita Body */}
            <RoundedBox 
              args={[1.6, 0.3, 1.4]} 
              radius={0.08}
              position={[0, 0, 0]}
              ref={meshRef}
            >
              <meshStandardMaterial 
                color={color} 
                roughness={0.5} 
                metalness={0.3}
              />
            </RoundedBox>
            {/* Screen */}
            <RoundedBox 
              args={[1.2, 0.2, 0.9]} 
              radius={0.03}
              position={[0, 0.25, 0]}
            >
              <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
            {/* Analog sticks */}
            <Cylinder args={[0.15, 0.15, 0.08]} position={[-0.5, -0.15, 0.5]}>
              <meshStandardMaterial color="#888" roughness={0.8} metalness={0.2} />
            </Cylinder>
            <Cylinder args={[0.15, 0.15, 0.08]} position={[0.5, -0.15, -0.5]}>
              <meshStandardMaterial color="#888" roughness={0.8} metalness={0.2} />
            </Cylinder>
          </group>
        );

      case '3DS':
        return (
          <group position={position}>
            {/* 3DS Body - Top */}
            <RoundedBox 
              args={[1.6, 0.15, 1.0]} 
              radius={0.05}
              position={[0, 0.3, 0]}
              ref={meshRef}
            >
              <meshStandardMaterial 
                color={color} 
                roughness={0.4} 
                metalness={0.2}
              />
            </RoundedBox>
            {/* 3DS Body - Bottom */}
            <RoundedBox 
              args={[1.6, 0.2, 1.0]} 
              radius={0.05}
              position={[0, -0.25, 0]}
            >
              <meshStandardMaterial 
                color={color} 
                roughness={0.4} 
                metalness={0.2}
              />
            </RoundedBox>
            {/* Top Screen (3D) */}
            <RoundedBox 
              args={[1.1, 0.02, 0.7]} 
              radius={0.02}
              position={[0, 0.4, 0]}
            >
              <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
            {/* Bottom Screen */}
            <RoundedBox 
              args={[1.1, 0.02, 0.5]} 
              radius={0.02}
              position={[0, -0.15, 0]}
            >
              <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
            {/* 3D Slider */}
            <Box args={[0.3, 0.05, 0.05]} position={[0.7, 0.3, 0]}>
              <meshStandardMaterial color="#666" roughness={0.5} metalness={0.5} />
            </Box>
          </group>
        );

      case '2DS':
        return (
          <group position={position}>
            {/* 2DS Body - Wedge shape (simplified) */}
            <RoundedBox 
              args={[1.8, 0.3, 1.2]} 
              radius={0.08}
              position={[0, 0, 0]}
              ref={meshRef}
            >
              <meshStandardMaterial 
                color={color} 
                roughness={0.5} 
                metalness={0.1}
              />
            </RoundedBox>
            {/* Top Screen */}
            <RoundedBox 
              args={[1.2, 0.02, 0.7]} 
              radius={0.02}
              position={[0, 0.2, 0]}
            >
              <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
            {/* Bottom Screen */}
            <RoundedBox 
              args={[1.0, 0.02, 0.5]} 
              radius={0.02}
              position={[0, -0.15, 0]}
            >
              <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
          </group>
        );

      default:
        return (
          <Box args={[1.5, 0.3, 1.0]} position={position} ref={meshRef}>
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
          </Box>
        );
    }
  };

  return renderDevice();
};

export default DeviceModel;
