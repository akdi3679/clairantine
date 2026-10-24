"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/evenements", label: "Événements" },
  { href: "/magazine", label: "Le Magazine" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact", isDropdown: true },
];

const dropdownLinks = [
  { href: "/contact", label: "Contact général" },
  { href: "/accueillir", label: "Accueillir une soirée" },
  { href: "/devenir-intervenant", label: "Devenir intervenant" },
  { href: "/devenir-partenaire", label: "Devenir partenaire" },
  { href: "/liste-attente", label: "Liste d'attente" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsMobileContactOpen(false);
  }, [pathname]);

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
              const isActive = pathname === item.href || (item.isDropdown && dropdownLinks.some(l => pathname === l.href));
              
              if (item.isDropdown) {
                return (
                  <div 
                    key={item.href} 
                    className="relative" 
                    onMouseEnter={() => setIsContactOpen(true)} 
                    onMouseLeave={() => setIsContactOpen(false)}
                  >
                    <button className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive ? "text-accent font-bold" : "text-foreground/70 hover:text-foreground"
                    }`}>
                      {item.label} <ChevronDown size={14} className={`transition-transform ${isContactOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isContactOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-background border border-border rounded-xl shadow-xl p-2 z-50"
                        >
                          {dropdownLinks.map((link) => (
                            <Link 
                              key={link.href} 
                              href={link.href} 
                              className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                                pathname === link.href ? "bg-accent/10 text-accent font-semibold" : "text-foreground/80 hover:bg-foreground/5"
                              }`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

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
              className="flex flex-col pt-32 items-center justify-center h-full gap-6 overflow-y-auto py-10"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <div key={item.href} className="flex flex-col items-center gap-4 w-full px-6">
                    {item.isDropdown ? (
                      <>
                        <button 
                          onClick={() => setIsMobileContactOpen(!isMobileContactOpen)}
                          className={`font-serif text-4xl font-bold tracking-tight transition-transform active:scale-95 flex items-center gap-2 ${
                            isActive ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {item.label} <ChevronDown size={24} className={`transition-transform ${isMobileContactOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isMobileContactOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: "auto", opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden flex flex-col gap-4 mt-2 w-full"
                            >
                              {dropdownLinks.map((link) => (
                                <Link 
                                  key={link.href} 
                                  href={link.href} 
                                  onClick={() => { setIsMobileOpen(false); setIsMobileContactOpen(false); }}
                                  className={`text-xl text-center py-2 ${pathname === link.href ? 'text-accent font-bold' : 'text-foreground/60'}`}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link 
                        href={item.href} 
                        onClick={() => setIsMobileOpen(false)} 
                        className={`font-serif text-4xl font-bold tracking-tight transition-transform active:scale-95 ${
                          isActive ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
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