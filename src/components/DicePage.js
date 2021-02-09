import React, { useState, useContext, useEffect } from "react";
import GameLogo from "./GameLogo";
import { shuffleArray, uniqueId, scoreboardState } from "../utils/utils";
import {
  quickStartMode,
  teamsMode,
  waiting,
  winningScore,
} from "../utils/GlobalVariables";
import NextScreenBtn from "./NextScreenBtn";
import { GameContext } from "../context/GameContext";
import useForceUpdate from "../hooks/useForceUpdate";
import { ppBannerAd } from "../utils/content";
import BannerAd from "../components/BannerAd";

const DicePage = ({ pageRefresh, skipPlayer }) => {
  const [game, setGame] = useContext(GameContext);

  let diceValues = shuffleArray(
    shuffleArray(shuffleArray([0, 1, 2, 0, 1, 2, 0, 1, 2]))
  );
  diceValues = diceValues.map((value) => {
    return { value, isClicked: false };
  });
  const forceUpdate = useForceUpdate();
  const [diceOptions, setDiceOptions] = useState(diceValues);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNextBtn = () => {
    setGame((prev) => {
      prev.state = waiting;
      return prev;
    });
    pageRefresh();
  };

  const currentTeam = game.mode === teamsMode ? game.order[0] : "";
  const currentPlayer = game.useTeamMembers ? game.order[0].members[0] : "";

  const handleBoxPick = (val, sentIndex) => {
    const winningTeams = scoreboardState(game)
      ? scoreboardState(game).winningTeams
      : [];

    if (
      winningTeams.length > 0 &&
      winningScore > game.order[0].score - val + 5
    ) {
      setGame((prevGame) => {
        prevGame.order.forEach((team) => {
          if (team.id === currentTeam.id) {
            team.roundsPlayed += 1;
          }
        });
        return prevGame;
      });
    }

    if (typeof game.diceValue !== "number") {
      setGame((prev) => {
        prev.diceValue = val;
        return prev;
      });
      setDiceOptions((prevOptions) => {
        prevOptions.forEach((option, index) => {
          option.isClicked = index === sentIndex ? true : false;
        });
        return prevOptions;
      });
    }

    forceUpdate();
  };
  //
  const diceBoxStyle = (val) => {
    if (game.diceValue === null) {
      return {
        backgroundColor: "#000",
        border: "none",
        color: "#000",
      };
    } else if (val.isClicked) {
      return {
        backgroundColor: "#000000",
        // border: "2px solid rgb(44, 235, 6)",
        color: "rgb(44, 235, 6)",
      };
    } else {
      return {
        backgroundColor: "transparent",
        border: "2px solid rgb(120, 120, 120)",
        color: "rgb(120, 120, 120)",
      };
    }
  };

  return (
    <div className="dice-page-wrapper">
      <GameLogo padding />
      {game.mode === teamsMode && (
        <div className="team-player-info-container">
          <div
            style={{ backgroundColor: currentTeam.colour }}
            className="team-colour-indicator"
          ></div>
          <h3>{game.useTeamMembers ? currentPlayer.name : currentTeam.name}</h3>

          {game.useTeamMembers && !game.diceValue && (
            <button
              className="skip-player-btn"
              onClick={() => skipPlayer()}
            >{`Skip ${currentPlayer.name}`}</button>
          )}
        </div>
      )}
      <div className="dice-container">
        <h3 className="dice-name">pick a box</h3>
        <h4 className="dice-description">this acts as the dice.</h4>
        <div className="dice-options-container">
          {diceOptions.map((value, index) => (
            <div
              style={diceBoxStyle(value)}
              key={uniqueId() + "ttvse"}
              onClick={() => handleBoxPick(value.value, index)}
              className="dice-box"
            >
              <h2 className="dice-value">{value.value}</h2>
            </div>
          ))}
        </div>
        {typeof game.diceValue === "number" && (
          <NextScreenBtn clickHandler={handleNextBtn} />
        )}
      </div>
      {/* <BannerAd ad={ppBannerAd} /> */}
    </div>
  );
};

export default DicePage;
