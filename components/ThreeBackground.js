import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedStars() {
  const starsRef = useRef();
  const groupRef = useRef();
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0001;
      starsRef.current.rotation.y += 0.0001;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
      
      // Add some color variation
      colors.push(
        Math.random() * 0.5 + 0.5, // R
        Math.random() * 0.5 + 0.5, // G
        Math.random() * 0.5 + 0.5  // B
      );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geometry;
  }, []);

  return (
    <group ref={groupRef}>
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <points>
        <primitive object={starsGeometry} />
        <pointsMaterial
          size={1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 50]} />
        <ambientLight intensity={0.5} />
        <AnimatedStars />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.1}
        />
      </Canvas>
    </div>
  );
} 