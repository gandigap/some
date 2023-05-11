import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { formReducer } from './slices/formSlice';
import { formCardsReducer } from './slices/formCardsSlice';
import { apiReducer } from './slices/apiSlice';

const reducer = combineReducers({
  form: formReducer,
  formCards: formCardsReducer,
  api: apiReducer,
});

export type RootState = ReturnType<typeof reducer>;

const createStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
  });

type AppStore = ReturnType<typeof createStore>;

export { createStore };

export type AppDispatch = AppStore['dispatch'];
