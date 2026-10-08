import { useContext } from "react";
import { CartContext } from "../context/cart-context";

/**
 * Provides access to the shopping cart state and actions.
 *
 * @returns The cart context value.
 * @throws {Error} When used outside a CartProvider.
 */
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
