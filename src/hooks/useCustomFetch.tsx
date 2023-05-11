import { useEffect, useState } from 'react';
import { Product } from '../components/ProductItem/ProductItem';
import { customFetch } from '../utils/customFetch';
import { paths } from '../routers/Paths';

export interface FetchResponseInfo {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export interface FetchResponse {
  error?: string;
  info: FetchResponseInfo;
  results: Product[];
}

interface PaginationLink {
  next: string | null;
  prev: string | null;
}

export interface Pages {
  current: number | null;
  next: number | null;
  prev: number | null;
}

const useCustomFetch = () => {
  const [localStorage, setLocalStorage] = useState(globalThis.localStorage.getItem('search'));
  const [items, setItems] = useState<Product[]>([]);
  const [notFoundMessage, setNotFoundMessage] = useState<string>('');
  const [isPending, setPending] = useState<boolean>(false);

  const [paginationLink, setPaginationLink] = useState<PaginationLink>({ next: null, prev: null });
  const [pages, setPages] = useState<Pages>({ current: 0, next: null, prev: null });
  const [pagesCount, setPagesCount] = useState<number>(0);

  const totalReset = (message: string) => {
    setPagesCount(0);
    setPaginationLink((state) => ({ ...state, next: null, prev: null }));
    setPages((state) => ({
      ...state,
      current: 0,
      prev: null,
      next: null,
    }));
    setItems([]);
    setNotFoundMessage(message);
    setPending(false);
  };

  const totalUpdate = (data: FetchResponse) => {
    setPaginationLink((state) => ({ ...state, next: data.info.next, prev: data.info.prev }));
    setItems(data.results);
    setNotFoundMessage('');
  };

  const setCurrentPage = (link: string) => {
    const [match] = link.match(/(?<=page=)\d+/gi) || [1];
    const page = Number(match);
    setPages((state) => ({
      ...state,
      current: page,
      prev: page === 1 ? null : page - 1,
      next: page === pagesCount ? null : page + 1,
    }));
  };

  useEffect(() => {
    setPending(true);
    customFetch<FetchResponse>({
      url: `${paths.serverUrl}/?name=${localStorage}`,
    })
      .then((data) => {
        if (data.error) {
          totalReset(data.error);
          setPages((state) => ({
            ...state,
            current: 0,
            prev: null,
            next: null,
          }));
        } else {
          setPages((state) => ({
            ...state,
            current: 1,
            prev: null,
            next: data.info.pages < 2 ? null : 2,
          }));
          setPagesCount(data.info.pages);
          totalUpdate(data);
        }
        setPending(false);
      })
      .catch((error: Error) => {
        totalReset(error.message);
      });
  }, [localStorage]);

  const searchItems = (query: string) => {
    setPending(true);
    customFetch<FetchResponse>({ url: `${paths.serverUrl}/?name=${query}` })
      .then((data) => {
        if (data.error) {
          totalReset(data.error);
        } else {
          setPages((state) => ({
            ...state,
            current: 1,
            prev: null,
            next: data.info.pages < 2 ? null : 2,
          }));
          setPagesCount(data.info.pages);
          totalUpdate(data);
        }
        setPending(false);
      })
      .catch((error: Error) => {
        totalReset(error.message);
      });
  };

  const nextPage = () => {
    if (!paginationLink?.next) return;
    setPending(true);
    setCurrentPage(paginationLink.next);
    customFetch<FetchResponse>({ url: paginationLink.next })
      .then((data) => {
        if (!data.info.prev) throw Error('Something went wrong\nRefresh page');
        if (data.error) {
          totalReset(data.error);
        } else {
          totalUpdate(data);
        }
        setPending(false);
      })
      .catch((error: Error) => {
        totalReset(error.message);
      });
  };
  const prevPage = () => {
    if (!paginationLink?.prev) return;
    setPending(true);
    setCurrentPage(paginationLink.prev);
    customFetch<FetchResponse>({ url: paginationLink.prev })
      .then((data) => {
        if (data.error) {
          totalReset(data.error);
        } else {
          totalUpdate(data);
        }
        setPending(false);
      })
      .catch((error: Error) => {
        totalReset(error.message);
      });
  };

  return {
    localStorage,
    setLocalStorage,
    items,
    setItems,
    paginationLink,
    setPaginationLink,
    pages,
    setPages,
    pagesCount,
    setPagesCount,
    notFoundMessage,
    setNotFoundMessage,
    isPending,
    setPending,
    nextPage,
    prevPage,
    searchItems,
    totalReset,
    totalUpdate,
    setCurrentPage,
  };
};

export { useCustomFetch };
