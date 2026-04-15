import Link from "next/link";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

export function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="rounded-2xl border p-4 shadow-sm transition hover:shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="mb-4 h-48 w-full rounded-xl object-cover"
        />

        <h2 className="text-lg font-semibold">
          {product.brand} {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Stock: {product.quantity}
        </p>

        <p className="mt-3 text-xl font-bold">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}