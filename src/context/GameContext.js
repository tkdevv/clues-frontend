import React, { createContext, useState, useEffect, version } from "react";
import { Game, cards, shuffleArray } from "../utils/utils";
import axios from "axios";
import {
  setCardsLS,
  setNextCard,
  getCardsInLS,
  setLatestVersionLS,
  latestVersionLS,
} from "../utils/localStorage";

const gameInit = new Game();
const cardsInit = [...cards];

const queryString = window.location.search;

export const GameContext = createContext(null);
export const CardsContext = createContext(null);
export const InstallPromptContext = createContext(null);

const GlobalState = ({ children }) => {
  const [game, setGame] = useState(gameInit);
  const [cards, setCards] = useState([]);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [cardsError, setCardsError] = useState(false);

  const getAndSetCards = (latestVersion = null) => {
    axios("https://cluesapp.herokuapp.com/cards")
      .then((res) => {
        // console.log("RES FROM CARDS CALL", res.data);
        const cardData = res.data.map((cardObj) => {
          // console.log(cardObj.clues, typeof cardObj.clues);
          const clues = cardObj.clues.split("//").map((clue) => clue.trim());
          return {
            id: cardObj.id,
            clues,
          };
        });
        setLSCards(cardData, latestVersion);
        // localStorage.setItem("game", JSON.stringify(game));
      })
      .catch(() => {
        if (getCardsInLS()) {
          setCards(getCardsInLS());
        } else {
          setCardsError(true);
          setCards(null);
        }
      });
  };

  const setLSCards = (newCards, version) => {
    const newCardsLS = shuffleArray(newCards);
    setCardsLS(newCards);
    setLatestVersionLS(version);
    setCards(newCards);
  };

  const cueNextCard = () => {
    setNextCard();
    setCards(getCardsInLS());
  };

  useEffect(() => {
    axios(`https://cluesapp.herokuapp.com/version/${latestVersionLS}`)
      .then((res) => {
        if (res.data.isLatest) {
          getCardsInLS()
            ? setCards(getCardsInLS())
            : getAndSetCards(latestVersionLS);
        } else {
          const latestVersion = res.data.latestVersion;
          getAndSetCards(latestVersion);
        }
      })
      .catch((err) => {
        if (getCardsInLS()) {
          setCards(getCardsInLS());
        } else {
          setCardsError(true);
          setCards(null);
        }
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(queryString);
    const isFromPWA = params.get("from") === "pwa";
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      if (!isFromPWA) {
        setInstallPrompt(e);
      }
    });
  }, []);

  return (
    <CardsContext.Provider value={[cards, cueNextCard]}>
      <GameContext.Provider value={[game, setGame]}>
        <InstallPromptContext.Provider value={installPrompt}>
          {children}
        </InstallPromptContext.Provider>
      </GameContext.Provider>
    </CardsContext.Provider>
  );
};

export default GlobalState;
