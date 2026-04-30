"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  CreateProductSchema,
} from "../schemas/create-product.schema";
import { useCreateProduct } from "../hooks/use-create-product";
import { useUpdateProduct } from "../hooks/use-update-product";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { BRANDS } from "@/features/products/constants/brands";
import { Button } from "@/components/ui/button";



interface Props {
  initialData?: CreateProductSchema;
  productId?: string;
  onSuccess?: () => void;
}

export function CreateProductForm({
  initialData,
  productId,
  onSuccess,
}: Props) {
  const {
    mutate: createProduct,
    isPending: isCreating,
  } = useCreateProduct();

  const {
    mutate: updateProduct,
    isPending: isUpdating,
  } = useUpdateProduct();

  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialData,
    mode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = (data: CreateProductSchema) => {
    if (productId) {
      updateProduct(
        { id: productId, data },
        {
          onSuccess: () => {
            onSuccess?.();
            reset();
          },
          onError: (error) => {
            const message = getErrorMessage(error);

            if (message.toLowerCase().includes("stock")) {
              setError("quantity", {
                type: "manual",
                message,
              });
            } else {
              toast.error(message);
            }
          },
        }
      );
    } else {
      createProduct(data, {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          const message = getErrorMessage(error);

          if (message.toLowerCase().includes("stock")) {
            setError("quantity", {
              type: "manual",
              message,
            });
          } else {
            toast.error(message);
          }
        },
      });
    }
  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 space-y-4 rounded-2xl border p-6"
    >
      <h2 className="text-xl font-bold">
        Crear producto
      </h2>

      <input
        {...register("name")}
        placeholder="Nombre"
        className={`w-full rounded-lg border p-3 ${errors.name ? "border-red-500" : "border-gray-300"
          }`}
      />

      {errors.name && (
        <p className="text-sm text-red-500 mt-1">
          {errors.name.message}
        </p>
      )}

      <select {...register("brand")}>
        <option value="" disabled>
          Seleccionar marca
        </option>

        {BRANDS.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <textarea
        {...register("description")}
        placeholder="Descripción"
        className="w-full rounded-lg border p-3"
      />

      <input
        {...register("image")}
        placeholder="URL imagen"
        className="w-full rounded-lg border p-3"
      />

      <input
        type="number"
        {...register("price", { valueAsNumber: true })}
        placeholder="Precio"
        className="w-full rounded-lg border p-3"
      />

      <input
        type="number"
        {...register("quantity", { valueAsNumber: true })}
        placeholder="Stock"

        className="w-full rounded-lg border p-3"
      />

      <Button
        loading={isLoading}
        disabled={!isValid || isLoading}
      >
        {isLoading
          ? productId
            ? "Actualizando..."
            : "Creando..."
          : productId
            ? "Actualizar producto"
            : "Crear producto"}
      </Button>
    </form>
  );
}