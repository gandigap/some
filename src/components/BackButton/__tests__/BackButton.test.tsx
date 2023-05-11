import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BackButton } from '../BackButton';

describe('BackButton', () => {
  it('Test render button', () => {
    render(<BackButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('Test button enable', () => {
    render(<BackButton />);
    expect(screen.getByRole('button')).toBeEnabled();
  });
  it('Test button text content', () => {
    render(<BackButton />);
    expect(screen.getByRole('button')).toHaveTextContent('Back');
  });
  it('Test click on button', () => {
    render(<BackButton />);
    fireEvent.click(screen.getByRole('button'));
  });
});
