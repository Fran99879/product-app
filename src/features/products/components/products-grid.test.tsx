import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ProductsGrid } from "./products-grid";

// mock del hook
vi.mock("../hooks/use-products", () => ({
  useProducts: vi.fn(),
}));

import { useProducts } from "../hooks/use-products";

describe("ProductsGrid", () => {
  it("renders products list", () => {
    vi.mocked(useProducts).mockReturnValue({
      data: [
        {
          id: "1",
          name: "iPhone",
          brand: "Apple",
          description: "test",
          image: "https://test.com/image.jpg",
          price: 1000,
          quantity: 5,
          rate: 5,
        },
      ],
      isLoading: false,
    } as any);

    render(<ProductsGrid />);

    expect(screen.getByText("iPhone")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.mocked(useProducts).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    render(<ProductsGrid />);

    expect(screen.getAllByRole("generic").length).toBeGreaterThan(0);
  });
});