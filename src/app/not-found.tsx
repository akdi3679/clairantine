import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="font-serif text-[12rem] md:text-[18rem] font-bold tracking-tighter text-foreground/5 leading-none">404</h1>
        <p className="mt-4 font-serif text-2xl md:text-3xl italic text-foreground/80">
          Vous vous êtes perdu.
        </p>
        <p className="mt-2 text-foreground/60 max-w-md mx-auto">
          C'est souvent ici qu'on trouve les meilleures idées. Mais puisque vous êtes là, voici nos créations les plus récentes pour vous rattraper.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/magazine" className="btn-primary">Lire le magazine</Link>
          <Link href="/evenements" className="btn-secondary">Voir les événements</Link>
        </div>
      </motion.div>
    </div>
  );
}