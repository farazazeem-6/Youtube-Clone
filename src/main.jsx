import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./store/appStore.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./views/Body.jsx";
import MainContainer from "./views/MainContainer.jsx";
import Header from "./views/Header.jsx";
import WatchPage from "./views/WatchPage.jsx";
import SearchResultsPage from "./views/SearchResultsPage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "results",
        element: <SearchResultsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter}/>
  </Provider>
);
