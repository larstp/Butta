import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import LogoSrc from "../../assets/Butta-logo-transparent.png";
import CartIcon from "../../assets/material-symbols_shopping-cart-rounded.svg";

/**
 * Renders the sticky site header and responsive navigation menu.
 *
 * The menu moves contact and mobile cart navigation into a compact dropdown.
 */
export function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
        <h1 className="m-0">
          <Link to="/" aria-label="Home">
            <img
              src={LogoSrc}
              alt="Mr. Fantastic's Online Emporium"
              className="h-10"
            />
          </Link>
        </h1>

        <div ref={menuRef} className="relative flex items-center gap-3">
          <Link
            to="/cart"
            className="hidden! items-center gap-2 p-2 text-white transition hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:inline-flex!"
            aria-label={`View cart, ${itemCount} items`}
          >
            <img
              src={CartIcon}
              alt=""
              className="h-7 w-7 brightness-0 invert"
            />
            <span className="text-sm font-semibold">{itemCount}</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center p-2 transition border rounded-md h-11 w-11 border-white/20 bg-white/5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="header-menu"
          >
            <img
              src={isMenuOpen ? "/close.svg" : "/open.svg"}
              alt=""
              className="w-6 h-6"
            />
          </button>

          {isMenuOpen && (
            <nav
              id="header-menu"
              aria-label="Main navigation"
              className="absolute right-0 top-full mt-4 w-56 overflow-hidden rounded-xl border border-white/10 bg-black/90 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-3xl"
            >
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 md:hidden"
              >
                Cart ({itemCount})
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
