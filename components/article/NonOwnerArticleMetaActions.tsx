import { useEffect } from 'react';
import { ArticleViewFragment, AuthUser, useArticleMetaLazyQuery } from '../../generated/graphql';
import FavoritesButton from '../common/FavoritesButton';
import FollowsButton from '../common/FollowsButton';

interface NonOwnerArticleMetaActionsProps {
  article: ArticleViewFragment; // SSR data
  user?: AuthUser;
}

export default function NonOwnerArticleMetaActions({ article, user }: NonOwnerArticleMetaActionsProps) {
  const { slug, favorited, author } = article;
  const [loadArticleMeta, { data, loading }] = useArticleMetaLazyQuery();
  useEffect(() => {
    const load = async () => {
      if (user) await loadArticleMeta({ variables: { slug } }); // fetch article related data of current user
    };
    load();
  }, [user, slug, loadArticleMeta]);
  return (
    <div className='flex space-x-2'>
      {user && !loading && data && data.article ? (
        <>
          <FollowsButton author={data.article.author} />
          <FavoritesButton article={data.article} text={data.article.favorited ? 'Unfavorite ' : 'Favorite '} />
        </>
      ) : (
        <>
          <FollowsButton author={author} />
          <FavoritesButton article={article} text={favorited ? 'Unfavorite ' : 'Favorite '} />
        </>
      )}
    </div>
  );
}
