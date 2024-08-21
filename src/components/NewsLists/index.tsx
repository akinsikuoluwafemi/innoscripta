import { NewsData } from '../../types/globalTypes';
import { NewListWrapper } from '../../utils/styles';
import NewsList from '../NewsList';

interface NewsListsProps {
  newsInfo: NewsData[];
}

const NewsLists = ({ newsInfo }: NewsListsProps) => {
  return (
    <NewListWrapper>
      {newsInfo && newsInfo.length === 0 && (
        <h1>No news found, Try Searching</h1>
      )}
      {newsInfo &&
        newsInfo
          .filter((news) => news.source.id !== null)
          .map((news, index) => {
            return (
              <NewsList
                news={news}
                key={index}
                image={news.urlToImage}
                description={news.description}
                title={news.title}
                publishedAt={news.publishedAt}
                source={news.source.name}
              />
            );
          })}
    </NewListWrapper>
  );
};

export default NewsLists;
