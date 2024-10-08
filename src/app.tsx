import { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { CssVarsProvider, CssBaseline } from "@mui/joy";
import theme from "./theme.tsx";

//usando HashRouter para que el reload en gh-pages funcione
const router = createHashRouter([
  {
    path: "/",
    Component: lazy(() => import("./components/Layout.tsx")),
    children: [
      {
        index: true,
        Component: lazy(() => import("./components/Materias.tsx")),
      },
      {
        path: ":materiaName",
        children: [
          {
            index: true,
            Component: lazy(() => import("./components/Cursos/Cursos.tsx")),
          },
          {
            path: ":cursoName",
            Component: lazy(() => import("./components/Repos/Repos.tsx")),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CssVarsProvider disableTransitionOnChange theme={theme}>
    <CssBaseline />
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  </CssVarsProvider>
);
