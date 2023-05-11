import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusMessage } from '../StatusMessage';

describe('StatusMessage', () => {
  it('Test render status', () => {
    const text = 'Form data was saved';
    render(<StatusMessage message={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
