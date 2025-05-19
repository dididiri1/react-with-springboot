import { createBrowserRouter } from "react-router";

import { lazy, Suspense } from "react";
import BasicLayout from "../layouts/basicLayout";
import todoRouter from "./todoRouter";

const Main = lazy(() => import("../pages/mainPage"));
const About = lazy(() => import("../pages/aboutPage"));

const Loading = () => <div>Loading...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      todoRouter(),
    ],
  },
]);

export default router;
