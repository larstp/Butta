import { useContext } from "react";
import { ToastContext } from "../context/toast-context";

/**
 * Provides access to toast notifications and their actions.
 *
 * @returns The toast context value.
 * @throws {Error} When used outside a ToastProvider.
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used in a ToastProvider");
  }

  return context;
}
