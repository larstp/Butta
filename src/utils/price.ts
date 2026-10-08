import type { Product } from "../types/product";

/**
 * Checks whether a product has a genuine discount.
 *
 * @param product Product whose prices should be compared.
 * @returns `true` when the discounted price is lower than the regular price.
 */
export function isProductOnSale(product: Product): boolean {
  return (
    product.discountedPrice !== null &&
    product.discountedPrice !== undefined &&
    product.discountedPrice < product.price
  );
}

/**
 * Gets the price that should be shown and used for cart calculations.
 *
 * @param product Product whose current price should be calculated.
 * @returns The discounted price when valid, otherwise the regular price.
 */
export function getCurrentPrice(product: Product): number {
  const discountedPrice = product.discountedPrice;

  return discountedPrice !== null &&
    discountedPrice !== undefined &&
    discountedPrice < product.price
    ? discountedPrice
    : product.price;
}

/**
 * Calculates the rounded percentage discount for a product.
 *
 * @param product Product whose discount should be calculated.
 * @returns The percentage discount, or zero when the product is not on sale.
 */
export function getDiscountPercent(product: Product): number {
  if (!isProductOnSale(product) || product.price <= 0) {
    return 0;
  }

  return Math.round(
    ((product.price - getCurrentPrice(product)) / product.price) * 100,
  );
}
