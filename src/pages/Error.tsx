import React from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import img from "../assets/not-found.svg";

function Error() {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Wrapper>
          <div>
            <img src={img} alt="Not Found" />
            <h3>Ohh!!!</h3>
            <p>We can't seem to find the page you are looking for</p>
            <Link to="/">Back Home</Link>
          </div>
        </Wrapper>
      );
    }
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
}

export default Error;
