import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import {
  useTimer,
  quickStartMode,
  useDice,
  teamsMode,
  diceStage,
  waiting,
  isFromPWA,
} from "../utils/GlobalVariables";
import GameLogo from "../components/GameLogo";
import useForceUpdate from "../hooks/useForceUpdate";
import CheckBox from "../components/CheckBox";
import { redirectIfMust } from "../utils/utils";
import { ppBannerAd } from "../utils/content";
import BackButton from "../components/BackButton";
import BannerAd from "../components/BannerAd";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [quickStartOptions, setQuickStartOptions] = useState(false);
  const [game, setGame] = useContext(GameContext);
  const forceUpdate = useForceUpdate();

  const quickStartBtnStyle = {
    backgroundColor: quickStartOptions ? "transparent" : game.colours[0],
    color: quickStartOptions ? game.colours[0] : "#000",
  };

  const handleGameStart = () => {
    setGame((prev) => {
      prev.mode = quickStartMode;
      prev.state = prev.useDice ? diceStage : waiting;
      return prev;
    });
    forceUpdate();
  };

  const handleTeamsMode = () => {
    setGame((prev) => {
      prev.mode = teamsMode;
      return prev;
    });
    forceUpdate();
  };

  const onClickHandler = () => {
    setGame((prevGame) => {
      prevGame.mode = "";
      return game;
    });
    setQuickStartOptions(false);
    forceUpdate();
  };

  return (
    <div className="home-page-wrapper">
      {redirectIfMust(game)}
      <GameLogo padding />
      {quickStartOptions && <BackButton onClickHandler={onClickHandler} />}

      <h3 className="home-description">
        A trivia game made to enjoy with a group.
      </h3>

      <button
        style={{ backgroundColor: game.colours[0] }}
        onClick={() => setQuickStartOptions((prev) => !prev)}
        className="quick-start-btn home-btn"
        style={quickStartBtnStyle}
      >
        QUICK START
      </button>

      {!quickStartOptions && (
        <>
          {isFromPWA && (
            <div
              onClick={() => window.open("/?from=pwa", "_self")}
              className="home-reload-btn"
            >
              <div className="home-reload-btn-triangle">
                <div className="home-reload-mask"></div>
              </div>
            </div>
          )}

          <h3 style={{ color: "#000" }} className="home-btn-description">
            just show us the cards and we'll do the rest.
          </h3>
        </>
      )}

      {quickStartOptions ? (
        <>
          <div className="homepage-checkboxes-container">
            <CheckBox checkboxName={useDice}>Use App Dice</CheckBox>
            <CheckBox checkboxName={useTimer}>Use App Timer</CheckBox>
            <button
              onClick={() => handleGameStart()}
              className="quick-start-initiate-btn"
            >
              Start Game
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/rules">
            <div
              style={{
                backgroundColor: game.colours[0],
                marginRight: "-8px",
                marginTop: "2px",
              }}
              className="game-rules-home-container"
            >
              <h4 className="game-rules-home-text">Game Rules</h4>
            </div>
          </Link>

          <button
            style={{ backgroundColor: game.colours[1] }}
            onClick={() => handleTeamsMode()}
            className="set-teams-btn home-btn"
          >
            SET TEAMS
          </button>
          <h3 style={{ color: "#000" }} className="home-btn-description">
            create teams, keep score and configure other settings.
          </h3>
        </>
      )}

      {!game.browserSupported && !quickStartOptions && (
        <h3 className="supported-browser-home-msg">
          Use Chrome or Edge for the full feature set.
        </h3>
      )}
      {/* <BannerAd ad={ppBannerAd} /> */}
    </div>
  );
};

export default HomePage;
