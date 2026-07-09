import React from "react";

import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  console.log("error", error);

  return (
    <div>
      <h1>Error</h1>

      <h1>{error.statusText}</h1>

      <h1>{error.error.message}</h1>

      <Link to="/">
        {" "}
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Error;
