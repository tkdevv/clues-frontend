import React, { useContext, useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import CheckBox from "../components/CheckBox";
import InputContainer from "../components/InputContainer";
import LengthError from "../components/LengthError";
import RadioBtns from "../components/RadioBtns";
import BannerAd from "../components/BannerAd";
import { GameContext } from "../context/GameContext";
import useForceUpdate from "../hooks/useForceUpdate";
import {
  useTimer,
  keepScore,
  useDice,
  justTeams,
  diceStage,
  waiting,
  teamNameMaxLength,
} from "../utils/GlobalVariables";
import { ppBannerAd } from "../utils/content";
import {
  Team,
  shuffleArray,
  redirectIfMust,
  Game,
  titleCase,
} from "../utils/utils";

const GameSettings = () => {
  const [game, setGame] = useContext(GameContext);
  const radioInit = game.teamsMode || justTeams;
  const [selectedRadio, setSelectedRadio] = useState(radioInit);
  const [nameLengthError, setNameLengthError] = useState({
    id: null,
    error: true,
  });
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    game.teams.length === 0 && handleNumTeamsSelect(2);
    game.teams.length === 0 && setSelectedRadio(justTeams);
    window.scrollTo(0, 0);
  }, []);

  const handleNumTeamsSelect = (e) => {
    let numOfTeamsSelected =
      e.target === undefined ? e : Number(e.target.value);
    // setNumOfTeams(Number(numOfTeamsSelected));
    // setTeams([]);
    if (game.teams.length > 0 && game.teams.length < numOfTeamsSelected) {
      const numOfTeamsToAdd = numOfTeamsSelected - game.teams.length;
      const arrayOfNewIds = [...Array(numOfTeamsToAdd).keys()];
      arrayOfNewIds.forEach((num, index) => {
        num = 1 + 1 * num + game.teams.length - num;
        const team = new Team(`Team ${num}`);
        team.id = num;
        team.colour = game.colours[num - 1];
        setGame((prevGame) => {
          prevGame.teams = [...prevGame.teams, team];
          return prevGame;
        });
      });
    } else if (game.teams.length && game.teams.length > numOfTeamsSelected) {
      setGame((prevGame) => {
        const numTeams = prevGame.teams.length;
        const numOfTeamsToRemove = numTeams - numOfTeamsSelected;
        prevGame.teams.splice(
          numTeams - numOfTeamsToRemove,
          numOfTeamsToRemove
        );
        return prevGame;
      });
    } else if (!game.teams.length) {
      const arrayOfNewIds = [...Array(numOfTeamsSelected).keys()];
      arrayOfNewIds.forEach((num) => {
        num = num + 1;
        const team = new Team(`Team ${num}`);
        team.id = num;
        team.colour = game.colours[num - 1];
        setGame((prevGame) => {
          prevGame.teams = [...prevGame.teams, team];
          return prevGame;
        });
      });
    }
    forceUpdate();
  };

  const handleTeamNames = (e, id) => {
    nameLengthError && setNameLengthError({ id: null, error: false });
    const name = e.target.value ? e.target.value : `Team ${id}`;

    if (name.length <= teamNameMaxLength) {
      setGame((prevGame) => {
        prevGame.teams.forEach((team) => {
          if (team.id === id) {
            team.name = titleCase(name);
          }
        });
        return prevGame;
      });
    } else {
      setNameLengthError({ id: id, error: true });
      e.target.value = name.slice(0, teamNameMaxLength);
    }
    forceUpdate();
  };

  const handleGameSettings = () => {
    const justTeamsMode =
      selectedRadio === justTeams || selectedRadio.teamsMode;
    setGame((prevGame) => {
      prevGame.teamsMode = selectedRadio;
      if (selectedRadio === justTeams) {
        prevGame.order = shuffleArray(prevGame.teams);
        prevGame.state = prevGame.useDice ? diceStage : waiting;
      }
      return prevGame;
    });

    forceUpdate();
  };

  const headBackHome = () => {
    setGame(new Game());
  };

  return (
    <div className="config-page-wrapper">
      {redirectIfMust(game)}
      <BackButton onClickHandler={headBackHome} />
      <div>
        <h2 className="game-settings-heading">Game Settings</h2>

        <div className="game-settings-checkboxes">
          <CheckBox checkboxName={useDice}>Use App Dice</CheckBox>
          <CheckBox checkboxName={keepScore}>Keep Score</CheckBox>
          <CheckBox checkboxName={useTimer}>Use App Timer</CheckBox>
        </div>
      </div>

      <hr className="game-settings-divider" />

      <div className="select-container">
        <select onChange={(e) => handleNumTeamsSelect(e)}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <label>Number of Teams</label>
      </div>

      <div className="teams-input-wrapper">
        {game.teams.map((team) => (
          <div className="teams-input-container" key={team.id + "temajkfkjd"}>
            <InputContainer
              key={"teamName" + team.id}
              team={team}
              handleTeamNames={handleTeamNames}
            />
            {nameLengthError.error && nameLengthError.id === team.id && (
              <LengthError isTeam={true} />
            )}
          </div>
        ))}
      </div>

      <hr className="game-settings-divider" />

      <RadioBtns
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
      />

      <button
        style={{ margin: "10px auto" }}
        onClick={() => handleGameSettings()}
        className="quick-start-initiate-btn game-settings-start-btn"
      >
        Start
      </button>
      {/* <BannerAd ad={ppBannerAd} /> */}
    </div>
  );
};

export default GameSettings;
