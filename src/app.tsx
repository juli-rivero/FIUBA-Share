import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssVarsProvider, CssBaseline } from "@mui/joy";
import framesxTheme from "./theme.tsx";

import Home from "./components/Home.tsx";
import Materias from "./components/Materias.tsx";
import Fechas from "./components/Fechas.tsx";
import Cursos from "./components/Cursos.tsx";
import TPs from "./components/TPs.tsx";

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
    <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>
);
