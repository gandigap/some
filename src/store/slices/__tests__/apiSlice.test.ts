import { describe, it } from 'vitest';
import { act } from 'react-dom/test-utils';
import { createStore } from '../../store';
import { fetchItemById } from '../apiSlice';

describe('apiSlice', () => {
  const store = createStore();

  it('Test implementation api slice', async () => {
    await act(async () => {
      await store.dispatch(fetchItemById({ id: 3 }));
    });
    expect(store.getState().api.modal.error).toEqual('WRONG ID');
  });
});
