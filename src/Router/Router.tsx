import { Route, Routes } from "react-router-dom";
import HomePage from "@/Pages/Home/Home";
import NotFoundView from "../NotFound/NotFound";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  );
};

export default Router;
