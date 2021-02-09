import React, { useContext, useState, useEffect } from "react";
import { CardsContext, GameContext } from "../context/GameContext";
import {
  diceStage,
  quickStartMode,
  teamsMode,
  waiting,
} from "../utils/GlobalVariables";
import GameLogo from "./GameLogo";

const PostGameScreen = ({ correctGuessIndexes, pageRefresh }) => {
  const [game, setGame] = useContext(GameContext);
  const [cards, cueNextCard] = useContext(CardsContext);
  const [indexesOfCorrectGuesses, setIndexesOfCorrectGuesses] = useState(
    correctGuessIndexes
  );

  const card = cards[cards.length - 1][0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCorrectGuesses = (index) => {
    indexesOfCorrectGuesses.includes(index)
      ? setIndexesOfCorrectGuesses((prev) =>
          prev.filter((item) => item !== index)
        )
      : setIndexesOfCorrectGuesses([...indexesOfCorrectGuesses, index]);
  };

  const cluesStyles = (index) => {
    if (indexesOfCorrectGuesses.includes(index)) {
      return {
        color: "#eee",
      };
    }
    return { color: "#88888877" };
  };

  const checkOrCross = (index) => {
    if (indexesOfCorrectGuesses.includes(index)) {
      return {
        text: "✔",
        style: { color: "#77ff77" },
      };
    }
    return {
      text: "X",
      style: { color: "#ff5555" },
    };
  };

  const handleGameDone = () => {
    setGame((prevGame) => {
      prevGame.state = prevGame.useDice ? diceStage : waiting;
      if (prevGame.mode === teamsMode && prevGame.keepScore) {
        const diceVal = prevGame.diceValue ? prevGame.diceValue : 0;
        const oldScore = prevGame.order[0].score;
        const newScore =
          indexesOfCorrectGuesses.length <= diceVal
            ? 0
            : indexesOfCorrectGuesses.length - diceVal;
        prevGame.order[0].score = oldScore + newScore;
        prevGame.order[0].roundsPlayed += 1;
      }
      if (prevGame.useTeamMembers && prevGame.order[0].members.length > 1) {
        const currentPlayer = prevGame.order[0].members.splice(0, 1);
        prevGame.order[0].members = [
          ...prevGame.order[0].members,
          ...currentPlayer,
        ];
      }
      const currentTeam = prevGame.order.splice(0, 1);
      prevGame.order = [...prevGame.order, ...currentTeam];
      prevGame.diceValue = null;
      return prevGame;
    });
    pageRefresh();
  };

  return (
    <div className="active-game-wrapper">
      {game.useDice && typeof game.diceValue === "number" && (
        <div className="dice-graphic-container">
          <img
            src={require("../img/dices.png")}
            alt="dice"
            className="dice-graphic-image"
          />
          <h3 className="dice-graphic-text">{game.diceValue}</h3>
        </div>
      )}
      {window.innerHeight > 604 && <GameLogo padding />}
      <div className="card-wrapper">
        <div className="card">
          <div className="confirm-guesses-container">
            <h1 className="confirm-guesses-score">
              {indexesOfCorrectGuesses.length} Correct.
            </h1>
            <h3
              style={{ padding: "0 5px" }}
              className="confirm-guesses-description"
            >
              Click to select the guess you got right.
            </h3>
          </div>
          <div className="card-deco-container">
            <div className="card-deco card-deco-right">
              <h4></h4>
            </div>
            <div className="card-deco card-deco-left"></div>
          </div>
          <div className="list-items">
            {card.clues.map((clue, index) => (
              <div
                key={"summer" + index}
                onClick={() => toggleCorrectGuesses(index)}
                className="correct-clue-container"
              >
                <h3
                  style={cluesStyles(index)}
                  className={
                    indexesOfCorrectGuesses.includes(index)
                      ? "post-page-card-item "
                      : "post-page-card-item"
                  }
                >
                  {clue}
                </h3>
                <h3
                  style={checkOrCross(index).style}
                  className="check-or-cross"
                >
                  {checkOrCross(index).text}
                </h3>
              </div>
            ))}
          </div>
          <button onClick={handleGameDone} className="end-game-btn">
            {game.mode === quickStartMode ? "Next Card" : "Next Round"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostGameScreen;
