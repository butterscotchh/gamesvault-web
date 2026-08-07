import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import DeviceModel from './DeviceModel';
import ColorPicker from '../common/ColorPicker';

const devices = ['PSP', 'DS Lite', 'PS Vita', '3DS', '2DS'];

const HandheldShowcase = () => {
  const [selectedColor, setSelectedColor] = useState('#2d2d2d');

  const colors = [
    { name: 'Hitam', value: '#2d2d2d' },
    { name: 'Putih', value: '#f5f5f5' },
    { name: 'Silver', value: '#c0c0c0' },
    { name: 'Merah', value: '#dc2626' },
    { name: 'Biru', value: '#2563eb' },
    { name: 'Hijau', value: '#16a34a' },
    { name: 'Ungu', value: '#9333ea' },
    { name: 'Emas', value: '#d4af37' },
  ];

  const getDevicePosition = (index) => {
    const positions = [
      [-3.5, 0, 0],
      [-1.8, 0, 0],
      [0, 0, 0],
      [1.8, 0, 0],
      [3.5, 0, 0]
    ];
    return positions[index] || [index * 2 - 4, 0, 0];
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-brick-700">3D Showroom</h2>
          <p className="text-gray-600 text-sm mt-1">Ganti warna untuk melihat variasi</p>
        </div>

        {/* Color Picker */}
        <div className="flex justify-center mb-6">
          <ColorPicker 
            colors={colors} 
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-[400px] bg-gradient-to-b from-gray-100 to-white rounded-xl overflow-hidden shadow-md border border-gray-200">
          <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={4}
              maxDistance={15}
              autoRotate={true}
              autoRotateSpeed={1.5}
            />
            
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={1.2} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            
            <Environment preset="studio" />

            <Suspense fallback={null}>
              {devices.map((device, index) => (
                <DeviceModel
                  key={device}
                  device={device}
                  color={selectedColor}
                  position={getDevicePosition(index)}
                />
              ))}
            </Suspense>
          </Canvas>
        </div>

        {/* Device Labels */}
        <div className="flex justify-center gap-6 mt-3 text-sm text-gray-600">
          {devices.map((device) => (
            <span key={device} className="font-medium">{device}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandheldShowcase;
