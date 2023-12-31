// src/components/Discover/Discover.js
import React from "react";
import Natural from "./Natural";
import Artificial from "./Artificial";
import "./Discover.css";

const Discover = () => {
  return (
    <>
      <h2>Discover </h2>
      <div
        className="Discover"
        id="#Discover"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "spaceBetween",
        }}
      >
        <Natural />
        <Artificial />
      </div>
    </>
  );
};

export default Discover;
