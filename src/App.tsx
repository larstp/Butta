import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage";
import { ContactPage } from "./pages/ContactPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ToastContainer } from "./components/ui/ToastContainer";

const Grainient = lazy(() => import("./components/Grainient"));

function App() {
  const [showGrainient, setShowGrainient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShowGrainient(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 w-screen h-screen bg-dark-bg">
        <Suspense fallback={null}>
          {showGrainient && (
            <Grainient
              color1="#168F88"
              color2="#0A4545"
              color3="#02141B"
              timeSpeed={0.275}
              zoom={0.9}
            />
          )}
        </Suspense>
      </div>
      <div className="relative z-10 flex flex-col min-h-screen text-text-primary">
        <Header />

        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
