import React from "react";
import {
  playerNameMaxLength,
  teamNameMaxLength,
} from "../utils/GlobalVariables";

const LengthError = ({ isTeam = false }) => {
  const errorText = isTeam
    ? `team name must be less than ${teamNameMaxLength} characters`
    : `names must be between 3 and ${playerNameMaxLength} characters`;

  return (
    <div className="name-length-error">
      <img src={require("../img/warning.svg")} />
      <h6>{errorText}</h6>
    </div>
  );
};

export default LengthError;
