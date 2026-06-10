import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    
    const scene = new THREE.Scene();

    
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1500);
    camera.position.z = 400;

    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 40 : 100;
    const maxDistance = isMobile ? 90 : 130;
    
    const particleData = [];
    const positions = new Float32Array(maxParticles * 3);

    const r = 500;
    const rHalf = r / 2;

    for (let i = 0; i < maxParticles; i++) {
      const x = Math.random() * r - rHalf;
      const y = Math.random() * r - rHalf;
      const z = Math.random() * r - rHalf;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particleData.push({
        velocity: new THREE.Vector3(
          -1.0 + Math.random() * 2.0,
          -1.0 + Math.random() * 2.0,
          -1.0 + Math.random() * 2.0
        ).normalize().multiplyScalar(0.35),
        numConnections: 0,
      });
    }

    
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));

    
    const createCircleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 16;
      c.height = 16;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(232, 0, 13, 0.8)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(8, 8, 8, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 5,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(pointCloud);

    
    const linePositions = new Float32Array(maxParticles * maxParticles * 3);
    const lineColors = new Float32Array(maxParticles * maxParticles * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.2,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      
      mouse.targetX = (e.clientX - width / 2) * 0.12;
      mouse.targetY = (e.clientY - height / 2) * 0.12;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    
    const handleResize = () => {
      if (!containerRef.current) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let animId = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      camera.position.x += (mouse.x - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      pointCloud.rotation.y += 0.0006;
      lineMesh.rotation.y += 0.0006;

      const posAttr = particleGeometry.getAttribute('position');
      const coords = posAttr.array;

      for (let i = 0; i < maxParticles; i++) {
        coords[i * 3] += particleData[i].velocity.x;
        coords[i * 3 + 1] += particleData[i].velocity.y;
        coords[i * 3 + 2] += particleData[i].velocity.z;

        
        if (coords[i * 3] < -rHalf || coords[i * 3] > rHalf) particleData[i].velocity.x *= -1;
        if (coords[i * 3 + 1] < -rHalf || coords[i * 3 + 1] > rHalf) particleData[i].velocity.y *= -1;
        if (coords[i * 3 + 2] < -rHalf || coords[i * 3 + 2] > rHalf) particleData[i].velocity.z *= -1;
      }

      posAttr.needsUpdate = true;

      
      let lineIndex = 0;
      const lPos = lineGeometry.getAttribute('position').array;
      const lCol = lineGeometry.getAttribute('color').array;

      for (let i = 0; i < maxParticles; i++) {
        const x1 = coords[i * 3];
        const y1 = coords[i * 3 + 1];
        const z1 = coords[i * 3 + 2];

        for (let j = i + 1; j < maxParticles; j++) {
          const x2 = coords[j * 3];
          const y2 = coords[j * 3 + 1];
          const z2 = coords[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = 1.0 - dist / maxDistance;

            lPos[lineIndex * 3] = x1;
            lPos[lineIndex * 3 + 1] = y1;
            lPos[lineIndex * 3 + 2] = z1;

            lPos[lineIndex * 3 + 3] = x2;
            lPos[lineIndex * 3 + 4] = y2;
            lPos[lineIndex * 3 + 5] = z2;

            
            lCol[lineIndex * 3] = 0.9 * alpha;
            lCol[lineIndex * 3 + 1] = 0.05 * alpha;
            lCol[lineIndex * 3 + 2] = 0.1 * alpha;

            lCol[lineIndex * 3 + 3] = 0.9 * alpha;
            lCol[lineIndex * 3 + 4] = 0.05 * alpha;
            lCol[lineIndex * 3 + 5] = 0.1 * alpha;

            lineIndex += 2;
          }
        }
      }

      lineGeometry.getAttribute('position').needsUpdate = true;
      lineGeometry.getAttribute('color').needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="three-background-canvas" ref={containerRef} />;
}
