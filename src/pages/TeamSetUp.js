import React, { useContext, useRef, useState } from "react";
import BackButton from "../components/BackButton";
import GameLogo from "../components/GameLogo";
import ManualPlayers from "../components/ManualPlayers";
import RandomPlayers from "../components/RandomPlayers";
import TeamsConfirmation from "../components/TeamsConfirmation";
import { GameContext } from "../context/GameContext";
import useForceUpdate from "../hooks/useForceUpdate";
import { manualTeams, randomMembers } from "../utils/GlobalVariables";
import { Player, redirectIfMust, shuffleArray } from "../utils/utils";

const TeamSetUp = () => {
  const [game, setGame] = useContext(GameContext);
  const pseudoTeams = [
    [new Player("Player 1", 5), new Player("Player 1", 5)],
    [new Player("Player 2", 6), new Player("Player 2", 6)],
  ];
  const [sortedTeams, setSortedTeams] = useState([]);
  const forceUpdate = useForceUpdate();

  const goBack = () => {
    setGame((prevGame) => {
      game.teamsMode = "";
      return prevGame;
    });
    forceUpdate();
  };

  return (
    <div className="team-selection-container">
      {redirectIfMust(game, "teamSetUpPage")}
      <GameLogo padding />
      <BackButton onClickHandler={goBack} />
      {game.teamsMode === randomMembers && sortedTeams.length <= 0 && (
        <div className="random-teams-container">
          <RandomPlayers
            setSortedTeams={setSortedTeams}
            refreshPage={forceUpdate}
          />
        </div>
      )}
      {game.teamsMode === manualTeams && sortedTeams.length <= 0 && (
        <div className="random-teams-container">
          <ManualPlayers
            setSortedTeams={setSortedTeams}
            refreshPage={forceUpdate}
          />
        </div>
      )}
      {sortedTeams.length > 1 && (
        <TeamsConfirmation
          setSortedTeams={setSortedTeams}
          sortedTeams={sortedTeams}
        />
      )}
    </div>
  );
};

export default TeamSetUp;
