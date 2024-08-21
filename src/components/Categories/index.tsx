import { useDispatch, useSelector } from 'react-redux';
import {
  getNewsFromCategory,
  selectCategory,
  selectError,
  selectLoading,
  setError,
  setLoading,
} from '../../state/slices/newsInfoSlice';
import { AppDispatch } from '../../state/store';
import { Categories, ClearErrorBtn } from './styles';
import { useState } from 'react';

const Category = () => {
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector(selectCategory);

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const [active, setActive] = useState('all');

  const fetchNewsData = async (category: string) => {
    try {
      if (category === 'all') {
        dispatch(getNewsFromCategory('all'));
      } else {
        dispatch(getNewsFromCategory(category));
      }
    } catch (error) {
      const err = error as Error;
      console.error(err.message, 'error-from-category');
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error && !loading) {
    return (
      <>
        <p>{error}</p>
        <ClearErrorBtn
          onClick={() => {
            dispatch(setError(null));
          }}
        >
          Clear Error
        </ClearErrorBtn>
      </>
    );
  }

  return (
    <Categories>
      <span
        className={active === 'all' ? 'active' : ''}
        onClick={async () => {
          await fetchNewsData('all');
          setActive('all');
        }}
      >
        {'all'.toUpperCase()}
      </span>
      {category &&
        category?.map((item, index) => {
          return (
            <span
              className={active === item ? 'active' : ''}
              onClick={async () => {
                await fetchNewsData(item);
                setActive(item);
              }}
              key={index}
            >
              {item.toUpperCase()}
            </span>
          );
        })}
    </Categories>
  );
};

export default Category;
