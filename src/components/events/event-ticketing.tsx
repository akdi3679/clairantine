"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Shield, Users, Clock, Star } from "lucide-react";

export function EventTicketing({ eventName }: { eventName: string }) {
  const [selectedTicket, setSelectedTicket] = useState("standard");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tickets = [
    { 
      id: "early", 
      name: "Early Bird", 
      price: 35, 
      badge: "Limité",
      desc: "Réservez tôt, économisez plus",
      features: [
        "Accès complet à l'événement",
        "Welcome drink inclus",
        "Accès au networking session",
        "Documentation digitale"
      ],
      popular: false
    },
    { 
      id: "standard", 
      name: "Standard", 
      price: 45, 
      badge: "Populaire",
      desc: "L'expérience complète",
      features: [
        "Accès complet à l'événement",
        "Welcome drink inclus",
        "Accès au networking session",
        "Documentation digitale",
        "Enregistrement vidéo (30 jours)",
        "Certificat de participation"
      ],
      popular: true
    },
    { 
      id: "duo", 
      name: "Duo", 
      price: 75, 
      badge: "2 personnes",
      desc: "Venez accompagné et économisez",
      features: [
        "2 places complètes",
        "Welcome drinks inclus (x2)",
        "Accès au networking session",
        "Documentation digitale (x2)",
        "Enregistrement vidéo (30 jours)",
        "Certificats de participation (x2)",
        "Économisez 15 vs 2 billets séparés"
      ],
      popular: false
    },
  ];

  if (isSubmitted) {
    return (
      <section id="ticketing" className="mx-auto max-w-4xl px-6 py-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl bg-white border border-slate-200 p-12 text-center"
        >
          <CheckCircle2 size={64} className="mx-auto text-accent mb-6" />
          <h2 className="font-sans text-3xl font-bold text-black mb-4">Réservation confirmée !</h2>
          <p className="text-slate-600 mb-2">Votre place pour <strong className="text-black">{eventName}</strong> est réservée.</p>
          <p className="text-slate-600">Un email de confirmation avec tous les détails vous a été envoyé.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="ticketing" className="mx-auto max-w-5xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-white border border-slate-200 p-8 md:p-12"
      >
        <div className="mb-10 text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-black mb-3">
            Réservez votre place
          </h2>
          <p className="text-lg text-slate-600">{eventName}</p>
        </div>

        {/* 3 Tickets - HORIZONTAL with detailed info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                selectedTicket === ticket.id
                  ? "border-accent bg-accent/5 shadow-xl scale-105"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
              }`}
            >
              {ticket.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> Populaire
                  </span>
                </div>
              )}
              
              {selectedTicket === ticket.id && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 size={24} className="text-accent" />
                </div>
              )}

              <div className="mb-4">
                <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                  {ticket.badge}
                </span>
                <h3 className="font-sans font-bold text-black text-xl mb-1">{ticket.name}</h3>
                <p className="text-sm text-slate-600">{ticket.desc}</p>
              </div>

              <div className="mb-5">
                <span className="text-4xl font-bold text-black">{ticket.price}</span>
                {ticket.id === "duo" && <span className="text-sm text-slate-500 ml-2">/ 2 pers.</span>}
              </div>

              <div className="space-y-2 pt-5 border-t border-slate-200">
                {ticket.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => setIsSubmitted(true)}
          className="w-full bg-accent text-white text-lg py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:scale-[1.02]"
        >
          <Calendar size={20} /> Réserver maintenant
        </button>

        {/* Trust Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-accent" />
            <span>Paiement 100% sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-accent" />
            <span>Annulation gratuite jusqu'à 48h avant</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-accent" />
            <span>Confirmation instantanée</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}