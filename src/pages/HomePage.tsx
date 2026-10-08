import { useEffect, useState } from "react";
import { ProductCard } from "../components/ui/ProductCard";
import { getProducts } from "../services/products";
import type { Product } from "../types/product";
import type { ProductFilters } from "../types/shop";
import { getCurrentPrice, isProductOnSale } from "../utils/price";

type SortOption = "none" | "sale" | "price-high-low" | "price-low-high";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({ search: "" });
  const [sortOption, setSortOption] = useState<SortOption>("none");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response.data);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch products";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  let sortedProducts: Product[] = filteredProducts;

  if (sortOption !== "none") {
    if (sortOption === "sale") {
      sortedProducts = filteredProducts
        .filter((product) => isProductOnSale(product))
        .sort((left, right) => getCurrentPrice(left) - getCurrentPrice(right));
    } else {
      sortedProducts = [...filteredProducts].sort((left, right) => {
        if (sortOption === "price-high-low") {
          const leftPrice = getCurrentPrice(left);
          const rightPrice = getCurrentPrice(right);
          return rightPrice - leftPrice;
        }

        const leftPrice = getCurrentPrice(left);
        const rightPrice = getCurrentPrice(right);
        return leftPrice - rightPrice;
      });
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-text-error">Error: {error}</div>
    );
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="p-6 mb-10 space-y-3 bg-black/30 backdrop-blur-sm rounded-2xl">
        <h1 className="text-4xl font-bold text-white mix-blend-difference">
          Welcome to Butta!
        </h1>
        <p className="max-w-2xl italic font-thin text-white mix-blend-difference">
          "Butta" is the Norwegian slang term for "Store", Short for "Butikk"
        </p>
        <p className="max-w-2xl text-white mix-blend-difference">
          Browse our lates and greatest items!
        </p>
      </div>

      <div className="mb-8 flex flex-col overflow-hidden rounded-lg md:flex-row md:items-start">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products by name, description, or tag..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="h-12 w-full rounded-b-none rounded-t-lg border-b-0 px-4 py-3 transition border outline-none text-text-primary bg-input-bg border-input-border placeholder-input-placeholder focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30 md:rounded-b-lg md:rounded-r-none md:rounded-br-none md:rounded-tr-none md:border-b md:border-r-0"
          />
        </div>

        <div className="relative md:w-56">
          <label htmlFor="sort-products" className="sr-only">
            Sort products
          </label>
          <select
            id="sort-products"
            aria-label="Sort products"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
            className="-mt-px h-12 w-full cursor-pointer appearance-none rounded-b-lg rounded-t-none border-t-0 border px-4 py-3 pr-10 !text-white outline-none transition focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30 md:mt-0 md:rounded-l-none md:rounded-r-lg md:border-t md:border-l-0"
          >
            <option value="none">Newest</option>
            <option value="sale">On sale</option>
            <option value="price-high-low">Price: high to low</option>
            <option value="price-low-high">Price: low to high</option>
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white"
          />
        </div>
      </div>

      <div className="mb-4 text-sm text-text-tertiary">
        Showing {sortedProducts.length} of {products.length} products
      </div>

      {sortedProducts.length > 0 ? (
        <div className="rounded-4xl border border-white/10 bg-black/30 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center border rounded-lg bg-bg-secondary border-border-primary">
          <p className="text-text-secondary">
            No products found matching "{filters.search}"
          </p>
        </div>
      )}
    </div>
  );
}
