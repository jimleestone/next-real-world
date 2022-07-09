import React from 'react';
import { ArticlePreviewFragment } from '../../generated/graphql';
import { ArticlePreview } from './ArticlePreview';

export default function ArticleList({
  articles,
  loading,
}: {
  articles: ArticlePreviewFragment[] | undefined;
  loading: boolean;
}) {
  if (loading)
    return (
      <div className='article-preview' key={1}>
        Loading articles...
      </div>
    );
  return (
    <React.Fragment>
      {articles?.length === 0 && (
        <div className='article-preview' key={1}>
          No articles are here... yet.
        </div>
      )}
      {articles?.map((article, index) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
    </React.Fragment>
  );
}
