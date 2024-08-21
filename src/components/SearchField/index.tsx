import { useCallback, useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import debounce from '../../utils/debounce';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import {
  fetchNewsData,
  searchNewsData,
  setSearchValue,
} from '../../state/slices/newsInfoSlice';

const SearchField = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
      setQuery(query);
      dispatch(searchNewsData(query));
    } else {
      dispatch(searchNewsData(''));
    }
  }, [query, dispatch]);

  const debouncedHandleInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchNewsData(e.target.value));
      navigate(`/?query=${e.target.value}`, { replace: true }); // Update the URL
    }, 1000),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedHandleInputChange(e);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(setSearchValue(query));
    dispatch(
      fetchNewsData({
        q: query,
        from: '2024-07-30',
        to: '2024-08-17',
      })
    );
    navigate(`/?query=${query}`, { replace: true }); // Update the URL
    e.preventDefault();
  };

  return (
    <Form role="search" className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search keywords..."
        name="query"
        onChange={handleInputChange}
      />
      <button type="submit" className="btn">
        Search
      </button>
    </Form>
  );
};

export default SearchField;
