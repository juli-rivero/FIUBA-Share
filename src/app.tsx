import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssVarsProvider, CssBaseline } from "@mui/joy";
import framesxTheme from "./theme.tsx";

import Home from "./components/Home.tsx";
import Materias from "./components/Materias.tsx";
import Fechas from "./components/Fechas.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/materias",
    element: <Materias />,
  },
  {
    path: "/fechas",
    element: <Fechas />,
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
