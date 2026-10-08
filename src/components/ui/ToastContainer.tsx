import { useToast } from "../../hooks/useToast";
import type { Toast } from "../../types/toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed z-50 space-y-2 bottom-4 right-4">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className={`max-w-sm animate-in slide-in-from-bottom-4 rounded-lg border px-4 py-3 font-medium text-white shadow-lg backdrop-blur-xl fade-in duration-300 ${
            toast.type === "success"
              ? "border-green-300/30 bg-green-500/20"
              : toast.type === "error"
                ? "border-red-300/30 bg-red-500/20"
                : "border-blue-300/30 bg-blue-500/20"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <p>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="app-button h-8 w-8 p-0 text-lg"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
