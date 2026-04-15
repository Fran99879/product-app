import { ProductsGrid } from "@/features/products/components/products-grid";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Catálogo de productos
      </h1>

      <ProductsGrid />
    </main>
  );
}