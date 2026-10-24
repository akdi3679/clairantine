import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#EBE5D9] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-sans text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-4">
        404
      </h1>
      <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-md">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-4 text-lg font-semibold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}