import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// ════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ════════════════════════════════════════════════════════════════════════════
const LIME_HEX = 0xa3e635;
const WHITE_HEX = 0xffffff;
const CYAN_HEX = 0x67e8f9;
const BG_COLOR = "#050505";

// ════════════════════════════════════════════════════════════════════════════
// PARTICLE VERTEX SHADER — Horizontal Data Streams → Name → Warp
// ════════════════════════════════════════════════════════════════════════════
const particleVertexShader = `
  uniform float uTime;
  uniform float uReveal;
  uniform float uAssemble;
  uniform float uExit;
  uniform float uPixelRatio;
  uniform vec2 uMouse3D;

  attribute vec3 aStartPos;
  attribute vec3 aTextPos;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSeed;
  attribute float aDelay;
  attribute float aAlphaScale;
  attribute float aIsAmbient;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSeed;

  // smootherstep — zero velocity at both ends, no double-easing jank
  float smootherstep(float x) {
    x = clamp(x, 0.0, 1.0);
    return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
  }

  void main() {
    vColor = aColor;
    vSeed = aSeed;

    // ── Target typography / drifting dust ──
    vec3 target = aTextPos;
    float driftAmt = mix(0.10, 1.0, aIsAmbient);
    target.x += sin(uTime * 0.8 + aSeed * 30.0) * 0.45 * driftAmt;
    target.y += cos(uTime * 0.9 + aSeed * 40.0) * 0.38 * driftAmt;
    target.z += sin(uTime * 0.7 + aSeed * 50.0) * 0.45 * driftAmt;

    // ── Staggered local progress (single smooth easing, no nesting) ──
    float tt = clamp(uAssemble * 1.5 - aDelay * 0.5, 0.0, 1.0);
    float t = smootherstep(tt);

    // ── Primarily horizontal travel, then coherent vertical convergence ──
    float lateral = smootherstep(clamp((t - 0.28) / 0.72, 0.0, 1.0));
    vec3 pos;
    pos.x = mix(aStartPos.x, target.x, t);
    pos.y = mix(aStartPos.y, target.y, lateral);
    pos.z = mix(aStartPos.z, target.z, lateral);

    // Gentle lens bow — top rows arc up, bottom rows arc down
    pos.y += sin(t * 3.14159265) * sign(target.y + 0.0001) * 0.22;

    // ── Interactive mouse repulsion, softly ramped in ──
    float act = smootherstep(clamp((uAssemble - 0.82) / 0.18, 0.0, 1.0));
    if (act > 0.001) {
      vec2 diff = pos.xy - uMouse3D;
      float dist = length(diff);
      float R = 3.4;
      if (dist < R && dist > 0.001) {
        float f = 1.0 - dist / R;
        f = f * f;
        pos.xy += (diff / dist) * f * 2.0 * act;
        pos.z += f * 1.4 * act;
      }
    }

    // ── Cinematic forward warp ──
    if (uExit > 0.0) {
      float e = uExit * uExit;
      pos.z += e * (32.0 + aSeed * 45.0);
      pos.x += (pos.x + sin(aSeed * 14.0) * 4.5) * e * 2.0;
      pos.y += (pos.y + cos(aSeed * 16.0) * 4.5) * e * 2.0;
    }

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float twinkle = 0.94 + 0.16 * sin(uTime * 4.0 + aSeed * 60.0);
    float fly = sin(t * 3.14159265); // peaks mid-flight
    float size = aSize * uPixelRatio * twinkle * (1.0 + fly * 0.55);
    gl_PointSize = clamp(size * (75.0 / -mv.z), 1.2, 30.0);

    // Fade each particle in as it departs the edge
    float appear = smootherstep(clamp(t / 0.14, 0.0, 1.0));
    float baseA = uReveal * aAlphaScale * appear;
    if (uExit > 0.0) {
      baseA *= (1.0 - smoothstep(0.1, 1.0, uExit));
    }
    vAlpha = baseA;
  }
`;

const particleFragmentShader = `
  uniform sampler2D uTexture;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec4 tex = texture2D(uTexture, gl_PointCoord);
    if (tex.a < 0.01) discard;

    vec3 col = vColor * tex.rgb * 1.2;
    float core = pow(tex.a, 2.8) * 0.45;
    col += vec3(core);

    gl_FragColor = vec4(col, tex.a * vAlpha);
  }
`;

