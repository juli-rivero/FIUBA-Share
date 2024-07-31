import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { CssVarsProvider, CssBaseline } from '@mui/joy';
import framesxTheme from './theme.tsx';

import Home from './components/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
      <CssBaseline /><Home /></CssVarsProvider>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
    

  </React.StrictMode>,
)
