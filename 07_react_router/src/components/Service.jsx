import React from "react";

import { useNavigate } from "react-router-dom";

const Service = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div>
      <h1>Service</h1>

      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <input type="text" />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Service;
