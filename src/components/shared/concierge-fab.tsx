"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ConciergeFab() {
  return (
    <motion.a
      href="https://wa.me/33123456789?text=Bonjour%20Clairantine,%20j'aimerais%20discuter%20d'une%20collaboration."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 15, delay: 2 }}
      className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-110 active:scale-95 md:bottom-8"
      aria-label="Contacter via WhatsApp"
      data-cursor-magnetic
      data-cursor-text="Discuter"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}