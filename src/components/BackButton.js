import React from "react";

const BackButton = ({ onClickHandler }) => {
  return (
    <div className="back-btn" onClick={() => onClickHandler()}>
      <img src={require("../img/back-arrow.png")} alt="back-btn" />
    </div>
  );
};

export default BackButton;
