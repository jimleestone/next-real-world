import { ArticleViewFragment } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import ArticleAuthorInfo from './ArticleAuthorInfo';
import NonOwnerArticleMetaActions from './NonOwnerArticleMetaActions';
import OwnerArticleMetaActions from './OwnerArticleMetaActions';

export default function ArticleMeta({ article }: { article: ArticleViewFragment }) {
  const { user } = useCurrentUser();

  return (
    <div className='article-meta'>
      <ArticleAuthorInfo article={article} />
      {user && user.username === article.author.username ? (
        <OwnerArticleMetaActions article={article} />
      ) : (
        <NonOwnerArticleMetaActions article={article} />
      )}
    </div>
  );
}
