import React from "react";

const Card = ({ children }) => {
  return (
    <div className="card">
      <div className="card-deco-container">
        <div className="card-deco-right"></div>
        <div className="card-deco-left"></div>
        {children}
      </div>
    </div>
  );
};

export default Card;
