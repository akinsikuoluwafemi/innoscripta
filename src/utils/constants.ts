import moment from 'moment';

export const ONE_MONTH_FROM_NOW = moment().subtract(1, 'month').startOf('day');
export const CONVERTED_ONE_MONTH_FROM_NOW =
  ONE_MONTH_FROM_NOW.format('YYYY-MM-DD');

export const TODAY = moment().endOf('day');
export const DATE_FORMAT = 'YYYY-MM-DD';
export const CONVERTED_TODAY = TODAY.format(DATE_FORMAT);

export const PLACEHOLDER_IMG =
  'https://yc-workatastartup-production.s3.amazonaws.com/jobs_company_jobs/images/68402/32c763409dc6b2ef6bcae475ccb6c3c56923b788.jpg?1722545923';