// ════════════════════════════════════════════════════════════════════════════
// PRELOADER — Horizontal Data Streams → Name Reveal
// ════════════════════════════════════════════════════════════════════════════
const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const underlineRef = useRef(null);
  const doneRef = useRef(false);

  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const finish = useCallback(() => {
    if (!doneRef.current) {
      doneRef.current = true;
      onComplete?.();
    }
  }, [onComplete]);

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(finish, 300);
      return () => clearTimeout(t);
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.6);

    // ── Mouse & unprojected 3D cursor ──
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mouse3DPos = new THREE.Vector2(999, 999);

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / width - 0.5) * 2;
      mouse.targetY = (e.clientY / height - 0.5) * 2;

      const ndcX = (e.clientX / width) * 2 - 1;
      const ndcY = -(e.clientY / height) * 2 + 1;
      const rayVector = new THREE.Vector3(ndcX, ndcY, 0.5);
      rayVector.unproject(camera);
      const dir = rayVector.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const worldPos = camera.position.clone().add(dir.multiplyScalar(dist));
      mouse3DPos.set(worldPos.x, worldPos.y);
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG_COLOR);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = isMobile ? 24 : 20;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ── Bloom ──
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.62, // strength
      0.5,  // radius
      0.33  // threshold
    );
    composer.addPass(bloomPass);

    // ── Soft starlight sprite ──
    const createStarlightTexture = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0.0, "rgba(255,255,255,1.0)");
      g.addColorStop(0.2, "rgba(255,255,255,0.9)");
      g.addColorStop(0.45, "rgba(255,255,255,0.4)");
      g.addColorStop(0.72, "rgba(255,255,255,0.1)");
      g.addColorStop(1.0, "rgba(0,0,0,0.0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      const t = new THREE.CanvasTexture(c);
      t.needsUpdate = true;
      return t;
    };
    const starlightTexture = createStarlightTexture();

    // ════════════════════════════════════════════════════════════════════════
    // 1. TYPOGRAPHY SAMPLING ("DEVANSH RAWAT")
    // ════════════════════════════════════════════════════════════════════════
    const textStep = isMobile ? 4 : 3;

    const sampleTextParticles = () => {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d", { willReadFrequently: true });
      const cw = (c.width = 2200);
      const ch = (c.height = 550);

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);

      const fontSize = isMobile ? 115 : 148;
      ctx.font = `900 ${fontSize}px "Space Grotesk", "Inter", -apple-system, sans-serif`;
      ctx.textBaseline = "middle";

      const part1 = "DEVANSH";
      const part2 = " RAWAT";
      const w1 = ctx.measureText(part1).width;
      const w2 = ctx.measureText(part2).width;
      const totalW = w1 + w2;
      const startX = (cw - totalW) / 2;
      const centerY = ch / 2;

      ctx.textAlign = "left";
      ctx.lineWidth = 4;

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#ffffff";
      ctx.fillText(part1, startX, centerY);
      ctx.strokeText(part1, startX, centerY);

      ctx.fillStyle = "#a3e635";
      ctx.strokeStyle = "#a3e635";
      ctx.fillText(part2, startX + w1, centerY);
      ctx.strokeText(part2, startX + w1, centerY);

      const imgData = ctx.getImageData(0, 0, cw, ch).data;
      const textPoints = [];
      const scale = isMobile ? 0.0115 : 0.0125;

      for (let y = 0; y < ch; y += textStep) {
        for (let x = 0; x < cw; x += textStep) {
          const idx = (y * cw + x) * 4;
          const alpha = imgData[idx + 3];
          const red = imgData[idx];
          const green = imgData[idx + 1];
          if (alpha > 65 && (red > 20 || green > 20)) {
            const isLime = green > red + 15;
            textPoints.push({
              x: (x - cw / 2) * scale,
              y: -(y - ch / 2) * scale + 0.15,
              z: (Math.random() - 0.5) * 0.28,
              isLime,
            });
          }
        }
      }
      return textPoints;
    };

    const sampledPoints = sampleTextParticles();
    const textBase = sampledPoints.length;

    // ── Stream trail copies per glyph particle ──
    const STREAK = isMobile ? 2 : 3;
    const ambientCount = isMobile ? 450 : 800;
    const TOTAL = textBase * STREAK + ambientCount;

    const startPos = new Float32Array(TOTAL * 3);
    const textPos = new Float32Array(TOTAL * 3);
    const colors = new Float32Array(TOTAL * 3);
    const sizes = new Float32Array(TOTAL);
    const seeds = new Float32Array(TOTAL);
    const delays = new Float32Array(TOTAL);
    const alphaScales = new Float32Array(TOTAL);
    const isAmbients = new Float32Array(TOTAL);

    const limeColor = new THREE.Color(LIME_HEX);
    const whiteColor = new THREE.Color(WHITE_HEX);
    const cyanColor = new THREE.Color(CYAN_HEX);

    const EDGE_MIN = isMobile ? 12 : 13;
    const EDGE_MAX = isMobile ? 19 : 23;

    let cursor = 0;

    const pushParticle = (tx, ty, tz, col, size, delay, alphaScale, isAmb, trail) => {
      const k = cursor++;
      const i3 = k * 3;

      // Horizontal entry: left half leaves from the left edge, right half from the right
      let side = tx >= 0 ? 1 : -1;
      if (Math.abs(tx) < 0.6) side = Math.random() > 0.5 ? 1 : -1;

      const sx = side * THREE.MathUtils.randFloat(EDGE_MIN, EDGE_MAX) + side * trail;
      const sy = ty + THREE.MathUtils.randFloatSpread(isMobile ? 0.9 : 1.2);
      const sz = tz + THREE.MathUtils.randFloatSpread(2.2);

      startPos[i3] = sx;
      startPos[i3 + 1] = sy;
      startPos[i3 + 2] = sz;

      textPos[i3] = tx;
      textPos[i3 + 1] = ty;
      textPos[i3 + 2] = tz;

      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[k] = size;
      seeds[k] = Math.random();
      delays[k] = delay;
      alphaScales[k] = alphaScale;
      isAmbients[k] = isAmb;
    };

    // Glyph particles + trailing streak copies (tail behind, outward from center)
    for (let i = 0; i < textBase; i++) {
      const pt = sampledPoints[i];
      const baseDelay = THREE.MathUtils.clamp((pt.x + 10) / 20, 0, 1);

      for (let k = 0; k < STREAK; k++) {
        const jitter = k === 0 ? 0 : 0.05;
        const tx = pt.x + THREE.MathUtils.randFloatSpread(jitter);
        const ty = pt.y + THREE.MathUtils.randFloatSpread(jitter);
        const tz = pt.z + THREE.MathUtils.randFloatSpread(jitter);

        let col = pt.isLime ? limeColor : whiteColor;
        if (Math.random() > 0.94) col = cyanColor;

        const size = THREE.MathUtils.randFloat(0.34, 0.5) * (1 - k * 0.18);
        const alphaScale = k === 0 ? 1.0 : Math.max(0.14, 0.55 - k * 0.18);

        pushParticle(
          tx, ty, tz,
          col,
          size,
          baseDelay + k * 0.06,
          alphaScale,
          0,
          k * 0.85
        );
      }
    }

    // Ambient dust riding the same horizontal streams
    for (let a = 0; a < ambientCount; a++) {
      const tx = (Math.random() - 0.5) * (isMobile ? 15 : 21);
      const ty = (Math.random() - 0.5) * (isMobile ? 8 : 10) + 0.15;
      const tz = (Math.random() - 0.5) * 5.0;

      const rnd = Math.random();
      const col = rnd < 0.5 ? limeColor : rnd < 0.85 ? whiteColor : cyanColor;
      const size = THREE.MathUtils.randFloat(0.14, 0.28);

      pushParticle(tx, ty, tz, col, size, Math.random(), 0.55, 1, 0);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(startPos, 3));
    particleGeo.setAttribute("aStartPos", new THREE.BufferAttribute(startPos, 3));
    particleGeo.setAttribute("aTextPos", new THREE.BufferAttribute(textPos, 3));
    particleGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    particleGeo.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1));
    particleGeo.setAttribute("aAlphaScale", new THREE.BufferAttribute(alphaScales, 1));
    particleGeo.setAttribute("aIsAmbient", new THREE.BufferAttribute(isAmbients, 1));

    const particleUniforms = {
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uAssemble: { value: 0 },
      uExit: { value: 0 },
      uMouse3D: { value: mouse3DPos },
      uPixelRatio: { value: DPR },
      uTexture: { value: starlightTexture },
    };

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: particleUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ════════════════════════════════════════════════════════════════════════
    // 2. GSAP MASTER TIMELINE — linear drive, shader handles per-particle easing
    // ════════════════════════════════════════════════════════════════════════
    const animState = { reveal: 0, assemble: 0, exit: 0 };

    gsap.set([underlineRef.current], {
      opacity: 0,
      y: 8,
    });
    gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "center center" });

    const tl = gsap.timeline({ onComplete: finish });

    tl.to(animState, {
      reveal: 1.0,
      duration: 0.35,
      ease: "power1.out",
    }, 0);

    tl.to(animState, {
      assemble: 1.0,
      duration: 1.6,
      ease: "none",
    }, 0.12);

    // Hold — twinkle + interactive mouse repulsion (1.72s → 2.45s)

    // Premium accent: hairline fades in with the name
    tl.to(underlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    }, 1.35);

    tl.to(underlineRef.current, {
      scaleX: 1,
      duration: 1.1,
      ease: "power3.inOut",
    }, 1.35);

    tl.to(animState, {
      exit: 1.0,
      duration: 0.45,
      ease: "power2.in",
    }, 2.45);

    tl.to(
      underlineRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      2.45
    );

    tl.to(container, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut",
    }, 2.52);

    // ════════════════════════════════════════════════════════════════════════
    // 3. RENDER LOOP
    // ════════════════════════════════════════════════════════════════════════
    let animationFrameId;
    const clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const elapsedTime = clock.getElapsedTime();

      // Gentle, heavily-damped camera parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;
      camera.position.x = mouse.x * 0.55 + Math.sin(elapsedTime * 0.22) * 0.18;
      camera.position.y = -mouse.y * 0.55 + Math.cos(elapsedTime * 0.26) * 0.13;
      camera.lookAt(0, 0, 0);

      particleUniforms.uTime.value = elapsedTime;
      particleUniforms.uReveal.value = animState.reveal;
      particleUniforms.uAssemble.value = animState.assemble;
      particleUniforms.uExit.value = animState.exit;
      particleUniforms.uMouse3D.value = mouse3DPos;

      composer.render();
    };

    render();

    // ── Resize ──
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      particleUniforms.uPixelRatio.value = DPR;
    };
    window.addEventListener("resize", handleResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      tl.kill();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.style.overflow = prevOverflow;

      particleGeo.dispose();
      particleMat.dispose();
      starlightTexture.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, [finish, reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        backgroundColor: BG_COLOR,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "auto",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* Cinematic vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        }}
      />

      {/* Hairline accent under the name */}
      <div
        ref={underlineRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(46vw, 460px)",
          height: 1,
          marginTop: "clamp(52px, 12vh, 96px)",
          transform: "translate(-50%, -50%) scaleX(0)",
          background:
            "linear-gradient(90deg, transparent, rgba(163,230,53,0.85), transparent)",
          boxShadow: "0 0 12px rgba(163,230,53,0.45)",
          pointerEvents: "none",
        }}
      />

      {/* Corner frames */}
      {[
        { top: 26, left: 26 },
        { top: 26, right: 26 },
        { bottom: 26, left: 26 },
        { bottom: 26, right: 26 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 28,
            height: 28,
            opacity: 0.25,
            pointerEvents: "none",
            borderTop: pos.top !== undefined ? "1px solid rgba(163,230,53,0.5)" : "none",
            borderBottom: pos.bottom !== undefined ? "1px solid rgba(163,230,53,0.5)" : "none",
            borderLeft: pos.left !== undefined ? "1px solid rgba(163,230,53,0.5)" : "none",
            borderRight: pos.right !== undefined ? "1px solid rgba(163,230,53,0.5)" : "none",
          }}
        />
      ))}
    </div>
  );
};

export default Preloader;
