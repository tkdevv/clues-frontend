import React, { useContext, useState, useEffect } from "react";
import { GameContext, CardsContext } from "../context/GameContext";
import useForceUpdate from "../hooks/useForceUpdate";
import { gameDone, rotateCondition } from "../utils/GlobalVariables";
import { BtnRotationStyle, CardWrapperRotationStyle } from "../utils/utils";

const GameActive = ({
  setAlarmRinging,
  setCorrectGuessIndexes,
  gameIsDone,
  setGameIsDone,
  rotateCard,
  setRotateCard,
}) => {
  const [game, setGame] = useContext(GameContext);
  const [cards, cueNextCard] = useContext(CardsContext);
  const forceUpdate = useForceUpdate();
  const [correctGuesses, setCorrectGuess] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const card = cards[cards.length - 1][0];
  const clueStyles = (index) => {
    return {
      opacity: correctGuesses[index] ? "0.15" : "1",
    };
  };

  const gameStyle = {
    background: "red",
    transform: "rotateY(90deg)",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gameFinished = () => {
    const indexesToReturn = correctGuesses
      .map((clueCorrect, index) => clueCorrect && index)
      .filter((item) => typeof item === "number");
    setGame((prev) => {
      prev = { ...game };
      prev.state = gameDone;
      return prev;
    });

    setCorrectGuessIndexes(indexesToReturn);
    // forceUpdate();
  };

  const handleClueOpacity = (index) => {
    setCorrectGuess((prev) => {
      prev[index] = !prev[index];
      return prev;
    });
    forceUpdate();
  };

  if (gameIsDone) {
    setGameIsDone(false);
    game.useTimer && setAlarmRinging(true);
    gameFinished();
  }

  return (
    <div className="active-game-wrapper">
      <div className="card-wrapper">
        <div
          style={rotateCard ? CardWrapperRotationStyle : {}}
          className="card"
        >
          <div className="card-deco-container">
            <div className="card-deco card-deco-right"></div>
            <div className="card-deco card-deco-left"></div>
          </div>
          <div className="list-items">
            {card.clues.map((clue, index) => (
              <div key={clue + index + "dsssdsa"}>
                <h3
                  style={clueStyles(index)}
                  onClick={() => handleClueOpacity(index)}
                >
                  {clue}
                </h3>
                <hr className="card-clue-divider" />
              </div>
            ))}
          </div>
          <button
            style={BtnRotationStyle}
            onClick={gameFinished}
            className="end-game-btn"
          >
            {game.useTimer ? "QUIT" : "DONE"}
          </button>
          {rotateCondition && (
            <button
              style={BtnRotationStyle}
              onClick={() => setRotateCard((prev) => !prev)}
              className="rotate-card-btn"
            >
              Rotate Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameActive;
