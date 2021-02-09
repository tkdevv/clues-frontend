import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const InputContainer = ({ team, handleTeamNames }) => {
  const [game, setGame] = useContext(GameContext);

  return (
    <div
      // style={{ background: team.colour + "75" }}
      className="team-name-container"
    >
      <div
        style={{ background: team.colour }}
        className="team-input-colour"
      ></div>
      <div className="team-input-text-container">
        <label>
          Team {team.id} {game.browserSupported && "Name"}
        </label>
        {game.browserSupported && (
          <input
            onInput={(e) => handleTeamNames(e, team.id)}
            className="team-name-input"
            placeholder={`enter team name (optional)`}
          />
        )}
      </div>
    </div>
  );
};

export default InputContainer;
