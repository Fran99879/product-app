import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ProtectedRoute } from "./protected-route";

// mock router
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// mock auth store
const mockUseAuthStore = vi.fn();

vi.mock("@/store/auth-store", () => ({
  useAuthStore: () => mockUseAuthStore(),
}));

describe("ProtectedRoute", () => {
  it("redirects to login when not authenticated", () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      isHydrated: true,
    });

    render(
      <ProtectedRoute>
        <p>Dashboard</p>
      </ProtectedRoute>
    );

    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("renders children when authenticated", () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: true,
      isHydrated: true,
    });

    render(
      <ProtectedRoute>
        <p>Dashboard</p>
      </ProtectedRoute>
    );

    expect(
      screen.getByText("Dashboard")
    ).toBeInTheDocument();
  });

  it("shows loading while hydrating", () => {
    mockUseAuthStore.mockReturnValue({
      isAuthenticated: false,
      isHydrated: false,
    });

    render(
      <ProtectedRoute>
        <p>Dashboard</p>
      </ProtectedRoute>
    );

    expect(
      screen.getByText("Cargando...")
    ).toBeInTheDocument();
  });
});