import { format } from 'date-fns';
import Link from 'next/link';
import { ArticlePreviewFragment } from '../../generated/graphql';
import CustomImage from '../common/CustomImage';
import FavoritesButton from '../common/FavoritesButton';
import TagList from '../common/TagList';

export function ArticlePreview({ article }: { article: ArticlePreviewFragment }) {
  const {
    createdAt,
    favorited,
    slug,
    title,
    description,
    tagList,
    author: { username, image },
  } = article;

  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link href={{ pathname: '/profile/[username]', query: { username } }} passHref>
          <a className='author'>
            <CustomImage src={image} alt={username} height={32} width={32} />
          </a>
        </Link>
        <div className='info'>
          <Link href={{ pathname: '/profile/[username]', query: { username } }}>
            <a className='author'>{username}</a>
          </Link>
          <span className='date'>{format(new Date(createdAt), 'PP')}</span>
        </div>
        <FavoritesButton
          article={article}
          className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
        />
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
