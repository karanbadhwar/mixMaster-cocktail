import React from "react";
import axios from "axios";
import { useLoaderData, Navigate, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailPage";
import { IDrink } from "../Inteface/interfaces";
import { QueryClient, useQuery } from "@tanstack/react-query";

//Interface
interface ISingleDrink {
  id: string;
  data: IDrink[];
}

const singleCocktailQuery = (id: string) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const loader =
  (QueryClient: QueryClient) =>
  async ({ params }: any) => {
    const { id } = params;
    await QueryClient.ensureQueryData(singleCocktailQuery(id));
    return {
      id,
      // data: response.data.drinks,
    };
  };

function cocktail() {
  const { id } = useLoaderData() as ISingleDrink;

  const { data } = useQuery(singleCocktailQuery(id));

  if (!data) {
    return <Navigate to="/" />;
  }

  const singleDrink = data.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strGlass: glass,
    strCategory: category,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients: string[] = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back Home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info : </span>
            {info}
          </p>
          <p>
            <span className="drink-data">Glass : </span>
            {glass}
          </p>

          <p>
            <span className="drink-data">ingredients : </span>
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>

          <p>
            <span className="drink-data">instructions: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export default cocktail;
