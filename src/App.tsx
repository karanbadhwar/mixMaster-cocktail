import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Error,
  Newsletter,
  Cocktail,
  Landing,
  About,
  SinglePageError,
} from "./pages/Index";
import { loader as landingLoader } from "./pages/Landing";
import { loader as SingleCocktailLoader } from "./pages/cocktail";
import { action as newsletterAction } from "./pages/Newsletter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        path: "cocktail/:id",
        element: <Cocktail />,
        errorElement: <SinglePageError />,
        loader: SingleCocktailLoader(queryClient),
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: newsletterAction,
        errorElement: <SinglePageError />,
      },
      {
        path: "about",
        element: <About />,
        // children: [
        //   {
        //     path: "company",
        //     element: <h2>Our Company</h2>,
        //   },
        //   {
        //     path: "person",
        //     element: <h2>Karna</h2>,
        //   },
        // ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
