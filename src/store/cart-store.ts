import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find(i => i.id === product.id);

        if (existing) {
          set({
            items: get().items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { ...product, quantity: 1 }],
          });
        }
      },

      removeItem: (id) =>
        set({
          items: get().items.filter(i => i.id !== id),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);