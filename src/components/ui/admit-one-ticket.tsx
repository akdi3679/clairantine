"use client";

import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, forwardRef, useState, useMemo, useCallback, useSyncExternalStore, memo } from "react";

var vertexShaderSource = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 a_position;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;
out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;
vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y); }
  else if (u_fit == 2.) { box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y); }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}
void main() {
  gl_Position = a_position;
  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);
  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2((u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x, (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y);
  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;
  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;
  v_responsiveBoxGivenSize = vec2((u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x, (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y);
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;
  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;
  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2((u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x, (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y);
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;
  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;
  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) { v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x); }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  v_patternUV *= .01;
  vec2 imageBoxSize;
  if (u_fit == 1.) { imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio; }
  else if (u_fit == 2.) { imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio; }
  else { imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio); }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;
  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;
  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`;

var DEFAULT_MAX_PIXEL_COUNT = 1920 * 1080 * 4;
var ShaderMount = class {
  parentElement; canvasElement; gl; program = null; uniformLocations = {};
  fragmentShader; rafId = null; lastRenderTime = 0; currentFrame = 0; speed = 0; currentSpeed = 0;
  providedUniforms; mipmaps = []; hasBeenDisposed = false; resolutionChanged = true;
  textures = new Map(); minPixelRatio; maxPixelCount; isSafari = isSafari(); uniformCache = {}; textureUnitMap = new Map();
  constructor(parentElement, fragmentShader, uniforms, webGlContextAttributes, speed = 0, frame = 0, minPixelRatio = 2, maxPixelCount = DEFAULT_MAX_PIXEL_COUNT, mipmaps = []) {
    if (!(parentElement instanceof HTMLElement)) throw new Error("Paper Shaders: parent element must be an HTMLElement");
    if (!document.querySelector("style[data-paper-shader]")) {
      const styleElement = document.createElement("style");
      styleElement.innerHTML = defaultStyle;
      styleElement.setAttribute("data-paper-shader", "");
      document.head.prepend(styleElement);
    }
    const canvasElement = document.createElement("canvas");
    this.canvasElement = canvasElement;
    this.parentElement = parentElement;
    this.parentElement.prepend(canvasElement);
    this.fragmentShader = fragmentShader;
    this.providedUniforms = uniforms;
    this.mipmaps = mipmaps;
    this.currentFrame = frame;
    this.minPixelRatio = minPixelRatio;
    this.maxPixelCount = maxPixelCount;
    const gl = canvasElement.getContext("webgl2", webGlContextAttributes);
    if (!gl) throw new Error("Paper Shaders: WebGL is not supported in this browser");
    this.gl = gl;
    this.initProgram();
    this.setupPositionAttribute();
    this.setupUniforms();
    this.setUniformValues(this.providedUniforms);
    this.setupResizeObserver();
    visualViewport?.addEventListener("resize", this.handleVisualViewportChange);
    this.setSpeed(speed);
    this.parentElement.setAttribute("data-paper-shader", "");
    this.parentElement.paperShaderMount = this;
    document.addEventListener("visibilitychange", this.handleDocumentVisibilityChange);
  }
  initProgram = () => { const program = createProgram(this.gl, vertexShaderSource, this.fragmentShader); if (program) this.program = program; };
  setupPositionAttribute = () => {
    const positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(positionAttributeLocation);
    this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
  };
  setupUniforms = () => {
    const uniformLocations = { u_time: this.gl.getUniformLocation(this.program, "u_time"), u_pixelRatio: this.gl.getUniformLocation(this.program, "u_pixelRatio"), u_resolution: this.gl.getUniformLocation(this.program, "u_resolution") };
    Object.entries(this.providedUniforms).forEach(([key, value]) => {
      uniformLocations[key] = this.gl.getUniformLocation(this.program, key);
      if (value instanceof HTMLImageElement) { uniformLocations[`${key}AspectRatio`] = this.gl.getUniformLocation(this.program, `${key}AspectRatio`); }
    });
    this.uniformLocations = uniformLocations;
  };
  renderScale = 1; parentWidth = 0; parentHeight = 0; parentDevicePixelWidth = 0; parentDevicePixelHeight = 0; devicePixelsSupported = false; resizeObserver = null;
  setupResizeObserver = () => {
    this.resizeObserver = new ResizeObserver(([entry]) => {
      if (entry?.borderBoxSize[0]) {
        const physicalPixelSize = entry.devicePixelContentBoxSize?.[0];
        if (physicalPixelSize !== void 0) { this.devicePixelsSupported = true; this.parentDevicePixelWidth = physicalPixelSize.inlineSize; this.parentDevicePixelHeight = physicalPixelSize.blockSize; }
        this.parentWidth = entry.borderBoxSize[0].inlineSize;
        this.parentHeight = entry.borderBoxSize[0].blockSize;
      }
      this.handleResize();
    });
    this.resizeObserver.observe(this.parentElement);
  };
  handleVisualViewportChange = () => { this.resizeObserver?.disconnect(); this.setupResizeObserver(); };
  handleResize = () => {
    let targetPixelWidth = 0; let targetPixelHeight = 0;
    const dpr = Math.max(1, window.devicePixelRatio);
    const pinchZoom = visualViewport?.scale ?? 1;
    if (this.devicePixelsSupported) {
      const scaleToMeetMinPixelRatio = Math.max(1, this.minPixelRatio / dpr);
      targetPixelWidth = this.parentDevicePixelWidth * scaleToMeetMinPixelRatio * pinchZoom;
      targetPixelHeight = this.parentDevicePixelHeight * scaleToMeetMinPixelRatio * pinchZoom;
    } else {
      let targetRenderScale = Math.max(dpr, this.minPixelRatio) * pinchZoom;
      if (this.isSafari) targetRenderScale *= Math.max(1, bestGuessBrowserZoom());
      targetPixelWidth = Math.round(this.parentWidth) * targetRenderScale;
      targetPixelHeight = Math.round(this.parentHeight) * targetRenderScale;
    }
    const maxPixelCountHeadroom = Math.sqrt(this.maxPixelCount) / Math.sqrt(targetPixelWidth * targetPixelHeight);
    const scaleToMeetMaxPixelCount = Math.min(1, maxPixelCountHeadroom);
    const newWidth = Math.round(targetPixelWidth * scaleToMeetMaxPixelCount);
    const newHeight = Math.round(targetPixelHeight * scaleToMeetMaxPixelCount);
    const newRenderScale = newWidth / Math.round(this.parentWidth);
    if (this.canvasElement.width !== newWidth || this.canvasElement.height !== newHeight || this.renderScale !== newRenderScale) {
      this.renderScale = newRenderScale;
      this.canvasElement.width = newWidth;
      this.canvasElement.height = newHeight;
      this.resolutionChanged = true;
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      this.render(performance.now());
    }
  };
  render = (currentTime) => {
    if (this.hasBeenDisposed) return;
    if (this.program === null) return;
    const dt = currentTime - this.lastRenderTime;
    this.lastRenderTime = currentTime;
    if (this.currentSpeed !== 0) this.currentFrame += dt * this.currentSpeed;
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.gl.uniform1f(this.uniformLocations.u_time, this.currentFrame * 1e-3);
    if (this.resolutionChanged) {
      this.gl.uniform2f(this.uniformLocations.u_resolution, this.gl.canvas.width, this.gl.canvas.height);
      this.gl.uniform1f(this.uniformLocations.u_pixelRatio, this.renderScale);
      this.resolutionChanged = false;
    }
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    if (this.currentSpeed !== 0) this.requestRender(); else this.rafId = null;
  };
  requestRender = () => { if (this.rafId !== null) cancelAnimationFrame(this.rafId); this.rafId = requestAnimationFrame(this.render); };
  setTextureUniform = (uniformName, image) => {
    if (!image.complete || image.naturalWidth === 0) throw new Error(`Paper Shaders: image for uniform ${uniformName} must be fully loaded`);
    const existingTexture = this.textures.get(uniformName);
    if (existingTexture) this.gl.deleteTexture(existingTexture);
    if (!this.textureUnitMap.has(uniformName)) this.textureUnitMap.set(uniformName, this.textureUnitMap.size);
    const textureUnit = this.textureUnitMap.get(uniformName);
    this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
    const texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    if (this.mipmaps.includes(uniformName)) { this.gl.generateMipmap(this.gl.TEXTURE_2D); this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR); }
    this.textures.set(uniformName, texture);
    const location = this.uniformLocations[uniformName];
    if (location) {
      this.gl.uniform1i(location, textureUnit);
      const aspectRatioLocation = this.uniformLocations[`${uniformName}AspectRatio`];
      if (aspectRatioLocation) this.gl.uniform1f(aspectRatioLocation, image.naturalWidth / image.naturalHeight);
    }
  };
  areUniformValuesEqual = (a, b) => {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) return a.every((val, i) => this.areUniformValuesEqual(val, b[i]));
    return false;
  };
  setUniformValues = (updatedUniforms) => {
    this.gl.useProgram(this.program);
    Object.entries(updatedUniforms).forEach(([key, value]) => {
      let cacheValue = value;
      if (value instanceof HTMLImageElement) cacheValue = `${value.src.slice(0, 200)}|${value.naturalWidth}x${value.naturalHeight}`;
      if (this.areUniformValuesEqual(this.uniformCache[key], cacheValue)) return;
      this.uniformCache[key] = cacheValue;
      const location = this.uniformLocations[key];
      if (!location) return;
      if (value instanceof HTMLImageElement) this.setTextureUniform(key, value);
      else if (Array.isArray(value)) {
        let flatArray = null; let valueLength = null;
        if (value[0] !== void 0 && Array.isArray(value[0])) {
          const firstChildLength = value[0].length;
          if (value.every((arr) => arr.length === firstChildLength)) { flatArray = value.flat(); valueLength = firstChildLength; } else return;
        } else { flatArray = value; valueLength = flatArray.length; }
        switch (valueLength) {
          case 2: this.gl.uniform2fv(location, flatArray); break;
          case 3: this.gl.uniform3fv(location, flatArray); break;
          case 4: this.gl.uniform4fv(location, flatArray); break;
          case 9: this.gl.uniformMatrix3fv(location, false, flatArray); break;
          case 16: this.gl.uniformMatrix4fv(location, false, flatArray); break;
        }
      } else if (typeof value === "number") this.gl.uniform1f(location, value);
      else if (typeof value === "boolean") this.gl.uniform1i(location, value ? 1 : 0);
    });
  };
  getCurrentFrame = () => this.currentFrame;
  setFrame = (newFrame) => { this.currentFrame = newFrame; this.lastRenderTime = performance.now(); this.render(performance.now()); };
  setSpeed = (newSpeed = 1) => { this.speed = newSpeed; this.setCurrentSpeed(document.hidden ? 0 : newSpeed); };
  setCurrentSpeed = (newSpeed) => {
    this.currentSpeed = newSpeed;
    if (this.rafId === null && newSpeed !== 0) { this.lastRenderTime = performance.now(); this.rafId = requestAnimationFrame(this.render); }
    if (this.rafId !== null && newSpeed === 0) { cancelAnimationFrame(this.rafId); this.rafId = null; }
  };
  setMaxPixelCount = (newMaxPixelCount = DEFAULT_MAX_PIXEL_COUNT) => { this.maxPixelCount = newMaxPixelCount; this.handleResize(); };
  setMinPixelRatio = (newMinPixelRatio = 2) => { this.minPixelRatio = newMinPixelRatio; this.handleResize(); };
  setUniforms = (newUniforms) => { this.setUniformValues(newUniforms); this.providedUniforms = { ...this.providedUniforms, ...newUniforms }; this.render(performance.now()); };
  handleDocumentVisibilityChange = () => { this.setCurrentSpeed(document.hidden ? 0 : this.speed); };
  dispose = () => {
    this.hasBeenDisposed = true;
    if (this.rafId !== null) { cancelAnimationFrame(this.rafId); this.rafId = null; }
    if (this.gl && this.program) {
      this.textures.forEach((texture) => this.gl.deleteTexture(texture));
      this.textures.clear();
      this.gl.deleteProgram(this.program);
      this.program = null;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.getError();
    }
    if (this.resizeObserver) { this.resizeObserver.disconnect(); this.resizeObserver = null; }
    visualViewport?.removeEventListener("resize", this.handleVisualViewportChange);
    document.removeEventListener("visibilitychange", this.handleDocumentVisibilityChange);
    this.uniformLocations = {};
    this.canvasElement.remove();
    delete this.parentElement.paperShaderMount;
  };
};
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
  return shader;
}
function createProgram(gl, vertexShaderSource2, fragmentShaderSource) {
  const format = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT);
  const precision = format ? format.precision : null;
  if (precision && precision < 23) {
    vertexShaderSource2 = vertexShaderSource2.replace(/precision\s+(lowp|mediump)\s+float;/g, "precision highp float;");
    fragmentShaderSource = fragmentShaderSource.replace(/precision\s+(lowp|mediump)\s+float/g, "precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g, "$1 highp $3");
  }
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource2);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); gl.deleteShader(vertexShader); gl.deleteShader(fragmentShader); return null; }
  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}
var defaultStyle = `@layer paper-shaders { :where([data-paper-shader]) { isolation: isolate; position: relative; & canvas { contain: strict; display: block; position: absolute; inset: 0; z-index: -1; width: 100%; height: 100%; border-radius: inherit; corner-shape: inherit; } } }`;
function isSafari() { const ua = navigator.userAgent.toLowerCase(); return ua.includes("safari") && !ua.includes("chrome") && !ua.includes("android"); }
function bestGuessBrowserZoom() {
  const viewportScale = visualViewport?.scale ?? 1;
  const viewportWidth = visualViewport?.width ?? window.innerWidth;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const innerWidth = viewportScale * viewportWidth + scrollbarWidth;
  const ratio = outerWidth / innerWidth;
  const zoomPercentageRounded = Math.round(100 * ratio);
  if (zoomPercentageRounded % 5 === 0) return zoomPercentageRounded / 100;
  if (zoomPercentageRounded === 33) return 1 / 3;
  if (zoomPercentageRounded === 67) return 2 / 3;
  if (zoomPercentageRounded === 133) return 4 / 3;
  return ratio;
}
var defaultObjectSizing = { fit: "contain", scale: 1, rotation: 0, offsetX: 0, offsetY: 0, originX: 0.5, originY: 0.5, worldWidth: 0, worldHeight: 0 };
var defaultPatternSizing = { fit: "none", scale: 1, rotation: 0, offsetX: 0, offsetY: 0, originX: 0.5, originY: 0.5, worldWidth: 0, worldHeight: 0 };
var ShaderFitOptions = { none: 0, contain: 1, cover: 2 };
var declarePI = `#define TWO_PI 6.28318530718\n#define PI 3.14159265358979323846\n`;
var proceduralHash11 = `float hash11(float p) { p = fract(p * 0.3183099) + 0.1; p *= p + 19.19; return fract(p * p); }\n`;
var proceduralHash21 = `float hash21(vec2 p) { p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1; p += dot(p, p + 19.19); return fract(p.x * p.y); }\n`;
var simplexNoise = `vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }\nfloat snoise(vec2 v) {\n  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);\n  vec2 i = floor(v + dot(v, C.yy));\n  vec2 x0 = v - i + dot(i, C.xx);\n  vec2 i1;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod(i, 289.0);\n  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));\n  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);\n  m = m * m;\n  m = m * m;\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);\n  vec3 g;\n  g.x = a0.x * x0.x + h.x * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n`;
var ditheringFragmentShader = `#version 300 es\nprecision mediump float;\nuniform float u_time;\nuniform vec2 u_resolution;\nuniform float u_pixelRatio;\nuniform float u_originX;\nuniform float u_originY;\nuniform float u_worldWidth;\nuniform float u_worldHeight;\nuniform float u_fit;\nuniform float u_scale;\nuniform float u_rotation;\nuniform float u_offsetX;\nuniform float u_offsetY;\nuniform float u_pxSize;\nuniform vec4 u_colorBack;\nuniform vec4 u_colorFront;\nuniform float u_shape;\nuniform float u_type;\nout vec4 fragColor;\n${simplexNoise}\n${declarePI}\n${proceduralHash11}\n${proceduralHash21}\nfloat getSimplexNoise(vec2 uv, float t) {\n  float noise = .5 * snoise(uv - vec2(0., .3 * t));\n  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));\n  return noise;\n}\nconst int bayer2x2[4] = int[4](0, 2, 3, 1);\nconst int bayer4x4[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);\nconst int bayer8x8[64] = int[64](0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21);\nfloat getBayerValue(vec2 uv, int size) {\n  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));\n  int index = pos.y * size + pos.x;\n  if (size == 2) return float(bayer2x2[index]) / 4.0;\n  else if (size == 4) return float(bayer4x4[index]) / 16.0;\n  else if (size == 8) return float(bayer8x8[index]) / 64.0;\n  return 0.0;\n}\nvoid main() {\n  float t = .5 * u_time;\n  float pxSize = u_pxSize * u_pixelRatio;\n  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;\n  pxSizeUV /= pxSize;\n  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;\n  vec2 normalizedUV = canvasPixelizedUV / u_resolution;\n  vec2 ditheringNoiseUV = canvasPixelizedUV;\n  vec2 shapeUV = normalizedUV;\n  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);\n  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);\n  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;\n  float r = u_rotation * PI / 180.;\n  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));\n  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);\n  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;\n  vec2 boxSize = vec2((u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x, (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y);\n  if (u_shape > 3.5) {\n    vec2 objectBoxSize = vec2(0.);\n    objectBoxSize.x = min(boxSize.x, boxSize.y);\n    if (u_fit == 1.) objectBoxSize.x = min(u_resolution.x, u_resolution.y);\n    else if (u_fit == 2.) objectBoxSize.x = max(u_resolution.x, u_resolution.y);\n    objectBoxSize.y = objectBoxSize.x;\n    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;\n    shapeUV *= objectWorldScale;\n    shapeUV += boxOrigin * (objectWorldScale - 1.);\n    shapeUV += vec2(-u_offsetX, u_offsetY);\n    shapeUV /= u_scale;\n    shapeUV = graphicRotation * shapeUV;\n  } else {\n    vec2 patternBoxSize = vec2(0.);\n    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);\n    float patternWorldNoFitBoxWidth = patternBoxSize.x;\n    if (u_fit == 1.) patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);\n    else if (u_fit == 2.) patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);\n    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;\n    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;\n    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;\n    shapeUV += boxOrigin;\n    shapeUV -= boxOrigin / patternWorldScale;\n    shapeUV *= u_resolution.xy;\n    shapeUV /= u_pixelRatio;\n    if (u_fit > 0.) shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);\n    shapeUV /= u_scale;\n    shapeUV = graphicRotation * shapeUV;\n    shapeUV += boxOrigin / patternWorldScale;\n    shapeUV -= boxOrigin;\n    shapeUV += .5;\n  }\n  float shape = 0.;\n  if (u_shape < 1.5) { shapeUV *= .001; shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t); shape = smoothstep(0.3, 0.9, shape); }\n  else if (u_shape < 2.5) { shapeUV *= .003; for (float i = 1.0; i < 6.0; i++) { shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t); shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t); } shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x))); shape = smoothstep(0.02, 1., shape); }\n  else if (u_shape < 3.5) { shapeUV *= .05; float stripeIdx = floor(2. * shapeUV.x / TWO_PI); float rand = hash11(stripeIdx * 10.); rand = sign(rand - .5) * pow(.1 + abs(rand), .4); shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t); shape = pow(abs(shape), 6.); }\n  else if (u_shape < 4.5) { shapeUV *= 4.; float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t)); shape = 1. - smoothstep(-1., 1., shapeUV.y + wave); }\n  else if (u_shape < 5.5) { float dist = length(shapeUV); float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5; shape = waves; }\n  else if (u_shape < 6.5) { float l = length(shapeUV); float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t; float twist = 1.2; float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI; float mid = smoothstep(0., 1., pow(l, twist)); shape = mix(0., fract(offset), mid); }\n  else { shapeUV *= 2.; float d = 1. - pow(length(shapeUV), 2.); vec3 pos = vec3(shapeUV, sqrt(max(0., d))); vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t))); shape = .5 + .5 * dot(lightPos, pos); shape *= step(0., d); }\n  int type = int(floor(u_type));\n  float dithering = 0.0;\n  switch (type) {\n    case 1: dithering = step(hash21(ditheringNoiseUV), shape); break;\n    case 2: dithering = getBayerValue(pxSizeUV, 2); break;\n    case 3: dithering = getBayerValue(pxSizeUV, 4); break;\n    default: dithering = getBayerValue(pxSizeUV, 8); break;\n  }\n  dithering -= .5;\n  float res = step(.5, shape + dithering);\n  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;\n  float fgOpacity = u_colorFront.a;\n  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;\n  float bgOpacity = u_colorBack.a;\n  vec3 color = fgColor * res;\n  float opacity = fgOpacity * res;\n  color += bgColor * (1. - opacity);\n  opacity += bgOpacity * (1. - opacity);\n  fragColor = vec4(color, opacity);\n}\n`;
var DitheringShapes = { simplex: 1, warp: 2, dots: 3, wave: 4, ripple: 5, swirl: 6, sphere: 7 };
var DitheringTypes = { "random": 1, "2x2": 2, "4x4": 3, "8x8": 4 };
var imageDitheringFragmentShader = `#version 300 es\nprecision mediump float;\nuniform vec2 u_resolution;\nuniform float u_pixelRatio;\nuniform float u_originX;\nuniform float u_originY;\nuniform float u_worldWidth;\nuniform float u_worldHeight;\nuniform float u_fit;\nuniform float u_scale;\nuniform float u_rotation;\nuniform float u_offsetX;\nuniform float u_offsetY;\nuniform vec4 u_colorFront;\nuniform vec4 u_colorBack;\nuniform vec4 u_colorHighlight;\nuniform sampler2D u_image;\nuniform float u_imageAspectRatio;\nuniform float u_type;\nuniform float u_pxSize;\nuniform bool u_originalColors;\nuniform bool u_inverted;\nuniform float u_colorSteps;\nout vec4 fragColor;\n${proceduralHash21}\n${declarePI}\nfloat getUvFrame(vec2 uv, vec2 pad) {\n  float aa = 0.0001;\n  float left = smoothstep(-pad.x, -pad.x + aa, uv.x);\n  float right = smoothstep(1.0 + pad.x, 1.0 + pad.x - aa, uv.x);\n  float bottom = smoothstep(-pad.y, -pad.y + aa, uv.y);\n  float top = smoothstep(1.0 + pad.y, 1.0 + pad.y - aa, uv.y);\n  return left * right * bottom * top;\n}\nvec2 getImageUV(vec2 uv) {\n  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);\n  float r = u_rotation * PI / 180.;\n  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));\n  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);\n  vec2 imageBoxSize;\n  if (u_fit == 1.) imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;\n  else if (u_fit == 2.) imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;\n  else imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);\n  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;\n  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;\n  vec2 imageUV = uv;\n  imageUV *= imageBoxScale;\n  imageUV += boxOrigin * (imageBoxScale - 1.);\n  imageUV += graphicOffset;\n  imageUV /= u_scale;\n  imageUV.x *= u_imageAspectRatio;\n  imageUV = graphicRotation * imageUV;\n  imageUV.x /= u_imageAspectRatio;\n  imageUV += .5;\n  imageUV.y = 1. - imageUV.y;\n  return imageUV;\n}\nconst int bayer2x2[4] = int[4](0, 2, 3, 1);\nconst int bayer4x4[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);\nconst int bayer8x8[64] = int[64](0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21);\nfloat getBayerValue(vec2 uv, int size) {\n  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));\n  int index = pos.y * size + pos.x;\n  if (size == 2) return float(bayer2x2[index]) / 4.0;\n  else if (size == 4) return float(bayer4x4[index]) / 16.0;\n  else if (size == 8) return float(bayer8x8[index]) / 64.0;\n  return 0.0;\n}\nvoid main() {\n  float pxSize = u_pxSize * u_pixelRatio;\n  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;\n  pxSizeUV /= pxSize;\n  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;\n  vec2 normalizedUV = canvasPixelizedUV / u_resolution;\n  vec2 imageUV = getImageUV(normalizedUV);\n  vec2 ditheringNoiseUV = canvasPixelizedUV;\n  vec4 image = texture(u_image, imageUV);\n  float frame = getUvFrame(imageUV, pxSize / u_resolution);\n  int type = int(floor(u_type));\n  float dithering = 0.0;\n  float lum = dot(vec3(.2126, .7152, .0722), image.rgb);\n  lum = u_inverted ? (1. - lum) : lum;\n  switch (type) {\n    case 1: dithering = step(hash21(ditheringNoiseUV), lum); break;\n    case 2: dithering = getBayerValue(pxSizeUV, 2); break;\n    case 3: dithering = getBayerValue(pxSizeUV, 4); break;\n    default: dithering = getBayerValue(pxSizeUV, 8); break;\n  }\n  float colorSteps = max(floor(u_colorSteps), 1.);\n  vec3 color = vec3(0.0);\n  float opacity = 1.;\n  dithering -= .5;\n  float brightness = clamp(lum + dithering / colorSteps, 0.0, 1.0);\n  brightness = mix(0.0, brightness, frame);\n  brightness = mix(0.0, brightness, image.a);\n  float quantLum = floor(brightness * colorSteps + 0.5) / colorSteps;\n  quantLum = mix(0.0, quantLum, frame);\n  if (u_originalColors == true) {\n    vec3 normColor = image.rgb / max(lum, 0.001);\n    color = normColor * quantLum;\n    float quantAlpha = floor(image.a * colorSteps + 0.5) / colorSteps;\n    opacity = mix(quantLum, 1., quantAlpha);\n  } else {\n    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;\n    float fgOpacity = u_colorFront.a;\n    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;\n    float bgOpacity = u_colorBack.a;\n    vec3 hlColor = u_colorHighlight.rgb * u_colorHighlight.a;\n    float hlOpacity = u_colorHighlight.a;\n    fgColor = mix(fgColor, hlColor, step(1.02 - .02 * u_colorSteps, brightness));\n    fgOpacity = mix(fgOpacity, hlOpacity, step(1.02 - .02 * u_colorSteps, brightness));\n    color = fgColor * quantLum;\n    opacity = fgOpacity * quantLum;\n    color += bgColor * (1.0 - opacity);\n    opacity += bgOpacity * (1.0 - opacity);\n  }\n  fragColor = vec4(color, opacity);\n}\n`;
function getShaderColorFromString(colorString) {
  if (Array.isArray(colorString)) { if (colorString.length === 4) return colorString; if (colorString.length === 3) return [...colorString, 1]; return fallbackColor; }
  if (typeof colorString !== "string") return fallbackColor;
  let r, g, b, a = 1;
  if (colorString.startsWith("#")) [r, g, b, a] = hexToRgba(colorString);
  else if (colorString.startsWith("rgb")) [r, g, b, a] = parseRgba(colorString);
  else if (colorString.startsWith("hsl")) [r, g, b, a] = hslaToRgba(parseHsla(colorString));
  else return fallbackColor;
  return [clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1), clamp(a, 0, 1)];
}
function hexToRgba(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((char) => char + char).join("");
  if (hex.length === 6) hex = hex + "ff";
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const a = parseInt(hex.slice(6, 8), 16) / 255;
  return [r, g, b, a];
}
function parseRgba(rgba) {
  const match = rgba.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);
  if (!match) return [0, 0, 0, 1];
  return [parseInt(match[1] ?? "0") / 255, parseInt(match[2] ?? "0") / 255, parseInt(match[3] ?? "0") / 255, match[4] === void 0 ? 1 : parseFloat(match[4])];
}
function parseHsla(hsla) {
  const match = hsla.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);
  if (!match) return [0, 0, 0, 1];
  return [parseInt(match[1] ?? "0"), parseInt(match[2] ?? "0"), parseInt(match[3] ?? "0"), match[4] === void 0 ? 1 : parseFloat(match[4])];
}
function hslaToRgba(hsla) {
  const [h, s, l, a] = hsla;
  const hDecimal = h / 360;
  const sDecimal = s / 100;
  const lDecimal = l / 100;
  let r, g, b;
  if (s === 0) { r = g = b = lDecimal; }
  else {
    const hue2rgb = (p2, q2, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t; if (t < 1 / 2) return q2; if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6; return p2; };
    const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal;
    const p = 2 * lDecimal - q;
    r = hue2rgb(p, q, hDecimal + 1 / 3);
    g = hue2rgb(p, q, hDecimal);
    b = hue2rgb(p, q, hDecimal - 1 / 3);
  }
  return [r, g, b, a];
}
var clamp = (n, min, max) => Math.min(Math.max(n, min), max);
var fallbackColor = [0, 0, 0, 1];
function getEmptyPixel() { if (typeof window === "undefined") return void 0; const img = new Image(); img.src = emptyPixel; return img; }
var emptyPixel = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
function useMergeRefs(refs) {
  const cleanupRef = React.useRef(void 0);
  const refEffect = React.useCallback((instance) => {
    const cleanups = refs.map((ref) => { if (ref == null) return; if (typeof ref === "function") { const refCallback = ref; const refCleanup = refCallback(instance); return typeof refCleanup === "function" ? refCleanup : () => { refCallback(null); }; } ref.current = instance; return () => { ref.current = null; }; });
    return () => { cleanups.forEach((refCleanup) => refCleanup?.()); };
  }, refs);
  return React.useMemo(() => { if (refs.every((ref) => ref == null)) return null; return (value) => { if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = void 0; } if (value != null) cleanupRef.current = refEffect(value); }; }, refs);
}
function setMinImageSize(img) { if (img.naturalWidth < 1024 && img.naturalHeight < 1024) { if (img.naturalWidth < 1 || img.naturalHeight < 1) return; const aspect = img.naturalWidth / img.naturalHeight; img.width = Math.round(aspect > 1 ? 1024 * aspect : 1024); img.height = Math.round(aspect > 1 ? 1024 : 1024 / aspect); } }
async function processUniforms(uniformsProp) {
  const processedUniforms = {};
  const imageLoadPromises = [];
  const isValidUrl = (url) => { try { if (url.startsWith("/")) return true; new URL(url); return true; } catch { return false; } };
  const isExternalUrl = (url) => { try { if (url.startsWith("/")) return false; const urlObject = new URL(url, window.location.origin); return urlObject.origin !== window.location.origin; } catch { return false; } };
  Object.entries(uniformsProp).forEach(([key, value]) => {
    if (typeof value === "string") {
      if (!value) { processedUniforms[key] = getEmptyPixel(); return; }
      if (!isValidUrl(value)) return;
      const imagePromise = new Promise((resolve, reject) => { const img = new Image(); if (isExternalUrl(value)) img.crossOrigin = "anonymous"; img.onload = () => { setMinImageSize(img); processedUniforms[key] = img; resolve(); }; img.onerror = () => reject(); img.src = value; });
      imageLoadPromises.push(imagePromise);
    } else if (value instanceof HTMLImageElement) { setMinImageSize(value); processedUniforms[key] = value; }
    else processedUniforms[key] = value;
  });
  await Promise.all(imageLoadPromises);
  return processedUniforms;
}
var ShaderMount2 = forwardRef(function ShaderMountImpl({ fragmentShader, uniforms: uniformsProp, webGlContextAttributes, speed = 0, frame = 0, width, height, minPixelRatio, maxPixelCount, mipmaps, style, ...divProps }, forwardedRef) {
  const [isInitialized, setIsInitialized] = useState(false);
  const divRef = useRef(null);
  const shaderMountRef = useRef(null);
  const webGlContextAttributesRef = useRef(webGlContextAttributes);
  useEffect(() => { const initShader = async () => { const uniforms = await processUniforms(uniformsProp); if (divRef.current && !shaderMountRef.current) { shaderMountRef.current = new ShaderMount(divRef.current, fragmentShader, uniforms, webGlContextAttributesRef.current, speed, frame, minPixelRatio, maxPixelCount, mipmaps); setIsInitialized(true); } }; initShader(); return () => { shaderMountRef.current?.dispose(); shaderMountRef.current = null; }; }, [fragmentShader]);
  useEffect(() => { let isStale = false; const updateUniforms = async () => { const uniforms = await processUniforms(uniformsProp); if (!isStale) shaderMountRef.current?.setUniforms(uniforms); }; updateUniforms(); return () => { isStale = true; }; }, [uniformsProp, isInitialized]);
  useEffect(() => { shaderMountRef.current?.setSpeed(speed); }, [speed, isInitialized]);
  useEffect(() => { shaderMountRef.current?.setMaxPixelCount(maxPixelCount); }, [maxPixelCount, isInitialized]);
  useEffect(() => { shaderMountRef.current?.setMinPixelRatio(minPixelRatio); }, [minPixelRatio, isInitialized]);
  useEffect(() => { shaderMountRef.current?.setFrame(frame); }, [frame, isInitialized]);
  const mergedRef = useMergeRefs([divRef, forwardedRef]);
  return jsx("div", { ref: mergedRef, style: width !== void 0 || height !== void 0 ? { width: typeof width === "string" && isNaN(+width) === false ? +width : width, height: typeof height === "string" && isNaN(+height) === false ? +height : height, ...style } : style, ...divProps });
});
ShaderMount2.displayName = "ShaderMount";
function colorPropsAreEqual(prevProps, nextProps) {
  for (const key in prevProps) {
    if (key === "colors") { const prevIsArray = Array.isArray(prevProps.colors); const nextIsArray = Array.isArray(nextProps.colors); if (!prevIsArray || !nextIsArray) { if (Object.is(prevProps.colors, nextProps.colors) === false) return false; continue; } if (prevProps.colors?.length !== nextProps.colors?.length) return false; if (!prevProps.colors?.every((color, index) => color === nextProps.colors?.[index])) return false; continue; }
    if (Object.is(prevProps[key], nextProps[key]) === false) return false;
  }
  return true;
}
var defaultPreset = { name: "Default", params: { ...defaultPatternSizing, speed: 1, frame: 0, scale: 0.6, colorBack: "#000000", colorFront: "#00b2ff", shape: "sphere", type: "4x4", size: 2 } };
var Dithering = memo(function DitheringImpl({ speed = defaultPreset.params.speed, frame = defaultPreset.params.frame, colorBack = defaultPreset.params.colorBack, colorFront = defaultPreset.params.colorFront, shape = defaultPreset.params.shape, type = defaultPreset.params.type, pxSize, size = pxSize === void 0 ? defaultPreset.params.size : pxSize, fit = defaultPreset.params.fit, scale = defaultPreset.params.scale, rotation = defaultPreset.params.rotation, originX = defaultPreset.params.originX, originY = defaultPreset.params.originY, offsetX = defaultPreset.params.offsetX, offsetY = defaultPreset.params.offsetY, worldWidth = defaultPreset.params.worldWidth, worldHeight = defaultPreset.params.worldHeight, ...props }) {
  const uniforms = { u_colorBack: getShaderColorFromString(colorBack), u_colorFront: getShaderColorFromString(colorFront), u_shape: DitheringShapes[shape], u_type: DitheringTypes[type], u_pxSize: size, u_fit: ShaderFitOptions[fit], u_scale: scale, u_rotation: rotation, u_offsetX: offsetX, u_offsetY: offsetY, u_originX: originX, u_originY: originY, u_worldWidth: worldWidth, u_worldHeight: worldHeight };
  return jsx(ShaderMount2, { ...props, speed, frame, fragmentShader: ditheringFragmentShader, uniforms });
});
var defaultPreset2 = { name: "Default", params: { ...defaultObjectSizing, fit: "cover", speed: 0, frame: 0, colorFront: "#94ffaf", colorBack: "#000c38", colorHighlight: "#eaff94", type: "8x8", size: 2, colorSteps: 2, originalColors: false, inverted: false } };
var ImageDithering = memo(function ImageDitheringImpl({ speed = defaultPreset2.params.speed, frame = defaultPreset2.params.frame, colorFront = defaultPreset2.params.colorFront, colorBack = defaultPreset2.params.colorBack, colorHighlight = defaultPreset2.params.colorHighlight, image = "", type = defaultPreset2.params.type, colorSteps = defaultPreset2.params.colorSteps, originalColors = defaultPreset2.params.originalColors, inverted = defaultPreset2.params.inverted, pxSize, size = pxSize === void 0 ? defaultPreset2.params.size : pxSize, fit = defaultPreset2.params.fit, scale = defaultPreset2.params.scale, rotation = defaultPreset2.params.rotation, originX = defaultPreset2.params.originX, originY = defaultPreset2.params.originY, offsetX = defaultPreset2.params.offsetX, offsetY = defaultPreset2.params.offsetY, worldWidth = defaultPreset2.params.worldWidth, worldHeight = defaultPreset2.params.worldHeight, ...props }, colorPropsAreEqual) {
  const uniforms = { u_image: image, u_colorFront: getShaderColorFromString(colorFront), u_colorBack: getShaderColorFromString(colorBack), u_colorHighlight: getShaderColorFromString(colorHighlight), u_type: DitheringTypes[type], u_pxSize: size, u_colorSteps: colorSteps, u_originalColors: originalColors, u_inverted: inverted, u_fit: ShaderFitOptions[fit], u_rotation: rotation, u_scale: scale, u_offsetX: offsetX, u_offsetY: offsetY, u_originX: originX, u_originY: originY, u_worldWidth: worldWidth, u_worldHeight: worldHeight };
  return jsx(ShaderMount2, { ...props, speed, frame, fragmentShader: imageDitheringFragmentShader, uniforms });
}, colorPropsAreEqual);
var REF = 741;
var TICKET_GEOMETRY = { aspect: 741 / 425, cornerRadius: 25 / REF, notchRadius: 21 / REF, perforation: 562 / REF };
var TICKET_LAYOUT = { padding: 57 / REF, labelTop: 58 / REF, labelSize: 19.72 / REF, labelLead: 28 / REF, labelTracking: 0.016, nameTop: 185 / REF, nameSize: 64.79 / REF, nameLead: 65 / REF, nameTracking: -0.01, footerTop: 348 / REF, footerSize: 19.72 / REF, footerTracking: 0.016, stubSize: 67.61 / REF, stubTracking: 0, stubOpacity: 0.88, watermarkSize: 144 / REF, watermarkOpacity: 0.6, watermarkColor: "#ffdcbe", inkColor: "#5a3520" };
var TICKET_TEXTURE = { engine: "generative", colorBack: "#ef671c", colorFront: "#ffc691", colorHighlight: "#fe9046", shape: "warp", type: "random", size: 0.5, colorSteps: 4, originalColors: true, scale: 1, rotation: 0, offsetX: 0, offsetY: 0, speed: 0.4 };
var TICKET_GRADIENT = { centreX: 0.62, centreY: 0.3, radius: 0.58, midStop: 0.45, colorLight: "#ffc691", colorMid: "#fe9046", colorDark: "#ef671c" };
var TICKET_STYLE = { texture: TICKET_TEXTURE, gradient: TICKET_GRADIENT };
var SHAPES = ["simplex", "warp", "dots", "wave", "ripple", "swirl", "sphere"];
var TYPES = ["random", "2x2", "4x4", "8x8"];
function ticketClipPath(width, height, geometry = TICKET_GEOMETRY) {
  const r = geometry.cornerRadius * width;
  const n = geometry.notchRadius * width;
  const p = geometry.perforation * width;
  return [`M ${r} 0`, `L ${p - n} 0`, `A ${n} ${n} 0 0 0 ${p + n} 0`, `L ${width - r} 0`, `A ${r} ${r} 0 0 0 ${width} ${r}`, `L ${width} ${height - r}`, `A ${r} ${r} 0 0 0 ${width - r} ${height}`, `L ${p + n} ${height}`, `A ${n} ${n} 0 0 0 ${p - n} ${height}`, `L ${r} ${height}`, `A ${r} ${r} 0 0 0 0 ${height - r}`, `L 0 ${r}`, `A ${r} ${r} 0 0 0 ${r} 0`, "Z"].join(" ");
}
function splitName(name, max = 3) {
  const clean = name.trim().replace(/\s+/g, " ").toUpperCase();
  if (!clean) return [];
  const lines = [];
  for (const word of clean.split(" ")) { if (lines.length < max) lines.push(word); else lines[lines.length - 1] = `${lines[lines.length - 1]} ${word}`; }
  return lines;
}
function fitScale(lines, opts) {
  if (lines.length === 0) return 1;
  const { availableWidth, availableHeight, fontSize, lineHeight, tracking } = opts;
  if (fontSize <= 0 || availableWidth <= 0) return 1;
  const longest = Math.max(...lines.map((l) => l.length));
  const charWidth = (0.6 + tracking) * fontSize;
  const block = lines.length * lineHeight;
  return Math.max(0.05, Math.min(1, charWidth > 0 ? availableWidth / (longest * charWidth) : 1, block > 0 && availableHeight > 0 ? availableHeight / block : 1));
}
var MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion() {
  return React.useSyncExternalStore((onChange) => { const mq = window.matchMedia(MOTION_QUERY); mq.addEventListener("change", onChange); return () => mq.removeEventListener("change", onChange); }, () => window.matchMedia(MOTION_QUERY).matches, () => false);
}
function useDrift(speed) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();
  const active = speed > 0 && !reduced;
  React.useEffect(() => { if (!active) return; let raf = 0; let start = 0; const tick = (now) => { if (!start) start = now; const t = (now - start) / 1e3 * speed; setOffset({ x: 0.06 * Math.sin(0.37 * t), y: 0.045 * Math.cos(0.23 * t) }); raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf); }, [active, speed]);
  return active ? offset : { x: 0, y: 0 };
}
function gradientDataUrl(g, aspect) {
  if (typeof document === "undefined") return "";
  const w = 512;
  const h = Math.max(1, Math.round(w / aspect));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = g.colorDark;
  ctx.fillRect(0, 0, w, h);
  const radial = ctx.createRadialGradient(w * g.centreX, h * g.centreY, 0, w * g.centreX, h * g.centreY, Math.max(1, w * g.radius));
  radial.addColorStop(0, g.colorLight);
  radial.addColorStop(Math.min(0.99, Math.max(0.01, g.midStop)), g.colorMid);
  radial.addColorStop(1, g.colorDark);
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, w, h);
  return canvas.toDataURL("image/png");
}
function TicketCard({ name, presenter, event, venue, dates, stubText, watermark, width = REF, geometry = TICKET_GEOMETRY, layout = TICKET_LAYOUT, texture = TICKET_TEXTURE, gradient = TICKET_GRADIENT, className }) {
  const height = width / geometry.aspect;
  const perfX = geometry.perforation * width;
  const reduced = usePrefersReducedMotion();
  const drift = useDrift(texture.engine === "image" ? texture.speed : 0);
  const lines = splitName(name);
  const scale = fitScale(lines, { availableWidth: perfX - layout.padding * width - 0.03 * width, availableHeight: layout.footerTop * width - layout.nameTop * width - 0.02 * width, fontSize: layout.nameSize * width, lineHeight: layout.nameLead * width, tracking: layout.nameTracking });
  const sourceImage = React.useMemo(() => texture.engine === "image" ? gradientDataUrl(gradient, geometry.aspect) : "", [texture.engine, gradient, geometry.aspect]);
  const shaderStyle = { position: "absolute", inset: 0, width, height };
  return jsxs("div", { className: `relative select-none ${className ?? ""}`, style: { width, height, clipPath: `path('${ticketClipPath(width, height, geometry)}')` }, children: [
    jsx("div", { className: "absolute inset-0", style: { background: texture.colorBack } }),
    texture.engine === "image" && sourceImage ? jsx(ImageDithering, { image: sourceImage, colorBack: texture.colorBack, colorFront: texture.colorFront, colorHighlight: texture.colorHighlight, type: texture.type, size: texture.size, colorSteps: texture.colorSteps, originalColors: texture.originalColors, scale: texture.scale, rotation: texture.rotation, offsetX: texture.offsetX + drift.x, offsetY: texture.offsetY + drift.y, fit: "cover", style: shaderStyle }) : jsx(Dithering, { colorBack: texture.colorBack, colorFront: texture.colorFront, shape: texture.shape, type: texture.type, size: texture.size, scale: texture.scale, rotation: texture.rotation, offsetX: texture.offsetX, offsetY: texture.offsetY, speed: reduced ? 0 : texture.speed, style: shaderStyle }),
    jsx("div", { className: "absolute top-0 bottom-0", style: { left: perfX, width: Math.max(1, 22e-4 * width), backgroundImage: `repeating-linear-gradient(to bottom, ${layout.inkColor}55 0 ${0.012 * width}px, transparent ${0.012 * width}px ${0.024 * width}px)` } }),
    jsx("div", { className: "pointer-events-none absolute grid place-items-center font-bold tabular-nums", style: { left: perfX, top: 0, width: width - perfX, height, color: layout.watermarkColor, opacity: layout.watermarkOpacity }, children: jsx("span", { style: { writingMode: "vertical-rl", fontSize: layout.watermarkSize * width, lineHeight: 1, letterSpacing: "-0.04em" }, children: watermark }) }),
    jsxs("div", { className: "absolute inset-0", style: { color: layout.inkColor }, children: [
      jsxs("div", { className: "absolute whitespace-pre uppercase", style: { left: layout.padding * width, top: layout.labelTop * width, fontSize: layout.labelSize * width, lineHeight: `${layout.labelLead * width}px`, letterSpacing: `${layout.labelTracking}em` }, children: [presenter, "\n", event] }),
      jsx("div", { className: "absolute font-medium", style: { left: layout.padding * width, top: layout.nameTop * width, fontSize: layout.nameSize * width * scale, lineHeight: `${layout.nameLead * width * scale}px`, letterSpacing: `${layout.nameTracking}em` }, children: lines.map((line, i) => jsx("div", { children: line }, i)) }),
      jsxs("div", { className: "absolute whitespace-nowrap uppercase", style: { left: layout.padding * width, top: layout.footerTop * width, fontSize: layout.footerSize * width, letterSpacing: `${layout.footerTracking}em` }, children: [venue, " \xB7 ", dates] }),
      jsx("div", { className: "absolute grid place-items-center font-medium whitespace-nowrap uppercase", style: { left: perfX, top: 0, width: width - perfX, height, fontSize: layout.stubSize * width, letterSpacing: `${layout.stubTracking}em`, opacity: layout.stubOpacity }, children: jsx("span", { style: { writingMode: "vertical-rl" }, children: stubText }) })
    ] })
  ] });
}
function TiltCard({ children, clipPath, maxTilt = 9, scale = 1.02, glare = 0.16, className }) {
  const cardRef = React.useRef(null);
  const glareRef = React.useRef(null);
  const [hovering, setHovering] = React.useState(false);
  const onMove = React.useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${-(dy * 2) * maxTilt}deg) rotateY(${dx * 2 * maxTilt}deg) scale(${scale})`;
    if (glareRef.current) glareRef.current.style.background = `radial-gradient(38% 55% at ${(dx + 0.5) * 100}% ${(dy + 0.5) * 100}%, rgba(255,255,255,${glare}) 0%, rgba(255,255,255,0) 70%)`;
  }, [maxTilt, scale, glare]);
  const onLeave = React.useCallback(() => { setHovering(false); if (cardRef.current) cardRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)"; if (glareRef.current) glareRef.current.style.background = "transparent"; }, []);
  return jsxs("div", { ref: cardRef, onPointerEnter: () => setHovering(true), onPointerMove: onMove, onPointerLeave: onLeave, className: `relative w-fit will-change-transform ${className ?? ""}`, style: { transition: hovering ? "none" : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)", transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)", transformStyle: "preserve-3d" }, children: [children, glare > 0 && jsx("div", { ref: glareRef, "aria-hidden": true, className: "pointer-events-none absolute inset-0", style: { clipPath, transition: hovering ? "none" : "background 420ms ease-out" } })] });
}
function AdmitOneTicket({ tilt, ...props }) {
  const width = props.width ?? REF;
  const geometry = props.geometry ?? TICKET_GEOMETRY;
  if (tilt === false) return jsx(TicketCard, { ...props });
  return jsx(TiltCard, { clipPath: `path('${ticketClipPath(width, width / geometry.aspect, geometry)}')`, ...tilt, children: jsx(TicketCard, { ...props }) });
}
export { AdmitOneTicket, TICKET_GEOMETRY, TICKET_GRADIENT, TICKET_LAYOUT, TICKET_STYLE, TICKET_TEXTURE, TicketCard, TiltCard };
export default AdmitOneTicket;