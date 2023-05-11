import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { createStore } from './store/store';
import { Router } from './routers/router';
import { fetchItems } from './store/slices/apiSlice';

const render = async (url: string, streamOptions: RenderToPipeableStreamOptions) => {
  const store = createStore();

  let injectPreload = () => '';
  if (url === '/') {
    await store.dispatch(fetchItems({}));
    const state = store.getState();
    const preload = JSON.stringify(state).replace(/</g, '\\u003c');
    injectPreload = () => `<script>globalThis.preloadedState = ${preload}</script>`;
  }

  const stream = renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <Provider store={store}>
          <Router />
        </Provider>
      </StaticRouter>
    </StrictMode>,
    streamOptions
  );

  return { stream, injectPreload };
};

export { render };
