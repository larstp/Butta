export type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

export type ToastContextValue = {
  toasts: Toast[];
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
};
