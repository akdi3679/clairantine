"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, User, Users, Calendar } from "lucide-react";

export function EventCard({ event, index }: { event: any; index: number }) {
  // Calcul de la progression (suppose une capacité par défaut de 50 si non spécifiée)
  const totalSpots = event.capacity || 50;
  const bookedSpots = totalSpots - (event.spotsLeft || 0);
  const progressPercentage = Math.min(Math.max((bookedSpots / totalSpots) * 100, 5), 100);
  
  const isFull = event.spotsLeft === 0 || event.status === "full";
  const isPast = event.status === "past" || event.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* IMAGE & BADGE */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        {event.image ? (
          <Image 
            src={event.image} 
            alt={event.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium">[ Image de l'événement ]</div>
        )}
        
        {/* BADGE DE STATUT */}
        <div className="absolute top-4 left-4">
          {isPast ? (
            <span className="rounded-full bg-slate-900/80 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
              Terminé
            </span>
          ) : isFull ? (
            <span className="rounded-full bg-slate-700/90 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
              Complet
            </span>
          ) : event.spotsLeft && event.spotsLeft <= 10 ? (
            <span className="rounded-full bg-accent/90 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm animate-pulse">
              Presque complet
            </span>
          ) : null}
        </div>
      </div>

      {/* CONTENU DE LA CARTE */}
      <div className="flex flex-col flex-1 p-6">
        {/* Catégorie & Date (avec jour de la semaine) */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md">
            {event.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar size={12} />
            {new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
        </div>

        {/* Titre */}
        <Link href={`/evenements/${event.slug}`} className="block group-hover:text-accent transition-colors mb-2">
          <h3 className="font-sans text-xl font-bold tracking-tight leading-snug text-slate-900 line-clamp-2">
            {event.title}
          </h3>
        </Link>

        {/* Petite Description */}
        {event.description && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {event.description}
          </p>
        )}

        {/* Intervenant & Job (affiché complètement, même sur 2 lignes) */}
        <div className="flex items-start gap-2 mb-3 text-sm text-slate-700">
          <User size={14} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">{event.speaker?.name || "Intervenant"}</span>
            {event.speaker?.role && <span className="text-slate-500 font-normal">, {event.speaker.role}</span>}
          </div>
        </div>

        {/* Salle (Lieu) */}
        <div className="flex items-center gap-2 mb-4 text-sm text-slate-700">
          <MapPin size={14} className="text-accent flex-shrink-0" />
          <span className="truncate font-medium">{event.location?.name}</span>
          <span className="text-slate-500">· {event.location?.city}</span>
        </div>

        {/* Barre de progression & Places restantes */}
        {!isPast && (
          <div className="mt-auto pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <Users size={14} className="text-accent" />
                <span>
                  {event.spotsLeft !== undefined 
                    ? `${event.spotsLeft} place${event.spotsLeft > 1 ? 's' : ''} restante${event.spotsLeft > 1 ? 's' : ''}` 
                    : "Places limitées"}
                </span>
              </div>
              {isFull && <span className="text-xs font-bold text-slate-700">Complet</span>}
            </div>
            
            {/* Barre de progression visuelle (orange au lieu de rouge, accent au lieu de vert) */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full rounded-full ${
                  isFull ? "bg-slate-400" : 
                  progressPercentage > 80 ? "bg-orange-500" : 
                  progressPercentage > 50 ? "bg-accent" : "bg-accent/60"
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}