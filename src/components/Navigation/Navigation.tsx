import { NavLink } from 'react-router-dom';
import style from './navigation.module.scss';
import { paths } from '../../routers/Paths';

interface Props {
  setTitle: (title: string) => void;
}

function Navigation({ setTitle }: Props) {
  const setActiveStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${style.link} ${style.active}` : style.link;

  return (
    <nav className={style.nav}>
      {paths.getDatas().map(([path, title]) => (
        <NavLink
          key={path}
          to={path}
          className={setActiveStyle}
          onClick={() => setTitle(title)}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
}

export { Navigation };
