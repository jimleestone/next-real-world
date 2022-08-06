import { ArticleViewFragment } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import ArticleAuthorInfo, { AuthorInfo } from './ArticleAuthorInfo';
import NonOwnerArticleMetaActions from './NonOwnerArticleMetaActions';
import OwnerArticleMetaActions from './OwnerArticleMetaActions';

export default function ArticleMeta({ dark = false, article }: { dark?: boolean; article: ArticleViewFragment }) {
  const { user, loading } = useCurrentUser();
  const { createdAt, author } = article;
  const { username, image } = author;
  const authorInfo: AuthorInfo = { createdAt, username, image };
  return (
    <div className='flex flex-col items-center mb-8 md:flex-row'>
      <ArticleAuthorInfo authorInfo={authorInfo} dark={dark} />
      {!loading && (
        <div className='mt-4 md:ml-8 md:mt-0'>
          {user && user.username === article.author.username ? (
            <OwnerArticleMetaActions article={article} />
          ) : (
            <NonOwnerArticleMetaActions article={article} user={user} />
          )}
        </div>
      )}
    </div>
  );
}
