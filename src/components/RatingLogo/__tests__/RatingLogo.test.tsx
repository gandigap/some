import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RatingLogo } from '../RatingLogo';

describe('RatingLogo', () => {
  it('Test render rating logo', () => {
    render(<RatingLogo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
