import { ArticlePreviewFragment } from '../../generated/graphql';
import LoadingSpinner from '../common/LoadingSpinner';
import { ArticlePreview } from './ArticlePreview';

export default function ArticleList({ articles, loading }: { articles?: ArticlePreviewFragment[]; loading: boolean }) {
  if (loading || !articles) return <LoadingSpinner />;
  if (articles.length === 0)
    return (
      <div className='article-preview' key={1}>
        No articles are here... yet.
      </div>
    );
  return (
    <>
      {articles?.map((article, index) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
    </>
  );
}
