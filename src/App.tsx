import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

const Book = lazy(() => import('./pages/Book').then((m) => ({ default: m.Book })));
const Menu = lazy(() => import('./pages/Menu').then((m) => ({ default: m.Menu })));
const Events = lazy(() => import('./pages/Events').then((m) => ({ default: m.Events })));
const Games = lazy(() => import('./pages/Games').then((m) => ({ default: m.Games })));
const Hire = lazy(() => import('./pages/Hire').then((m) => ({ default: m.Hire })));
const GiftCards = lazy(() => import('./pages/GiftCards').then((m) => ({ default: m.GiftCards })));
const Visit = lazy(() => import('./pages/Visit').then((m) => ({ default: m.Visit })));

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Suspense fallback={<div className="page" style={{ minHeight: '80vh' }} />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="book" element={<Book />} />
              <Route path="menu" element={<Menu />} />
              <Route path="events" element={<Events />} />
              <Route path="games" element={<Games />} />
              <Route path="hire" element={<Hire />} />
              <Route path="gift-cards" element={<GiftCards />} />
              <Route path="visit" element={<Visit />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </MotionConfig>
  );
}
