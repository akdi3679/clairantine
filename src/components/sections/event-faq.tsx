"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "C'est pour qui ?", a: "Pour les curieux. Pas besoin d'être expert, d'avoir fait d'études particulières, ni de connaître le sujet. Si vous avez envie d'écouter et d'échanger, vous êtes au bon endroit." },
  { q: "Je peux venir seul·e ?", a: "Absolument. Plus de la moitié de nos participants viennent seuls. C'est même le meilleur moyen de rencontrer des gens inspirants dans un cadre détendu." },
  { q: "C'est du networking formel ?", a: "Pas du tout. Oubliez les échanges de cartes de visite forcées. C'est un bar, c'est vivant, c'est authentique. Les connexions se font naturellement autour d'un verre." },
  { q: "Et si je ne peux plus venir ?", a: "Vous pouvez annuler gratuitement jusqu'à 48h avant l'événement. Il suffit de cliquer sur le lien dans votre email de confirmation." },
];

export function EventFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 border-t border-border">
      <h2 className="font-serif text-3xl font-bold tracking-tight text-center">Des questions ?</h2>
      <div className="mt-12 max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-border/50 pb-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-accent"
            >
              <span className="text-lg font-semibold tracking-tight">{faq.q}</span>
              <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ type: "spring", damping: 20 }}>
                <ChevronDown size={20} className="text-foreground/50" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-foreground/70 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}