"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "C'est pour qui ?", a: "Pour les curieux. Pas besoin d'être expert. Si vous avez envie d'écouter et d'échanger, vous êtes au bon endroit." },
  { q: "Je peux venir seul·e ?", a: "Absolument. Plus de la moitié de nos participants viennent seuls. C'est le meilleur moyen de rencontrer des gens inspirants." },
  { q: "C'est du networking formel ?", a: "Pas du tout. Oubliez les échanges de cartes forcés. C'est vivant, authentique. Les connexions se font naturellement." },
  { q: "Et si je ne peux plus venir ?", a: "Vous pouvez annuler gratuitement jusqu'à 48h avant l'événement via le lien dans votre email." },
];

export function HomeGeneralFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-surface">
      {/* Added items-start to ensure the sticky column doesn't stretch and break */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Sticky Title & Description */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {/* Updated Title Font */}
          <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase">
            Des questions ?
          </h2>
          <p className="mt-6 text-base text-foreground/60 leading-relaxed">
            Nous voulons que votre expérience soit fluide et sans friction. Voici les réponses aux questions les plus fréquentes.
          </p>
        </div>

        {/* Right Side: Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border/50 pb-4">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-accent">
                <span className="text-lg font-bold tracking-tight text-foreground">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ type: "spring", damping: 20 }}><ChevronDown size={20} className="text-foreground/50" /></motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: "spring", damping: 20, stiffness: 300 }} className="overflow-hidden">
                    <p className="pb-4 text-foreground/70 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}