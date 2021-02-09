import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { titleCase, Player, disabledStyles } from "../utils/utils";
import { playerNameMaxLength } from "../utils/GlobalVariables";
import { v4 as uuidv4 } from "uuid";
import useForceUpdate from "../hooks/useForceUpdate";
import LengthError from "./LengthError";
import AddedPlayerCard from "./AddedPlayerCard";

const ManualPlayers = ({ setSortedTeams }) => {
  const [game, setGame] = useContext(GameContext);
  const [playersAdded, setPlayersAdded] = useState([]);
  const [nameError, setNameError] = useState(false);

  const playerNamesInit = () => {
    let init = [];
    game.teams.forEach((team) => {
      init.push([]);
    });
    return init;
  };

  const [playerNames, setPlayerNames] = useState(playerNamesInit());
  const forceUpdate = useForceUpdate();

  const handleAddMember = (e, index) => {
    setNameError({ error: false, index });
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
      setPlayerNames((prevPlayers) => {
        prevPlayers[index] = [
          ...prevPlayers[index],
          new Player(titleCase(name), uuidv4()),
        ];
        return prevPlayers;
      });
      e.target.value = "";
    } else if (lastCharComma && !name) {
      e.target.value = "";
    } else if (
      lastCharComma &&
      (name.length < 3 || name.length > playerNameMaxLength)
    ) {
      e.target.value = name.slice(0, name.length);
      setNameError({ error: true, index });
    }
    if (e.target.value.length >= playerNameMaxLength + 1) {
      e.target.value = name.slice(0, playerNameMaxLength + 1);
      setNameError({ error: true, index });
    }
    if (name.includes(separator)) {
      const separatorIndex = name.indexOf(separator);
      e.target.value = name.slice(0, separatorIndex);
    }
    forceUpdate();
  };

  const removePlayer = (id, index) => {
    setPlayerNames((prevPlayers) => {
      prevPlayers[index] = prevPlayers[index].filter((playerObj) => {
        return playerObj.id !== id;
      });
      return prevPlayers;
    });
    forceUpdate();
  };

  const enoughPlayers = () => {
    let moreThan2Players = playerNames.map((teamObj) => teamObj.length >= 2);
    return !moreThan2Players.includes(false);
  };

  const submitBtnStyles = enoughPlayers()
    ? { fontSize: 12 }
    : { ...disabledStyles, fontSize: 12 };

  return (
    <div className="teams-input-wrapper">
      {game.teams.map((team, teamIndex) => (
        <div key={team.id} className="manual-team-input-container">
          <div
            // style={{ background: team.colour + "75" }}
            key={`teams${teamIndex}`}
            className="team-name-container"
          >
            <div
              style={{ background: team.colour }}
              className="team-input-colour"
            ></div>
            <div className="team-input-text-container">
              <label>{team.name}</label>
              <input
                onInput={(e) => handleAddMember(e, teamIndex)}
                onKeyUp={(e) =>
                  e.key === "Enter" && handleAddMember(e, teamIndex)
                }
                className="team-name-input"
                placeholder={`add comma at end of name`}
              />
            </div>
          </div>
          {nameError.error && nameError.index === teamIndex && <LengthError />}

          <div className="player-names-container">
            {playerNames.length > 0 &&
              playerNames[teamIndex].map((playerObj, index) => (
                <AddedPlayerCard
                  key={"manPlay" + playerObj.id}
                  player={playerObj}
                  colour={team.colour}
                  onClickHandler={() => removePlayer(playerObj.id, teamIndex)}
                />
              ))}
          </div>
        </div>
      ))}
      <h4>
        Comma separate each player's name e.g. Lerato, Thandi, Daniel. Also no
        special characters in names.
      </h4>
      {/* {enoughPlayers() && ( */}
      <button
        style={submitBtnStyles}
        onClick={() => setSortedTeams(playerNames)}
        className="next-screen-btn"
      >
        Add Team Members
      </button>
    </div>
  );
};

export default ManualPlayers;
