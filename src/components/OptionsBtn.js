import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import {
  waiting,
  diceStage,
  running,
  teamsMode,
  noWinnersPlaceholder,
} from "../utils/GlobalVariables";
import { scoreboardState, gameHasStarted, Game } from "../utils/utils";
import Menu from "./Menu";
import Timer from "./Timer";
import { motion, AnimatePresence } from "framer-motion";
import Scoreboard from "./Scoreboard";
import GameLogo from "./GameLogo";

const OptionsBtn = ({ setGameIsDone }) => {
  const [game, setGame] = useContext(GameContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [localGameState, setLocalGameState] = useState("");
  const [toPopUp, setToPopUp] = useState(true);
  const [scoreboardOpen, setScoreboardOpen] = useState(false);

  const currentTeam = game.mode === teamsMode ? game.order[0] : "";
  const currentPlayer = game.useTeamMembers ? currentTeam.members[0] : "";

  const showTimerStates = game.state === waiting || game.state === running;
  const optionsStyle = menuOpen
    ? {
        transform: "rotateZ(45deg)",
        transition: "all 300ms ease",
      }
    : {
        transition: "all 400ms ease",
      };

  const handleMenuToggle = () => {
    const teamScores = scoreboardState(game)
      ? scoreboardState(game)
      : noWinnersPlaceholder;
    const { winningTeams, teamsWithChance } = teamScores;

    if (!(winningTeams.length > 0 && teamsWithChance.length <= 0)) {
      setMenuOpen((prev) => !prev);
      setScoreboardOpen(false);
    }
  };

  const handleScoreToggle = () => {
    setScoreboardOpen((prev) => {
      const teamScores = scoreboardState(game)
        ? scoreboardState(game)
        : noWinnersPlaceholder;
      const { winningTeams, teamsWithChance } = teamScores;
      if (!(winningTeams.length > 0 && teamsWithChance.length <= 0)) {
        return !prev;
      }
      return prev;
    });
    setMenuOpen(false);
  };

  const handleOverlayClick = (fromBtn) => {
    const teamScores = scoreboardState(game)
      ? scoreboardState(game)
      : noWinnersPlaceholder;
    const { winningTeams, teamsWithChance } = teamScores;

    setMenuOpen(false);
    if (!(winningTeams.length > 0 && teamsWithChance.length <= 0)) {
      setScoreboardOpen(false);
    } else if (
      fromBtn &&
      winningTeams.length > 0 &&
      teamsWithChance.length <= 0
    ) {
      setGame(new Game());
    }
  };

  useEffect(() => {
    setLocalGameState(game.state);
  }, []);

  if (localGameState !== game.state) {
    setLocalGameState(game.state);

    const { winningTeams, teamsWithChance, losingTeams } = scoreboardState(
      game
    );

    const openSBEachRound =
      game.keepScore &&
      gameHasStarted(game) &&
      toPopUp &&
      ((!game.useDice && game.state === waiting) ||
        (game.useDice && game.state === diceStage));

    if (game.keepScore) {
      const toOpenEndgameSB =
        (game.useDice && game.state === diceStage) ||
        (!game.useDice && game.state === waiting);
      if (teamsWithChance.length > 0 && toOpenEndgameSB) {
        setScoreboardOpen(true);
        setGame((prevGame) => {
          prevGame.order = [
            ...teamsWithChance,
            ...winningTeams,
            ...losingTeams,
          ];
          return prevGame;
        });
      } else if (winningTeams.length > 0 && teamsWithChance.length === 0) {
        setScoreboardOpen(true);
      } else if (openSBEachRound) {
        setScoreboardOpen(true);
      }
    }
  }

  return (
    <div
      // style={{ width: window.innerWidth - 20 }}
      className="dashboard-container"
    >
      <div className="dashboard">
        {scoreboardOpen && game.keepScore && (
          <Scoreboard
            closeScoreboard={handleOverlayClick}
            toPopUp={toPopUp}
            setToPopUp={setToPopUp}
            scoreboardState={scoreboardState(game)}
          />
        )}
        {(menuOpen || scoreboardOpen) && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => handleOverlayClick()}
              className="menu-overlay"
            ></motion.div>
          </AnimatePresence>
        )}
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="dashboard-left">
          {game.mode === teamsMode ? (
            <div className="team-graphic">
              <div
                style={{ background: currentTeam.colour }}
                className="team-graphic-colour"
              ></div>
              <h3 className="team-graphic-text">
                {currentPlayer.name || currentTeam.name}
              </h3>
            </div>
          ) : (
            <>
              {(game.state === waiting || game.state === running) && (
                <div className="dashboard-logo">
                  <GameLogo />
                </div>
              )}
            </>
          )}
        </div>
        <div className="dashboard-right">
          {game.keepScore && game.state !== running && (
            <button onClick={handleScoreToggle} className="scoreboard-btn">
              {scoreboardOpen ? "Close Scores" : "Scoreboard"}
            </button>
          )}
          {game.useTimer && showTimerStates && (
            <Timer setGameIsDone={setGameIsDone} />
          )}
          <h3
            style={optionsStyle}
            onClick={handleMenuToggle}
            className="options-btn-emoji"
          >
            ⚙️
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OptionsBtn;
