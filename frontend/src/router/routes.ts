import { RouteObject } from "react-router-dom";
import Home from "../views/Home/Home";

export const routes: RouteObject[] = [
  {
    path: "",
    lazy: () =>
      import("../layouts/DefaultLayout").then((module) => ({
        Component: module.default,
      })),
    children: [
      {
        path: "/",
        lazy: () =>
          import("../views/Home/Home").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "/playground",
        lazy: () =>
          import("../views/Playground/Playground").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];
