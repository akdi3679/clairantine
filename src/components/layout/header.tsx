"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Événements", href: "/evenements" },
  { name: "Salons", href: "/salons" },
  { name: "Média", href: "/media" },
  { name: "Produits", href: "/produits" },
  { name: "Contact", href: "/contact", isPrimary: true },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-serif font-bold text-xl md:text-2xl tracking-tight text-foreground hover:text-accent transition-colors">
          CLAIRANTINE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            if (link.isPrimary) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`ml-4 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-white shadow-lg scale-105"
                      : "bg-foreground text-background hover:bg-accent hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-accent" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
}