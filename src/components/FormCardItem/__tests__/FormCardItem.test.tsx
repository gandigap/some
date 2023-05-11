import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FormCardItem } from '../FormCardItem';
import { mockCards } from '../../../__mocks__/cards.mock';

describe('FormCardItem', () => {
  it('Test render card', () => {
    mockCards.forEach((card) => {
      render(<FormCardItem cardData={card} />);
      waitFor(() => {
        expect(screen.getAllByText(/Last Name/)).toBeInTheDocument();
      });
    });
  });
});
