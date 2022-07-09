import { ArticleViewFragment } from '../../generated/graphql';
import ArticleAuthorInfo from './ArticleAuthorInfo';
import NonOwnerArticleMetaActions from './NonOwnerArticleMetaActions';

export default function ArticleMeta({ article }: { article: ArticleViewFragment }) {
  return (
    <div className='article-meta'>
      <ArticleAuthorInfo article={article} />

      <NonOwnerArticleMetaActions article={article} />
    </div>
  );
}
