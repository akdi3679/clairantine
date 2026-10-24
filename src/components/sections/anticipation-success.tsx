"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function AnticipationSuccess({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col items-center px-6 py-24"
    >
      {/* ========================================== */}
      {/* TOP: FULL WIDTH SUCCESS MESSAGE            */}
      {/* ========================================== */}
      <div className="w-full max-w-3xl text-center mb-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, delay: 0.2 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-8"
        >
          <CheckCircle2 size={40} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-foreground"
        >
          Message envoyé.
        </motion.h2>

        {/* Your refined text: warm, human, and editorial */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic"
        >
          "Nous avons hâte d'entendre votre voix. Partager vos idées, vos opinions et vos projets, c'est exactement la raison d'être de Clairantine."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-foreground/60 text-lg"
        >
          Notre équipe vous répondra sous 24 à 48h. En attendant, prenez le temps de respirer.
        </motion.p>
      </div>

      {/* ========================================== */}
      {/* BOTTOM: IMAGE + AMBIANCE PREPARATION       */}
      {/* ========================================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", damping: 20 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Visual Trust Element (Image Placeholder) */}
        <div className="aspect-[4/5] rounded-3xl bg-foreground/5 overflow-hidden relative shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-serif text-2xl text-center p-8 bg-gradient-to-br from-accent/10 to-foreground/5">
            [ Photo authentique de l'équipe ou d'un événement ]
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
        </div>

        {/* Ambiance & Preparation Cards */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border p-6 bg-background">
            <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-2">Préparez votre venue</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Si vous nous rejoignez pour un événement, arrivez 15 min avant pour le networking. L'esprit ouvert, la tenue décontractée mais soignée.
            </p>
          </div>
          <div className="rounded-2xl border border-border p-6 bg-background">
            <h3 className="font-serif text-xl font-bold tracking-tight text-foreground mb-2">L'Ambiance</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Oubliez le stress du quotidien. Nos espaces sont conçus pour être des bulles d'air pur. Venez comme vous êtes, repartez inspiré.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 flex flex-col sm:flex-row gap-4"
      >
        <button onClick={onReset} className="btn-secondary">
          Envoyer un autre message
        </button>
        <Link href="/magazine" className="btn-primary">
          Lire le magazine
        </Link>
      </motion.div>
    </motion.div>
  );
}