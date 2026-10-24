"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ==========================================================
// 1. CLOUD SHADER BACKGROUND
// ==========================================================
function CloudShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    
    const vsSource = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
    const fsSource = `
      precision mediump float;
      uniform vec2 iResolution; uniform float iGlobalTime; uniform vec2 iMouse;
      float hash(float n) { return fract(sin(n)*43758.5453); }
      float noise(in vec3 x) {
        vec3 p = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
        float n = p.x + p.y*57.0 + 113.0*p.z;
        return mix(mix(mix(hash(n+0.0), hash(n+1.0),f.x), mix(hash(n+57.0), hash(n+58.0),f.x),f.y),
                   mix(mix(hash(n+113.0), hash(n+114.0),f.x), mix(hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
      }
      vec4 map(in vec3 p) {
        float d = p.x + 0.5; vec3 q = p - vec3(1.0, 0.0, 0.0) * iGlobalTime * 0.5; float f;
        f = 0.5000*noise(q); q = q*2.02; f += 0.2500*noise(q); q = q*2.03;
        f += 0.1250*noise(q); q = q*2.01; f += 0.0625*noise(q);
        d += 2.0 * f; d = clamp(d, 0.0, 1.0);
        vec4 res = vec4(d); res.xyz = mix(1.15*vec3(1.0,0.95,0.8), vec3(0.7,0.7,0.7), res.x);
        return res;
      }
      vec4 raymarch(in vec3 ro, in vec3 rd) {
        vec4 sum = vec4(0,0,0,0); float t = 0.0; vec3 sundir = vec3(-1.0,0.0,0.0);
        for(int i=0; i<64; i++) {
          if(sum.a > 0.99) continue;
          vec3 pos = ro + t*rd; vec4 col = map(pos);
          float dif = clamp((col.w - map(pos+0.3*sundir).w)/0.6, 0.0, 1.0);
          vec3 lin = vec3(0.65,0.68,0.7)*1.35 + 0.45*vec3(0.7,0.5,0.3)*dif;
          col.xyz *= lin; col.a *= 0.35; col.rgb *= col.a;
          sum = sum + col*(1.0 - sum.a); t += max(0.1, 0.025*t);
        }
        sum.xyz /= (0.001+sum.w); return clamp(sum, 0.0, 1.0);
      }
      void main(void) {
        vec2 q = gl_FragCoord.xy / iResolution.xy; vec2 p = -1.0 + 2.0*q;
        p.x *= iResolution.x / iResolution.y; vec2 mo = -1.0 + 2.0*iMouse.xy / iResolution.xy;
        vec3 ro = vec3(2.0*mo.x, 1.0*mo.y, 4.5); vec3 ta = vec3(0.0, 0.0, 0.0);
        vec3 ww = normalize(ta - ro); vec3 uu = normalize(cross(vec3(0.0,1.0,0.0), ww));
        vec3 vv = normalize(cross(ww,uu)); vec3 rd = normalize(p.x*uu + p.y*vv + 1.5*ww);
        vec4 res = raymarch(ro, rd); vec3 sundir = vec3(-1.0,0.0,0.0);
        float sun = clamp(dot(sundir,rd), 0.0, 1.0);
        vec3 col = vec3(0.6,0.71,0.75) - rd.y*0.2*vec3(1.0,0.5,1.0) + 0.15*0.5;
        col += 0.2*vec3(1.0,.6,0.1)*pow(sun, 8.0); col *= 0.95;
        col = mix(col, res.xyz, res.w); col += 0.1*vec3(1.0,0.4,0.2)*pow(sun, 3.0);
        gl_FragColor = vec4(col, 1.0);
      }
    `;
    
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    
    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;
    
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader); gl.attachShader(program, fragmentShader); gl.linkProgram(program);
    
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, "position");
    const resolutionLocation = gl.getUniformLocation(program, "iResolution");
    const timeLocation = gl.getUniformLocation(program, "iGlobalTime");
    const mouseLocation = gl.getUniformLocation(program, "iMouse");
    
    let animationFrameId: number;
    let startTime = Date.now();
    let mouseX = 0, mouseY = 0;
    
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; gl.viewport(0, 0, canvas.width, canvas.height); };
    window.addEventListener("resize", resize); resize();
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / canvas.width - 0.5;
      mouseY = (e.clientY - rect.top) / canvas.height - 0.5;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    
    const render = () => {
      gl.useProgram(program); gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => { 
      window.removeEventListener("resize", resize); 
      canvas.removeEventListener("mousemove", handleMouseMove); 
      cancelAnimationFrame(animationFrameId); 
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />;
}

// ==========================================================
// 2. MAIN FOOTER COMPONENT
// ==========================================================
export function Footer() {
  const [isRippleActive, setIsRippleActive] = useState(false);

  return (
    <footer className="relative bg-[#1a1a1a] text-white overflow-hidden mt-24">
      {/* Cloud Background (Lightened for dark mode contrast) */}
      <div className="absolute inset-0 z-0 opacity-20">
        <CloudShaderBackground />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
          
          {/* Interactive CLAIRANTINE Trigger */}
          <button 
            onClick={() => setIsRippleActive(true)}
            className="group relative mb-16 focus:outline-none"
          >
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white/10 group-hover:text-white transition-colors duration-500 cursor-pointer select-none">
              CLAIRANTINE
            </h2>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Cliquez pour l'effet
            </span>
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-sm font-medium text-white/60 mb-16 w-full max-w-4xl">
            <div className="flex flex-col gap-3 text-left md:text-center">
              <span className="font-bold text-white uppercase tracking-wider text-xs">Navigation</span>
              <Link href="/evenements" className="hover:text-accent transition-colors">Événements</Link>
              <Link href="/salons" className="hover:text-accent transition-colors">Salons</Link>
              <Link href="/media" className="hover:text-accent transition-colors">Média</Link>
            </div>
            <div className="flex flex-col gap-3 text-left md:text-center">
              <span className="font-bold text-white uppercase tracking-wider text-xs">Légal</span>
              <Link href="/confidentialite" className="hover:text-accent transition-colors">Confidentialité</Link>
              <Link href="/mentions" className="hover:text-accent transition-colors">Mentions légales</Link>
            </div>
            <div className="flex flex-col gap-3 text-left md:text-center">
              <span className="font-bold text-white uppercase tracking-wider text-xs">Contact</span>
              <a href="mailto:hello@clairantine.fr" className="hover:text-accent transition-colors">hello@clairantine.fr</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
            </div>
            <div className="flex flex-col gap-3 text-left md:text-center">
              <span className="font-bold text-white uppercase tracking-wider text-xs">Communauté</span>
              <Link href="/contact" className="hover:text-accent transition-colors">Nous rejoindre</Link>
              <Link href="/produits" className="hover:text-accent transition-colors">Boutique</Link>
            </div>
          </div>

          <p className="text-xs text-white/40 font-medium tracking-wide">
            © {new Date().getFullYear()} CLAIRANTINE. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Water Ripple Overlay (Simplified CSS Fallback if WebGL fails) */}
      {isRippleActive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black animate-in fade-in duration-500">
          <button 
            onClick={() => setIsRippleActive(false)} 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[102] text-sm font-bold uppercase tracking-widest"
          >
            Fermer ✕
          </button>
          
          {/* Animated CSS Gradient Background (Fallback/Alternative to WebGL) */}
          <div className="absolute inset-0 z-[100] bg-gradient-to-br from-accent via-foreground to-black animate-pulse" />
          
          {/* SVG Text Mask */}
          <div className="absolute inset-0 z-[101] flex items-center justify-center mix-blend-screen pointer-events-none">
            <svg viewBox="0 0 800 200" className="w-[90vw] max-w-5xl h-auto">
              <text 
                x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                className="font-sans font-black tracking-tighter"
                style={{ fontSize: '100px', fill: 'white' }}
              >
                CLAIRANTINE
              </text>
            </svg>
          </div>
        </div>
      )}
    </footer>
  );
}