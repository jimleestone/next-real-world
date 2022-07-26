import { ArticlePreviewFragment } from '../../generated/graphql';
import Alert from '../common/alert';
import LoadingSpinner from '../common/LoadingSpinner';
import { ArticlePreview } from './ArticlePreview';

export default function ArticleList({
  articles,
  loading,
  errors,
}: {
  articles?: ArticlePreviewFragment[];
  loading: boolean;
  errors?: string;
}) {
  if (loading || !articles) return <LoadingSpinner />;
  if (errors)
    return (
      <div className='py-4'>
        <Alert type='danger' message='Could not load articles... ' />;
      </div>
    );
  if (articles.length === 0)
    return (
      <div className='py-4'>
        <Alert message='No articles are here... yet' />
      </div>
    );

  return (
    <div className='mb-4 bg-gray-50 rounded-lg border border-gray-100 py-4'>
      <ol className='divide-y divider-gray-200'>
        {articles?.map((article, index) => (
          <ArticlePreview key={article.slug} article={article} />
        ))}
      </ol>
    </div>
  );
}
