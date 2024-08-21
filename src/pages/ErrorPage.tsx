import { useRouteError } from 'react-router-dom';

interface ErrorPageProps {
  statusText: string;
  message: string;
}

const ErrorPage = () => {
  const error = useRouteError() as ErrorPageProps | undefined;
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
