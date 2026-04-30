export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-4">
      {children}
    </div>
  );
}