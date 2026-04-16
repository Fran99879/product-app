"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  CreateProductSchema,
} from "../schemas/create-product.schema";
import { useCreateProduct } from "../hooks/use-create-product";

export function CreateProductForm() {
  const { mutate, isPending } = useCreateProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (data: CreateProductSchema) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
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
        className="w-full rounded-lg border p-3"
      />
      <p className="text-sm text-red-500">{errors.name?.message}</p>

      <input
        {...register("brand")}
        placeholder="Marca"
        className="w-full rounded-lg border p-3"
      />
      <p className="text-sm text-red-500">{errors.brand?.message}</p>

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
        {...register("price")}
        placeholder="Precio"
        className="w-full rounded-lg border p-3"
      />

      <input
        type="number"
        {...register("quantity")}
        placeholder="Stock"
        className="w-full rounded-lg border p-3"
      />

      <button
        disabled={isPending}
        className="rounded-xl bg-black px-6 py-3 text-white"
      >
        {isPending ? "Creando..." : "Crear producto"}
      </button>
    </form>
  );
}