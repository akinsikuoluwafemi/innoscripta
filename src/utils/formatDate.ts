import moment from 'moment';

const formatDate = (date: string) => {
  return moment(date).format('MMMM Do, YYYY h:mm A');
};

export default formatDate;
