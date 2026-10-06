"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Globe2,
  Compass,
  Zap,
  TrendingUp,
  Target,
  BarChart2,
  Move,
  CheckCircle2,
} from "lucide-react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/animations";

// Accurate Lat/Lng to 3D Sphere conversion
function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Great-circle elevated bezier arc between two locations
function createCurveArc(p1, p2, radius, elevation = 0.28) {
  const v1 = latLongToVector3(p1.lat, p1.lng, radius);
  const v2 = latLongToVector3(p2.lat, p2.lng, radius);

  const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
  const distance = v1.distanceTo(v2);
  const midLength = mid.length();

  if (midLength > 0.0001) {
    mid.normalize();
    mid.multiplyScalar(radius + distance * elevation);
  }

  const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
  const points = curve.getPoints(44);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return { geometry, curve, points };
}

// Global Research & Assessment Benchmark Nodes
const NODES = [
  { name: "Central Hub", lat: 28.6139, lng: 77.209, color: "#6366F1", trait: "Central HQ" },
  { name: "Cognitive Lab", lat: 51.5074, lng: -0.1278, color: "#06B6D4", trait: "Cognitive Research" },
  { name: "Behavioral Analytics", lat: 40.7128, lng: -74.006, color: "#8B5CF6", trait: "Behavioral Models" },
  { name: "Aptitude Systems", lat: 35.6762, lng: 139.6503, color: "#EC4899", trait: "Aptitude Scale" },
  { name: "Leadership Index", lat: -33.8688, lng: 151.2093, color: "#F59E0B", trait: "Leadership Benchmark" },
  { name: "Talent Dynamics", lat: 25.2048, lng: 55.2708, color: "#10B981", trait: "Talent Framework" },
  { name: "AI Research", lat: 37.7749, lng: -122.4194, color: "#6366F1", trait: "Psychometric AI" },
];

const ARCS_DATA = [
  { from: NODES[0], to: NODES[1], color: 0x6366f1 },
  { from: NODES[0], to: NODES[3], color: 0xec4899 },
  { from: NODES[0], to: NODES[5], color: 0x10b981 },
  { from: NODES[1], to: NODES[2], color: 0x06b6d4 },
  { from: NODES[2], to: NODES[6], color: 0x8b5cf6 },
  { from: NODES[3], to: NODES[4], color: 0xf59e0b },
  { from: NODES[5], to: NODES[0], color: 0x6366f1 },
];

// High-fidelity raster mask generator for clean continent silhouette
function createLandMaskCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FFFFFF";

  const mapX = (lon) => ((lon + 180) / 360) * canvas.width;
  const mapY = (lat) => ((90 - lat) / 180) * canvas.height;

  const drawPolygon = (points) => {
    ctx.beginPath();
    ctx.moveTo(mapX(points[0][0]), mapY(points[0][1]));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(mapX(points[i][0]), mapY(points[i][1]));
    }
    ctx.closePath();
    ctx.fill();
  };

  // North America
  drawPolygon([
    [-168, 65], [-160, 71], [-130, 70], [-120, 75], [-95, 74], [-80, 62],
    [-65, 45], [-75, 35], [-80, 25], [-82, 9], [-77, 8], [-85, 14],
    [-100, 18], [-105, 22], [-117, 32], [-124, 48], [-135, 57], [-165, 60],
  ]);
  // Greenland
  drawPolygon([
    [-52, 60], [-25, 65], [-20, 80], [-45, 83], [-60, 78], [-52, 60],
  ]);
  // South America
  drawPolygon([
    [-77, 8], [-60, 10], [-50, -2], [-35, -5], [-38, -18], [-50, -30],
    [-65, -55], [-75, -50], [-72, -35], [-80, -18], [-80, -4], [-77, 8],
  ]);
  // Europe
  drawPolygon([
    [-9, 36], [0, 42], [-5, 48], [-5, 58], [10, 58], [25, 71],
    [32, 70], [40, 60], [30, 45], [25, 38], [15, 38], [5, 44], [-9, 36],
  ]);
  // Scandinavia
  drawPolygon([[5, 58], [12, 56], [18, 60], [28, 70], [20, 71], [10, 64], [5, 58]]);
  // UK
  drawPolygon([[-10, 52], [-2, 50], [2, 58], [-5, 59], [-10, 52]]);
  // Africa
  drawPolygon([
    [-17, 15], [-5, 36], [10, 37], [25, 32], [32, 31], [43, 12],
    [51, 12], [40, -5], [35, -25], [26, -34], [18, -34], [12, -15],
    [0, 5], [-17, 15],
  ]);
  // Madagascar
  drawPolygon([[43, -12], [50, -15], [47, -25], [43, -25], [43, -12]]);
  // Asia
  drawPolygon([
    [40, 60], [60, 68], [90, 75], [140, 72], [170, 65], [140, 50],
    [130, 35], [120, 22], [108, 12], [100, 5], [95, 18], [90, 22],
    [88, 22], [80, 13], [77, 8], [72, 20], [68, 25], [60, 25],
    [50, 30], [35, 32], [30, 45], [40, 60],
  ]);
  // India Subcontinent
  drawPolygon([
    [68, 24], [72, 32], [77, 35], [88, 28], [92, 22], [88, 21],
    [80, 13], [77, 8], [73, 16], [68, 24],
  ]);
  // Japan
  drawPolygon([[130, 32], [140, 36], [142, 44], [138, 38], [130, 32]]);
  // Australia & New Zealand
  drawPolygon([
    [113, -22], [125, -15], [135, -12], [148, -18], [152, -28],
    [148, -38], [138, -35], [128, -32], [115, -34], [113, -22],
  ]);
  drawPolygon([[166, -38], [175, -37], [178, -45], [168, -46], [166, -38]]);

  return ctx;
}

