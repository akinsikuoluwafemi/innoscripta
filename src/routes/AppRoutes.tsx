import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Home from '../pages/Home/Home';
import Feeds from '../pages/Feeds';
import Detail from '../pages/Detail';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../components/Layout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="/news/:newsId" element={<Detail />} />
        <Route path="/feeds" element={<Feeds />} />
      </Route>
    </>
  )
);
