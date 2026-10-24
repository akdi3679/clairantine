"use client";
import { useEffect, useState } from "react";

const unsplashImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop"
];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function HomeGallery() {
  const [shuffled, setShuffled] = useState([]);

  useEffect(() => {
    const base = shuffle([...unsplashImages]);
    setShuffled([...base, ...base, ...base, ...base]);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <style jsx>{`
        .perspective-container {
          perspective: 1200px;
          mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .poster-wall {
          transform: rotateX(55deg) scale(1.3) translateY(0);
          transform-style: preserve-3d;
          animation: scrollWall 50s linear infinite;
        }
        .poster-wall:hover {
          animation-play-state: paused;
        }
        @keyframes scrollWall {
          0% { transform: rotateX(55deg) scale(1.3) translateY(0); }
          100% { transform: rotateX(55deg) scale(1.3) translateY(-50%); }
        }
      `}</style>

      {/* Layer 1: 3D Poster Wall (Covers entire screen) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center perspective-container overflow-hidden pt-20 md:pt-0">
        <div className="poster-wall grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 p-8 w-full max-w-6xl">
          {shuffled.map((url, i) => (
            <div 
              key={i} 
              className="aspect-[3/4] rounded-xl overflow-hidden bg-surface shadow-lg border border-border/50"
            >
              <img src={url} alt="Gallery" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Layer 2: Black Gradient Overlay at the very top (Behind video/text) */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-black/90 via-black/50 to-transparent z-10 pointer-events-none" />

      {/* Layer 3: Video & Text (Floating on top) */}
      <div className="relative z-20 w-full h-full flex flex-col items-center pt-[6vh] pointer-events-none">
        
        {/* Video Container: Moved up a bit, crisp edges */}
        <div className="relative w-full md:w-1/3 max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/20 backdrop-blur-sm pointer-events-auto">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/4787/4787-720.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Text moved exactly 20px (mt-5) under the video */}
        <h1 
          className="mt-5 font-serif font-bold tracking-tight text-white text-4xl md:text-6xl lg:text-7xl select-none text-center px-4"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.9), 0 4px 10px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}
        >
          CLAIRANTINE
        </h1>
      </div>
    </section>
  );
}