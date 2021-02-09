import React, { useEffect, useContext } from "react";
import { InstallPromptContext } from "../context/GameContext";

const GameLogo = ({ padding }) => {
  const paddingClass = padding ? " logo-padding" : "";
  const installPrompt = useContext(InstallPromptContext);

  const handlePrompt = () => {
    if (installPrompt) {
      installPrompt.prompt();
    }
  };

  return (
    <div className={"logo-container" + paddingClass}>
      <img
        onClick={handlePrompt}
        src={"/favicon.ico"}
        alt=""
        className="logo-text-image"
      />
      <h2 onClick={handlePrompt} className="logo-text">
        (beta)
      </h2>
    </div>
  );
};

export default GameLogo;
