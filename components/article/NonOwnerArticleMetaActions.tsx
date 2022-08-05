import { ArticleViewFragment } from '../../generated/graphql';
import FavoritesButton from '../common/FavoritesButton';
import FollowsButton from '../common/FollowsButton';

export default function NonOwnerArticleMetaActions({ article }: { article: ArticleViewFragment }) {
  const { favorited, author } = article;
  return (
    <div className='flex space-x-2'>
      <FollowsButton author={author} />
      <FavoritesButton article={article} text={favorited ? 'Unfavorite ' : 'Favorite '} />
    </div>
  );
}
