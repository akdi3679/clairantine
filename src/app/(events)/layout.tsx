export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-background">
      {/* Events specific layout wrapper */}
      {children}
    </section>
  );
}