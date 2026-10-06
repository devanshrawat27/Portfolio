import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════
// CONSTANTS & PALETTE (Futuristic Editorial Tech Aesthetic)
// ═══════════════════════════════════════════════════════
const LIME = "#a3e635";
const LIME_BRIGHT = "#bef264";
const LIME_DARK = "#4d7c0f";
const DARK_BG = "#050505";

// Phase timings (tuned for cinematic drama & silky fluidity)
const PHASE_TIMINGS = {
  P1_START: 0.0,
  P1_END: 0.55,       // Globe forms with rotating orbital rings
  P2_START: 0.55,
  P2_END: 1.1,        // Globe fully visible with tech badges & leader lines
  P3_START: 1.1,
  P3_END: 1.6,        // Globe dissolves into galactic particle wave, name reveals
  P4_START: 1.6,
  P4_END: 2.2,        // Subtitle, telemetry & luminous progress line
  TRANSITION_END: 2.45 // Silky zoom & fade-out into homepage hero
};

// Strategic tech hub nodes with coordinates & screen offsets
const HUD_BADGES = [
  {
    id: "ai",
    label: "AI / LLMs",
    code: "01",
    location: [37.7749, -122.4194], // San Francisco
    badgeOffset: { x: -215, y: -125 },
    elbowOffset: { x: -125, y: -125 },
    nodeOffset: { x: -65, y: -45 },
    delay: 0.56,
  },
  {
    id: "projects",
    label: "PROJECTS",
    code: "02",
    location: [40.7128, -74.006], // New York
    badgeOffset: { x: 215, y: -135 },
    elbowOffset: { x: 125, y: -135 },
    nodeOffset: { x: 60, y: -55 },
    delay: 0.62,
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    code: "03",
    location: [35.6762, 139.6503], // Tokyo
    badgeOffset: { x: 240, y: 15 },
    elbowOffset: { x: 150, y: 15 },
    nodeOffset: { x: 90, y: -10 },
    delay: 0.68,
  },
  {
    id: "skills",
    label: "SKILLS",
    code: "04",
    location: [12.9716, 77.5946], // Bangalore
    badgeOffset: { x: -220, y: 110 },
    elbowOffset: { x: -125, y: 110 },
    nodeOffset: { x: -55, y: 55 },
    delay: 0.74,
  },
  {
    id: "ideas",
    label: "IDEAS",
    code: "05",
    location: [51.5074, -0.1278], // London
    badgeOffset: { x: 200, y: 130 },
    elbowOffset: { x: 130, y: 130 },
    nodeOffset: { x: 65, y: 70 },
    delay: 0.80,
  },
];

