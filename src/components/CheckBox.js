import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import useForceUpdate from "../hooks/useForceUpdate";
import { useDice, useTimer, keepScore } from "../utils/GlobalVariables";
import { motion, AnimatePresence } from "framer-motion";

const CheckBox = ({ children, checkboxName }) => {
  const [game, setGame] = useContext(GameContext);
  const forceUpdate = useForceUpdate();

  const renderCondition =
    checkboxName === useDice && game.useDice
      ? true
      : checkboxName === useTimer && game.useTimer
      ? true
      : checkboxName === keepScore && game.keepScore
      ? true
      : false;

  const handleCheckboxToggle = (checkBoxName) => {
    setGame((prev) => {
      if (checkBoxName === useTimer) {
        prev.useTimer = !prev.useTimer;
      } else if (checkBoxName === useDice) {
        prev.useDice = !prev.useDice;
      } else if (checkBoxName === keepScore) {
        prev.keepScore = !prev.keepScore;
      }
      return prev;
    });
    forceUpdate();
  };

  const msgWrapperStyle =
    checkboxName === useTimer && game.useTimer ? { height: 70 } : { height: 0 };

  if (!game.browserSupported && checkboxName === useTimer) {
    return <></>;
  }

  return (
    <>
      <div
        onClick={() => handleCheckboxToggle(checkboxName)}
        className="checkbox-container"
      >
        <div className="checkbox-and-text">
          <div className="checkbox">
            {renderCondition && <div className="checkbox-selected"></div>}
          </div>
          <h3 className="checkbox-label">{children}</h3>
        </div>
        <AnimatePresence>
          <div style={msgWrapperStyle} className="checkbox-msg-container">
            {checkboxName === useTimer && game.useTimer && (
              <motion.h3
                initial={{ y: -40 }}
                animate={{ y: 0 }}
                exit={{ y: -60 }}
                transition={{ duration: 0.3 }}
                // style={{ color: game.colours[0] }}
                className="checkbox-msg"
              >
                Make sure device is not on silent or vibrate. Also max out
                device volume.
              </motion.h3>
            )}
          </div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default CheckBox;
