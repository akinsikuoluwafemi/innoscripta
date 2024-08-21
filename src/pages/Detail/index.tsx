import { useDispatch, useSelector } from 'react-redux';
import { DetailContent, DetailWrapper, GuardianNewsWrapper } from './styles';
import {
  fetchGuardianNews,
  selectError,
  selectGuardianNews,
  selectLoading,
  selectSearchValue,
  selectSingleNewsData,
  setError,
} from '../../state/slices/newsInfoSlice';
import { Card, Image } from 'antd';
import { truncateTextByWords } from '../../utils/truncateText';
import formatDate from '../../utils/formatDate';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../state/store';
import { Link } from 'react-router-dom';
import { NewsData, NytNewsData } from '../../types/globalTypes';
import { ClearErrorBtn } from '../../components/Categories/styles';

const Detail = () => {
  const newsData = useSelector(selectSingleNewsData) as NytNewsData | NewsData;
  const query = useSelector(selectSearchValue);
  const guardianNewsData = useSelector(selectGuardianNews);
  const dispatch = useDispatch<AppDispatch>();
  const [imgSrc, setImgSrc] = useState(``);

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchGuardianNews(query));
      } catch (error) {
        const err = error as Error;
        console.log(err.message, 'error-from-detail');
      }
    };
    fetchData();
  }, [query]);

  const placeholder =
    'https://yc-workatastartup-production.s3.amazonaws.com/jobs_company_jobs/images/68402/32c763409dc6b2ef6bcae475ccb6c3c56923b788.jpg?1722545923';

  useEffect(() => {
    if ('multimedia' in newsData && newsData.multimedia.length === 0) {
      setImgSrc(placeholder);
    } else if ('multimedia' in newsData && newsData.multimedia.length > 0) {
      setImgSrc(`https://static01.nyt.com/${newsData?.multimedia[0].url}`);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
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
    <DetailWrapper>
      <DetailContent>
        <div className="full-image">
          <Image
            src={'urlToImage' in newsData ? newsData.urlToImage : `${imgSrc}`}
            alt={'title' in newsData ? newsData.title : newsData.headline.main}
            width="100%"
            height="100%"
          />
        </div>
        <div className="description">
          <h1>
            {'title' in newsData ? newsData.title : newsData.headline.main}
          </h1>
          <p>
            {'description' in newsData
              ? newsData.description
              : newsData.abstract}
          </p>

          <a
            href={'url' in newsData ? newsData.url : newsData.web_url}
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a>

          <div className="detail-sourcetime">
            <div>
              Author:{' '}
              {'author' in newsData
                ? newsData.author
                : newsData.byline.original}
            </div>{' '}
            &nbsp;
            <div>
              Source:{' '}
              {newsData.source
                ? typeof newsData.source === 'string'
                  ? 'The New York Times'
                  : newsData.source?.name
                : 'The New York Times'}
            </div>{' '}
            &nbsp;
            <div>
              At:{' '}
              {formatDate(
                'publishedAt' in newsData
                  ? newsData.publishedAt
                  : newsData.pub_date
              )}
            </div>
          </div>

          <p>
            {newsData &&
              truncateTextByWords(
                'content' in newsData
                  ? newsData.content
                  : newsData.lead_paragraph,
                14
              )}
          </p>
        </div>
      </DetailContent>

      <GuardianNewsWrapper>
        <h2>Related News for "{query.toUpperCase()}"</h2>
        <div className="content">
          {guardianNewsData &&
            guardianNewsData.map((news) => (
              <Card
                key={news.id}
                title={news.webTitle}
                extra={
                  <Link to={news.webUrl} target="_blank" rel="noreferrer">
                    Read More
                  </Link>
                }
                style={{ width: 300 }}
              >
                <p>{news.sectionName}</p>
                <p>{formatDate(news.webPublicationDate)}</p>
                <p>{news.pillarName}</p>
              </Card>
            ))}
        </div>
      </GuardianNewsWrapper>
    </DetailWrapper>
  );
};

export default Detail;
