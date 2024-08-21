import { useEffect, useState } from 'react';
import { FeedsData, FeedsWrapper } from './styles';
import { Tag } from 'antd';
import NewsLists from '../../components/NewsLists';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthors,
  selectCategory,
  selectError,
  selectFeedsData,
  selectLoading,
  selectNewsInfo,
  selectNytData,
  selectSearchValue,
  selectSources,
  setError,
  setFeedsData,
  setLoading,
  setNytData,
} from '../../state/slices/newsInfoSlice';
import { AppDispatch } from '../../state/store';
import { NewsFeed, ItemState, NewsData } from '../../types/globalTypes';
import { newsApiClient, nytApiClient } from '../../services/newsApiClient';
import NytLists from '../../components/NytLists';
import { NewListWrapper } from '../../utils/styles';
import { ClearErrorBtn } from '../../components/Categories/styles';

const Feeds = () => {
  const dispatch = useDispatch<AppDispatch>();

  const feeds = useSelector(selectFeedsData);
  const newsInfo = useSelector(selectNewsInfo);
  const query = useSelector(selectSearchValue);
  const category = useSelector(selectCategory);
  const sources = useSelector(selectSources);
  const authors = useSelector(selectAuthors);
  const nytData = useSelector(selectNytData);

  const [selectedCategory, setSelectedCategory] = useState(feeds.categories);
  const [selectedSource, setSelectedSource] = useState(feeds.sources);
  const [selectedAuthor, setSelectedAuthor] = useState(feeds.authors);

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const categoryData =
    category &&
    category.map((item, index) => {
      return {
        id: index + 1,
        name: item,
      };
    });
  const sourceData = [
    ...sources.map((source, index) => {
      return {
        id: index + 1,
        name: source,
      };
    }),
    {
      id: 'The New York Times',
      name: 'The New York Times',
    },
  ];
  const authorData = authors.map((author, index) => {
    return {
      id: index + 1,
      name: author,
    };
  });

  const [showNyTimes, setShowNyTimes] = useState<boolean>(false);
  const [allFilteredFeeds, setAllFilteredFeeds] = useState<NewsData[]>([]);

  const feedsData: NewsFeed = {
    categories: selectedCategory,
    sources: selectedSource,
    authors: selectedAuthor,
  };
  useEffect(() => {
    dispatch(setFeedsData(feedsData));
    filterFeeds(feedsData);
  }, [selectedCategory, selectedSource, selectedAuthor]);

  useEffect(() => {
    renderNytData(feedsData);
  }, [showNyTimes]);

  const renderNytData = async (feedsData: NewsFeed) => {
    if (feedsData.sources.includes('The New York Times')) {
      dispatch(setLoading(true));
      setShowNyTimes(true);
      try {
        const { data } = await nytApiClient.get(
          '/search/v2/articlesearch.json',
          {
            params: {
              q: query,
            },
          }
        );
        dispatch(setNytData(data.response.docs));
        return data.response.docs;
      } catch (error) {
        const err = error as Error;
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const filterFeeds = async (feedsData: NewsFeed) => {
    const { categories, sources, authors } = feedsData;

    const allData = [];

    if (authors.length > 0) {
      const dataWithFilteredAuthors = newsInfo.filter((news) =>
        authors.includes(news.author)
      );
      allData.push(dataWithFilteredAuthors);
    }
    if (sources.length > 0) {
      const dataWithFilteredSources = newsInfo.filter((news) =>
        sources.includes(news.source.name)
      );
      allData.push(dataWithFilteredSources);
    }
    if (categories.length > 0) {
      const { data } = await newsApiClient.get('/top-headlines/sources');
      const allSources = data.sources
        .filter((item: ItemState) => categories.includes(item.category))
        .map((item: ItemState) => item.name);
      const filterByCategory = newsInfo.filter((item) =>
        allSources.includes(item.source.name)
      ) as NewsData[];
      allData.push(filterByCategory);
    }
    const data = allData.flat();
    const uniqueData = [...new Set(data)];
    setAllFilteredFeeds(uniqueData);
  };

  const handleCategoryTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedCategory, tag]
      : selectedCategory.filter((t: string) => t !== tag);
    setSelectedCategory(nextSelectedTags);
  };

  const handleSourceTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedSource, tag]
      : selectedSource.filter((t: string) => t !== tag);

    if (nextSelectedTags.includes('The New York Times')) {
      setShowNyTimes(true);
    } else {
      setShowNyTimes(false);
    }
    setSelectedSource(nextSelectedTags);
  };

  const handleAuthorTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedAuthor, tag]
      : selectedAuthor.filter((t: string) => t !== tag);
    setSelectedAuthor(nextSelectedTags);
  };

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
    <>
      <FeedsWrapper>
        <p>Personalize your feeds</p>
        <span>Categories</span>
        &nbsp; &nbsp;
        {categoryData.map((category) => {
          return (
            <Tag.CheckableTag
              key={category.id}
              checked={selectedCategory.includes(category.name)}
              onChange={(checked) =>
                handleCategoryTagChange(category.name, checked)
              }
            >
              <FeedsData>{category.name}</FeedsData>
            </Tag.CheckableTag>
          );
        })}
        <br />
        <br />
        <span>Sources</span>
        &nbsp; &nbsp;
        {sourceData.map((source) => {
          return (
            <Tag.CheckableTag
              key={source.id}
              checked={selectedSource.includes(source.name)}
              onChange={(checked) =>
                handleSourceTagChange(source.name, checked)
              }
            >
              <FeedsData>{source.name}</FeedsData>
            </Tag.CheckableTag>
          );
        })}
        <br />
        <br />
        <span>Authors</span>
        &nbsp; &nbsp;
        {authorData.map((author) => {
          return (
            <Tag.CheckableTag
              key={author.id}
              checked={selectedAuthor.includes(author.name)}
              onChange={(checked) =>
                handleAuthorTagChange(author.name, checked)
              }
            >
              <FeedsData>{author.name}</FeedsData>
            </Tag.CheckableTag>
          );
        })}
        <br />
        <br />
        <h3>News Feeds</h3>
        <br />
      </FeedsWrapper>
      <br />
      <NewListWrapper>
        <NewsLists newsInfo={allFilteredFeeds} />
      </NewListWrapper>
      &nbsp;
      <h2>{showNyTimes ? 'The New York Times' : 'No New York Times News'}</h2>
      {showNyTimes && (
        <NewListWrapper>
          <NytLists newsInfo={nytData} />
        </NewListWrapper>
      )}
    </>
  );
};

export default Feeds;
