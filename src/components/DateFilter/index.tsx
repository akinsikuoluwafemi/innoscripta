import { DatePicker, Space } from 'antd';
import { DateWrapper } from '../../pages/Home/styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  fetchNewsData,
  selectSearchValue,
  setFromAndToDate,
} from '../../state/slices/newsInfoSlice';
import { AppDispatch } from '../../state/store';
import { ONE_MONTH_FROM_NOW, TODAY } from '../../utils/constants';

const { RangePicker } = DatePicker;

const DateFilter = () => {
  const query = useSelector(selectSearchValue);
  const dispatch = useDispatch<AppDispatch>();

  const handleValidDate = (dateStrings: [string, string]) => {
    const [from, to] = dateStrings;
    const fromDate = moment(from, 'YYYY-MM-DD');
    const toDate = moment(to, 'YYYY-MM-DD');

    if (fromDate.isBefore(ONE_MONTH_FROM_NOW)) {
      alert('The "from" date cannot be more than one month before TODAY.');
      return false;
    }

    if (toDate.isAfter(TODAY)) {
      alert('The "to" date cannot be later than TODAY.');
      return false;
    }
    return true;
  };

  const handleDateChange = (
    _: [moment.Moment | null, moment.Moment | null],
    dateStrings: [string, string]
  ) => {
    if (!handleValidDate(dateStrings)) {
      return;
    }
    // dispatch date here
    dispatch(
      fetchNewsData({
        q: query,
        from: dateStrings[0],
        to: dateStrings[1],
      })
    );
    dispatch(setFromAndToDate(dateStrings));
  };

  return (
    <DateWrapper>
      <span>Filter by Date</span>
      <Space direction="vertical" size={12}>
        <RangePicker onChange={handleDateChange as any} format={'YYYY-MM-DD'} />
      </Space>
    </DateWrapper>
  );
};

export default DateFilter;
