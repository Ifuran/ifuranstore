import { createBrowserRouter } from "react-router-dom";
import ListProductPage from "./pages/ListProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import MainLayout from "./layout/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ListProductPage />,
      },
      {
        path: "/category/:name",
        element: <ListProductPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
