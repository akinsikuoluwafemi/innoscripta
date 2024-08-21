import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../store';
import { guardianApiClient, newsApiClient } from '../../services/newsApiClient';
import {
  NewsFeed,
  GuardianData,
  ItemState,
  NewsData,
  NytNewsData,
} from '../../types/globalTypes';
import {
  CONVERTED_ONE_MONTH_FROM_NOW,
  CONVERTED_TODAY,
} from '../../utils/constants';

interface NewsInfoState {
  newsData: NewsData[];
  filteredNewsData: NewsData[];
  singleNewsData: NewsData | NytNewsData;
  category: string[];
  fromAndTo: [string, string];
  guardianNewsData: GuardianData[];
  nyTimeData: NytNewsData[];
  feedsData: NewsFeed;
  feedsFilteredNewsData: NewsData[];
  searchValue: string;
  loading: boolean;
  error: string | null;
}

const initialState: NewsInfoState = {
  newsData: [] as NewsData[],
  filteredNewsData: [] as NewsData[],
  singleNewsData: {} as NewsData | NytNewsData,
  category: [],
  fromAndTo: [CONVERTED_ONE_MONTH_FROM_NOW, CONVERTED_TODAY],
  guardianNewsData: [],
  nyTimeData: [],
  feedsFilteredNewsData: [] as NewsData[],
  feedsData: {
    authors: [],
    categories: [],
    sources: [],
  },
  searchValue: 'Apple',
  loading: false,
  error: null,
};

export const fetchNewsData = createAsyncThunk(
  'newsInfo/fetchNewsData',
  async (
    obj: {
      q: string;
      from: string;
      to: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await newsApiClient.get('/everything', {
        params: {
          q: obj.q,
          from: obj.from,
          to: obj.to,
          sortBy: 'popularity',
        },
      });
      return data.articles;
    } catch (error) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAllCategory = createAsyncThunk(
  'newsInfo/fetchAllCategory',
  async (_, thunkAPI) => {
    try {
      const { data } = await newsApiClient.get('/top-headlines/sources');
      const category = data.sources.map((item: ItemState) => item.category);
      const uniqueCategory = [...new Set(category)] as string[];
      return uniqueCategory;
    } catch (error) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getNewsFromCategory = createAsyncThunk(
  'newsInfo/getNewsFromCategory',
  async (category: string, thunkAPI) => {
    // Access state using thunkAPI.getState()
    try {
      const state = thunkAPI.getState() as RootState;
      const { data } = await newsApiClient.get('/top-headlines/sources');
      const allSources = data.sources
        .filter((item: ItemState) => item.category === category)
        .map((item: ItemState) => item.name);

      const filterByCategory = state.newsInfo.newsData.filter((item) =>
        allSources.includes(item.source.name)
      );
      if (category === 'all') {
        return state.newsInfo.newsData;
      }
      return filterByCategory;
    } catch (error) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// news from other providers
export const fetchGuardianNews = createAsyncThunk(
  'newsInfo/fetchGuarianNews',
  async (q: string, thunkAPI) => {
    try {
      const { data } = await guardianApiClient.get('/search', {
        params: {
          q,
        },
      });
      return data.response.results;
    } catch (error) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const newsInfoSlice = createSlice({
  name: 'newsInfo',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSingleNewsData: (
      state,
      action: PayloadAction<NewsData | NytNewsData>
    ) => {
      state.singleNewsData = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setFromAndToDate: (state, action: PayloadAction<[string, string]>) => {
      state.fromAndTo = action.payload;
    },
    setFeedsData: (state, action) => {
      state.feedsData = action.payload;
    },
    setNytData: (state, action: PayloadAction<NytNewsData[]>) => {
      state.nyTimeData = action.payload;
    },
    searchNewsData: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload.toLowerCase();
      if (searchValue === '') {
        state.filteredNewsData = state.newsData;
      } else {
        state.filteredNewsData = state.newsData.filter(
          (news: NewsData) =>
            news.title.toLowerCase().includes(searchValue) ||
            news.description?.toLowerCase().includes(searchValue) ||
            news.author?.toLowerCase().includes(searchValue) ||
            news.source.name?.toLowerCase().includes(searchValue) ||
            news.content.toLowerCase().includes(searchValue)
        );
      }
    },
    filterBySources: (state, action: PayloadAction<string>) => {
      const source = action.payload.toLowerCase();
      if (source === 'all') {
        state.filteredNewsData = state.newsData;
      } else {
        state.filteredNewsData = state.newsData.filter(
          (news: NewsData) => news.source.name.toLowerCase() === source
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
        state.filteredNewsData = state.newsData;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.filteredNewsData = state.newsData;
        state.error = null;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getNewsFromCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsFromCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredNewsData = action.payload;
        state.error = null;
      })
      .addCase(getNewsFromCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchGuardianNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGuardianNews.fulfilled, (state, action) => {
        state.loading = false;
        state.guardianNewsData = action.payload;
        state.error = null;
      })
      .addCase(fetchGuardianNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setLoading,
  setError,
  setSingleNewsData,
  searchNewsData,
  setFeedsData,
  filterBySources,
  setSearchValue,
  setFromAndToDate,
  setNytData,
} = newsInfoSlice.actions;
//getting a chunk of state from the store
export const selectNewsInfo = (state: RootState) =>
  state.newsInfo.filteredNewsData;
export const selectSingleNewsData = (state: RootState) =>
  state.newsInfo.singleNewsData;
export const selectFeedsFilteredNewsData = (state: RootState) =>
  state.newsInfo.feedsFilteredNewsData;

export const selectAuthors = createSelector(
  (state: RootState) => state.newsInfo.newsData,
  (newsData) => {
    const authors = newsData.map((item) => item.author);
    const uniqueAuthors = [...new Set(authors)].filter((item) => item !== null);
    return uniqueAuthors;
  }
);
export const selectSources = createSelector(
  (state: RootState) => state.newsInfo.newsData,
  (newsData) => {
    const sources = newsData.map((item) => item.source.name);
    const uniqueSources = [...new Set(sources)].filter((item) => item !== null);
    return uniqueSources;
  }
);
export const selectFeedsData = (state: RootState) => state.newsInfo.feedsData;
export const selectFromAndTo = (state: RootState) => state.newsInfo.fromAndTo;
export const selectSearchValue = (state: RootState) =>
  state.newsInfo.searchValue;
export const selectGuardianNews = (state: RootState) =>
  state.newsInfo.guardianNewsData;
export const selectNytData = (state: RootState) => state.newsInfo.nyTimeData;
export const selectCategory = (state: RootState) => state.newsInfo.category;
export const selectLoading = (state: RootState) => state.newsInfo.loading;
export const selectError = (state: RootState) => state.newsInfo.error;

export default newsInfoSlice.reducer;