export function HeroGlobe() {
  const mountRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    // WebGL Renderer with clean transparency
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
      console.warn("WebGL unsupported", e);
      return;
    }

    const globeRadius = 1.68;
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.22;
    globeGroup.rotation.y = -0.4;
    globeGroup.rotation.z = -0.04;
    scene.add(globeGroup);

    // 1. Transparent Crystal Glass Inner Core (No foggy white wash)
    const baseGeo = new THREE.SphereGeometry(globeRadius * 0.985, 48, 48);
    const baseMat = new THREE.MeshPhongMaterial({
      color: 0x1e1b4b,
      specular: 0x6366f1,
      shininess: 40,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });
    const baseSphere = new THREE.Mesh(baseGeo, baseMat);
    globeGroup.add(baseSphere);

    // 2. Latitude / Longitude Subtle Rings
    const gridGroup = new THREE.Group();
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.22,
    });

    for (let i = -60; i <= 60; i += 30) {
      const ringRad = globeRadius * Math.cos((i * Math.PI) / 180);
      const ringY = globeRadius * Math.sin((i * Math.PI) / 180);
      const ringGeo = new THREE.BufferGeometry();
      const pts = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * ringRad, ringY, Math.sin(theta) * ringRad));
      }
      ringGeo.setFromPoints(pts);
      const ring = new THREE.Line(ringGeo, gridMat);
      gridGroup.add(ring);
    }
    globeGroup.add(gridGroup);

    // Tilted Ambient Orbit Ring
    const orbitGeo = new THREE.RingGeometry(globeRadius * 1.25, globeRadius * 1.256, 80);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.24,
    });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    orbitRing.rotation.y = Math.PI / 8;
    globeGroup.add(orbitRing);

    // 3. Luminous, High-Contrast Saturated Particle Matrix (Periwinkle, Cyan, Violet, Rose, Amber)
    const landMaskCtx = createLandMaskCanvas();
    const dotCount = 10000;
    const dotPositions = [];
    const dotColors = [];

    const colIndigo = new THREE.Color("#6366F1"); // Electric Indigo
    const colCyan = new THREE.Color("#06B6D4"); // Vibrant Cyan
    const colPurple = new THREE.Color("#8B5CF6"); // Vivid Purple
    const colRose = new THREE.Color("#EC4899"); // Rose
    const colAmber = new THREE.Color("#F59E0B"); // Amber
    const colEmerald = new THREE.Color("#10B981"); // Emerald

    if (landMaskCtx) {
      const imgData = landMaskCtx.getImageData(0, 0, 1000, 500).data;

      for (let i = 0; i < dotCount; i++) {
        const y = 1 - (i / (dotCount - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const phi = i * 2.3999632;

        const lat = Math.asin(y) * (180 / Math.PI);
        const lon = (phi * (180 / Math.PI)) % 360 - 180;

        const px = Math.floor(((lon + 180) / 360) * 1000);
        const py = Math.floor(((90 - lat) / 180) * 500);
        const idx = (py * 1000 + px) * 4;

        if (imgData[idx] > 128) {
          const v = latLongToVector3(lat, lon, globeRadius + 0.012);
          dotPositions.push(v.x, v.y, v.z);

          // Luminous color distribution
          if (lat >= 8 && lat <= 34 && lon >= 68 && lon <= 94) {
            // South Asia / Central Hub: Bright Indigo
            dotColors.push(colIndigo.r, colIndigo.g, colIndigo.b);
          } else if (lat > 35) {
            // North: Cyan & Indigo
            const c = (i % 2 === 0) ? colCyan : colIndigo;
            dotColors.push(c.r, c.g, c.b);
          } else if (lat < -10) {
            // South: Warm Amber & Emerald
            const c = (i % 3 === 0) ? colAmber : colEmerald;
            dotColors.push(c.r, c.g, c.b);
          } else {
            // Equator: Purple & Rose
            const c = (i % 3 === 0) ? colPurple : (i % 2 === 0 ? colIndigo : colRose);
            dotColors.push(c.r, c.g, c.b);
          }
        }
      }
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute("color", new THREE.Float32BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 0.044,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
    });
    const landPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(landPoints);

    // 4. Research Node Pins & Pulsing Ripple Rings
    const beaconsGroup = new THREE.Group();
    const beaconRings = [];

    NODES.forEach((node) => {
      const pos = latLongToVector3(node.lat, node.lng, globeRadius + 0.018);

      const pinGeo = new THREE.SphereGeometry(0.042, 14, 14);
      const pinMat = new THREE.MeshBasicMaterial({ color: node.color });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      beaconsGroup.add(pin);

      const normal = pos.clone().normalize();

      const ringGeo = new THREE.RingGeometry(0.015, 0.07, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.01)));
      ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

      beaconsGroup.add(ring);
      beaconRings.push({ mesh: ring, scale: 1, baseOpacity: 0.85 });
    });
    globeGroup.add(beaconsGroup);

    // 5. Connection Arcs & Smooth Photons
    const arcsGroup = new THREE.Group();
    const pulseObjects = [];

    ARCS_DATA.forEach((arcData) => {
      const { geometry, curve } = createCurveArc(arcData.from, arcData.to, globeRadius, 0.28);

      const arcMat = new THREE.LineBasicMaterial({
        color: arcData.color,
        transparent: true,
        opacity: 0.45,
        linewidth: 1.2,
      });
      const arcLine = new THREE.Line(geometry, arcMat);
      arcsGroup.add(arcLine);

      const pulseGeo = new THREE.SphereGeometry(0.034, 10, 10);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1.0,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      arcsGroup.add(pulseMesh);

      pulseObjects.push({
        mesh: pulseMesh,
        curve,
        progress: Math.random(),
        speed: 0.0028 + Math.random() * 0.0018,
      });
    });
    globeGroup.add(arcsGroup);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Interactive Drag & Momentum
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let velocity = { x: 0.0014, y: 0 };
    let lastUserInteraction = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevMousePos = { x: e.clientX, y: e.clientY };
      lastUserInteraction = Date.now();
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseParallax({ x: px, y: py });

      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      globeGroup.rotation.y += deltaX * 0.0045;
      globeGroup.rotation.x += deltaY * 0.0045;

      velocity = { x: deltaX * 0.0008, y: deltaY * 0.0008 };
      prevMousePos = { x: e.clientX, y: e.clientY };
      lastUserInteraction = Date.now();
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElem = renderer.domElement;
    domElem.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Resize Handler
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
        if (!isDragging) {
          velocity.x *= 0.96;
          velocity.y *= 0.96;

          if (Date.now() - lastUserInteraction > 1200) {
            velocity.x = 0.0014;
          }

          globeGroup.rotation.y += velocity.x;
          globeGroup.rotation.x += velocity.y;
        }

        globeGroup.rotation.x = Math.max(-0.35, Math.min(0.35, globeGroup.rotation.x));
        orbitRing.rotation.z += 0.0015;

        // Animate Pulses along Arcs
        pulseObjects.forEach((p) => {
          p.progress = (p.progress + p.speed) % 1;
          const point = p.curve.getPoint(p.progress);
          p.mesh.position.copy(point);
        });

        // Animate Ripple Rings
        beaconRings.forEach((b) => {
          b.scale += 0.01;
          if (b.scale > 2.2) {
            b.scale = 1;
          }
          b.mesh.scale.set(b.scale, b.scale, b.scale);
          b.mesh.material.opacity = (1 - (b.scale - 1) / 1.2) * b.baseOpacity;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (renderer) {
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }

      baseGeo.dispose();
      baseMat.dispose();
      gridMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[560px] h-[480px] sm:h-[520px] lg:h-[540px] mx-auto flex items-center justify-center select-none overflow-visible">
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute inset-0 -z-10 bg-radial from-[#4F46E5]/10 dark:from-[#4F46E5]/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full h-full flex items-center justify-center relative touch-none ${
          isInteracting ? "cursor-grabbing" : "cursor-grab"
        }`}
        aria-label="Interactive 3D Psychometric Global Visualization"
      />

      {/* Top-Left Refined Data Badge */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-4 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#181829]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.04)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold text-[#181829] dark:text-white tracking-tight">
            10K+ Assessments Global
          </span>
        </div>
      </div>

      {/* Top-Right Refined Scientific Metric Badge */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-4 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-[#181829]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.04)]">
          <Globe2 className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8]" />
          <div className="text-left">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] dark:text-[#818CF8]">
              Standardized Model
            </span>
            <span className="block text-[9px] font-medium text-[#667085] dark:text-slate-400">
              Multi-Dimensional Scale
            </span>
          </div>
        </div>
      </div>

      {/* 1. Main Focal Card (Bottom-Left): "Know Yourself" */}
      <div
        className="absolute bottom-10 left-2 sm:bottom-12 sm:left-4 z-30 w-[210px] sm:w-[225px] transition-transform duration-300 hover:scale-[1.02]"
        style={{
          transform: `translate3d(${mouseParallax.x * 12}px, ${mouseParallax.y * 12}px, 0)`,
        }}
      >
        <div className="absolute -top-3 -right-3 z-40 w-8 h-8 rounded-xl bg-white dark:bg-[#1E1B4B] backdrop-blur-xl border border-slate-200/80 dark:border-indigo-500/30 shadow-[0_6px_18px_rgba(79,70,229,0.15)] flex items-center justify-center text-[#4F46E5] dark:text-[#818CF8]">
          <Brain className="w-4 h-4" />
        </div>

        <Link
          href="/test"
          className="block rounded-[20px] bg-white/95 dark:bg-[#181829]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.15)] p-3.5 group/card cursor-pointer"
        >
          <div className="space-y-1">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#4F46E5] dark:text-[#818CF8]">
              Psychometric Intelligence
            </div>
            <h3 className="text-sm font-black text-[#181829] dark:text-white tracking-tight leading-snug">
              Know Yourself
            </h3>
            <p className="text-[10px] text-[#667085] dark:text-slate-300 leading-relaxed pr-1">
              Compare personality benchmarks with global profiles.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#4F46E5] dark:text-[#818CF8] group-hover/card:underline">
              Start Test →
            </span>
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center justify-center text-[#181829] dark:text-white group-hover/card:bg-[#4F46E5] group-hover/card:text-white group-hover/card:border-[#4F46E5] transition-colors duration-200">
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </Link>
      </div>

      {/* 2. Top-Right Orbital Card: "Discover Your Strengths" (Desktop lg only) */}
      <div
        className="hidden lg:block absolute top-16 right-3 z-20 w-[185px] pointer-events-none transition-transform duration-300"
        style={{
          transform: `translate3d(${mouseParallax.x * -10}px, ${mouseParallax.y * -10}px, 0)`,
        }}
      >
        <div className="rounded-[18px] bg-white/90 dark:bg-[#181829]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#06B6D4] dark:text-[#38BDF8]">
            <Target className="w-3 h-3" />
            <span>Discover Strengths</span>
          </div>
          <p className="text-[10px] font-semibold text-[#181829] dark:text-white leading-tight">
            8 Gardner Intelligence Dimensions
          </p>
        </div>
      </div>

      {/* 3. Bottom-Left Secondary Pill: "Build Your Future" (Desktop lg only) */}
      <div
        className="hidden lg:block absolute bottom-2 left-28 z-20 pointer-events-none transition-transform duration-300"
        style={{
          transform: `translate3d(${mouseParallax.x * 8}px, ${mouseParallax.y * 8}px, 0)`,
        }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-[#181829]/90 backdrop-blur-md border border-slate-200/70 dark:border-white/10 shadow-xs text-[10px] font-bold text-[#181829] dark:text-white">
          <TrendingUp className="w-3 h-3 text-[#4F46E5] dark:text-[#818CF8]" />
          <span>Build Your Future</span>
        </div>
      </div>

      {/* 4. Bottom-Right Card: "Aptitude Benchmark" */}
      <div
        className="absolute bottom-12 right-2 sm:bottom-14 sm:right-4 z-20 pointer-events-none transition-transform duration-300"
        style={{
          transform: `translate3d(${mouseParallax.x * -14}px, ${mouseParallax.y * -14}px, 0)`,
        }}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#181829]/95 backdrop-blur-md border border-[#FDE68A] dark:border-amber-500/30 shadow-[0_6px_18px_rgba(245,158,11,0.15)] text-[#D97706] dark:text-[#FBBF24] text-[11px] font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>Aptitude Benchmark</span>
        </div>
      </div>

      {/* Centered "Drag to rotate" Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-semibold text-[#667085] dark:text-slate-400 flex items-center gap-1.5 bg-white/90 dark:bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200/70 dark:border-white/10 shadow-2xs whitespace-nowrap">
          <Move className="w-2.5 h-2.5 text-[#4F46E5] dark:text-[#818CF8]" />
          <span className="hidden sm:inline">Drag to rotate</span>
          <span className="sm:hidden">Swipe to explore</span>
        </span>
      </div>
    </div>
  );
}

export default HeroGlobe;
