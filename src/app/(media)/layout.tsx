export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-background">
      {/* Media specific layout wrapper */}
      {children}
    </section>
  );
}