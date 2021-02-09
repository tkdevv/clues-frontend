import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { motion, AnimatePresence } from "framer-motion";
import { scoreboardState } from "../utils/utils";
import { winningScore } from "../utils/GlobalVariables";

const Scoreboard = ({ closeScoreboard, toPopUp, setToPopUp }) => {
  const [game, setGame] = useContext(GameContext);
  const roundsPlayedText = (team) =>
    team.roundsPlayed === 1
      ? team.roundsPlayed + " round played"
      : team.roundsPlayed + " rounds played";

  const gameOrderCopy = [...game.order];

  const teamScores = scoreboardState(game) ? scoreboardState(game) : {};
  const { winningTeams, teamsWithChance, losingTeams } = teamScores;

  const teamDetails = (team) => {
    const winningTeamsIds = winningTeams
      ? winningTeams.map((team) => team.id)
      : [];
    const losingTeamsIds = losingTeams
      ? losingTeams.map((team) => team.id)
      : [];
    const scoreGraphic = winningTeamsIds.includes(team.id)
      ? "🏆"
      : losingTeamsIds.includes(team.id)
      ? "❌"
      : team.score;
    const rounds = losingTeamsIds.includes(team.id)
      ? "Eliminated"
      : team.roundsPlayed === 1
      ? team.roundsPlayed + " round played"
      : team.roundsPlayed + " rounds played";

    return {
      name: team.name,
      score: scoreGraphic,
      rounds,
      styles: losingTeamsIds.includes(team.id)
        ? { opacity: 0.3, background: "#999" }
        : {},
    };
  };

  const notificationText = () => {
    if (teamsWithChance.length > 0) {
      return `${teamsWithChance[0].name} must get ${
        winningScore - teamsWithChance[0].score
      } or more to tie the game`;
    } else if (winningTeams.length > 0) {
      return winningTeams.length === 1
        ? `Congrats ${winningTeams[0].name}`
        : winningTeams.length === 2 && losingTeams.length === 0
        ? "It ended in a draw"
        : winningTeams.map((team) => team.name).join("& ") + " drew.";
    } else {
      return `First team to ${winningScore}`;
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="scoreboard-container"
        >
          <h3 className="scoreboard-heading">Scoreboard</h3>

          <h1 className="score-target-text">{notificationText()}</h1>
          {game.order.length > 0 && (
            <div className="scores-container">
              {gameOrderCopy
                .sort((a, b) => a.id - b.id)
                .map((team) => (
                  <div
                    key={team.id + "scrbrd"}
                    style={{
                      background: team.colour,
                      ...teamDetails(team).styles,
                    }}
                    className="score-container"
                  >
                    <h3 className="score-team-name">
                      {teamDetails(team).name}
                    </h3>
                    <div className="score">{teamDetails(team).score}</div>
                    <div className="score-rounds-played">
                      {teamDetails(team).rounds}
                    </div>
                  </div>
                ))}
            </div>
          )}
          <div onClick={() => closeScoreboard(true)} className="score-back-btn">
            {winningTeams.length > 0 && teamsWithChance.length === 0
              ? "End Game"
              : "Back To Game"}
          </div>

          <div
            onClick={() => setToPopUp((prev) => !prev)}
            className="checkbox-container"
          >
            <div className="checkbox-and-text">
              <div className="checkbox">
                {!toPopUp && <div className="checkbox-selected"></div>}
              </div>
              <h3 className="checkbox-label">Don't pop up every round.</h3>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Scoreboard;
