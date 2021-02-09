import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import {
  modeOptionsInit,
  justTeams,
  randomMembers,
  manualTeams,
} from "../utils/GlobalVariables";

const RadioBtns = ({ selectedRadio, setSelectedRadio }) => {
  const [game, setGame] = useContext(GameContext);
  const [modeOptions, setModeOptions] = useState(
    modeOptionsInit(selectedRadio)
  );

  const radioStyle = (isSelected) => {
    return isSelected ? {} : { opacity: "0.3" };
  };

  const handleTeamsMode = (mode) => {
    const newModeOptions = modeOptions.map((option) => {
      if (option.mode === mode.mode) {
        option.isSelected = true;
        setSelectedRadio(mode.mode);
      } else {
        option.isSelected = false;
      }
      return option;
    });
    setModeOptions(newModeOptions);
  };

  return (
    <div className="radio-btn-wrapper">
      {modeOptions.map((modeOption, index) => (
        <div key={modeOption.mode + index + "rddfsfasw"}>
          {!(
            !game.browserSupported &&
            (modeOption.mode === manualTeams ||
              modeOption.mode === randomMembers)
          ) && (
            <div
              key={`radios${index}`}
              style={radioStyle(modeOption.isSelected)}
              className="radio-container"
              onClick={() => handleTeamsMode(modeOption)}
            >
              <div className="radio-switch">
                <div className="radio-btn">
                  {modeOption.isSelected && (
                    <div className="radio-btn-selected"></div>
                  )}
                </div>
              </div>
              <div className="radio-btn-text-container">
                <h2 className="radio-title">{modeOption.mode}</h2>
                <h3 className="radio-description">{modeOption.description}</h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RadioBtns;
