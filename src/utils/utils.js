import {
  quickStartMode,
  gameDone,
  teamsMode,
  setUp,
  width,
  height,
  rotateCondition,
  justTeams,
  randomMembers,
  manualTeams,
  winningScore,
} from "./GlobalVariables";
import { v4 as uuidv4 } from "uuid";
import React from "react";

import { Redirect } from "react-router-dom";

export const colours = [
  // "#74AB47",
  "#9895FC",
  "#FCA700",
  // "#00B897",
  "#fd7362",
  "#ff4768",
];

export class Player {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.points = 0;
  }
}

const supportedBrowsers = ["Chrome", "Firefox"];
let browserSupported = false;

supportedBrowsers.forEach((browser) => {
  if (navigator.userAgent.indexOf(browser) >= 0) {
    browserSupported = true;
  }
});

export class Game {
  constructor() {
    this.state = "";
    this.mode = "";
    this.teamsMode = "";
    // this.order = [team2, team1];
    // this.teams = [team1, team2];
    this.order = [];
    this.teams = [];
    this.cardsUsed = [];
    this.useDice = false;
    this.useTimer = false;
    this.keepScore = false;
    this.useTeamMembers = false;
    this.diceValue = null;
    this.colours = shuffleArray(colours);
    this.browserSupported = browserSupported;
  }
}

const team1 = {
  id: "",
  name: "TEAM 1",
  // members: [{ name: "Member 1" }, { name: "Member 2" }],
  members: [],
  colour: colours[0],
  score: 0,
  roundsPlayed: 0,
};

const team2 = {
  id: "",
  name: "TEAM 2",
  // members: [{ name: "Member 3" }, { name: "Member 4" }],
  members: [],
  colour: colours[1],
  score: 0,
  roundsPlayed: 0,
};

export class Team {
  constructor(name) {
    this.id = null;
    this.name = name;
    this.colour = "";
    this.members = [];
    this.score = 0;
    this.roundsPlayed = 0;
  }
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const cards = [
  {
    id: 1,
    clues: ["ABSA", "ROLEX ", "CHELSEA", "COVID-19", "VITAMINS", "SONY"],
  },
  {
    id: 2,
    clues: ["GO SLO'S", "NIKON", "VASELINE", "AFRO COMB", "PC", "ZAM-BUK"],
  },
  {
    id: 3,
    clues: [
      "MONEY",
      "HARD DRIVE",
      "LEBRON JAMES",
      "ADIDAS",
      "FNB STADIUM",
      "SUMMER",
    ],
  },
];

export const gameFinished = (setGame, forceUpdate) => {
  setGame((prev) => {
    prev.state = gameDone;
    return prev;
  });
  forceUpdate();
};

export const cardRotationStyle = rotateCondition
  ? {
      transform: "rotateZ(90deg)",
      // position: "absolute",
      height: 0.5 * height,
      width: 0.8 * height,
      marginTop: 0.13 * height,
    }
  : {};

export const BtnRotationStyle = rotateCondition
  ? {
      position: "absolute",
      // alignSelf: "flex-end",
      bottom: "-15px",
      right: " 10px",
    }
  : {};

export const CardWrapperRotationStyle = rotateCondition
  ? {
      transform: "rotateZ(90deg)",
      height: `${0.9 * width}px`,
      width: `${0.8 * height}px`,
      position: "absolute",
      // background: "red",
      // border: "2px solid #fff",
      transformOrigin: "center center",
    }
  : {};

export const redirectIfMust = (game, fromPage = "") => {
  if (game.mode === "") {
    // console.log("Redirecting Home");
    return <Redirect to="" />;
  }

  const activeState = game.state && game.state !== setUp;
  const loadTeamsSetUpPage =
    (game.teamsMode === randomMembers || game.teamsMode === manualTeams) &&
    !activeState &&
    game.mode === teamsMode;

  const activeMode =
    game.mode === quickStartMode ||
    (game.mode === teamsMode &&
      activeState &&
      (game.teamsMode === randomMembers ||
        game.teamsMode === manualTeams ||
        game.teamsMode === justTeams));

  if (activeMode && activeState) {
    return <Redirect to="/arena" />;
  }

  if (game.mode === teamsMode && !game.teamsMode) {
    return <Redirect to="/config" />;
  }

  if (loadTeamsSetUpPage) {
    if (fromPage !== "teamSetUpPage") {
      return <Redirect to="/team-selection" />;
    }
  }
};

export const titleCase = (str) => {
  return (
    str
      // .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ")
  );
};

export const uniqueId = () => uuidv4();

export const shuffleAndSegmentPlayers = (players, teamsArray) => {
  const randomisedPlayers = shuffleArray([...players]);
  const fullyProcessedTeams = [];
  const playersPerTeam = Math.floor(
    randomisedPlayers.length / teamsArray.length
  );
  teamsArray.forEach((num, index) => {
    fullyProcessedTeams[index] = randomisedPlayers.slice(0, playersPerTeam);
    randomisedPlayers.splice(0, playersPerTeam);
  });

  randomisedPlayers.forEach((playerObj, index) => {
    fullyProcessedTeams[index] = [...fullyProcessedTeams[index], playerObj];
  });
  return fullyProcessedTeams;
};

export const disabledStyles = {
  opacity: "0.4",
  pointerEvents: "none",
};

export const gameHasStarted = (game) =>
  game.order.filter((team) => team.roundsPlayed > 0).length > 0;

export const scoreboardState = (game) => {
  if (!game.keepScore) {
    return false;
  }
  let losingTeams = [];
  let stillAChanceTeams = [];
  const teamsWithWinScore = game.order.filter(
    (team) => team.score >= winningScore
  );
  const teamsWithOutWinScore = game.order.filter(
    (team) => team.score < winningScore
  );
  teamsWithOutWinScore.forEach((team) => {
    if (
      teamsWithWinScore.length > 0 &&
      team.score >= winningScore - 5 &&
      team.roundsPlayed < teamsWithWinScore[0].roundsPlayed
    ) {
      stillAChanceTeams = [...stillAChanceTeams, team];
    } else if (teamsWithWinScore.length > 0) {
      losingTeams = [...losingTeams, team];
    }
  });

  return {
    winningTeams: teamsWithWinScore,
    teamsWithChance: stillAChanceTeams,
    losingTeams,
  };
};
