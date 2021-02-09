// GAME VARIABLES
export const useTimer = "useTimer";
export const useDice = "useDice";
export const keepScore = "keepScore";
export const quickStartMode = "quickStartMode";
export const teamsMode = "teamsMode";
export const justTeams = "just teams";
export const randomMembers = "random members";
export const manualTeams = "manual teams";
export const playerNameMaxLength = 9;
export const teamNameMaxLength = 13;
export const minNameLength = 3;
export const gameName = "5 Clues (beta)";
export const winningScore = 40;

// USER USING PWA
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
export const isFromPWA = params.get("from") === "pwa";

// GAME STATES
export const waiting = "waiting";
export const running = "running";
export const gameDone = "gameDone";
export const diceStage = "diceStage";
export const setUp = "setUp";

// CARD ROTATION VARIABLES
export const width = window.innerWidth;
export const height = window.innerHeight;
export const rotateCondition =
  width < height && width > 300 && width < 900 && height < 1050;

// MODE OPTIONS INIT
export const modeOptionsInit = (selected) => {
  const options = [
    {
      mode: justTeams,
      description:
        "you will handle member sorting and player rotation for each team.",
      isSelected: true,
    },
    {
      mode: randomMembers,
      description:
        "you add a list of players and we'll randomly divide you guys up into teams.",
      isSelected: false,
    },
    {
      mode: manualTeams,
      description: "you enter team members in each team manually.",
      isSelected: false,
    },
  ];
  options.forEach((option) => {
    if (option.mode === selected) {
      option.isSelected = true;
    } else {
      option.isSelected = false;
    }
  });
  return options;
};

export const initTeamNames = {
  team1Name: "",
  team2Name: "",
  team3Name: "",
  team4Name: "",
};

// NO WINNERS PLACEHOLDER
export const noWinnersPlaceholder = {
  winningTeams: [],
  teamsWithChance: [],
  losingTeams: [],
};
