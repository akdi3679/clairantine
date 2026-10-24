"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const strategic = ["L'Observatoire", "Futur&Co", "Atelier 42"];
const media = ["Les Échos", "Madame Figaro", "Brut.", "Konbini", "Arte"];
const community = ["La Ruche", "Le Comptoir", "L'Atelier", "La Fabrique", "Le Loft", "L'Espace", "Le Hub", "La Base", "Le Lab", "Le Studio", "Le Bureau", "Le Coin"];

function InfiniteScroll({ children, direction = "left", speed = 30 }: { children: React.ReactNode; direction?: "left" | "right"; speed?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <div 
        className="flex gap-8"
        style={{ 
          animation: `scroll${direction === "left" ? "Left" : "Right"} ${speed}s linear infinite`, animationPlayState: isVisible ? "running" : "paused",
          width: "max-content"
        }}
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export function HomePartners() {
  return (
    <section className="h-[80vh] w-full flex flex-col px-6 py-12 md:py-16 overflow-hidden bg-surface">
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-20 items-center">
        <div className="flex flex-col gap-3 max-w-xs">
          <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase leading-[0.95]">
            Ils nous<br />soutiennent.
          </h2>
          {/* Fixed encoding here */}
          <p className="text-sm text-foreground/60 leading-relaxed">
            Une alliance avec ceux qui réinventent les règles.
          </p>
        </div>

        <div className="flex flex-col h-full justify-between gap-10 md:gap-14 min-h-0">
          <InfiniteScroll direction="left" speed={35}>
            {strategic.map((name, i) => (
              <span key={`s-${i}`} className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground cursor-default whitespace-nowrap px-4">
                {name}
              </span>
            ))}
          </InfiniteScroll>

          <InfiniteScroll direction="left" speed={25}>
            {media.map((name, i) => (
              <span key={`m-${i}`} className="font-sans text-base md:text-lg font-bold tracking-tight text-foreground/80 cursor-default uppercase whitespace-nowrap px-4">
                {name}
              </span>
            ))}
          </InfiniteScroll>

          <InfiniteScroll direction="left" speed={20}>
            {community.map((name, i) => (
              <span key={`c-${i}`} className="font-sans text-[10px] md:text-[11px] font-bold tracking-wider text-foreground/60 cursor-default uppercase whitespace-nowrap px-3">
                {name}
              </span>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}