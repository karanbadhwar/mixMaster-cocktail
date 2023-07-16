import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { IDrink } from "../Inteface/interfaces";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { QueryClient, useQuery } from "@tanstack/react-query";

//interface
interface IData {
  drinks: IDrink[];
  searchTerm: string;
}

//useQuery
const searchCocktailQuery = (searchTerm: string) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "";

    await queryClient.ensureQueryData(searchCocktailQuery(searchTerm));
    // const dataCached = queryClient.getQueryData([
    //   "search",
    //   searchTerm || "all",
    // ]);
    // console.log(dataCached);

    return {
      // drinks: response.data.drinks,
      searchTerm,
    };
  };

function Landing() {
  const { searchTerm } = useLoaderData() as IData;

  const { data: drinks } = useQuery(searchCocktailQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
}

export default Landing;
