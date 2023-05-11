import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ProductItem } from '../ProductItem';
import { mockResponse } from '../../../__mocks__/response.mock';
import { Modal } from '../../Modal/Modal';
import { ProductItemMore } from '../../ProductItemMore/ProductItemMore';
import { createStore } from '../../../store/store';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ProductItem', () => {
  const store = createStore();
  const { results } = mockResponse;
  const [mock] = results;

  it('Test render product item title', () => {
    render(
      <Provider store={store}>
        <ProductItem product={mock} />
      </Provider>
    );
    expect(
      screen.getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent(mock.name);
  });
  it('Test product animate function', () => {
    render(
      <Provider store={store}>
        <ProductItem product={mock} />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('animate')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByTestId('animate')).toBeInTheDocument();
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.queryByTestId('animate')).not.toBeInTheDocument();
  });
  it('Test product overlay and modal', () => {
    render(
      <Provider store={store}>
        <ProductItem product={mock} />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('overlay'));
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });
  it('Test product popup close', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <ProductItem product={mock} />
        </Provider>
      );
    });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });
  it('Test render modal', async () => {
    const handler = vi.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <Modal
            showModal
            onClose={handler}
          >
            <ProductItemMore onClose={handler} />
          </Modal>
        </Provider>
      );
    });
  });
});
