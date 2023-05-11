import { describe, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useFormErrorMessage } from '../useFormErrorMessage';

describe('useTitlePage', () => {
  it('Test useTitlePage', async () => {
    const wrapper = ({ children }: PropsWithChildren) => <BrowserRouter>{children}</BrowserRouter>;

    const { result } = renderHook(() => useFormErrorMessage({ cells: 1 }), { wrapper });
    act(() => {
      result.current.showErrorMessage();
    });
  });
});
