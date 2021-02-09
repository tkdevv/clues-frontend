import React from "react";
import GameLogo from "../components/GameLogo";
import { Link } from "react-router-dom";
import { ppBannerAd } from "../utils/content";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import BannerAd from "../components/BannerAd";

const GameRules = () => {
  const [game] = useContext(GameContext);

  return (
    <div className="game-rules-container">
      <Link to="/">
        <div
          style={{ backgroundColor: game.colours[0], marginTop: "10px" }}
          className="game-rules-home-container"
        >
          <h4 className="game-rules-home-text">Homepage</h4>
        </div>
      </Link>

      <GameLogo padding />
      <h3 className="game-rules-text">
        Make 2 or more teams with at least 2 people per team.
      </h3>
      <h3 className="game-rules-text">
        Each round (usually 30 seconds, but up to your discretion), a member
        from each team should describe as many of the clues on the given card
        within the allocated time.
      </h3>
      <h3 className="game-rules-text">
        The describing teammate cannot say any of the words on the card, nor
        what the words start with, rhyme with, or sound like. Direct
        translations from another languages are also forbidden.
      </h3>
      <h3 className="game-rules-text">
        Teammates should shout what they think their teammate is describing.
        Articles and plural count towards the guess, so be accurate.
      </h3>
      <h3 className="game-rules-text">
        We suggest you keep a score tally of correct guesses for each team.
      </h3>
      <h3 className="game-rules-text">
        A dice can be used to make the game more interesting. Where each number
        rolled is subtracted from the total guesses the playing team got right
        e.g. If the team rolls a 2 and makes 3 correct guesses, only 1 is added
        to their score. (A dice with numbers 0-2 is usually used)
      </h3>
      <h3 className="game-rules-text">
        Bend and/or extend the rules as you see fit.
      </h3>
      <h3 className="game-rules-text">Enjoy and then rest bafowethu.</h3>
      <Link to="/">
        <button
          style={{ backgroundColor: game.colours[0] }}
          className="game-rules-btn"
        >
          Back to Homepage
        </button>
      </Link>

      {/* <BannerAd ad={ppBannerAd} /> */}
    </div>
  );
};

export default GameRules;
