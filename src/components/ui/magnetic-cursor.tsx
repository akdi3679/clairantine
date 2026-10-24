"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    setIsFinePointer(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticEl = target.closest("[data-cursor-magnetic]");
      if (magneticEl) {
        setIsHovering(true);
        setCursorText(magneticEl.getAttribute("data-cursor-text") || "Explorer");
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-magnetic]")) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Solid, always-visible dot (No mix-blend-difference) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] border border-white/30 shadow-lg"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", opacity: isVisible ? 1 : 0 }}
      />
      {/* Magnetic expansion ring */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-accent/50 rounded-full pointer-events-none z-[9998] flex items-center justify-center bg-accent/5 backdrop-blur-sm"
        animate={{
          x: isHovering ? mouseX.get() - 32 : mouseX.get() - 6,
          y: isHovering ? mouseY.get() - 32 : mouseY.get() - 6,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible && isHovering ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">{cursorText}</span>
      </motion.div>
    </>
  );
}