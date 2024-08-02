import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssVarsProvider, CssBaseline } from "@mui/joy";

import Home from "./components/Home.tsx";
import Materias from "./components/Materias.tsx";
import Fechas from "./components/Fechas.tsx";
import Cursos from "./components/Cursos.tsx";
import TPs from "./components/TPs.tsx";
import Repos from "./components/Repos.tsx";
import theme from "./theme.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "materias/",
    children: [
      {
        index: true,
        element: <Materias />,
      },
      {
        path: "fechas/",
        children: [
          {
            index: true,
            element: <Fechas />,
          },
          {
            path: "cursos/",
            children: [
              {
                index: true,
                element: <Cursos />,
              },
              {
                path: "tps/",
                children: [
                  {
                    index: true,
                    element: <TPs />,
                  },
                  {
                    path: "repos/",
                    children: [{ index: true, element: <Repos /> }],
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
  <React.StrictMode>
    <CssVarsProvider disableTransitionOnChange theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>
);
