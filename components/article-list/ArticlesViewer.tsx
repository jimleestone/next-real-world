import { NetworkStatus } from '@apollo/client';
import * as R from 'ramda';
import React, { useCallback, useEffect } from 'react';
import { UrlObject } from 'url';
import { ArticlesQueryVariables, useArticlesLazyQuery, useFeedLazyQuery } from '../../generated/graphql';
import { useMessageHandler } from '../../lib/hooks/use-message';
import ReverseLoadMore from '../common/reverse-load-more';
import TabList from '../common/TabList';
import ArticleList from './ArticleList';

interface ArticleListProps {
  tabs: { name: string; href: string | UrlObject }[];
  isFeedQuery?: boolean;
  queryFilter: ArticlesQueryVariables;
}

export default function ArticlesViewer({ tabs, isFeedQuery, queryFilter }: ArticleListProps) {
  const { error, info } = useMessageHandler();

  const fallbackMessage = 'Could not load articles... ';
  const noArticlesMessage = 'No articles are here... yet';
  const [loadArticles, { data: articlesData, fetchMore, networkStatus }] = useArticlesLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    onError: () => error({ content: fallbackMessage, mode: 'alert' }),
    onCompleted: (data) => {
      if (data && data.articles.length === 0) info({ content: noArticlesMessage, mode: 'alert' });
    },
  });

  const [loadFeed, { data: feedData, fetchMore: fetchMoreFeed, networkStatus: feedNetworkStatus }] = useFeedLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    onError: () => error({ content: fallbackMessage, mode: 'alert' }),
    onCompleted: (data) => {
      if (data && data.feed.length === 0) info({ content: noArticlesMessage, mode: 'alert' });
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const offset = 0;
      const pagedQueryFilter = R.mergeRight(queryFilter, { offset });
      isFeedQuery
        ? await loadFeed({ variables: { ...pagedQueryFilter } })
        : await loadArticles({ variables: { ...pagedQueryFilter } });
    };
    loadData();
  }, [isFeedQuery, queryFilter, loadFeed, loadArticles]);

  const articles = isFeedQuery ? feedData?.feed : articlesData?.articles;
  const currentSize = articles?.length;
  const loading = networkStatus === NetworkStatus.loading || feedNetworkStatus === NetworkStatus.loading;
  const first = articles && articles.length && articles[0].id;
  const last = articles && articles.length && articles[articles.length - 1].id;
  const loadMoreLoading = networkStatus === NetworkStatus.fetchMore || feedNetworkStatus === NetworkStatus.fetchMore;

  const onLoadMore = useCallback(
    async ({ offset, cursor }: { offset: number; cursor: number }) => {
      const fetchMoreQueryFilter = R.mergeRight(queryFilter, { offset, cursor });
      isFeedQuery
        ? await fetchMoreFeed({ variables: fetchMoreQueryFilter })
        : await fetchMore({ variables: fetchMoreQueryFilter });
    },
    [isFeedQuery, fetchMoreFeed, fetchMore, queryFilter]
  );
  return (
    <React.Fragment>
      <TabList {...{ tabs }} />
      <ArticleList {...{ articles, loading, loadMoreLoading }} />
      <ReverseLoadMore {...{ first, last, currentSize, onLoadMore, loadMoreLoading }} />
    </React.Fragment>
  );
}