const Preloader = ({ onComplete }) => {
  const [elapsed, setElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const globeCanvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const globeInstanceRef = useRef(null);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const particlesRef = useRef([]);
  const shockwavesRef = useRef([]);
  const hasTriggeredDissolveRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Responsive dimensions
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === "undefined") return { width: 1200, height: 800, globeSize: 420 };
    const w = window.innerWidth;
    const h = window.innerHeight;
    const globeSize = Math.min(Math.min(w, h) * (w < 768 ? 0.75 : 0.52), 440);
    return { width: w, height: h, globeSize: Math.max(globeSize, 280) };
  });

  const isMobile = dimensions.width < 768;

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const globeSize = Math.min(Math.min(w, h) * (w < 768 ? 0.75 : 0.52), 440);
      setDimensions({ width: w, height: h, globeSize: Math.max(globeSize, 280) });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Interactive mouse tracking with gentle inertial smoothing
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ═══════════════════════════════════════════════════════
  // COBE 3D GLOBE INITIALIZATION (With Vivid Lime Continent Dots)
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    if (!globeCanvasRef.current) return;

    let phi = 0;
    const size = Math.floor(dimensions.globeSize);

    try {
      const globe = createGlobe(globeCanvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: size * 2,
        height: size * 2,
        phi: 0,
        theta: 0.14,
        dark: 1,
        diffuse: 1.25,
        mapSamples: 20000,
        mapBrightness: 6.5, // High brightness so continent contours glow vividly
        mapBaseBrightness: 0.05,
        baseColor: [0.65, 0.95, 0.22], // Neon acid lime #a3e635
        markerColor: [1.0, 1.0, 0.75], // High-luminance core points
        glowColor: [0.22, 0.52, 0.10], // Elegant atmospheric rim
        offset: [0, 0],
        scale: 1.05,
        // Strategic tech hub markers
        markers: HUD_BADGES.map((b) => ({
          location: b.location,
          size: isMobile ? 0.045 : 0.055,
        })),
        // Multi-point orbital arcs between worldwide hubs
        arcs: [
          { from: [37.7749, -122.4194], to: [51.5074, -0.1278] },  // SF -> London
          { from: [51.5074, -0.1278], to: [12.9716, 77.5946] },    // London -> Bangalore
          { from: [40.7128, -74.006], to: [35.6762, 139.6503] },   // NY -> Tokyo
          { from: [12.9716, 77.5946], to: [35.6762, 139.6503] },   // Bangalore -> Tokyo
          { from: [37.7749, -122.4194], to: [40.7128, -74.006] },  // SF -> NY
        ],
        arcColor: [0.68, 0.96, 0.25],
        arcWidth: 0.9,
        arcHeight: 0.28,
        onRender: (state) => {
          // Subtle mouse tilt + continuous cinematic spin
          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

          state.phi = phi + mouseRef.current.x * 0.2;
          state.theta = 0.14 - mouseRef.current.y * 0.12;
          phi += 0.0075;
        },
      });

      globeInstanceRef.current = globe;
    } catch (err) {
      console.warn("WebGL/COBE initialization notice:", err);
    }

    return () => {
      if (globeInstanceRef.current) {
        globeInstanceRef.current.destroy();
        globeInstanceRef.current = null;
      }
    };
  }, [dimensions.globeSize, isMobile]);

  // ═══════════════════════════════════════════════════════
  // COSMIC PARTICLE GALAXY DISSOLUTION (Multi-Layered Simulation)
  // ═══════════════════════════════════════════════════════
  const initDissolveParticles = useCallback(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;

    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const radius = dimensions.globeSize * 0.48;
    const count = isMobile ? 260 : 480;
    const newParticles = [];

    // Trigger shockwave ring
    shockwavesRef.current = [
      { r: radius * 0.8, maxR: radius * 2.6, alpha: 0.9, speed: 7 },
      { r: radius * 0.5, maxR: radius * 2.1, alpha: 0.7, speed: 5 },
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.75 + Math.random() * 0.45);
      const startX = cx + Math.cos(angle) * r;
      const startY = cy + Math.sin(angle) * r;

      // Heavy horizontal directional velocity (creating the wings of light / nebula wave)
      const dirX = startX >= cx ? 1 : -1;
      const horizontalForce = 3.5 + Math.random() * 9.5;
      const verticalForce = (Math.random() - 0.5) * 3.4;

      // Classify particle layer
      const layerType = Math.random();
      const isCoreStar = layerType > 0.82;
      const isMicroDust = layerType < 0.35;

      newParticles.push({
        x: startX,
        y: startY,
        prevX: startX,
        prevY: startY,
        vx: dirX * horizontalForce * (0.6 + Math.random() * 0.9),
        vy: verticalForce,
        size: isCoreStar ? 2.5 + Math.random() * 1.8 : isMicroDust ? 0.75 + Math.random() * 0.6 : 1.3 + Math.random() * 1.0,
        alpha: 0.9 + Math.random() * 0.1,
        decay: isCoreStar ? 0.005 : isMicroDust ? 0.008 : 0.006,
        color: isCoreStar ? "#ffffff" : Math.random() > 0.3 ? LIME : LIME_BRIGHT,
        isCoreStar,
        oscillationSpeed: 2 + Math.random() * 4,
        oscillationAmp: 0.4 + Math.random() * 0.8,
        seed: Math.random() * 10,
      });
    }

    particlesRef.current = newParticles;
  }, [dimensions, isMobile]);

  // ═══════════════════════════════════════════════════════
  // MAIN RAF ANIMATION LOOP
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    const handleTick = (now) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const time = (now - startTimeRef.current) / 1000;
      setElapsed(time);

      // Trigger particle dissolution exactly when Phase 3 begins
      if (time >= PHASE_TIMINGS.P3_START && !hasTriggeredDissolveRef.current) {
        hasTriggeredDissolveRef.current = true;
        initDissolveParticles();
      }

      // Render Particle Canvas
      const pCanvas = particleCanvasRef.current;
      if (pCanvas && (particlesRef.current.length > 0 || shockwavesRef.current.length > 0)) {
        const ctx = pCanvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);

          const cx = dimensions.width / 2;
          const cy = dimensions.height / 2;

          // 1. Draw expanding shockwave rings
          for (let s = 0; s < shockwavesRef.current.length; s++) {
            const sw = shockwavesRef.current[s];
            sw.r += sw.speed;
            sw.alpha *= 0.94;
            if (sw.alpha > 0.02 && sw.r < sw.maxR) {
              ctx.strokeStyle = `rgba(163, 230, 53, ${sw.alpha * 0.45})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(cx, cy, sw.r, 0, Math.PI * 2);
              ctx.stroke();
            }
          }

          const particles = particlesRef.current;
          const pLen = particles.length;

          // 2. Inter-particle constellation plexus connections
          ctx.lineWidth = 0.75;
          for (let i = 0; i < pLen; i++) {
            const p1 = particles[i];
            if (p1.alpha <= 0.08) continue;

            for (let j = i + 1; j < Math.min(i + 15, pLen); j++) {
              const p2 = particles[j];
              if (p2.alpha <= 0.08) continue;

              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxDist = isMobile ? 42 : 62;

              if (dist < maxDist) {
                const lineAlpha = (1 - dist / maxDist) * 0.35 * Math.min(p1.alpha, p2.alpha);
                ctx.strokeStyle = `rgba(163, 230, 53, ${lineAlpha})`;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }

          // 3. Update & render individual particles with motion trails
          for (let i = 0; i < pLen; i++) {
            const p = particles[i];
            p.prevX = p.x;
            p.prevY = p.y;

            // Fluid turbulence wave physics
            p.y += Math.sin(p.x * 0.012 + time * p.oscillationSpeed + p.seed) * p.oscillationAmp;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.942;
            p.vy *= 0.942;
            p.alpha = Math.max(0, p.alpha - p.decay);

            if (p.alpha > 0.02) {
              // Motion trail streak for high-speed particles
              if (Math.abs(p.vx) > 1.5 && p.alpha > 0.3) {
                ctx.strokeStyle = p.color === "#ffffff"
                  ? `rgba(255, 255, 255, ${p.alpha * 0.4})`
                  : `rgba(163, 230, 53, ${p.alpha * 0.4})`;
                ctx.lineWidth = p.size * 0.7;
                ctx.beginPath();
                ctx.moveTo(p.prevX, p.prevY);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
              }

              // Particle body
              ctx.fillStyle = p.color === "#ffffff"
                ? `rgba(255, 255, 255, ${p.alpha})`
                : `rgba(163, 230, 53, ${p.alpha})`;

              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();

              // Radiant optical glow for core star nodes
              if (p.isCoreStar && p.alpha > 0.25) {
                const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
                glowGrad.addColorStop(0, `rgba(163, 230, 53, ${p.alpha * 0.5})`);
                glowGrad.addColorStop(0.5, `rgba(163, 230, 53, ${p.alpha * 0.15})`);
                glowGrad.addColorStop(1, "transparent");
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // Check transition completion
      if (time >= PHASE_TIMINGS.TRANSITION_END) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          setIsFinished(true);
          if (onComplete) onComplete();
        }
        return;
      }

      animFrameRef.current = requestAnimationFrame(handleTick);
    };

    animFrameRef.current = requestAnimationFrame(handleTick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [initDissolveParticles, onComplete, dimensions, isMobile]);

  // Immediate Skip
  const handleSkip = useCallback(() => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // ═══════════════════════════════════════════════════════
  // PROGRESSION VALUE CALCULATIONS
  // ═══════════════════════════════════════════════════════
  // Phase 1 (0.0s – 0.55s): Globe assemble & scale-in
  const p1Progress = Math.min(1, Math.max(0, elapsed / PHASE_TIMINGS.P1_END));

  // Phase 2 (0.55s – 1.1s): Tech Badges visible
  const isPhase2Active = elapsed >= PHASE_TIMINGS.P2_START && elapsed < PHASE_TIMINGS.P3_START + 0.15;

  // Phase 3 (1.1s – 1.6s): Globe dissolves into particles
  const dissolveProgress = Math.min(1, Math.max(0, (elapsed - PHASE_TIMINGS.P3_START) / (PHASE_TIMINGS.P3_END - PHASE_TIMINGS.P3_START)));
  const globeOpacity = elapsed < PHASE_TIMINGS.P3_START
    ? Math.min(1, p1Progress * 1.5)
    : Math.max(0, 1 - dissolveProgress * 2.2);

  // Globe scale: subtle expansion during dissolution
  const globeScale = elapsed < PHASE_TIMINGS.P3_START
    ? 0.88 + 0.12 * p1Progress
    : 1.0 + 0.22 * dissolveProgress;

  // Typography appearance in Phase 3
  const isTypographyVisible = elapsed >= 1.15;
  const typoProgress = Math.min(1, Math.max(0, (elapsed - 1.15) / 0.35));

  // Live percentage 0% -> 100%
  const progressPercent = Math.min(100, Math.floor((elapsed / PHASE_TIMINGS.P4_END) * 100));

  // Root container exit transition in final 250ms
  const isExiting = elapsed >= PHASE_TIMINGS.P4_END;
  const exitProgress = isExiting
    ? Math.min(1, (elapsed - PHASE_TIMINGS.P4_END) / (PHASE_TIMINGS.TRANSITION_END - PHASE_TIMINGS.P4_END))
    : 0;
  const exitOpacity = 1 - exitProgress;
  const exitScale = 1 + exitProgress * 0.08;

  if (isFinished) return null;

  return (
    <motion.div
      key="storyboard-globe-preloader-root"
      initial={{ opacity: 1 }}
      animate={{ opacity: exitOpacity, scale: exitScale }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        background: DARK_BG,
        overflow: "hidden",
        pointerEvents: isExiting ? "none" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── SKIP BUTTON ── */}
      <button
        onClick={handleSkip}
        style={{
          position: "absolute",
          top: "24px",
          right: "28px",
          zIndex: 1000,
          background: "rgba(5, 5, 5, 0.6)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(163, 230, 53, 0.3)",
          borderRadius: "4px",
          color: "rgba(255, 255, 255, 0.5)",
          padding: "6px 14px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          letterSpacing: "2.5px",
          cursor: "pointer",
          transition: "all 0.25s ease",
          boxShadow: "0 0 12px rgba(0,0,0,0.5)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = LIME;
          e.currentTarget.style.color = LIME;
          e.currentTarget.style.boxShadow = "0 0 15px rgba(163, 230, 53, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(163, 230, 53, 0.3)";
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(0,0,0,0.5)";
        }}
      >
        [ SKIP ESC ]
      </button>

      {/* ── AMBIENT CENTRAL HALO (Provides physically rendered backlight) ── */}
      <div
        style={{
          position: "absolute",
          width: dimensions.globeSize * 1.6,
          height: dimensions.globeSize * 1.6,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163, 230, 53, 0.12) 0%, rgba(163, 230, 53, 0.03) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 4,
          opacity: globeOpacity,
          transform: `scale(${globeScale})`,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* ── PHASE 1 & 2: 3D COBE GLOBE CONTAINER ── */}
      <div
        style={{
          position: "absolute",
          width: dimensions.globeSize,
          height: dimensions.globeSize,
          opacity: globeOpacity,
          transform: `scale(${globeScale})`,
          transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
          pointerEvents: "none",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <canvas
          ref={globeCanvasRef}
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: "1/1",
            contain: "layout paint size",
            filter: "drop-shadow(0 0 25px rgba(163, 230, 53, 0.25))",
          }}
        />

        {/* ── ORBITAL RINGS & SATELLITE COMET BEADS (Panel 01 & 02) ── */}
        <svg
          style={{
            position: "absolute",
            width: "155%",
            height: "155%",
            top: "-27.5%",
            left: "-27.5%",
            pointerEvents: "none",
          }}
          viewBox="0 0 600 600"
        >
          {/* Ring 1: Inclined 28deg with live orbiting bead */}
          <g transform="translate(300, 300) rotate(-28)">
            <ellipse
              cx="0"
              cy="0"
              rx="235"
              ry="78"
              fill="none"
              stroke="rgba(163, 230, 53, 0.28)"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            />
            {/* Satellite Comet Bead */}
            <circle
              cx={Math.cos(elapsed * 2.4) * 235}
              cy={Math.sin(elapsed * 2.4) * 78}
              r="3.5"
              fill={LIME_BRIGHT}
              style={{ filter: "drop-shadow(0 0 8px #a3e635)" }}
            />
          </g>

          {/* Ring 2: Inclined 42deg */}
          <g transform="translate(300, 300) rotate(42)">
            <ellipse
              cx="0"
              cy="0"
              rx="255"
              ry="86"
              fill="none"
              stroke="rgba(163, 230, 53, 0.20)"
              strokeWidth="1.2"
            />
            <circle
              cx={Math.cos(-elapsed * 1.9 + 1.2) * 255}
              cy={Math.sin(-elapsed * 1.9 + 1.2) * 86}
              r="3"
              fill="#ffffff"
              style={{ filter: "drop-shadow(0 0 8px #ffffff)" }}
            />
          </g>

          {/* Ring 3: Steep Inclined 65deg */}
          <g transform="translate(300, 300) rotate(-65)">
            <ellipse
              cx="0"
              cy="0"
              rx="270"
              ry="65"
              fill="none"
              stroke="rgba(163, 230, 53, 0.16)"
              strokeWidth="1"
              strokeDasharray="6 8"
            />
            <circle
              cx={Math.cos(elapsed * 1.6 + 2.5) * 270}
              cy={Math.sin(elapsed * 1.6 + 2.5) * 65}
              r="2.8"
              fill={LIME}
              style={{ filter: "drop-shadow(0 0 6px #a3e635)" }}
            />
          </g>
        </svg>
      </div>

      {/* ── PHASE 2: HUD TECH BADGES & DYNAMIC LEADER LINES (Panel 02) ── */}
      {isPhase2Active && !isMobile && (
        <div
          style={{
            position: "absolute",
            width: dimensions.width,
            height: dimensions.height,
            pointerEvents: "none",
            zIndex: 25,
            opacity: globeOpacity,
          }}
        >
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {HUD_BADGES.map((badge) => {
              const cx = dimensions.width / 2;
              const cy = dimensions.height / 2;
              const bx = cx + badge.badgeOffset.x;
              const by = cy + badge.badgeOffset.y;
              const ex = cx + badge.elbowOffset.x;
              const ey = cy + badge.elbowOffset.y;
              const nx = cx + badge.nodeOffset.x;
              const ny = cy + badge.nodeOffset.y;

              const isItemVisible = elapsed >= badge.delay;
              const itemAlpha = isItemVisible
                ? Math.min(1, (elapsed - badge.delay) / 0.16)
                : 0;

              if (itemAlpha <= 0) return null;

              // Pulsing ripple scale
              const pulse = ((elapsed - badge.delay) * 5) % 1;

              return (
                <g key={`hud-line-${badge.id}`} opacity={itemAlpha}>
                  {/* Leader line path */}
                  <polyline
                    points={`${bx > cx ? bx - 14 : bx + 78},${by} ${ex},${ey} ${nx},${ny}`}
                    fill="none"
                    stroke={LIME}
                    strokeWidth="1.3"
                    strokeOpacity="0.65"
                    strokeDasharray="300"
                    strokeDashoffset={Math.max(0, (1 - itemAlpha) * 300)}
                  />
                  {/* Outer radar ping ring */}
                  <circle
                    cx={nx}
                    cy={ny}
                    r={6 + pulse * 12}
                    fill="none"
                    stroke={LIME}
                    strokeWidth="1"
                    strokeOpacity={0.6 * (1 - pulse)}
                  />
                  {/* Fixed anchor node ring */}
                  <circle
                    cx={nx}
                    cy={ny}
                    r="5.5"
                    fill="none"
                    stroke={LIME}
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />
                  {/* Glowing center dot */}
                  <circle
                    cx={nx}
                    cy={ny}
                    r="3.2"
                    fill={LIME_BRIGHT}
                    style={{ filter: "drop-shadow(0 0 6px #a3e635)" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* HTML Badges with razor-sharp editorial tech typography */}
          {HUD_BADGES.map((badge) => {
            const cx = dimensions.width / 2;
            const cy = dimensions.height / 2;
            const bx = cx + badge.badgeOffset.x;
            const by = cy + badge.badgeOffset.y;

            const isItemVisible = elapsed >= badge.delay;
            const itemAlpha = isItemVisible
              ? Math.min(1, (elapsed - badge.delay) / 0.16)
              : 0;

            if (itemAlpha <= 0) return null;

            return (
              <div
                key={`hud-badge-${badge.id}`}
                style={{
                  position: "absolute",
                  left: bx,
                  top: by,
                  transform: "translate(-50%, -50%)",
                  opacity: itemAlpha,
                  background: "rgba(6, 11, 4, 0.90)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: `1px solid rgba(163, 230, 53, 0.75)`,
                  borderRadius: "3px",
                  padding: "4px 11px",
                  boxShadow: `0 0 16px rgba(163, 230, 53, 0.22), inset 0 0 10px rgba(163, 230, 53, 0.08)`,
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Index tag */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: LIME,
                    letterSpacing: "1px",
                    opacity: 0.8,
                  }}
                >
                  [{badge.code}]
                </span>
                {/* Main Label */}
                <span
                  style={{
                    fontFamily: "'Space Grotesk', 'JetBrains Mono', monospace",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "1.8px",
                    textTransform: "uppercase",
                    textShadow: "0 0 10px rgba(163, 230, 53, 0.5)",
                  }}
                >
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── PHASE 3 & 4: PARTICLE EXPLOSION & CONSTELLATION CANVAS (Panel 03 & 04) ── */}
      <canvas
        ref={particleCanvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />

      {/* ── PHASE 3 & 4: HERO TYPOGRAPHY & LOADING TELEMETRY (Panel 03 & 04) ── */}
      {isTypographyVisible && (
        <div
          style={{
            position: "absolute",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
            opacity: typoProgress,
            transform: `scale(${0.95 + 0.05 * typoProgress})`,
            transition: "opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Main Name: DEVANSH (Pure White) RAWAT (Vibrant Neon Lime) */}
          <div
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: isMobile ? "clamp(2.0rem, 8.5vw, 2.9rem)" : "clamp(3.0rem, 5.5vw, 4.6rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: isMobile ? "8px" : "15px",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "12px" : "20px",
            }}
          >
            <span style={{ color: "#ffffff", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
              DEVANSH
            </span>
            <span
              style={{
                color: LIME,
                textShadow: `0 0 25px rgba(163, 230, 53, 0.55), 0 0 50px rgba(163, 230, 53, 0.25)`,
              }}
            >
              RAWAT
            </span>
          </div>

          {/* Subtitle: SDE • AI • BUILDING (Phase 4) */}
          <div
            style={{
              marginTop: isMobile ? "14px" : "18px",
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? "10px" : "12.5px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: isMobile ? "4px" : "6px",
              textTransform: "uppercase",
              opacity: elapsed >= PHASE_TIMINGS.P4_START ? 1 : 0,
              transform: elapsed >= PHASE_TIMINGS.P4_START ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            SDE &nbsp;•&nbsp; AI &nbsp;•&nbsp; BUILDING
          </div>

          {/* Telemetry Status & Progress Bar (Panel 04) */}
          <div
            style={{
              marginTop: isMobile ? "26px" : "34px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              opacity: elapsed >= PHASE_TIMINGS.P4_START ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          >
            {/* Status & Counter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: isMobile ? "170px" : "230px",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9.5px",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.5)",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                }}
              >
                INITIALIZING...
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  color: LIME,
                  letterSpacing: "1px",
                  fontVariantNumeric: "tabular-nums",
                  textShadow: `0 0 8px ${LIME}`,
                }}
              >
                {progressPercent.toString().padStart(2, "0")}%
              </span>
            </div>

            {/* Glowing progress line */}
            <div
              style={{
                width: isMobile ? "170px" : "230px",
                height: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                position: "relative",
                borderRadius: "2px",
                overflow: "visible",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${progressPercent}%`,
                  background: `linear-gradient(90deg, ${LIME_DARK}, ${LIME}, #ffffff)`,
                  boxShadow: `0 0 12px ${LIME}`,
                  borderRadius: "2px",
                  transition: "width 0.06s linear",
                }}
              />
              {/* Luminous progress head bead */}
              <div
                style={{
                  position: "absolute",
                  top: "-2px",
                  left: `${Math.max(0, progressPercent - 1)}%`,
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  boxShadow: `0 0 8px #ffffff, 0 0 14px ${LIME}`,
                  transition: "left 0.06s linear",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── CINEMATIC VIGNETTE (Rich Dark Editorial Depth) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </motion.div>
  );
};

export default Preloader;
