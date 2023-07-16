import React from "react";
import { IDrink } from "../Inteface/interfaces";
import Wrapper from "../assets/wrappers/CocktailList";
import CocktailCard from "./CocktailCard";

function CocktailList({ drinks }: { drinks: IDrink[] }) {
  if (!drinks) {
    return (
      <h4 style={{ textAlign: "center" }}> No Matching Cocktails Found...</h4>
    );
  }

  const formattedDrinks = drinks.map((drink) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });

  return (
    <Wrapper>
      {formattedDrinks.map((item) => {
        return <CocktailCard key={item.id} {...item} />;
      })}
    </Wrapper>
  );
}

export default CocktailList;
