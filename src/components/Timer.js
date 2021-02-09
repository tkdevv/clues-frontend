import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import { waiting, running } from "../utils/GlobalVariables";

const Timer = ({ setGameIsDone }) => {
  const [intId, setIntId] = useState(null);
  const [counterValue, setCounterValue] = useState(30);
  const [game, setGame] = useContext(GameContext);

  const counterStyles = () => {
    return {
      color:
        counterValue >= 15
          ? "#11ee11"
          : counterValue < 15 && counterValue > 5
          ? "orange"
          : "#ff1111",
    };
  };

  useEffect(() => {}, [game]);

  if (
    game.useTimer &&
    intId === null &&
    counterValue &&
    game.state === running
  ) {
    const intervalId = setInterval(() => {
      setCounterValue((prev) => prev - 1);
    }, 1000);
    setIntId(intervalId);
  }

  if (intId && counterValue <= 0) {
    clearInterval(intId + 1); // xxx - REMOVE FOR PRODUCTION VERSION
    clearInterval(intId - 1); // xxx - REMOVE FOR PRODUCTION VERSION
    clearInterval(intId);
    setIntId(undefined);
    setGameIsDone(true);
  }

  return (
    <div className="timer-container">
      <h3 style={counterStyles()} className="timer-value">
        {counterValue}
      </h3>
    </div>
  );
};

export default Timer;
