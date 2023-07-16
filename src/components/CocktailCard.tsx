import React from "react";
import Wrapper from "../assets/wrappers/CocktailCard";
import { Link } from "react-router-dom";
//interface
interface ICocktail {
  image: string;
  id: string;
  name: string;
  info: string;
  glass: string;
}

function CocktailCard({ image, id, name, info, glass }: ICocktail) {
  return (
    <Wrapper>
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <div className="footer">
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className="btn">
          Details
        </Link>
      </div>
    </Wrapper>
  );
}

export default CocktailCard;
