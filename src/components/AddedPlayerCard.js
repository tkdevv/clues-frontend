import React from "react";

const AddedPlayerCard = ({ player, onClickHandler, colour = "#a0ef16" }) => {
  return (
    <div>
      <div
        className="player-name"
        onClick={onClickHandler}
        style={{ background: colour }}
      >
        {player.name}
        <div style={{ background: colour }} className="remove-name-card">
          X
        </div>
      </div>
    </div>
  );
};

export default AddedPlayerCard;
