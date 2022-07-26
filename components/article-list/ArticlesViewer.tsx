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
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import LoadMore from '../common/LoadMore';
import TabList from '../common/TabList';
import ArticleList from './ArticleList';

interface ArticleListProps {
  tabs: { name: string; href: string | UrlObject }[];
  toggleClassName: string;
  isFeedQuery?: boolean;
  queryFilter: ArticlesQueryVariables;
}

export default function ArticlesViewer({ tabs, toggleClassName, isFeedQuery, queryFilter }: ArticleListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { errors, handleErrors } = useErrorsHandler();

  const [loadArticles, { data: articlesData, loading: articlesLoading, error, fetchMore }] = useArticlesLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onError: (err) => handleErrors(err),
  });
  const [loadArticlesCount, { data: articlesCount }] = useArticlesCountLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: (err) => handleErrors(err),
  });

  const [loadFeed, { data: feedData, loading: feedLoading, error: feedError, fetchMore: fetchMoreFeed }] =
    useFeedLazyQuery({
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
      onError: (err) => handleErrors(err),
    });
  const [loadFeedCount, { data: feedCount }] = useFeedCountLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: (err) => handleErrors(err),
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
      <TabList {...{ tabs, toggleClassName }} />
      <ArticleList articles={articles} loading={feedLoading || articlesLoading} errors={errors} />
      <LoadMore currentSize={currentSize || 0} totalCount={totalCount || 0} onLoadMore={onLoadMore} />
    </React.Fragment>
  );
}
