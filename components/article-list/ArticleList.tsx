import { ArticlePreviewFragment } from '../../generated/graphql';
import { useMessageHandler } from '../../lib/hooks/use-message';
import Alert from '../common/alert';
import LoadingSpinner from '../common/LoadingSpinner';
import { ArticlePreview } from './ArticlePreview';

export default function ArticleList({ articles, loading }: { articles?: ArticlePreviewFragment[]; loading: boolean }) {
  const { info, message } = useMessageHandler();
  if (loading || !articles) return <LoadingSpinner />;
  return (
    <div className='mb-4 bg-gray-50 rounded-lg border border-gray-100 py-4'>
      {message && message.mode === 'alert' ? (
        <Alert />
      ) : (
        <ol className='divide-y divider-gray-200'>
          {articles.map((article, index) => (
            <li key={article.slug}>
              <ArticlePreview article={article} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
