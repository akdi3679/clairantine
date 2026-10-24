"use client";
import { useState, useEffect, useRef } from "react";

const speakers = [
  { name: "SOPHIE MARTIN", role: "Ex-Google Design Lead", image: "https://images.unsplash.com/photo-1770096951056-c94a812e9fd4?w=500&auto=format&fit=crop&q=80" },
  { name: "THOMAS DUBOIS", role: "Fondateur, Marques Éthiques", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80" },
  { name: "CLARA VANCE", role: "Directrice Artistique", image: "https://images.unsplash.com/photo-1765005204058-10418f5123c5?w=500&auto=format&fit=crop&q=80" },
  { name: "MARC LEFEVRE", role: "Expert en Neurosciences", image: "https://images.unsplash.com/photo-1786677772080-f908094ea342?w=500&auto=format&fit=crop&q=80" },
];

export function HomeSpeakersMarquee() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const loopItems = [...speakers, ...speakers, ...speakers, ...speakers, ...speakers, ...speakers];

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-background text-foreground overflow-hidden flex flex-col justify-center">
      <div className="text-center mb-10 px-6">
        <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase">
          Nos invités d'exception.
        </h2>
      </div>

      <div className="flex w-max animate-marquee gap-8 px-4 items-start" style={{ animationPlayState: isVisible ? "running" : "paused" }}>
        {loopItems.map((speaker, i) => (
          <div key={i} className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-default w-56 md:w-64">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-surface border border-border shadow-sm group-hover:shadow-lg group-hover:border-accent/30 transition-all duration-300">
              <img src={speaker.image} alt={speaker.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
            </div>
            <div className="text-center w-full px-2">
              <h3 className="font-sans text-sm md:text-base font-black tracking-tight text-foreground uppercase leading-tight group-hover:text-accent transition-colors duration-300">
                {speaker.name}
              </h3>
              {/* Removed whitespace-nowrap to allow 2 lines, increased width prevents image from being pushed up */}
              <p className="mt-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/70 leading-tight">
                {speaker.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation-play-state: running; animation: marquee 45s linear infinite; animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation-play-state: running; animation: none !important; } }
      `}</style>
    </section>
  );
}