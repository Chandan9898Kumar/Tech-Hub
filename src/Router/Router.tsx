import ProgressBars from "@/Components/Loader/Loader";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("@/Pages/Home/Home"));
const NotFoundView = lazy(() => import("../NotFound/NotFound"));
const ProductDetails = lazy(() => import("@Pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("@Pages/Cart/Cart"));
const Checkout = lazy(() => import("@Pages/Checkout/Checkout"));
const Confirmation = lazy(() => import("@Pages/Confirmation/Confirmation"));
const History = lazy(() => import("@Pages/History/History"));
const Router = () => {
  return (
    <Suspense fallback={<ProgressBars />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/order-history" element={<History />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
