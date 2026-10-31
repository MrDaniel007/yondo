import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import Home from "./pages/Home";
import {Catalog} from "./pages/Catalog";
import {Help} from "./pages/Help";
import {NotFound} from "./pages/NotFound";
import ProductDetailProps from "./pages/ProductDetailProps"; 
import { FavoritesPage } from "./pages/FavoritesPage";
import { CartPage } from "./pages/CartPage.";
import { Auth } from "./pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "catalog",
        element: <Catalog />
      },
      {
        path: "help",
        element: <Help />
      },
      {
        path: "product/:id",
        element: <ProductDetailProps />
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "favorites",
        element: <FavoritesPage />
      },
      {
        path: "cart",
        element: <CartPage />
      },
      {
        path: "auth",
        element: <Auth />
      }
    ]
  }
]);