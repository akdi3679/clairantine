"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as OGL from "ogl";

const iconFiles = [
  "icon-1.png", "icon-2.png", "icon-3.png", "icon-4.png",
  "icon-5.png", "icon-6.png", "icon-7.png", "icon-8.png",
];

function BackgroundScrollIcons({ isHovered }: { isHovered: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0.15);
  
  useEffect(() => {
    const targetOpacity = isHovered ? 0.3 : 0.15;
    const duration = 700;
    const startTime = Date.now();
    const startOpacity = 0.15;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      setOpacity(startOpacity + (targetOpacity - startOpacity) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isHovered]);
  
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    
    let animationId: number;
    let position = 0;
    const baseSpeed = 0.3;
    
    const animate = () => {
      position -= baseSpeed * (isHovered ? 1.5 : 1);
      const scrollWidth = scrollElement.scrollWidth / 2;
      if (Math.abs(position) >= scrollWidth) position = 0;
      scrollElement.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);
  
  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center"
      style={{ opacity }}
    >
      <div ref={scrollRef} className="flex gap-16 whitespace-nowrap">
        {[...iconFiles, ...iconFiles, ...iconFiles, ...iconFiles].map((file, i) => (
          <div key={i} className="flex-shrink-0 w-40 h-40 md:w-56 md:h-56 relative">
            <img 
              src={`/icons/${file}`} 
              alt="" 
              className="object-contain w-full h-full" 
               
            />
            
          </div>
        ))}
      </div>
    </div>
  );
}

