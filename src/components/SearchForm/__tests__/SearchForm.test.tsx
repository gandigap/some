import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SearchForm } from '../SearchForm';
import { createStore } from '../../../store/store';

describe('SearchForm', () => {
  const store = createStore();

  it('Test search input', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );
    const input = screen.getByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'mens' } });
    expect(input.value).toBe('mens');
  });
  it('Test search submit', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );
    const form = screen.getByRole('form');
    const button = screen.getByRole('button');
    expect(form).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
