"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/animations";

export function HeroVisual3D() {
  const mountRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    // WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not supported, falling back gracefully", e);
      return;
    }

    // Group for entire neural orb
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // 1. Inner glowing icosahedron core (Intelligence Core)
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x4F46E5,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    brainGroup.add(coreMesh);

    // 2. Outer personality rings
    const ringGeo1 = new THREE.TorusGeometry(2.9, 0.018, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x4F46E5,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    brainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.2, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    brainGroup.add(ring2);

    // 3. Neural Nodes (Personality traits vertices)
    const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMat1 = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
    const nodeMat2 = new THREE.MeshBasicMaterial({ color: 0x06B6D4 });
    const nodeMat3 = new THREE.MeshBasicMaterial({ color: 0x818CF8 });

    const nodeMaterials = [nodeMat1, nodeMat2, nodeMat3];
    const posAttribute = coreGeo.attributes.position;
    const vertexCount = posAttribute.count;

    // Pick subset of vertices for glowing nodes
    for (let i = 0; i < vertexCount; i += 3) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      const z = posAttribute.getZ(i);

      const nodeMesh = new THREE.Mesh(
        nodeGeo,
        nodeMaterials[i % nodeMaterials.length]
      );
      nodeMesh.position.set(x, y, z);
      brainGroup.add(nodeMesh);
    }

    // 4. Floating atmospheric dust particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x4F46E5,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Mouse Interaction Tracking with Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.8;
      targetRotationX = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    const reducedMotion = prefersReducedMotion();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!reducedMotion) {
        // Smooth rotation
        brainGroup.rotation.y += 0.003;
        brainGroup.rotation.x += 0.0015;

        ring1.rotation.z += 0.0035;
        ring2.rotation.x -= 0.0025;
        particles.rotation.y += 0.0006;

        // Smooth mouse following
        mouseX += (targetRotationX - mouseX) * 0.05;
        mouseY += (targetRotationY - mouseY) * 0.05;

        brainGroup.rotation.x += mouseX * 0.015;
        brainGroup.rotation.y += mouseY * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (renderer) {
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }

      // Dispose Geometries and Materials
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat1.dispose();
      nodeMat2.dispose();
      nodeMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isMounted]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Personality Neural Visualization"
    />
  );
}
