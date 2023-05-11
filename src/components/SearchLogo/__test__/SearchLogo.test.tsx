import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchLogo } from '../SearchLogo';

describe('SearchLogo', () => {
  it('Test render search logo', () => {
    render(<SearchLogo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
