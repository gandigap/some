import { describe, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useTitlePage } from '../useTitlePage';

describe('useTitlePage', () => {
  it('Test useTitlePage', async () => {
    const wrapper = ({ children }: PropsWithChildren) => <BrowserRouter>{children}</BrowserRouter>;

    const { result } = renderHook(useTitlePage, { wrapper });
    act(() => {
      result.current.setTitle('Home');
    });
  });
});
