import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardItem } from '../../components/FormCardItem/FormCardItem';

export interface FormCardsState {
  cards: CardItem[];
}

interface CardPayload {
  card: Omit<CardItem, 'id'>;
}

const formCardsSlice = createSlice({
  name: 'formCards',
  initialState: <FormCardsState>{ cards: [] },
  reducers: {
    addCard(state, action: PayloadAction<CardPayload>) {
      state.cards.push({ ...action.payload.card, id: state.cards.length + 1 });
    },
  },
});

const formCardsReducer = formCardsSlice.reducer;
const formCardsAction = formCardsSlice.actions;

export { formCardsReducer, formCardsAction };
