import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton/BackButton';

function NotFound() {
  return (
    <>
      <Link to="/">
        <BackButton />
      </Link>
      <div>
        <h1 data-cy="header">404</h1>
        <h2 data-cy="description">Page Not Found</h2>
      </div>
    </>
  );
}

export { NotFound };
