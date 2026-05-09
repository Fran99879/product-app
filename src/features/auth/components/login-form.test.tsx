import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "./login-form";

const mockUseLogin = vi.fn();

vi.mock("../hooks/use-login", () => ({
  useLogin: () => mockUseLogin(),
}));

describe("LoginForm", () => {
  it("renders login form", () => {
    mockUseLogin.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      error: null,
    });

    render(<LoginForm />);

    expect(
      screen.getByText(/iniciar sesión/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/tu@email.com/i)
    ).toBeInTheDocument();
  });

  it("shows error message", () => {
    mockUseLogin.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      error: true,
    });

    render(<LoginForm />);

    expect(
      screen.getByText(/credenciales inválidas/i)
    ).toBeInTheDocument();
  });
});