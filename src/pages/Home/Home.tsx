import React, { Suspense, useEffect } from 'react';
import { Wrapper } from './styles';
import 'antd/dist/reset.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCategory,
  fetchNewsData,
  selectFromAndTo,
  selectNewsInfo,
  selectSearchValue,
} from '../../state/slices/newsInfoSlice';
import { AppDispatch } from '../../state/store';
import {
  CONVERTED_ONE_MONTH_FROM_NOW,
  CONVERTED_TODAY,
} from '../../utils/constants';

const Category = React.lazy(() => import('../../components/Categories'));
const SearchField = React.lazy(() => import('../../components/SearchField'));
const SourceFilter = React.lazy(() => import('../../components/SourceFilter'));
const DateFilter = React.lazy(() => import('../../components/DateFilter'));
const NewsLists = React.lazy(() => import('../../components/NewsLists'));

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const newsInfo = useSelector(selectNewsInfo);
  const query = useSelector(selectSearchValue);
  const dateString = useSelector(selectFromAndTo);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    try {
      await dispatch(
        fetchNewsData({
          q: query,
          from: dateString[0] || CONVERTED_ONE_MONTH_FROM_NOW,
          to: dateString[1] || CONVERTED_TODAY,
        })
      );
      await dispatch(fetchAllCategory());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Suspense fallback={<div>Loading categories...</div>}>
        <Category />
      </Suspense>
      <Suspense fallback={<div>Loading search field...</div>}>
        <SearchField />
      </Suspense>
      <Suspense fallback={<div>Loading source filter...</div>}>
        <SourceFilter />
      </Suspense>
      <Suspense fallback={<div>Loading date filter...</div>}>
        <DateFilter />
      </Suspense>
      <Suspense fallback={<div>Loading news...</div>}>
        <NewsLists newsInfo={newsInfo} />
      </Suspense>
    </Wrapper>
  );
};

export default Home;
