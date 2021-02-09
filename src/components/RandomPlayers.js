import React, { useContext, useRef, useState } from "react";
import { GameContext } from "../context/GameContext";
import { playerNameMaxLength } from "../utils/GlobalVariables";
import {
  Player,
  titleCase,
  shuffleAndSegmentPlayers,
  disabledStyles,
} from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import LengthError from "./LengthError";
import AddedPlayerCard from "./AddedPlayerCard";

const RandomPlayers = ({ setSortedTeams, refreshPage }) => {
  const [game] = useContext(GameContext);
  const [randomPlayers, setRandomPlayers] = useState([]);
  //   const [sortedPlayers, setSortedPlayers] = useState([]);
  const [nameError, setNameError] = useState(false);
  const textAreaRef = useRef();

  const enoughPlayers = () => {
    return randomPlayers.length / game.teams.length >= 2 ? true : false;
  };

  const randomiseBtnStyles = enoughPlayers()
    ? { fontSize: 12, marginTop: 10 }
    : { ...disabledStyles, fontSize: 12, marginTop: 10 };

  const handleTextAreaInput = (e) => {
    // xxx - ADD MAX WIDTH
    setNameError(false);
    if (e.target.value.trim().length === 0 && e.key === "Enter") {
      e.target.value = e.target.value.trim();
      return;
    }
    const separator = ",";
    const namesInput =
      e.key === "Enter" ? e.target.value + "," : e.target.value;
    const name = namesInput.slice(0, namesInput.length - 1).trim();
    const lastCharComma = namesInput[namesInput.length - 1] === separator;
    if (
      lastCharComma &&
      name.length >= 3 &&
      name.length <= playerNameMaxLength
    ) {
      setRandomPlayers((prevPlayers) => [
        ...prevPlayers,
        new Player(titleCase(name), uuidv4()),
      ]);
      textAreaRef.current.value = "";
    } else if (lastCharComma && !name) {
      textAreaRef.current.value = "";
    } else if (
      lastCharComma &&
      (name.length < 3 || name.length > playerNameMaxLength)
    ) {
      textAreaRef.current.value = name.slice(0, name.length);
      setNameError(true);
    }

    if (name.length >= playerNameMaxLength + 1) {
      textAreaRef.current.value = name.slice(0, playerNameMaxLength + 1);
      setNameError(true);
    }

    if (name.includes(separator)) {
      const separatorIndex = name.indexOf(separator);
      textAreaRef.current.value = name.slice(0, separatorIndex);
    }
  };

  const removePlayer = (id) => {
    setRandomPlayers((prevPlayers) =>
      prevPlayers.filter((playerObj) => playerObj.id !== id)
    );
  };

  const randomisePlayers = () => {
    const fullyProcessedTeams = shuffleAndSegmentPlayers(
      randomPlayers,
      game.teams
    );
    setSortedTeams(fullyProcessedTeams);
    refreshPage();
  };

  return (
    <div>
      <div className="random-teams-container">
        <label className="textarea-label">Players' Names</label>
        <textarea
          onInput={(e) => handleTextAreaInput(e)}
          onKeyUp={(e) => e.key === "Enter" && handleTextAreaInput(e)}
          ref={textAreaRef}
          name="random-teams"
          className="random-teams-text-area"
        ></textarea>
        {nameError && <LengthError />}
        <h4>
          Comma separate each player's name e.g. Lerato, Thandi, Daniel. Also no
          special characters in names.
        </h4>
        <div className="player-names-container">
          {randomPlayers.map((playerObj, index) => (
            <div key={playerObj.id + "rnadomdfdm"}>
              <AddedPlayerCard
                player={playerObj}
                onClickHandler={() => removePlayer(playerObj.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        style={randomiseBtnStyles}
        onClick={randomisePlayers}
        className="next-screen-btn"
      >
        Make Random Teams
      </button>
    </div>
  );
};

export default RandomPlayers;
