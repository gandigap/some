import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { paths } from '../routers/Paths';

function useTitlePage() {
  const { pathname } = useLocation();
  const [title, setTitle] = useState(paths.getPath(pathname));

  const titleCallback = useCallback(() => {
    setTitle(paths.getPath(pathname));
  }, [pathname]);

  useEffect(() => {
    titleCallback();
    globalThis.onpopstate = titleCallback;

    return () => {
      globalThis.onpopstate = null;
    };
  }, [titleCallback]);

  return { title, setTitle };
}

export { useTitlePage };
