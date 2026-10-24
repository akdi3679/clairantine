"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Star, Truck, ShieldCheck } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  desc: string;
  features: string[];
}

const products: Product[] = [
  { 
    id: 1, name: "Le Manifeste Clairantine", price: "24", category: "Édition", 
    desc: "Un ouvrage de 120 pages qui résume notre philosophie. Papier recyclé premium, reliure cousue.",
    features: ["120 pages, papier 100g", "Reliure cousue durable", "Signé par les fondateurs"]
  },
  { 
    id: 2, name: "Tote Bag - Édition Limitée", price: "18", category: "Accessoire", 
    desc: "Toile de coton épaisse et résistante, sérigraphie à l'encre à l'eau.",
    features: ["100% coton biologique", "Anses renforcées", "Lavable en machine"]
  },
  { 
    id: 3, name: "Carnet de Notes Texturé", price: "22", category: "Papeterie", 
    desc: "Papier ivoire 120g sans acide, idéal pour l'écriture et le croquis.",
    features: ["192 pages ivoire", "Marque-page intégré", "Format A5 pratique"]
  },
];

export default function BoutiquePage() {
  // FIX: Explicitly type the state as Product or null
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-[#EBE5D9] relative pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-16 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black">
          L'esprit Clairantine,<br />
          <span className="text-accent">chez vous.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto">
          Des objets pensés pour les créatifs et les entrepreneurs qui ne se contentent pas de l'ordinaire.
        </motion.p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="aspect-square rounded-2xl bg-white border border-slate-200 mb-4 flex items-center justify-center text-slate-300 font-sans text-2xl overflow-hidden relative">
                [ Photo Produit ]
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2">
                    <ShoppingBag size={16} /> Voir les détails
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">{product.category}</span>
              <h3 className="mt-1 font-sans text-lg font-bold tracking-tight text-black group-hover:text-accent transition-colors">{product.name}</h3>
              <p className="mt-1 text-slate-600 font-medium">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Slide-Over Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#EBE5D9] border-l border-slate-200 z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-8">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors">
                  <X size={24} className="text-slate-600" />
                </button>

                <div className="aspect-square rounded-2xl bg-white border border-slate-200 mb-8 flex items-center justify-center text-slate-300 font-sans text-2xl">
                  [ Photo Produit ]
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-accent">{selectedProduct.category}</span>
                <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-black">{selectedProduct.name}</h2>
                <p className="mt-4 text-2xl font-medium text-slate-600">{selectedProduct.price}</p>
                
                <p className="mt-6 text-slate-600 leading-relaxed">{selectedProduct.desc}</p>

                <ul className="mt-8 space-y-3">
                  {selectedProduct.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                      <Star size={16} className="text-accent" /> {feature}
                    </li>
                  ))}
                </ul>

                <button className="mt-10 w-full bg-accent text-white text-lg py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors">
                  <ShoppingBag size={20} /> Ajouter au panier
                </button>

                <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Truck size={18} className="text-accent" /> Livraison gratuite dès 50 d'achat
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <ShieldCheck size={18} className="text-accent" /> Retour gratuit sous 30 jours
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}