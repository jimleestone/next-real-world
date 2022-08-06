import { NetworkStatus } from '@apollo/client';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import React, { useCallback, useEffect, useState } from 'react';
import { ArticlesQueryVariables, useArticlesLazyQuery, useFeedLazyQuery } from '../../generated/graphql';
import { ARTICLES_PAGE_SIZE } from '../../lib/constants';
import { useMessageHandler } from '../../lib/hooks/use-message';
import ReverseLoadMore from '../common/reverse-load-more';
import { TabProps } from '../common/Tab';
import TabList from '../common/TabList';
import ArticleList from './ArticleList';

interface ArticleListProps {
  tabs: TabProps[];
  isFeedQuery?: boolean;
  queryFilter: ArticlesQueryVariables;
}

export default function ArticlesViewer({ tabs, isFeedQuery, queryFilter }: ArticleListProps) {
  const { error, info } = useMessageHandler();
  const { asPath } = useRouter();

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
      const pagedQueryFilter = R.mergeRight(queryFilter, { offset: 0, limit: ARTICLES_PAGE_SIZE });
      isFeedQuery
        ? await loadFeed({ variables: { ...pagedQueryFilter } })
        : await loadArticles({ variables: { ...pagedQueryFilter } });
    };
    loadData();
  }, [isFeedQuery, queryFilter, loadFeed, loadArticles]);

  const articles = isFeedQuery ? feedData?.feed : articlesData?.articles;
  const loading = networkStatus === NetworkStatus.loading || feedNetworkStatus === NetworkStatus.loading;
  const first = articles && articles.length && articles[0].id;
  const last = articles && articles.length && articles[articles.length - 1].id;
  const loadMoreLoading = networkStatus === NetworkStatus.fetchMore || feedNetworkStatus === NetworkStatus.fetchMore;

  const [topFetchedSize, setTopFetchedSize] = useState(ARTICLES_PAGE_SIZE);
  const [bottomFetchedSize, setBottomFetchedSize] = useState(ARTICLES_PAGE_SIZE);
  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  useEffect(() => {
    // reset fetched size
    setTopFetchedSize(ARTICLES_PAGE_SIZE);
    setBottomFetchedSize(ARTICLES_PAGE_SIZE);
    setTopLoading(false);
    setBottomLoading(false);
  }, [asPath]);
  const onLoadMore = useCallback(
    async ({ offset, cursor }: { offset: number; cursor: number }) => {
      const fetchMoreQueryFilter = R.mergeRight(queryFilter, { offset, cursor, limit: ARTICLES_PAGE_SIZE });
      if (isFeedQuery) {
        offset > 0 ? setBottomLoading(true) : setTopLoading(true);
        const { data } = await fetchMoreFeed({ variables: fetchMoreQueryFilter });
        offset > 0 ? setBottomLoading(false) : setTopLoading(false);
        offset > 0 ? setBottomFetchedSize(data.feed.length) : setTopFetchedSize(data.feed.length);
      } else {
        offset > 0 ? setBottomLoading(true) : setTopLoading(true);
        const { data } = await fetchMore({ variables: fetchMoreQueryFilter });
        offset > 0 ? setBottomLoading(false) : setTopLoading(false);
        offset > 0 ? setBottomFetchedSize(data.articles.length) : setTopFetchedSize(data.articles.length);
      }
    },
    [isFeedQuery, fetchMoreFeed, fetchMore, queryFilter]
  );
  return (
    <React.Fragment>
      <TabList {...{ tabs }} />
      <ReverseLoadMore
        {...{ first, last, onLoadMore, loadMoreLoading, topFetchedSize, bottomFetchedSize, topLoading, bottomLoading }}
      >
        <ArticleList {...{ articles, loading }} />
      </ReverseLoadMore>
    </React.Fragment>
  );
}
