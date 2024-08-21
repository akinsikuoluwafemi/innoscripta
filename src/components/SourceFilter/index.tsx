import { useDispatch, useSelector } from 'react-redux';
import { SourceWrapper } from '../../pages/Home/styles';
import {
  filterBySources,
  selectSources,
} from '../../state/slices/newsInfoSlice';
import { AppDispatch } from '../../state/store';

const SourceFilter = () => {
  const sources = useSelector(selectSources);
  const dispatch = useDispatch<AppDispatch>();

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterBySources(e.target.value));
  };

  return (
    <SourceWrapper>
      <span>Filter By Sources</span>
      <select name="sources" id="sources" onChange={handleSourceChange}>
        <option value="all">All</option>
        {sources &&
          sources.map((source) => {
            return (
              <option key={source} value={source}>
                {source}
              </option>
            );
          })}
      </select>
    </SourceWrapper>
  );
};

export default SourceFilter;
