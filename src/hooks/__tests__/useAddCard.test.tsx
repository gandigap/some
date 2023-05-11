import { describe, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useAddCard } from '../useAddCard';
import { CardItem } from '../../components/FormCardItem/FormCardItem';
import { mockCards } from '../../__mocks__/cards.mock';

describe('useAddCard', () => {
  it('Test addCard', async () => {
    const [mock] = mockCards;
    const { result } = renderHook(useAddCard);
    act(() => {
      result.current.addCard({ ...mock });
    });
    const [card] = result.current.cards;
    Object.entries(card).forEach(([key, value]) => {
      expect(value).toEqual(mock[key as keyof CardItem]);
    });
  });
});
