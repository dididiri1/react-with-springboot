import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import { loadProducts } from "../pages/products/listPage";

const ProductsIndex = lazy(() => import("../pages/products/indexPage"));
const ProductsList = lazy(() => import("../pages/products/listPage"));
const ProductsAdd = lazy(() => import("../pages/products/addPage"));

const Loading = () => <div>Products Loading....</div>;

export default function productsRouter() {
  return {
    path: "products",
    Component: ProductsIndex,
    children: [
      {
        path: "list",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductsList />
          </Suspense>
        ),
        loader: loadProducts,
      },
      {
        path: "add",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductsAdd />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate to={"/products/list"}></Navigate>,
      },
    ],
  };
}
