"use client";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export function VelvetRopeContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-12">
      {/* The blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-background/60 z-10 flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-border/50">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
          <Lock size={20} />
        </div>
        <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          La suite de cette histoire est réservée à notre communauté.
        </h3>
        <p className="mt-2 text-foreground/70 max-w-md">
          Rejoignez notre cercle Insider pour accéder aux portraits complets, aux coulisses et aux invitations en avant-première.
        </p>
        <button data-cursor-magnetic data-cursor-text="Rejoindre" className="btn-primary mt-6">
          Débloquer l'accès complet
        </button>
      </div>
      {/* The actual content (blurred by CSS) */}
      <div className="blur-sm select-none pointer-events-none text-foreground/80 leading-[1.7] text-lg">
        {children}
      </div>
    </div>
  );
}