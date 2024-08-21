export interface NewsData {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

interface ByLine {
  original: string;
  person: [];
  organization: string | null;
}

interface Headline {
  main: string;
}

export interface NytNewsData {
  abstract: string;
  byline: ByLine;
  document_type: string;
  headline: Headline;
  Keywords: [];
  lead_paragraph: string;
  multimedia: { url: string }[];
  news_desk: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  subsection_name: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}

export interface ItemState {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface GuardianData {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface NewsFeedItem {
  id: string | number;
  name: string;
}

export interface NewsFeed {
  authors: string[];
  categories: string[];
  sources: string[];
}
