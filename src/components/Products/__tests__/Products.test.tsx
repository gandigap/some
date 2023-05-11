import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { Products } from '../Products';
import { createStore } from '../../../store/store';
import { fetchItems } from '../../../store/slices/apiSlice';
import { paths } from '../../../routers/Paths';

describe('Products', () => {
  const store = createStore();

  it('Test render products with error', async () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    const titles = await screen.findAllByRole('heading', {
      level: 3,
    });
    expect(titles.length).toEqual(2);

    await act(async () => {
      await store.dispatch(fetchItems({ path: `${paths.serverUrl}aaa` }));
    });
    expect(screen.getByText(/NOT FOUND/i)).toBeInTheDocument();
  });
});
