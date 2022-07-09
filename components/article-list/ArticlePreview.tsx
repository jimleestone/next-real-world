import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { ArticlePreviewFragment } from '../../generated/graphql';
import TagList from '../common/TagList';

export function ArticlePreview({
  article: {
    createdAt,
    favorited,
    favoritesCount,
    slug,
    title,
    description,
    tagList,
    author: { username, image },
  },
  onFavoriteToggle,
}: {
  article: ArticlePreviewFragment;
  onFavoriteToggle?: () => void;
}) {
  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link href={{ pathname: '/profile/[username]', query: { username } }} passHref>
          <a className='author'>
            <Image src={image || ' '} alt={username} height={32} width={32} />
          </a>
        </Link>
        <div className='info'>
          <Link href={{ pathname: '/profile/[username]', query: { username } }}>
            <a className='author'>{username}</a>
          </Link>
          <span className='date'>{format(new Date(createdAt), 'PP')}</span>
        </div>
        <button
          className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
          aria-label='Toggle Favorite'
          disabled={false}
          onClick={onFavoriteToggle}
        >
          <i className='ion-heart'></i> {favoritesCount}
        </button>
      </div>
      <Link href={{ pathname: '/article/[slug]', query: { slug } }} passHref>
        <a className='preview-link'>
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Read more...</span>
          <TagList tagList={tagList} />
        </a>
      </Link>
    </div>
  );
}
