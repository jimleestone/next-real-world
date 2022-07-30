import * as R from 'ramda';
import React, { useCallback, useEffect, useState } from 'react';
import { UrlObject } from 'url';
import {
  ArticlesQueryVariables,
  useArticlesCountLazyQuery,
  useArticlesLazyQuery,
  useFeedCountLazyQuery,
  useFeedLazyQuery,
} from '../../generated/graphql';
import { useMessageHandler } from '../../lib/hooks/use-message';
import LoadMore from '../common/LoadMore';
import TabList from '../common/TabList';
import ArticleList from './ArticleList';

interface ArticleListProps {
  tabs: { name: string; href: string | UrlObject }[];
  isFeedQuery?: boolean;
  queryFilter: ArticlesQueryVariables;
}

export default function ArticlesViewer({ tabs, isFeedQuery, queryFilter }: ArticleListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { error, info } = useMessageHandler();

  const fallbackMessage = 'Could not load articles... ';
  const noArticlesMessage = 'No articles are here... yet';
  const [loadArticles, { data: articlesData, loading: articlesLoading, fetchMore }] = useArticlesLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onError: () => error({ content: fallbackMessage, mode: 'alert' }),
    onCompleted: (data) => {
      if (data && data.articles.length === 0) info({ content: noArticlesMessage, mode: 'alert' });
    },
  });
  const [loadArticlesCount, { data: articlesCount }] = useArticlesCountLazyQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  });

  const [loadFeed, { data: feedData, loading: feedLoading, fetchMore: fetchMoreFeed }] = useFeedLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onError: () => error({ content: fallbackMessage, mode: 'alert' }),
    onCompleted: (data) => {
      if (data && data.feed.length === 0) info({ content: noArticlesMessage, mode: 'alert' });
    },
  });
  const [loadFeedCount, { data: feedCount }] = useFeedCountLazyQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  });

  useEffect(() => {
    setCurrentPage(1); // reset current page when query filter changes
  }, [isFeedQuery, queryFilter]);

  useEffect(() => {
    const loadData = async () => {
      const offset = (currentPage - 1) * 10;
      const pagedQueryFilter = R.mergeRight(queryFilter, { offset });
      if (isFeedQuery) {
        await loadFeedCount();
        await loadFeed({ variables: { ...pagedQueryFilter } });
      } else {
        await loadArticlesCount({ variables: { ...queryFilter } });
        await loadArticles({ variables: { ...pagedQueryFilter } });
      }
    };
    loadData();
  }, [isFeedQuery, queryFilter, currentPage, loadFeed, loadArticles, loadArticlesCount, loadFeedCount]);
  const onPageChange = useCallback((index: number) => {
    setCurrentPage(index);
  }, []);

  const articles = isFeedQuery ? feedData?.feed : articlesData?.articles;
  const totalCount = isFeedQuery ? feedCount?.feedCount : articlesCount?.articlesCount;
  const currentSize = articles?.length;

  const onLoadMore = useCallback(() => {
    const fetchMoreQueryFilter = R.mergeRight(queryFilter, { offset: currentSize });
    isFeedQuery ? fetchMoreFeed({ variables: fetchMoreQueryFilter }) : fetchMore({ variables: fetchMoreQueryFilter });
  }, [isFeedQuery, fetchMoreFeed, fetchMore, queryFilter, currentSize]);

  return (
    <React.Fragment>
      <TabList {...{ tabs }} />
      <ArticleList articles={articles} loading={feedLoading || articlesLoading} />
      <LoadMore currentSize={currentSize || 0} totalCount={totalCount || 0} onLoadMore={onLoadMore} />
    </React.Fragment>
  );
}
