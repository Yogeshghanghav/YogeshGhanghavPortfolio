import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';


function SceneController({ scrollProgress }) {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const distortMatRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const { x, y } = state.pointer; 

    
    let targetCamPos = new THREE.Vector3(0, 0, 5);
    let targetLookAt = new THREE.Vector3(0, 0, 0);
    let targetMeshPos = new THREE.Vector3(0, 0, 0);
    let targetScale = 1.0;
    let targetDistort = 0.35;

    
    if (scrollProgress < 0.2) {
      
      const t = scrollProgress / 0.2;
      targetCamPos.lerpVectors(new THREE.Vector3(0, 0, 5), new THREE.Vector3(-1.6, 0.4, 4.4), t);
      targetLookAt.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.5, 0, 0), t);
      targetMeshPos.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.6, 0.1, 0), t);
      targetScale = THREE.MathUtils.lerp(1.0, 1.25, t);
      targetDistort = THREE.MathUtils.lerp(0.35, 0.45, t);
    } else if (scrollProgress < 0.45) {
      
      const t = (scrollProgress - 0.2) / 0.25;
      targetCamPos.lerpVectors(new THREE.Vector3(-1.6, 0.4, 4.4), new THREE.Vector3(1.6, -0.4, 4.2), t);
      targetLookAt.lerpVectors(new THREE.Vector3(0.5, 0, 0), new THREE.Vector3(-0.5, 0, 0), t);
      targetMeshPos.lerpVectors(new THREE.Vector3(1.6, 0.1, 0), new THREE.Vector3(-1.6, -0.1, 0), t);
      targetScale = THREE.MathUtils.lerp(1.25, 0.95, t);
      targetDistort = THREE.MathUtils.lerp(0.45, 0.2, t);
    } else if (scrollProgress < 0.75) {
      
      const t = (scrollProgress - 0.45) / 0.3;
      targetCamPos.lerpVectors(new THREE.Vector3(1.6, -0.4, 4.2), new THREE.Vector3(0, 1.6, 4.8), t);
      targetLookAt.lerpVectors(new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0, -0.4, 0), t);
      targetMeshPos.lerpVectors(new THREE.Vector3(-1.6, -0.1, 0), new THREE.Vector3(0, 1.1, -1.0), t);
      targetScale = THREE.MathUtils.lerp(0.95, 0.8, t);
      targetDistort = THREE.MathUtils.lerp(0.2, 0.1, t);
    } else {
      
      const t = (scrollProgress - 0.75) / 0.25;
      targetCamPos.lerpVectors(new THREE.Vector3(0, 1.6, 4.8), new THREE.Vector3(0, 0, 3.8), t);
      targetLookAt.lerpVectors(new THREE.Vector3(0, -0.4, 0), new THREE.Vector3(0, 0, 0), t);
      targetMeshPos.lerpVectors(new THREE.Vector3(0, 1.1, -1.0), new THREE.Vector3(0, 0, 0), t);
      targetScale = THREE.MathUtils.lerp(0.8, 1.35, t);
      targetDistort = THREE.MathUtils.lerp(0.1, 0.5, t);
    }

    
    const finalCamPos = new THREE.Vector3(
      targetCamPos.x + x * 0.35,
      targetCamPos.y - y * 0.35,
      targetCamPos.z
    );
    state.camera.position.lerp(finalCamPos, 0.05);
    state.camera.lookAt(targetLookAt);

    
    if (meshRef.current) {
      meshRef.current.position.lerp(targetMeshPos, 0.05);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05));
      
      meshRef.current.rotation.y += 0.006 + (hovered ? 0.02 : 0);
      meshRef.current.rotation.x += 0.003;
    }

    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = meshRef.current.rotation.y;
      wireframeRef.current.rotation.x = meshRef.current.rotation.x;
      wireframeRef.current.position.copy(meshRef.current.position);
      wireframeRef.current.scale.copy(meshRef.current.scale);
    }

    
    if (distortMatRef.current) {
      distortMatRef.current.distort = THREE.MathUtils.lerp(distortMatRef.current.distort, targetDistort, 0.05);
    }
  });

  return (
    <group>
      
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <torusKnotGeometry args={[1.0, 0.35, 128, 16]} />
        <MeshDistortMaterial
          ref={distortMatRef}
          color="#ff2a3b"
          emissive="#5c0005"
          roughness={0.15}
          metalness={0.9}
          speed={2.2}
        />
      </mesh>

      
      <mesh ref={wireframeRef}>
        <torusKnotGeometry args={[1.02, 0.36, 64, 12]} />
        <meshBasicMaterial color="#ff2a3b" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function PortfolioCanvas({ scrollProgress }) {
  const [starCount, setStarCount] = useState(750);

  
  useEffect(() => {
    if (window.innerWidth < 768) {
      setStarCount(250);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[#06050a]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} shadows>
        
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#ff2a3b" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f59e0b" />
        <directionalLight position={[5, 5, 2]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, 5, -2]} intensity={0.6} color="#ff2a3b" />

        
        <Stars radius={100} depth={50} count={starCount} factor={5} saturation={0.6} fade speed={1.5} />

        <Float speed={1.8} floatIntensity={0.4} rotationIntensity={0.2}>
          <SceneController scrollProgress={scrollProgress} />
        </Float>
      </Canvas>
    </div>
  );
}
