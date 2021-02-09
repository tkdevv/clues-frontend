import React from "react";
import CheckBox from "./CheckBox";
import { running, useDice, useTimer } from "../utils/GlobalVariables";
import useForceUpdate from "../hooks/useForceUpdate";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { disabledStyles, Game } from "../utils/utils";

const Menu = ({ menuOpen, setMenuOpen }) => {
  const [game, setGame] = useContext(GameContext);
  const forceUpdate = useForceUpdate();
  const timerCheckboxStyle = game.state === running ? disabledStyles : {};
  return (
    <div
      onClick={() => forceUpdate()}
      className={`menu-container ${!menuOpen ? "menu-closed" : ""}`}
    >
      <div className="menu-items-wrapper">
        <CheckBox checkboxName={useDice}>Use Dice</CheckBox>

        <div style={timerCheckboxStyle}>
          <CheckBox checkboxName={useTimer}>Use Timer</CheckBox>
        </div>

        <button onClick={() => setGame(new Game())} className="restart-btn">
          Quit Game
        </button>
      </div>
    </div>
  );
};

export default Menu;
