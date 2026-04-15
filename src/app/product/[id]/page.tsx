import { ProductDetail } from "@/features/products/components/product-detail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <ProductDetail id={id} />
    </main>
  );
}