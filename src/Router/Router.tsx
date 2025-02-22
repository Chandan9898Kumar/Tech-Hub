import ProgressBars from "@/Components/Loader/Loader";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("@/Pages/Home/Home"));
const NotFoundView = lazy(() => import("../NotFound/NotFound"));
const ProductDetails = lazy(
  () => import("@Pages/ProductDetails/ProductDetails")
);
const Router = () => {
  return (
    <Suspense fallback={<ProgressBars />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
