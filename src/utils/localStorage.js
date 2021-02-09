import { decrypt, encrypt } from "./encryption";

// VARIABLES
const latestVersionStr = "latest version";
const cardsStr = "cards";
const usedCardsStr = "used cards";

const checkUsedCards = (usedCardsIds, allCards) => {
  const allCardsIds = allCards.map((card) => card.id);
  const unusedCards = allCardsIds.filter(
    (id) => !usedCardsIds.includes(id) && id
  );
  return unusedCards.length > 2 ? false : true;
};

// GET LS ITEMS
export const latestVersionLS = localStorage.getItem(latestVersionStr)
  ? Number(localStorage.getItem(latestVersionStr))
  : 0;

export const getCardsInLS = () => {
  const encryptedCardsInLS = localStorage.getItem(cardsStr)
    ? JSON.parse(localStorage.getItem(cardsStr))
    : null;
  return encryptedCardsInLS ? JSON.parse(decrypt(encryptedCardsInLS)) : null;
};

// SET LS ITEMS
export const setCardsLS = (cards) => {
  localStorage.setItem(cardsStr, JSON.stringify(encrypt(cards)));
};

export const setLatestVersionLS = (version) => {
  localStorage.setItem(latestVersionStr, JSON.stringify(version));
};

export const addUsedCardId = (cardId) => {
  const usedCardsIds = localStorage.getItem(usedCardsStr)
    ? JSON.parse(localStorage.getItem(usedCardsStr))
    : [];

  if (checkUsedCards(usedCardsIds, getCardsInLS())) {
    localStorage.setItem(usedCardsStr, JSON.stringify([]));
  }

  if (!usedCardsIds.includes(cardId)) {
    const updatedUsedCardIds = [...usedCardsIds, cardId];
    localStorage.setItem(usedCardsStr, JSON.stringify(updatedUsedCardIds));
  }
};

export const setNextCard = () => {
  let cardsInLS;
  try {
    cardsInLS = JSON.parse(decrypt(JSON.parse(localStorage.getItem(cardsStr))));
  } catch (error) {
    cardsInLS = [];
  }
  const usedCardsIds = localStorage.getItem(usedCardsStr)
    ? JSON.parse(localStorage.getItem(usedCardsStr))
    : [];

  const cueNextCard = () => {
    const latestCard = cardsInLS.splice(0, 1);
    const updatedCardsInLS = [...cardsInLS, latestCard];
    setCardsLS(updatedCardsInLS);
    addUsedCardId(latestCard[0].id);
  };
  cueNextCard();

  while (usedCardsIds.includes(cardsInLS[0].id)) {
    cueNextCard();
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem(cardsStr);
  localStorage.removeItem(latestVersionStr);
};
