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
    <div className="mx-auto max-w-7xl">
      <section className="relative w-screen px-4 pt-4 pb-16 overflow-hidden -translate-x-1/2 isolate left-1/2 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none hero-fade" />
        <div className="relative z-10 flex items-start justify-center max-w-4xl mx-auto min-h-48">
          <div className="w-full max-w-3xl text-left">
            <h1
              className="hero-heading hero-marquee relative left-1/2 w-[calc(100vw-2rem)] max-w-none -translate-x-1/2 pb-2 text-4xl font-semibold leading-[0.95] text-(--teal) sm:text-5xl lg:text-6xl"
              aria-label="Explore headphones, perfumes, shoes, skincare, bags, glasses, watches, and tech."
            >
              <span className="hero-marquee-track" aria-hidden="true">
                <span className="hero-marquee-text">
                  <span aria-hidden="true">·</span> Headphones{" "}
                  <span aria-hidden="true">·</span> Perfumes{" "}
                  <span aria-hidden="true">·</span> Shoes{" "}
                  <span aria-hidden="true">·</span> Skincare{" "}
                  <span aria-hidden="true">·</span> Bags{" "}
                  <span aria-hidden="true">·</span> Glasses{" "}
                  <span aria-hidden="true">·</span> Watches{" "}
                  <span aria-hidden="true">·</span> Tech
                </span>
                <span className="hero-marquee-text">
                  <span aria-hidden="true">·</span> Headphones{" "}
                  <span aria-hidden="true">·</span> Perfumes{" "}
                  <span aria-hidden="true">·</span> Shoes{" "}
                  <span aria-hidden="true">·</span> Skincare{" "}
                  <span aria-hidden="true">·</span> Bags{" "}
                  <span aria-hidden="true">·</span> Glasses{" "}
                  <span aria-hidden="true">·</span> Watches{" "}
                  <span aria-hidden="true">·</span> Tech
                </span>
              </span>
            </h1>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative z-20 -mt-35 mb-8 flex flex-col overflow-hidden rounded-lg border border-white/25 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_16px_35px_rgba(0,0,0,0.2)] backdrop-blur-xl md:flex-row md:items-start">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products by name, description, or tag..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="glass-search h-12 w-full rounded-b-none rounded-t-lg border-b-0 px-4 py-3 text-white! transition border-transparent! bg-transparent! outline-none placeholder-input-placeholder focus:border-white/40! focus:ring-2 focus:ring-white/20 md:rounded-b-lg md:rounded-r-none md:rounded-br-none md:rounded-tr-none md:border-b md:border-r-0"
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
              className="glass-sort -mt-px h-12 w-full cursor-pointer appearance-none rounded-b-lg rounded-t-none border-t-0 px-4 py-3 pr-10 text-right border-transparent! bg-transparent! text-white! outline-none transition focus:border-white/40! focus:ring-2 focus:ring-white/20 md:mt-0 md:rounded-l-none md:rounded-r-lg md:border-t md:border-l-0"
            >
              <option value="none">All</option>
              <option value="sale">On sale</option>
              <option value="price-high-low">Price: high to low</option>
              <option value="price-low-high">Price: low to high</option>
            </select>
            <span
              aria-hidden="true"
              className="absolute w-2 h-2 rotate-45 -translate-y-1/2 border-b-2 border-r-2 border-white pointer-events-none right-4 top-1/2"
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
    </div>
  );
}
