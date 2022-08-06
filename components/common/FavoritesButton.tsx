import { useRouter } from 'next/router';
import {
  ArticleMetaViewFragment,
  ArticlePreviewFragment,
  ArticlesDocument,
  ArticleViewFragment,
  useFavoriteMutation,
  useUnfavoriteMutation,
} from '../../generated/graphql';
import { ARTICLES_PAGE_SIZE } from '../../lib/constants';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useMessageHandler } from '../../lib/hooks/use-message';
import CustomButton from './CustomButton';

interface FavoritesButtonProps {
  article: ArticlePreviewFragment | ArticleViewFragment | ArticleMetaViewFragment;
  className?: string;
  text?: string;
}

export default function FavoritesButton({ article, className, text }: FavoritesButtonProps) {
  const { user } = useCurrentUser();
  const router = useRouter();
  const { handleErrors } = useMessageHandler();
  const { id, slug, favorited, favoritesCount } = article;

  const [favorite, { loading: favoriteLoading }] = useFavoriteMutation({
    refetchQueries: [
      { query: ArticlesDocument, variables: { favorited: user?.username, offset: 0, limit: ARTICLES_PAGE_SIZE } },
    ],
    optimisticResponse: {
      favorite: { id, favorited: true, favoritesCount: favoritesCount + 1, __typename: 'Article' },
    },
    onError: (err) => handleErrors({ err, mode: 'toast' }),
  });
  const [unfavorite, { loading: unfavoriteLoading }] = useUnfavoriteMutation({
    refetchQueries: [
      { query: ArticlesDocument, variables: { favorited: user?.username, offset: 0, limit: ARTICLES_PAGE_SIZE } },
    ],
    optimisticResponse: {
      unfavorite: { id, favorited: true, favoritesCount: favoritesCount - 1, __typename: 'Article' },
    },
    onError: (err) => handleErrors({ err, mode: 'toast' }),
  });
  async function onFavoriteToggle() {
    if (!user) {
      router.push('/login');
      return;
    }
    favorited ? await unfavorite({ variables: { slug } }) : await favorite({ variables: { slug } });
  }

  return (
    <CustomButton
      color='primary'
      size='s'
      outlined={!favorited}
      className={className}
      aria-label='Toggle Favorite'
      disabled={favoriteLoading || unfavoriteLoading}
      onClick={onFavoriteToggle}
    >
      <i className='ion-heart'></i>
      {text ? (
        <>
          &nbsp; {text} <span className='counter'>({favoritesCount})</span>
        </>
      ) : (
        <>&nbsp; {favoritesCount}</>
      )}
    </CustomButton>
  );
}
