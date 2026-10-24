"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service (e.g., Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
        Oups, quelque chose s'est mal passé.
      </h2>
      <p className="mt-4 max-w-md text-foreground/70">
        Nous n'avons pas pu charger cette page. Veuillez réessayer dans un instant.
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 rounded-full bg-accent px-6 py-3 font-medium text-white transition-transform hover:scale-[0.98] active:scale-95"
      >
        Réessayer
      </button>
    </div>
  );
}