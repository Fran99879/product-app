"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  
  createProductSchema,
  CreateProductInput,
  CreateProductSchema,
} from "../schemas/create-product.schema";
import { useCreateProduct } from "../hooks/use-create-product";
import { useUpdateProduct } from "../hooks/use-update-product";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { CATEGORIES, CATEGORY_LABELS } from "@/features/products/constants/categories";
import { SpecsEditor } from "./specs-editor";
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
    control,
    formState: { errors, isValid },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),

    defaultValues: {
      specs: {},
      isActive: true,
      ...initialData,
    },

    mode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = (data: CreateProductInput) => {
  const parsed = createProductSchema.parse(data);

  if (productId) {
    updateProduct(
      {
        id: productId,
        data: parsed,
      },
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
    createProduct(parsed, {
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
        {productId ? "Editar producto" : "Crear producto"}
      </h2>

      {/* Nombre */}
      <div>
        <input
          {...register("name")}
          placeholder="Nombre"
          className={`w-full rounded-lg border p-3 ${errors.name ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Brand (ahora campo de texto libre) */}
      <div>
        <input
          {...register("brand")}
          placeholder="Marca (Ej: Apple, Samsung, Logitech)"
          className={`w-full rounded-lg border p-3 ${errors.brand ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.brand && (
          <p className="text-sm text-red-500 mt-1">{errors.brand.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <textarea
          {...register("description")}
          placeholder="Descripción"
          className={`w-full rounded-lg border p-3 ${errors.description ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <input
          {...register("image")}
          placeholder="URL de la imagen"
          className={`w-full rounded-lg border p-3 ${errors.image ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.image && (
          <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Precio"
          className={`w-full rounded-lg border p-3 ${errors.price ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.price && (
          <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Quantity (Stock) */}
      <div>
        <input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          placeholder="Stock"
          className={`w-full rounded-lg border p-3 ${errors.quantity ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.quantity && (
          <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <select
          {...register("category")}
          className={`w-full rounded-lg border p-3 ${errors.category ? "border-red-500" : "border-gray-300"
            }`}
        >
          <option value="">Seleccionar categoría</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Model */}
      <div>
        <input
          {...register("model")}
          placeholder="Modelo (Ej: iPhone 15 Pro, MX Master 3S)"
          className={`w-full rounded-lg border p-3 ${errors.model ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.model && (
          <p className="text-sm text-red-500 mt-1">{errors.model.message}</p>
        )}
      </div>

      {/* Is Active */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("isActive")}
          id="isActive"
          className="w-4 h-4"
        />
        <label htmlFor="isActive" className="text-sm">
          Producto activo
        </label>
      </div>

      {/* Specs Editor */}
      <Controller
        name="specs"
        control={control}
        render={({ field }) => (
          <SpecsEditor
            value={field.value}
            onChange={field.onChange}
          />
        )}
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