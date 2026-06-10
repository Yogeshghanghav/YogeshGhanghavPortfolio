import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';


function MouseTracker({ children }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer; 
    
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.4, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.3, 0.1);
  });

  return <group ref={groupRef}>{children}</group>;
}


function Laptop() {
  const screenRef = useRef();

  
  useFrame((state) => {
    if (screenRef.current) {
      const time = state.clock.getElapsedTime();
      screenRef.current.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.25;
    }
  });

  return (
    <group position={[0, -0.4, 0]} scale={[1.1, 1.1, 1.1]}>
      
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.12, 2.2]} />
        <meshStandardMaterial color="#1e1e24" roughness={0.2} metalness={0.8} />
      </mesh>

      
      <mesh position={[0, 0.07, 0.3]} castShadow>
        <boxGeometry args={[2.8, 0.02, 1.0]} />
        <meshStandardMaterial color="#0f0f12" roughness={0.8} />
      </mesh>

      
      <mesh position={[0, 0.07, 0.9]}>
        <boxGeometry args={[0.7, 0.01, 0.45]} />
        <meshStandardMaterial color="#2a2a32" roughness={0.4} />
      </mesh>

      
      <group position={[0, 0.06, -1.05]} rotation={[1.45, 0, 0]}>
        
        <mesh position={[0, 1.0, 0]} castShadow>
          <boxGeometry args={[3.2, 2.0, 0.08]} />
          <meshStandardMaterial color="#1e1e24" roughness={0.2} metalness={0.8} />
        </mesh>

        
        <mesh position={[0, 1.0, 0.05]}>
          <planeGeometry args={[3.0, 1.8]} />
          <meshStandardMaterial 
            ref={screenRef}
            color="#090d16" 
            emissive="#00f3ff" 
            emissiveIntensity={0.6}
            roughness={0.1}
          />
        </mesh>
        
        
        <mesh position={[0, 1.0, 0.052]}>
          <planeGeometry args={[2.8, 1.6]} />
          <meshBasicMaterial 
            color="#00ffcc" 
            transparent 
            opacity={0.35} 
            wireframe 
          />
        </mesh>
      </group>
    </group>
  );
}

export function LaptopCanvas() {
  return (
    <div className="w-full h-[320px] md:h-[450px]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        <directionalLight position={[0, 5, 5]} intensity={1.2} />
        
        <Stars radius={100} depth={50} count={600} factor={4} saturation={0.5} fade speed={1.5} />
        
        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <MouseTracker>
            <Laptop />
          </MouseTracker>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}



function FloatingShape({ geometry, color, position, rotationSpeed, name }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    
    meshRef.current.rotation.x += rotationSpeed[0] * (hovered ? 2.5 : 1.0);
    meshRef.current.rotation.y += rotationSpeed[1] * (hovered ? 2.5 : 1.0);
    
    
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.18;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      {geometry}
      <meshStandardMaterial
        color={hovered ? '#ffffff' : color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.45}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

export function SkillsCanvas() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#d946ef" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
        
        
        <Float speed={1.5} floatIntensity={0.5}>
          <MouseTracker>
            
            <FloatingShape 
              geometry={<torusGeometry args={[0.55, 0.16, 16, 100]} />} 
              color="#06b6d4" 
              position={[-1.8, 0.8, 0]} 
              rotationSpeed={[0.006, 0.012]}
            />
            
            <FloatingShape 
              geometry={<boxGeometry args={[0.85, 0.85, 0.85]} />} 
              color="#8b5cf6" 
              position={[1.8, 0.8, 0]} 
              rotationSpeed={[0.01, 0.008]}
            />
            
            <FloatingShape 
              geometry={<cylinderGeometry args={[0.5, 0.5, 0.9, 32]} />} 
              color="#d946ef" 
              position={[0, -0.8, 0]} 
              rotationSpeed={[0.008, 0.01]}
            />
            
            <FloatingShape 
              geometry={<icosahedronGeometry args={[0.6, 0]} />} 
              color="#10b981" 
              position={[-1.2, -0.9, 0]} 
              rotationSpeed={[0.012, 0.006]}
            />
            
            <FloatingShape 
              geometry={<coneGeometry args={[0.55, 1.0, 32]} />} 
              color="#f97316" 
              position={[1.2, -0.9, 0]} 
              rotationSpeed={[0.009, 0.015]}
            />
          </MouseTracker>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}



function Earth() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
  });

  return (
    <group ref={groupRef}>
      
      <mesh>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshStandardMaterial color="#0b081e" roughness={0.9} metalness={0.2} />
      </mesh>

      
      <mesh>
        <sphereGeometry args={[2.02, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.25} />
      </mesh>

      
      <points>
        <sphereGeometry args={[2.08, 48, 48]} />
        <pointsMaterial color="#06b6d4" size={0.035} sizeAttenuation transparent opacity={0.6} />
      </points>

      
      <mesh rotation={[0.4, 0.8, 0]}>
        <torusGeometry args={[2.3, 0.008, 8, 100]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.4} />
      </mesh>

      <mesh rotation={[-0.6, -0.5, 0.4]}>
        <torusGeometry args={[2.2, 0.005, 8, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function EarthCanvas() {
  return (
    <div className="w-full h-[320px] md:h-[450px]">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 60 }}>
        <ambientLight intensity={1.0} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        <MouseTracker>
          <Earth />
        </MouseTracker>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
