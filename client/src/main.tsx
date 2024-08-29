import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SocketProvider } from './context/Socket'
import { Custom, Home, Multi, Solo } from './components/index.ts';
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Loader from './components/loader/Loader.tsx'

interface routesInterface {
  path: string;
  element: React.ReactNode;
}

const routes: Array<routesInterface> = [
  {
    path: "/",
    element: <Suspense fallback={<Loader />}><Home /></Suspense>
  },
  {
    path: "multi",
    element: <Suspense fallback={<Loader />}><Multi /></Suspense>
  },
  {
    path: "solo",
    element: <Suspense fallback={<Loader />}><Solo /></Suspense>
  },
  {
    path: "custom",
    element: <Suspense fallback={<Loader />}><Custom /></Suspense>
  },

];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {
        routes.map(elem => (
          <Route key={elem.path} path={elem.path} element={elem.element} />
        ))
      }
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>,
)
