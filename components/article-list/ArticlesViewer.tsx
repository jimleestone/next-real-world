import React from 'react';
import { useArticlesQuery } from '../../generated/graphql';
import ArticleList from './ArticleList';

export default function ArticlesViewer() {
  const { loading, data } = useArticlesQuery();

  return (
    <React.Fragment>
      <ArticleList articles={data?.articles.articles} loading={loading} />
    </React.Fragment>
  );
}