function InteractiveFooterLogo({ onHoverChange }: { onHoverChange: (hovered: boolean) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef(false);
  const hoverProgressRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    const renderer = new OGL.Renderer({ 
      dpr: Math.min(window.devicePixelRatio, 2), 
      canvas,
      alpha: true
    });
    const gl = renderer.gl;

    const vertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragment = `
      precision highp float;
      precision highp int;
      uniform sampler2D tWater;
      uniform sampler2D tFlow;
      uniform float uTime;
      uniform float uHover;
      varying vec2 vUv;
      uniform vec4 res;

      void main() {
        vec3 flow = texture2D(tFlow, vUv).rgb;
        vec2 uv = .5 * gl_FragCoord.xy / res.xy;
        
        vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5);
        myUV -= flow.xy * (0.15 * 1.2);

        vec2 myUV2 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
        myUV2 -= flow.xy * (0.125 * 1.2);

        vec2 myUV3 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
        myUV3 -= flow.xy * (0.10 * 1.4);

        vec3 tex = texture2D(tWater, myUV).rgb;
        vec3 tex2 = texture2D(tWater, myUV2).rgb;
        vec3 tex3 = texture2D(tWater, myUV3).rgb;

        vec3 waterColor = vec3(tex.r, tex2.g, tex3.b);
        vec3 blackColor = vec3(0.05, 0.05, 0.08);
        vec3 finalColor = mix(blackColor, waterColor, uHover);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const _size = [2048, 1638];
    let aspect = 1;
    const mouse = new OGL.Vec2(-1);
    const velocity = new OGL.Vec2();
    let lastTime: number | undefined;
    const lastMouse = new OGL.Vec2();

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      
      renderer.setSize(width, height);
      
      let a1: number, a2: number;
      const imageAspect = _size[1] / _size[0];
      if (height / width < imageAspect) {
        a1 = 1;
        a2 = (height / width) / imageAspect;
      } else {
        a1 = (width / height) * imageAspect;
        a2 = 1;
      }
      
      if (mesh) {
        mesh.program.uniforms.res.value = new OGL.Vec4(width, height, a1, a2);
      }
      
      aspect = width / height;
      // @ts-ignore
      if (flowmap) flowmap.aspect = aspect;
    };

    // @ts-ignore
    const flowmap = new OGL.Flowmap(gl, {
      falloff: 0.3,
      dissipation: 0.92,
      alpha: 0.5
    });

    const geometry = new OGL.Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
    });

    const texture = new OGL.Texture(gl, {
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR
    });

    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = "https://robindelaporte.fr/codepen/bg3.jpg";
    img.onload = () => {
      texture.image = img;
    };

    let a1 = 1, a2 = 1;
    const imageAspect = _size[1] / _size[0];
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 200;
    if (height / width < imageAspect) {
      a1 = 1;
      a2 = (height / width) / imageAspect;
    } else {
      a1 = (width / height) * imageAspect;
      a2 = 1;
    }

    const program = new OGL.Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        tWater: { value: texture },
        res: { value: new OGL.Vec4(width, height, a1, a2) },
        img: { value: new OGL.Vec2(_size[1], _size[0]) },
        // @ts-ignore
        tFlow: flowmap.uniform
      }
    });

    const mesh = new OGL.Mesh(gl, { geometry, program });

    window.addEventListener("resize", resize);
    resize();

    const updateMouse = (e: MouseEvent | TouchEvent) => {
      let x = 0, y = 0;
      if ('touches' in e && e.changedTouches.length) {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
      } else {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }
      
      const rect = container.getBoundingClientRect();
      mouse.set((x - rect.left) / rect.width, 1.0 - (y - rect.top) / rect.height);
      
      if (!lastTime) {
        lastTime = performance.now();
        lastMouse.set(x, y);
      }
      
      const deltaX = x - lastMouse.x;
      const deltaY = y - lastMouse.y;
      lastMouse.set(x, y);
      
      const time = performance.now();
      const delta = Math.max(10.4, time - lastTime);
      lastTime = time;
      
      velocity.x = deltaX / delta;
      velocity.y = deltaY / delta;
      // @ts-ignore
      velocity.needsUpdate = true;
    };

    container.addEventListener("mousemove", updateMouse);
    container.addEventListener("touchstart", updateMouse, { passive: false });
    container.addEventListener("touchmove", updateMouse, { passive: false });

    let animationFrameId: number;
    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      
      const targetHover = isHoveredRef.current ? 1 : 0;
      hoverProgressRef.current += (targetHover - hoverProgressRef.current) * 0.08;
      program.uniforms.uHover.value = hoverProgressRef.current;
      
      // @ts-ignore
      if (!velocity.needsUpdate) {
        mouse.set(-1);
        velocity.set(0);
      }
      // @ts-ignore
      velocity.needsUpdate = false;
      
      // @ts-ignore
      flowmap.aspect = aspect;
      // @ts-ignore
      flowmap.mouse.copy(mouse);
      // @ts-ignore
      flowmap.velocity.lerp(velocity, velocity.len() ? 0.15 : 0.1);
      // @ts-ignore
      flowmap.update();
      
      program.uniforms.uTime.value = t * 0.01;
      renderer.render({ scene: mesh });
    };
    
    animationFrameId = requestAnimationFrame(update);

    const textMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200' width='100%25' height='100%25'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Playfair Display, serif' font-weight='700' font-size='130' fill='white'%3ECLAIRANTINE%3C/text%3E%3C/svg%3E")`;
    
    canvas.style.maskImage = textMask;
    canvas.style.webkitMaskImage = textMask;
    canvas.style.maskSize = "100% 100%";
    canvas.style.webkitMaskSize = "100% 100%";
    canvas.style.maskRepeat = "no-repeat";
    canvas.style.webkitMaskRepeat = "no-repeat";
    canvas.style.maskPosition = "center";
    canvas.style.webkitMaskPosition = "center";

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", updateMouse);
      container.removeEventListener("touchstart", updateMouse);
      container.removeEventListener("touchmove", updateMouse);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    onHoverChange(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-32 md:h-40 overflow-hidden cursor-pointer mb-6"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}

export function Footer() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  return (
    <footer className="relative isolate overflow-hidden bg-[#D8D2C6] border-t border-slate-900/10">
      <BackgroundScrollIcons isHovered={isLogoHovered} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <InteractiveFooterLogo onHoverChange={setIsLogoHovered} />
            
            <p className="mt-4 max-w-sm text-slate-800">
              Un lieu pour découvrir, rencontrer et faire émerger des idées.
            </p>
            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-900 mb-2">Les places partent vite.</p>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full sm:flex-1 min-w-0 rounded-full border border-slate-900/20 bg-white/60 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-600 focus:border-accent outline-none"
                />
                <button type="submit" className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90 transition-colors">
                  S'abonner
                </button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900/60">Univers</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/evenements" className="text-slate-800 hover:text-accent transition-colors">Événements</Link></li>
              <li><Link href="/magazine" className="text-slate-800 hover:text-accent transition-colors">Le Magazine</Link></li>
              <li><Link href="/boutique" className="text-slate-800 hover:text-accent transition-colors">La Boutique</Link></li>
              <li><Link href="/a-propos" className="text-slate-800 hover:text-accent transition-colors">À propos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900/60">Rejoindre</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/accueillir" className="text-slate-800 hover:text-accent transition-colors">Accueillir une soirée</Link></li>
              <li><Link href="/devenir-intervenant" className="text-slate-800 hover:text-accent transition-colors">Devenir intervenant</Link></li>
              <li><Link href="/devenir-partenaire" className="text-slate-800 hover:text-accent transition-colors">Devenir partenaire</Link></li>
              <li><Link href="/liste-attente" className="text-slate-800 hover:text-accent transition-colors">Liste d'attente</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900/10 text-center text-sm text-slate-700">
          © {new Date().getFullYear()} Clairantine. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}