import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { OrdersList } from "@/features/orders/components/orders-list";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <PageContainer size="narrow">
        <PageHeader
          title="Mis pedidos"
          description="Seguí el estado de tus compras"
          icon={<ClipboardDocumentListIcon />}
        />
        <div className="mt-8">
          <OrdersList />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
