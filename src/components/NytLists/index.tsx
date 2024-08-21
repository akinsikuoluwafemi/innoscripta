import { NytNewsData } from '../../types/globalTypes';
import { NewListWrapper } from '../../utils/styles';
import NytList from '../Nytlist';

interface NytListsProps {
  newsInfo: NytNewsData[];
}

const NytLists = ({ newsInfo }: NytListsProps) => {
  return (
    <NewListWrapper>
      {newsInfo && newsInfo.length === 0 && (
        <h1>No news found, Try Searching</h1>
      )}
      {newsInfo &&
        newsInfo?.map((news: NytNewsData, index) => {
          return (
            <NytList
              news={news}
              key={index}
              image={
                (news?.multimedia.length > 0 && news?.multimedia[0]?.url) || ''
              }
              description={news.abstract}
              title={news?.headline?.main}
              publishedAt={news.pub_date}
              source={news.source}
            />
          );
        })}
    </NewListWrapper>
  );
};

export default NytLists;
