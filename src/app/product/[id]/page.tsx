import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ProductDetail } from "@/features/products/components/product-detail";
import { getProductByIdServer } from "@/features/products/services/get-product-by-id.server";
import { CATEGORY_LABELS } from "@/features/products/constants/categories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByIdServer(id);

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto que buscás no existe o ya no está disponible.",
    };
  }

  const categoryLabel =
    CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS] ??
    product.category;
  const priceLabel = `$${product.price.toLocaleString("es-AR")}`;
  const description =
    product.description.length > 160
      ? `${product.description.slice(0, 157)}…`
      : product.description;

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} — ${priceLabel}`,
      description,
      type: "website",
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ${priceLabel}`,
      description,
      images: product.image ? [product.image] : [],
    },
    other: {
      "product:brand": product.brand,
      "product:category": categoryLabel,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Deduplicado con el fetch de generateMetadata (misma URL + cache de fetch).
  const product = await getProductByIdServer(id);

  const jsonLd = product && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: product.image || undefined,
    brand: { "@type": "Brand", name: product.brand },
    category:
      CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS] ??
      product.category,
    ...(product.model ? { model: product.model } : {}),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability:
        product.quantity > 0 && product.isActive
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.rate > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rate,
            ratingCount: 1,
          },
        }
      : {}),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Volver al catálogo
      </Link>
      <ProductDetail id={id} />
    </main>
  );
}
