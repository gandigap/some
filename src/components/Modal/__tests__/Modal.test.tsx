import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Modal } from '../Modal';
import { createStore } from '../../../store/store';

describe('Modal', () => {
  const store = createStore();
  const handler = vi.fn();

  it('Test render Modal', async () => {
    render(
      <Provider store={store}>
        <Modal
          showModal
          onClose={handler}
        />
      </Provider>
    );
  });
  it('Test render Modal', async () => {
    render(
      <Provider store={store}>
        <Modal
          showModal={false}
          onClose={handler}
        />
      </Provider>
    );
  });
  it('Test render Modal', async () => {
    render(
      <Provider store={store}>
        <Modal
          showModal
          onClose={handler}
        />
      </Provider>
    );
  });
  it('Test render Modal', async () => {
    render(
      <Provider store={store}>
        <Modal
          showModal={false}
          onClose={handler}
        />
      </Provider>
    );
  });
});
