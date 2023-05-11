import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../Navigation';

describe('Navigation', () => {
  it('Test links', () => {
    const handler = vi.fn();
    render(
      <BrowserRouter>
        <Navigation setTitle={handler} />
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      fireEvent.click(link);
    });
    expect(handler).toHaveBeenCalledTimes(3);
  });
});
