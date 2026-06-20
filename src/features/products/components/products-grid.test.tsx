import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { ProductsGrid } from "./products-grid";

const sampleProduct = {
  id: "1",
  name: "iPhone",
  brand: "Apple",
  description: "test",
  image: "https://test.com/image.jpg",
  price: 1000,
  quantity: 5,
  rate: 5,
};

describe("ProductsGrid", () => {
  it("renders products list", () => {
    render(<ProductsGrid products={[sampleProduct]} />);

    expect(screen.getByText("iPhone")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<ProductsGrid isLoading />);

    expect(screen.getAllByRole("generic").length).toBeGreaterThan(0);
  });

  it("shows empty state", () => {
    render(
      <ProductsGrid
        products={[]}
        emptyTitle="Sin resultados"
        emptyHint="Probá otra búsqueda"
      />
    );

    expect(screen.getByText("Sin resultados")).toBeInTheDocument();
  });
});
