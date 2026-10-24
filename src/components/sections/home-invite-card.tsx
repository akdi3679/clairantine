"use client";
import { useState, useRef } from "react";
import { Download, Link as LinkIcon, ChevronDown } from "lucide-react";

const events = [
  { id: 1, title: "L'Art de Pitcher", venue: "Le Comptoir, Paris", dates: "12 Nov" },
  { id: 2, title: "Design & Neurosciences", venue: "La Ruche, Lyon", dates: "24 Nov" },
  { id: 3, title: "Marques Éthiques", venue: "L'Atelier, Bordeaux", dates: "5 Déc" },
];

const TICKET_SVG_MASK = `url("data:image/svg+xml,%3Csvg viewBox='0 0 741 425' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 25 0 L 541 0 A 21 21 0 0 0 583 0 L 716 0 A 25 25 0 0 0 741 25 L 741 400 A 25 25 0 0 0 716 425 L 583 425 A 21 21 0 0 0 541 425 L 25 425 A 25 25 0 0 0 0 400 L 0 25 A 25 25 0 0 0 25 0 Z' fill='white'/%3E%3C/svg%3E")`;

export function HomeInviteCard() {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [inviterName, setInviterName] = useState("Alexandre D.");
  const [inviteeName, setInviteeName] = useState("Sophie Martin");

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale(1.03)`;
    const glare = cardRef.current.querySelector(`.glare`) as HTMLElement;
    if (glare) { glare.style.background = `radial-gradient(38% 55% at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`; glare.style.opacity = `1`; }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.touches[0].clientX - rect.left) / rect.width;
    const y = (e.touches[0].clientY - rect.top) / rect.height;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale(1.03)`;
    const glare = cardRef.current.querySelector(`.glare`) as HTMLElement;
    if (glare) { glare.style.background = `radial-gradient(38% 55% at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`; glare.style.opacity = `1`; }
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    const glare = cardRef.current.querySelector(`.glare`) as HTMLElement;
    if (glare) glare.style.opacity = `0`;
  };

  const handleDownload = () => alert("Génération de l'image en cours...");
  const handleCopyLink = () => {
    const link = `${window.location.origin}/invite?event=${selectedEvent.id}&to=${encodeURIComponent(inviteeName)}`;
    navigator.clipboard.writeText(link);
    alert("Lien copié !");
  };

  return (
    <section id="contact" className="py-24 px-6 bg-surface">
      <style jsx>{`
        @keyframes meshMove {
          0% { 
            background-position: 0% 0%;
            opacity: 0.9;
          }
          100% { 
            background-position: 30% 30%;
            opacity: 1;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
          
          <div className="flex flex-col gap-6 order-1 lg:order-1">
            <div>
              <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase mb-3">
                Invitez quelqu'un<br />d'exceptionnel.
              </h2>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed max-w-md">
                Personnalisez votre invitation digitale et partagez-la en un clic.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 max-w-2xl">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1.5">Événement</label>
                <div className="relative">
                  <select 
                    value={selectedEvent.id}
                    onChange={(e) => setSelectedEvent(events.find(ev => ev.id === Number(e.target.value)) || events[0])}
                    className="w-full appearance-none bg-transparent text-sm font-bold text-foreground focus:outline-none py-2 border-b border-border/50 focus:border-accent transition-colors pr-6 cursor-pointer"
                  >
                    {events.map(ev => (
                      <option key={ev.id} value={ev.id} className="bg-background text-foreground">{ev.title}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1 min-w-[140px]">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1.5">Votre nom</label>
                <input 
                  type="text" 
                  value={inviterName}
                  onChange={(e) => setInviterName(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-foreground placeholder:text-foreground/30 focus:outline-none py-2 border-b border-border/50 focus:border-accent transition-colors" 
                />
              </div>

              <div className="flex-1 min-w-[140px]">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1.5">Nom de l'invité</label>
                <input 
                  type="text" 
                  value={inviteeName}
                  onChange={(e) => setInviteeName(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-foreground placeholder:text-foreground/30 focus:outline-none py-2 border-b border-border/50 focus:border-accent transition-colors" 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-2 lg:order-2">
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              onTouchMove={handleTouchMove}
              onTouchEnd={resetTilt}
              className="relative w-full max-w-[450px] aspect-[741/425] transition-transform duration-300 ease-out will-change-transform"
              style={{ 
                maskImage: TICKET_SVG_MASK,
                WebkitMaskImage: TICKET_SVG_MASK,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.15))",
                transition: "transform 0.3s ease-out",
                transformStyle: "preserve-3d"
              }}
            >
              {/* SUBTLE ANIMATION - plays only twice */}
              <div className="absolute inset-0 bg-accent z-0">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0px, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(0,0,0,0.15) 0px, transparent 50%),
                      radial-gradient(circle at 50% 50%, rgba(255,200,150,0.2) 0px, transparent 60%)
                    `,
                    backgroundSize: "150% 150%",
                    animation: "meshMove 10s ease-in-out 2",
                  }}
                />
              </div>

              <div className="absolute inset-0 mix-blend-overlay opacity-40 z-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
              }} />

              <div className="absolute top-0 bottom-0 left-[75.84%] w-px z-20" style={{
                backgroundImage: `repeating-linear-gradient(to bottom, rgba(0,0,0,0.3) 0 4px, transparent 4px 8px)`
              }} />

              <div className="absolute top-0 bottom-0 left-0 right-[24.16%] z-30 p-4 md:p-6 text-white flex flex-col justify-between">
                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-90">
                  <div>Invité par</div>
                  <div>{inviterName || "..."}</div>
                </div>

                <div className="flex-1 flex flex-col justify-center pr-4">
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                    {selectedEvent.title}
                  </div>
                  <h3 className="font-serif text-xl md:text-3xl font-black tracking-tight leading-none uppercase break-words text-white">
                    {inviteeName || "Votre Invité"}
                  </h3>
                </div>

                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-90">
                  {selectedEvent.venue} • {selectedEvent.dates}
                </div>
              </div>

              <div className="absolute top-0 bottom-0 left-[75.84%] right-0 z-30 flex flex-col items-center justify-center">
                <span className="font-serif font-bold text-white/30 text-2xl md:text-4xl tracking-tighter" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  CLAIRANTINE
                </span>
                <span className="absolute bottom-4 font-sans text-[8px] md:text-[10px] font-bold tracking-widest text-white/70 uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  Admit One
                </span>
              </div>

              <div className="glare absolute inset-0 pointer-events-none transition-opacity duration-300 z-40" style={{
                background: "transparent", opacity: 0
              }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto lg:mx-0 order-3">
          <button onClick={handleDownload} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white px-5 py-3 font-bold text-xs sm:text-sm transition-all duration-200 ease-out active:scale-[0.97] hover:bg-accent/90 shadow-lg">
            <Download size={14} /> Télécharger
          </button>
          <button onClick={handleCopyLink} className="flex-1 flex items-center justify-center gap-2 bg-background border border-border text-foreground px-5 py-3 rounded-full font-bold text-xs sm:text-sm hover:border-accent hover:text-accent transition-all">
            <LinkIcon size={14} /> Copier le lien
          </button>
        </div>

      </div>
    </section>
  );
}