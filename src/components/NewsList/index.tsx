import { Image } from 'antd';
import { useDispatch } from 'react-redux';
import { truncateTextByWords } from '../../utils/truncateText';
import { Link } from 'react-router-dom';
import { NewsData, NytNewsData } from '../../types/globalTypes';
import { AppDispatch } from '../../state/store';
import { setSingleNewsData } from '../../state/slices/newsInfoSlice';
import formatDate from '../../utils/formatDate';
import { useState } from 'react';
import { NewsListItem } from '../../utils/styles';
import { PLACEHOLDER_IMG } from '../../utils/constants';

interface NewsListProps {
  news: NewsData | NytNewsData;
  image: string;
  description: string;
  title: string;
  publishedAt: string;
  source: string;
}

const NewsList = ({
  news,
  image,
  description,
  title,
  publishedAt,
  source,
}: NewsListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [imgSrc, setImgSrc] = useState(image);

  const handleImageError = () => {
    if (imgSrc !== PLACEHOLDER_IMG) {
      setImgSrc(PLACEHOLDER_IMG);
    }
  };

  return (
    <NewsListItem>
      <Image
        className="news-image"
        src={imgSrc}
        alt={title}
        width="100%"
        onError={handleImageError}
      />
      <div className="content">
        <h3 className="news-title">{title && truncateTextByWords(title, 4)}</h3>
        <span>"{description && truncateTextByWords(description, 8)}"</span>
        <div className="source-time">
          <span>{source}</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
        <Link
          to={`/news/${title.split(' ').join('') || description.split(' ').join('')}`}
        >
          <button
            onClick={() => {
              dispatch(setSingleNewsData(news));
            }}
          >
            Read more
          </button>
        </Link>
      </div>
    </NewsListItem>
  );
};

export default NewsList;
