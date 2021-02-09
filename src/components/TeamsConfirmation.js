import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import useForceUpdate from "../hooks/useForceUpdate";
import { diceStage, waiting } from "../utils/GlobalVariables";
import {
  redirectIfMust,
  shuffleAndSegmentPlayers,
  shuffleArray,
} from "../utils/utils";

const TeamsConfirmation = ({ sortedTeams, setSortedTeams }) => {
  const [game, setGame] = useContext(GameContext);
  const forceUpdate = useForceUpdate();

  const removePlayer = (id, index) => {
    setSortedTeams((prevPlayers) => {
      prevPlayers[index] = prevPlayers[index].filter((playerObj) => {
        return playerObj.id !== id;
      });
      return prevPlayers;
    });
    forceUpdate();
  };

  const startGame = () => {
    setGame((prevGame) => {
      prevGame.state = game.useDice ? diceStage : waiting;
      prevGame.teams.forEach((team, index) => {
        team.members = sortedTeams[index];
      });
      prevGame.useTeamMembers = true;
      prevGame.order = shuffleArray(prevGame.teams);
      return prevGame;
    });
    forceUpdate();
  };

  const reshuffle = () => {
    let allPlayers = [];
    sortedTeams.forEach((team) => {
      allPlayers = [...allPlayers, ...team];
    });
    const reshuffledTeams = shuffleAndSegmentPlayers(allPlayers, sortedTeams);
    setSortedTeams(reshuffledTeams);
  };

  return (
    <div className="teams-confirmation-container">
      {redirectIfMust(game)}
      {game.teams.map((team, teamIndex) => (
        <div
          key={`sortedTeamsScreen${team.id}`}
          className="confirmation-team-group"
          style={{ background: team.colour + "34", borderColor: team.colour }}
        >
          <h4 className="confirmation-team-name">{team.name}</h4>
          <div className="player-names-container">
            {sortedTeams[teamIndex].map((sortedTeamMember, index) => (
              <div
                style={{ background: team.colour }}
                key={`randomPlayers${sortedTeamMember.id}`}
                onClick={() => removePlayer(sortedTeamMember.id)}
                className="player-name"
              >
                {sortedTeamMember.name}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="adjust-teams-btns">
        <button
          style={{ fontSize: 12, margin: "10px 0" }}
          onClick={() => reshuffle()}
          className="next-screen-btn"
        >
          Reshuffle Teams
        </button>
      </div>
      <button
        style={{ fontSize: 18 }}
        onClick={() => startGame()}
        className="next-screen-btn"
      >
        START
      </button>
    </div>
  );
};

export default TeamsConfirmation;
