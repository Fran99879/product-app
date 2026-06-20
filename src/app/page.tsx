import { ProductCatalog } from "@/features/products/components/product-catalog";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Catálogo de productos
      </h1>

      <ProductCatalog />
    </main>
  );
}