import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Index, { loader as indexLoader } from "./routes/index";
import Favorites, { loader as favoritesLoader } from "./routes/favorites";
import New from "./routes/new";
import { action as contactsAction } from "./routes/contacts";
import { action as toggleFavoriteAction } from "./routes/toggle-favorite";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: indexLoader,
      },
      {
        path: "contacts",
        action: contactsAction,
      },
      {
        path: "contacts/:id",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:id/toggle-favorite",
        action: toggleFavoriteAction,
      },
      {
        path: "favorites",
        element: <Favorites />,
        loader: favoritesLoader,
      },
      {
        path: "new",
        element: <New />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
