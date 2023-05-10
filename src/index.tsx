import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Setup } from "./Setup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./i18n";
import GalleryPage from "./pages/GalleryPage";
import { OtherPage } from "./pages/OtherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GalleryPage />,
  },
  {
    path: "other",
    element: <OtherPage />
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Setup>
      <RouterProvider router={router} />
    </Setup>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
