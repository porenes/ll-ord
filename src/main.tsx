import ReactDOM from "react-dom/client";
import { Setup } from "./Setup.tsx";

import "./i18n.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage.tsx";
import { OtherPage } from "./pages/OtherPage.tsx";
import { InscriptionPage } from "./pages/InscriptionPage.tsx";
import { WithNavigation } from "./components/WithNavigation.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <WithNavigation>
        <GalleryPage />
      </WithNavigation>
    ),
  },
  {
    path: "inscription/:address/:id",
    element: (
      <WithNavigation>
        <InscriptionPage />
      </WithNavigation>
    ),
  },
  {
    path: "other",
    element: (
      <WithNavigation>
        <OtherPage />
      </WithNavigation>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Setup>
    <RouterProvider router={router} />
  </Setup>
);
