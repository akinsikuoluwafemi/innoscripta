import axios from 'axios';

const newsApiClient = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
  },
});

const nytApiClient = axios.create({
  baseURL: 'https://api.nytimes.com/svc',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    'api-key': import.meta.env.VITE_NYT_API_KEY,
  },
});

const guardianApiClient = axios.create({
  baseURL: 'https://content.guardianapis.com',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
  },
});

export { newsApiClient, nytApiClient, guardianApiClient };
