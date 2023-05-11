import { Link } from 'react-router-dom';
import style from './header.module.scss';
import { ReactLogo } from '../ReactLogo/ReactLogo';
import { Navigation } from '../Navigation/Navigation';
import { useTitlePage } from '../../hooks/useTitlePage';

function Header() {
  const { title, setTitle } = useTitlePage();

  return (
    <header className={style.header}>
      <Link to="https://react.dev/">
        <ReactLogo />
      </Link>
      <h2>{title}</h2>
      <Navigation setTitle={setTitle} />
    </header>
  );
}

export { Header };
