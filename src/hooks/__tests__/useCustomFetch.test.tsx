import { describe, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useCustomFetch } from '../useCustomFetch';

describe('StatusMessage', () => {
  it('Test render status', async () => {
    const { result } = renderHook(useCustomFetch);
    act(() => {
      result.current.searchItems('query');
    });
    act(() => {
      result.current.searchItems('error');
    });
    await act(async () => {
      result.current.searchItems('correct');
    });
    await act(async () => {
      result.current.setCurrentPage('https://rickandmortyapi.com/api/character?page=0');
    });
    await act(async () => {
      result.current.setCurrentPage('https://rickandmortyapi.com/api/character?page=3');
    });
    await act(async () => {
      result.current.setCurrentPage('https://rickandmortyapi.com/api/character');
    });
  });
  it('Test next page', async () => {
    const { result } = renderHook(useCustomFetch);
    act(() => {
      result.current.nextPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: 'https://rickandmortyapi.com/api/character?page=3',
        prev: 'https://rickandmortyapi.com/api/character?page=1',
      }));
    });
    act(() => {
      result.current.nextPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null,
      }));
    });
    act(() => {
      result.current.nextPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: 'https://rickandmortyapi.com/api/character?page=69',
        prev: null,
      }));
    });
    act(() => {
      result.current.nextPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: 'https://rickandmortyapi.com/api/character?page=666',
        prev: null,
      }));
    });
    act(() => {
      result.current.nextPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: 'https://rickandmortyapi.com/api/character?page=123',
        prev: null,
      }));
    });
    act(() => {
      result.current.nextPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: 'https://rickandmortyapi.com/api/character?page=124',
        prev: null,
      }));
    });
    act(() => {
      result.current.nextPage();
    });
  });
  it('Test prev page', async () => {
    const { result } = renderHook(useCustomFetch);
    act(() => {
      result.current.prevPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: 'https://rickandmortyapi.com/api/character?page=3',
        prev: 'https://rickandmortyapi.com/api/character?page=1',
      }));
    });
    act(() => {
      result.current.prevPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: null,
        prev: 'https://rickandmortyapi.com/api/character?page=2',
      }));
    });
    act(() => {
      result.current.prevPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: null,
        prev: 'https://rickandmortyapi.com/api/character?page=69',
      }));
    });
    act(() => {
      result.current.prevPage();
    });
    act(() => {
      result.current.setPaginationLink((state) => ({
        ...state,
        next: null,
        prev: 'https://rickandmortyapi.com/api/character?page=666',
      }));
    });
    act(() => {
      result.current.prevPage();
    });
  });
  it('Test useEffect', async () => {
    const { result } = renderHook(useCustomFetch);
    await act(async () => {
      result.current.setLocalStorage('error');
    });
  });
  it('Test useEffect', async () => {
    const { result } = renderHook(useCustomFetch);
    await act(async () => {
      result.current.setLocalStorage('query');
    });
  });
  it('Test useEffect', async () => {
    const { result } = renderHook(useCustomFetch);
    await act(async () => {
      result.current.setLocalStorage('correct');
    });
  });
  it('Test render status', async () => {
    const { result } = renderHook(useCustomFetch);
    await act(async () => {
      result.current.searchItems('incorrect');
    });
  });
});
