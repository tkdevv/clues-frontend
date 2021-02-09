import React, { useContext, useState, useEffect } from "react";
import { GameContext, CardsContext } from "../context/GameContext";
import { CardWrapperRotationStyle, BtnRotationStyle } from "../utils/utils";
import { running, rotateCondition } from "../utils/GlobalVariables";

const GameWaiting = ({
  pageRefresh,
  rotateCard,
  setRotateCard,
  skipPlayer,
}) => {
  const [game, setGame] = useContext(GameContext);
  const [cards, cueNextCard] = useContext(CardsContext);
  const [startCountDown, setStartCountDown] = useState(1);
  const [intId, setIntId] = useState(null);
  const startBtnText = !intId ? "START" : startCountDown;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const startCountDownHandle = () => {
    cueNextCard();
    setGame((prev) => {
      prev.state = running;
      return prev;
    });
    // pageRefresh();
    // const setIntervalId = setInterval(() => {
    //   setStartCountDown((prev) => prev - 1);
    // }, 700);
    // setIntId(setIntervalId);
  };

  // if (startCountDown <= 0 && intId) {
  //   clearInterval(intId);
  //   setIntId(null);
  //   setGame((prev) => {
  //     prev.state = running;
  //     return prev;
  //   });
  //   pageRefresh();
  // }

  const skipPlayerStyles = {
    marginTop: -20,
    marginBottom: 30,
    backgroundColor: "rgba(11, 29, 187, 0.507)",
    border: "none",
  };

  return (
    <div className="waiting-page-wrapper">
      {/* <GameLogo /> */}
      <div className="card-wrapper">
        <div
          style={rotateCard ? CardWrapperRotationStyle : {}}
          className="card"
        >
          <div className="card-deco-container">
            <div className="card-deco-right">
              <h4></h4>
            </div>
            <div className="card-deco-left"></div>
          </div>

          {game.useTeamMembers && !game.diceValue && (
            <button
              className="skip-player-btn"
              style={skipPlayerStyles}
              onClick={() => skipPlayer()}
            >{`Skip ${game.order[0].members[0].name}`}</button>
          )}

          <button onClick={startCountDownHandle} className="waiting-start-btn">
            {startBtnText}
          </button>
          <div className="game-waiting-tip">
            <em>tip</em>
            <br />
            click on clues you get right so they don't distract you.
          </div>
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

export default GameWaiting;
