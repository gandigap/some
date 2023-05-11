import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About', () => {
  it('Test render NotFound', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('About Us');
    expect(screen.getByText('Module 01 React Components')).toBeInTheDocument();
  });
});
