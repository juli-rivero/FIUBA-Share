import { lazy, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssVarsProvider, CssBaseline } from "@mui/joy";
import theme from "./theme.tsx";

const router = createBrowserRouter([
  {
    path: "/FIUBA-Share/",
    children: [
      {
        index: true,
        Component: lazy(() => import("./components/Home.tsx")),
      },
      {
        path: "materias/",
        children: [
          {
            index: true,
            Component: lazy(() => import("./components/Materias.tsx")),
          },
          {
            path: "fechas/",
            children: [
              {
                index: true,
                Component: lazy(() => import("./components/Fechas.tsx")),
              },
              {
                path: "cursos/",
                children: [
                  {
                    index: true,
                    Component: lazy(() => import("./components/Cursos.tsx")),
                  },
                  {
                    path: "tps/",
                    children: [
                      {
                        index: true,
                        Component: lazy(() => import("./components/TPs.tsx")),
                      },
                      {
                        path: "repos/",
                        children: [
                          {
                            index: true,
                            Component: lazy(
                              () => import("./components/Repos.tsx")
                            ),
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider disableTransitionOnChange theme={theme}>
      <CssBaseline />

      <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </CssVarsProvider>
  </StrictMode>
);
