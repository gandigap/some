import { describe, it } from 'vitest';
import { act } from 'react-dom/test-utils';
import { createStore } from '../../store';
import { formAction } from '../formSlice';

describe('formSlice', () => {
  const store = createStore();

  it('Test implementation form slice', async () => {
    act(() => {
      store.dispatch(formAction.setValue({ fields: { firstName: 'Name' } }));
    });
    act(() => {
      store.dispatch(formAction.setValue({ fields: { firstName: '' } }));
    });
  });
});
