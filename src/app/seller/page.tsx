import Link from "next/link";
import {
  BuildingStorefrontIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { SellerProducts } from "@/features/seller/components/seller-products";
import { MercadoPagoCard } from "@/features/payments/components/mercadopago-card";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export default function SellerPage() {
  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title="Panel Seller"
          description="Gestioná tus productos y ventas"
          icon={<BuildingStorefrontIcon />}
          action={
            <>
              <Link href="/seller/dashboard">
                <Button
                  variant="secondary"
                  leftIcon={<ChartBarIcon className="h-4 w-4" />}
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/seller/orders">
                <Button
                  variant="secondary"
                  leftIcon={<ClipboardDocumentListIcon className="h-4 w-4" />}
                >
                  Pedidos
                </Button>
              </Link>
            </>
          }
        />
        <div className="mt-8 space-y-6">
          <MercadoPagoCard />
          <SellerProducts />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
