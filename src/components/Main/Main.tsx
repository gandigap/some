import { PropsWithChildren } from 'react';
import style from './main.module.scss';

function Main({ children }: PropsWithChildren) {
  return <main className={style.main}>{children}</main>;
}

export { Main };
