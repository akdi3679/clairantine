"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/evenements", label: "Événements" },
  { href: "/magazine", label: "Le Magazine" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent border-b border-transparent"
      }`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-foreground transition-all select-none">
            Clairantine
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`text-sm font-medium transition-colors relative ${
                    isActive ? "text-accent font-bold" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
            <Link href="/evenements" className="inline-flex items-center justify-center rounded-full bg-accent text-white px-6 py-2 text-sm font-bold transition-all duration-200 ease-out active:scale-[0.97] hover:bg-accent/90">
              Réserver
            </Link>
          </div>
          
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden p-2 text-foreground active:scale-90 transition-transform">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <motion.div 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: -20, opacity: 0 }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }} 
              className="flex flex-col pt-30 items-center justify-center h-full gap-8"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    onClick={() => setIsMobileOpen(false)} 
                    className={`font-serif text-4xl font-bold tracking-tight transition-transform active:scale-95 ${
                      isActive ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/evenements" onClick={() => setIsMobileOpen(false)} className="btn-primary mt-8 text-lg px-8 py-4">Réserver une place</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}