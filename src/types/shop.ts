import type { Product } from "./product";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export type AsyncState<T> = {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
};

export type ProductFilters = {
  search: string;
  sortBy?: keyof Product;
  sortOrder?: "asc" | "desc";
};

export type CartSummary = {
  itemCount: number;
  totalPrice: number;
};
