
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HomeHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with infinite, slow cinematic zoom animation */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "linear" 
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.65] contrast-110"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1603478804503-dc909c7f5ce5?w=1920&auto=format&fit=crop&q=80')",
          }}
        />
      </div>

      {/* Gradient Overlay: Smoothly blends into the cream background (#EBE5D9) of the page */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#EBE5D9] via-[#EBE5D9]/70 to-transparent" />

      {/* Content - Anchored to Bottom with responsive padding */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 md:pb-16 px-6">
        <div className="mx-auto max-w-7xl w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ type: "spring", damping: 25, stiffness: 100, delay: 0.2 }}
            className="max-w-4xl"
          >
            {/* Smaller h1, but still semantically an h1 */}
            <h1 className="font-sans font-black tracking-tighter  leading-[0.9] mb-6 text-4xl md:text-6xl lg:text-7xl">
              EXPLORING<br />
              <span className="text-accent">THE FUTURE.</span>
            </h1>
           
            <p className="mt-6 text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl font-medium">
              Nous réunissons les esprits créatifs et les esprits d'entreprise autour d'événements inspirants et d'un magazine indépendant.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              {/* Dark buttons for high contrast against the white bottom */}
              <Link href="/evenements" className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-4 font-sans text-base font-bold transition-all duration-200 ease-out active:scale-[0.97] hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
                Découvrir les événements
              </Link>
              <Link href="/magazine" className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-transparent px-8 py-4 font-sans text-base font-bold text-foreground transition-all duration-200 ease-out active:scale-[0.97] hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
                Explorer le magazine
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}