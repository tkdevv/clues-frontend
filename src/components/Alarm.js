import React from "react";
import { useEffect } from "react";

const Alarm = ({ alarmRinging, setAlarmRinging, pageRefresh }) => {
  const alarm = document.createElement("audio");
  alarm.src = require("../audio/alarm.mp3");

  useEffect(() => {
    if (alarmRinging) {
      alarm.addEventListener("ended", () => alarm.play());
      alarm.play();
      alarm.volume = 1;
    }
    return () => alarm.pause();
  }, []);

  const stopAlarmHandle = () => {
    alarm.pause();
    setAlarmRinging(false);
    pageRefresh();
  };

  return (
    <div className="alarm-stopper" onClick={stopAlarmHandle}>
      <h3>
        Click anywhere to stop <br /> alarm
      </h3>
    </div>
  );
};

export default Alarm;
