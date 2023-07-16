import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function SinglePageError() {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div>
          <h3>Request Failed</h3>
          <h4>404</h4>
        </div>
      );
    }
  } else if (error instanceof Error) {
    return <h3>{error.message}</h3>;
  }
}

export default SinglePageError;
