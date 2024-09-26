import React, { createContext, useState, useContext } from 'react';

const CardContext = createContext();

export const useCardContext = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const updateCard = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
  };

  return (
    <CardContext.Provider value={{ cards, setCards, selectedCard, setSelectedCard, updateCard }}>
      {children}
    </CardContext.Provider>
  );
};
