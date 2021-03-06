import { useRouter } from 'next/router';
import {
  ArticlePreviewFragment,
  ArticlesDocument,
  ArticleViewFragment,
  useFavoriteMutation,
  useUnfavoriteMutation,
} from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';

interface FavoritesButtonProps {
  article: ArticlePreviewFragment | ArticleViewFragment;
  className: string;
  text?: string;
}

export default function FavoritesButton({ article, className, text }: FavoritesButtonProps) {
  const { user } = useCurrentUser();
  const router = useRouter();
  const { handleErrors } = useErrorsHandler();
  const { id, slug, favorited, favoritesCount } = article;

  const [favorite, { loading: favoriteLoading }] = useFavoriteMutation({
    refetchQueries: [{ query: ArticlesDocument, variables: { favorited: user?.username, offset: 0 } }],
    optimisticResponse: {
      favorite: { id, favorited: true, favoritesCount: favoritesCount + 1, __typename: 'Article' },
    },
    onError: (err) => handleErrors(err),
  });
  const [unfavorite, { loading: unfavoriteLoading }] = useUnfavoriteMutation({
    refetchQueries: [{ query: ArticlesDocument, variables: { favorited: user?.username, offset: 0 } }],
    optimisticResponse: {
      unfavorite: { id, favorited: true, favoritesCount: favoritesCount - 1, __typename: 'Article' },
    },
    onError: (err) => handleErrors(err),
  });
  async function onFavoriteToggle() {
    if (!user) {
      router.push('/login');
      return;
    }
    favorited ? await unfavorite({ variables: { slug } }) : await favorite({ variables: { slug } });
  }

  return (
    <button
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
    </button>
  );
}
