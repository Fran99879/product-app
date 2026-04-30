import Link from "next/link";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="rounded-2xl border border-border overflow-hidden transition-colors hover:border-border/80 bg-background h-full flex flex-col">

        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover bg-secondary"
          onError={(e) => { e.currentTarget.src = "/placeholder.png" }}
        />

        <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5 truncate">
            {product.brand}
          </p>
          <h2 className="text-sm font-medium leading-snug line-clamp-2 flex-1">
            {product.name}
          </h2>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-lg font-medium">
              ${product.price.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
            </span>
            <span className={`text-xs shrink-0 ${product.quantity <= 3 ? "text-red-700 dark:text-red-400" : "text-muted-foreground"}`}>
              Stock: {product.quantity}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}