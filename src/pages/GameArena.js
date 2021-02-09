import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import {
  quickStartMode,
  teamsMode,
  waiting,
  running,
  gameDone,
  diceStage,
} from "../utils/GlobalVariables";
import { redirectIfMust } from "../utils/utils";
import DicePage from "../components/DicePage";
import GameWaiting from "../components/GameWaiting";
import GameActive from "../components/GameActive";
import PostGameScreen from "../components/PostGameScreen";
import OptionsBtn from "../components/OptionsBtn";
import useForceUpdate from "../hooks/useForceUpdate";
import Alarm from "../components/Alarm";

const GameArena = () => {
  const [game, setGame] = useContext(GameContext);
  const [correctGuessIndexes, setCorrectGuessIndexes] = useState([]);
  const [gameIsDone, setGameIsDone] = useState(false);
  const [rotateCard, setRotateCard] = useState(false);
  const forceUpdate = useForceUpdate();
  const [alarmRinging, setAlarmRinging] = useState(false);

  const pageRefresh = () => {
    forceUpdate();
  };

  const skipPlayer = () => {
    setGame((prevGame) => {
      const playerToSkip = prevGame.order[0].members.splice(0, 1);
      prevGame.order[0].members = [
        ...prevGame.order[0].members,
        ...playerToSkip,
      ];
      return prevGame;
    });
    pageRefresh();
  };

  return (
    <div>
      {redirectIfMust(game)}
      {game.mode && game.state && <OptionsBtn setGameIsDone={setGameIsDone} />}

      {alarmRinging && game.useTimer && (
        <Alarm
          alarmRinging={alarmRinging}
          pageRefresh={pageRefresh}
          setAlarmRinging={setAlarmRinging}
        />
      )}
      {game.state === diceStage ? (
        <DicePage
          game={game}
          pageRefresh={pageRefresh}
          skipPlayer={skipPlayer}
        />
      ) : game.state === waiting ? (
        <GameWaiting
          pageRefresh={pageRefresh}
          rotateCard={rotateCard}
          setRotateCard={setRotateCard}
          skipPlayer={skipPlayer}
        />
      ) : game.state === running ? (
        <GameActive
          setAlarmRinging={setAlarmRinging}
          forceUpdate={forceUpdate}
          setGameIsDone={setGameIsDone}
          gameIsDone={gameIsDone}
          setCorrectGuessIndexes={setCorrectGuessIndexes}
          pageRefresh={pageRefresh}
          rotateCard={rotateCard}
          setRotateCard={setRotateCard}
        />
      ) : game.state === gameDone ? (
        <PostGameScreen
          correctGuessIndexes={correctGuessIndexes}
          pageRefresh={pageRefresh}
        />
      ) : (
        <div>NO GAME STATE</div>
      )}
    </div>
  );
};

export default GameArena;
