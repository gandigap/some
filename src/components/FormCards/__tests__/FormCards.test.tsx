import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { FormCards } from '../FormCards';
import { mockCards } from '../../../__mocks__/cards.mock';
import { createStore } from '../../../store/store';
import { formCardsAction } from '../../../store/slices/formCardsSlice';

describe('FormCards', () => {
  const store = createStore();

  it('Test render cards', async () => {
    const [card] = mockCards;
    act(() => {
      store.dispatch(formCardsAction.addCard({ card }));
    });
    render(
      <Provider store={store}>
        <FormCards />
      </Provider>
    );
    expect(screen.getByText(new RegExp(`${card.firstName}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${card.lastName}`, 'i'))).toBeInTheDocument();
  });
});
