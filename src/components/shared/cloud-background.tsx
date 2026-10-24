"use client";
import { useEffect, useRef } from "react";

export function CloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let raf = 0;
    let visible = false;
    let disposed = false;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      console.warn("[CloudBackground] WebGL unavailable — using CSS sky.");
      return;
    }

    const vertex = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fragment = `
      precision mediump float;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;

      float hash(float n) { return fract(sin(n) * 43758.5453); }

      float noise(vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        float n = p.x + p.y * 57.0 + 113.0 * p.z;
        return mix(
          mix(mix(hash(n), hash(n + 1.0), f.x),
              mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
          mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
              mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y),
          f.z
        );
      }

      vec4 cloudMap(vec3 p) {
        float d = p.x + 0.6;
        vec3 q = p * 1.3 - vec3(0.0, 0.0, uTime * 0.2);
        float f = 0.5000 * noise(q);
        q *= 2.02;
        f += 0.2500 * noise(q);
        q *= 2.03;
        f += 0.1250 * noise(q);
        d += 2.2 * f;
        d = clamp(d, 0.0, 1.0);
        // Softer, more transparent clouds
        vec3 col = mix(vec3(0.75, 0.82, 0.90), vec3(1.0, 0.99, 0.98), d);
        return vec4(col, d * 0.4); // Reduced opacity for wispy look
      }

      vec4 march(vec3 ro, vec3 rd) {
        vec4 sum = vec4(0.0);
        float t = 0.0;
        vec3 sun = normalize(vec3(-0.6, 0.4, -0.5));
        for (int i = 0; i < 48; i++) { // Fewer steps for performance
          if (sum.a > 0.95) break;
          vec3 pos = ro + t * rd;
          vec4 c = cloudMap(pos);
          float light = clamp(c.a - cloudMap(pos + sun * 0.3).a, 0.0, 1.0);
          c.rgb *= vec3(0.80, 0.85, 0.92) + light * vec3(0.35, 0.32, 0.28);
          c.rgb *= c.a;
          sum += c * (1.0 - sum.a);
          t += max(0.15, 0.04 * t);
        }
        sum.rgb /= (0.001 + sum.a);
        return clamp(sum, 0.0, 1.0);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= uResolution.x / uResolution.y;

        vec3 ro = vec3(uMouse.x * 0.8, uMouse.y * 0.4, 3.0);
        vec3 ta = vec3(uMouse.x * 0.25, uMouse.y * 0.15, 0.0);
        vec3 ww = normalize(ta - ro);
        vec3 uu = normalize(cross(vec3(0.0, 1.0, 0.0), ww));
        vec3 vv = cross(ww, uu);
        vec3 rd = normalize(p.x * uu + p.y * vv + 1.5 * ww);

        // More vibrant blue sky
        vec3 sky = mix(vec3(0.55, 0.75, 0.90), vec3(0.78, 0.90, 0.96), uv.y);
        vec4 cloud = march(ro, rd);
        vec3 color = mix(sky, cloud.rgb, cloud.a);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("[CloudBackground] Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vertex);
    const fs = compile(gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[CloudBackground] Link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    let mouse = { x: 0, y: 0 };
    const start = performance.now();

    const draw = () => {
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      if (disposed || !visible || document.hidden) { raf = 0; return; }
      draw();
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!raf && visible && !document.hidden && !disposed) {
        raf = requestAnimationFrame(loop);
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const maxPixels = 900000;
      if (rect.width * rect.height * dpr * dpr > maxPixels) {
        dpr = Math.sqrt(maxPixels / (rect.width * rect.height));
      }
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) { resize(); startLoop(); }
        else if (raf) { cancelAnimationFrame(raf); raf = 0; }
      },
      { rootMargin: "80px" }
    );
    observer.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onVisibility = () => {
      if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
      else startLoop();
    };

    container.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[#7fb3d5]"
    >
      {/* Much subtler CSS fallback */}
      <div className="absolute inset-0 cloud-fallback" />
      <canvas ref={canvasRef} className="relative block h-full w-full" />
      <style jsx>{`
        .cloud-fallback {
          background:
            radial-gradient(ellipse 80% 50% at 30% 40%, rgba(255,255,255,0.3), transparent 70%),
            radial-gradient(ellipse 70% 45% at 70% 65%, rgba(255,255,255,0.25), transparent 70%),
            linear-gradient(180deg, #6ba3c7 0%, #a8cce0 100%);
          background-size: 160% 160%;
          animation: skyDrift 30s ease-in-out infinite alternate;
        }
        @keyframes skyDrift {
          from { background-position: 0% 20%; }
          to { background-position: 100% 80%; }
        }
      `}</style>
    </div>
  );
}