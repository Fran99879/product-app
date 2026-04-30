
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}