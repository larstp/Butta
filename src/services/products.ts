import { request, type ApiResponse } from "./api";
import type { Product, ProductListQuery } from "../types/product";

/**
 * Fetches the products available in the Noroff online shop.
 *
 * @param query Optional pagination or sorting parameters.
 * @returns A promise containing the product list and API metadata.
 */
export async function getProducts(query?: ProductListQuery) {
  return request<ApiResponse<Product[]>>("/online-shop", {}, query);
}

/**
 * Fetches one product by its identifier.
 *
 * @param id The product identifier from the online shop API.
 * @returns A promise containing the product and API metadata.
 */
export async function getProductById(id: string) {
  return request<ApiResponse<Product>>(`/online-shop/${id}`);
}
