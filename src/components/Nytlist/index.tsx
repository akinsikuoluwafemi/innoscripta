import { useState } from 'react';
import { NytNewsData } from '../../types/globalTypes';
import { NewsListItem } from '../../utils/styles';
import { truncateTextByWords } from '../../utils/truncateText';
import formatDate from '../../utils/formatDate';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { setSingleNewsData } from '../../state/slices/newsInfoSlice';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import { PLACEHOLDER_IMG } from '../../utils/constants';

interface NytListProps {
  news: NytNewsData;
  image: string;
  description: string;
  title: string;
  publishedAt: string;
  source: string;
}

const NytList = ({
  news,
  image,
  description,
  title,
  publishedAt,
  source,
}: NytListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [imgSrc, setImgSrc] = useState(`https://static01.nyt.com/${image}`);
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
        <h3 className="news-title">{title && truncateTextByWords(title, 3)}</h3>
        <span>"{description && truncateTextByWords(description, 8)}"</span>
        <div className="source-time">
          <span>{source}</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
        <Link
          to={`/news/${
            title?.split(' ').join('') || description?.split(' ').join('')
          }`}
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
export default NytList;
