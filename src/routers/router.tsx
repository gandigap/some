import { Route, Routes } from 'react-router-dom';
import { Layout } from '../pages/Layout';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Forms } from '../pages/Forms';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<Home />}
        />
        <Route
          path="about"
          element={<About />}
        />
        <Route
          path="forms"
          element={<Forms />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export { Router };
