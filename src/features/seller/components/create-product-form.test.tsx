import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { CreateProductForm } from "./create-product-form";

const mockCreateProduct = vi.fn();
const mockUpdateProduct = vi.fn();

vi.mock("../hooks/use-create-product", () => ({
    useCreateProduct: () => ({
        mutate: mockCreateProduct,
        isPending: false,
    }),
}));

vi.mock("../hooks/use-update-product", () => ({
    useUpdateProduct: () => ({
        mutate: mockUpdateProduct,
        isPending: false,
    }),
}));

describe("CreateProductForm", () => {
    it("renders all product fields", () => {
        render(<CreateProductForm />);

        expect(screen.getByPlaceholderText("Nombre"))
            .toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(
                /Marca \(Ej: Apple, Samsung, Logitech\)/i
            )
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Descripción")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("URL de la imagen")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Precio")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Stock")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText(
                /Modelo \(Ej: iPhone 15 Pro, MX Master 3S\)/i
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Producto activo/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Especificaciones Técnicas/i)
        ).toBeInTheDocument();
    });

    it("renders create button", () => {
        render(<CreateProductForm />);

        expect(
            screen.getByRole("button", {
                name: /crear producto/i,
            })
        ).toBeInTheDocument();
    });

    it("renders update mode", async () => {
        render(
            <CreateProductForm
                productId="123"
                initialData={{
                    name: "MacBook",
                    description: "Test",
                    image: "https://test.com",
                    price: 1000,
                    brand: "Apple",
                    category: "laptop",
                    model: "M3",
                    quantity: 5,
                    specs: {},
                    isActive: true,
                }}
            />
        );

        expect(
            await screen.findByText(/editar producto/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /actualizar producto/i,
            })
        ).toBeInTheDocument();
    });
});