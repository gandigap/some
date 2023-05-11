import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('Test render error with message', () => {
    render(<ErrorMessage message="error message" />);
    expect(screen.getByText('error message')).toBeInTheDocument();
  });
  it('Test render error without message', () => {
    render(<ErrorMessage message="" />);
    expect(screen.getByTestId('message')).toBeEmptyDOMElement();
  });
});
