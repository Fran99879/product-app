"use client";

import { useEffect } from "react";
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
import {
  CATEGORIES,
  CATEGORY_LABELS,
} from "@/features/products/constants/categories";
import { SpecsEditor } from "./specs-editor";
import { ImageUpload } from "./image-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea, Select } from "@/components/ui/input";

interface Props {
  initialData?: CreateProductSchema;
  productId?: string;
  onSuccess?: () => void;
  /** Vuelve al modo "crear" descartando la edición en curso. */
  onCancel?: () => void;
}

export function CreateProductForm({
  initialData,
  productId,
  onSuccess,
  onCancel,
}: Props) {
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

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

  // react-hook-form solo toma defaultValues al montar. Al pasar a editar (o
  // cambiar de producto), reseteamos el form con los datos del producto para
  // que los campos se rellenen y la validación quede en verde.
  useEffect(() => {
    reset({ specs: {}, isActive: true, ...(initialData ?? {}) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const onSubmit = (data: CreateProductInput) => {
    const parsed = createProductSchema.parse(data);

    const handleError = (error: unknown) => {
      const message = getErrorMessage(error);
      if (message.toLowerCase().includes("stock")) {
        setError("quantity", { type: "manual", message });
      } else {
        toast.error(message);
      }
    };

    if (productId) {
      updateProduct(
        { id: productId, data: parsed },
        {
          onSuccess: () => {
            onSuccess?.();
            reset();
          },
          onError: handleError,
        }
      );
    } else {
      createProduct(parsed, {
        onSuccess: () => reset(),
        onError: handleError,
      });
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <h2 className="text-lg font-semibold text-text-primary">
          {productId ? "Editar producto" : "Crear producto"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            {...register("name")}
            label="Nombre"
            placeholder="Nombre"
            error={errors.name?.message}
          />
          <Input
            {...register("brand")}
            label="Marca"
            placeholder="Marca (Ej: Apple, Samsung, Logitech)"
            error={errors.brand?.message}
          />
        </div>

        <Textarea
          {...register("description")}
          label="Descripción"
          placeholder="Descripción"
          error={errors.description?.message}
        />

        {/* Imagen (upload a Cloudinary) */}
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              error={errors.image?.message}
            />
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            type="number"
            {...register("price", { valueAsNumber: true })}
            label="Precio"
            placeholder="Precio"
            error={errors.price?.message}
          />
          <Input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            label="Stock"
            placeholder="Stock"
            error={errors.quantity?.message}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            {...register("category")}
            label="Categoría"
            error={errors.category?.message}
          >
            <option value="">Seleccionar categoría</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category]}
              </option>
            ))}
          </Select>
          <Input
            {...register("model")}
            label="Modelo"
            placeholder="Modelo (Ej: iPhone 15 Pro, MX Master 3S)"
            error={errors.model?.message}
          />
        </div>

        {/* Is Active */}
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-text-secondary">
          <input
            type="checkbox"
            {...register("isActive")}
            id="isActive"
            className="h-4 w-4 rounded border-border-strong bg-surface accent-[var(--brand)]"
          />
          Producto activo
        </label>

        {/* Specs Editor */}
        <Controller
          name="specs"
          control={control}
          render={({ field }) => (
            <SpecsEditor value={field.value} onChange={field.onChange} />
          )}
        />

        <div className="flex flex-wrap gap-2">
          <Button
            type="submit"
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

          {productId && (
            <Button
              type="button"
              variant="secondary"
              disabled={isLoading}
              onClick={() => {
                reset({ specs: {}, isActive: true });
                onCancel?.();
              }}
            >
              Cancelar edición
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
