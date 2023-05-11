import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StockLogo } from '../StockLogo';

describe('StockLogo', () => {
  it('Test render stock logo', () => {
    render(<StockLogo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
