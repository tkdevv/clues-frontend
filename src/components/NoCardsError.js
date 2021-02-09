import React from "react";
import { useContext } from "react";
import { CardsContext, GameContext } from "../context/GameContext";
import { clearLocalStorage } from "../utils/localStorage";

const NoCardsError = () => {
  const [cards] = useContext(CardsContext);
  const [game] = useContext(GameContext);
  const localCards = cards ? cards : [];

  if (!cards) {
    clearLocalStorage();
  }

  return (
    <>
      {!cards && (
        <div className="no-cards-error-container">
          <div className="no-cards-text-container">
            <h3 className="no-cards-text">
              CRITICAL ERROR. <br />
              PLEASE REFRESH.
            </h3>
            <img
              className="no-cards-image"
              src={require("../img/error.png")}
              alt=""
            />
            <button
              onClick={() => window.location.reload()}
              className="no-cards-error-btn"
            >
              RELOAD
            </button>
          </div>
        </div>
      )}
      {cards && cards.length === 0 && (
        <div className="no-cards-error-container">
          <div
            style={{ backgroundColor: "#7777ff" }}
            className="no-cards-text-container"
          >
            <h3 className="no-cards-text">LOADING CARDS</h3>
            <img
              src={require("../img/loading.gif")}
              className="no-cards-image"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NoCardsError;
