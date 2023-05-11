import { useState } from 'react';
import { CardItem } from '../components/FormCardItem/FormCardItem';

export type AddCardMethod = (card: Omit<CardItem, 'id'>) => void;

const useAddCard = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const addCard: AddCardMethod = (card) => {
    setCards([...cards, { ...card, id: cards.length + 1 }]);
  };
  return { cards, addCard };
};

export { useAddCard };
