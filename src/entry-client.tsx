import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { Router } from './routers/router';
import { RootState, createStore } from './store/store';

type Global = Window & typeof globalThis;

interface PreloadedState {
  preloadedState?: RootState;
}

type WindowWithPreload = Global & PreloadedState;

const render = () => {
  const domNode = document.getElementById('root') as HTMLElement;
  const store = createStore((globalThis as WindowWithPreload).preloadedState);
  delete (globalThis as WindowWithPreload).preloadedState;

  hydrateRoot(
    domNode,
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Router />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

render();
