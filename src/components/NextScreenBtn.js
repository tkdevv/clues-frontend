import React from "react";

const NextScreenBtn = ({ buttonText = "Next", clickHandler }) => {
  return (
    <div style={{ margin: "0px 0" }}>
      <button onClick={() => clickHandler()} className="next-screen-btn">
        {buttonText}
      </button>
    </div>
  );
};

export default NextScreenBtn;
