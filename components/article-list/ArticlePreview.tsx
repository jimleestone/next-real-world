import { format } from 'date-fns';
import { ArticlePreviewFragment } from '../../generated/graphql';
import CustomImage from '../common/CustomImage';
import CustomLink from '../common/CustomLink';
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
        <CustomLink href={{ pathname: '/profile/[username]', query: { username } }} className='author'>
          <CustomImage src={image} alt={username} className='author-image' />
        </CustomLink>
        <div className='info'>
          <CustomLink href={{ pathname: '/profile/[username]', query: { username } }} className='author'>
            {username}
          </CustomLink>
          <span className='date'>{format(new Date(createdAt), 'PP')}</span>
        </div>
        <FavoritesButton
          article={article}
          className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
        />
      </div>
      <CustomLink href={{ pathname: '/article/[slug]', query: { slug } }} className='preview-link'>
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <TagList tagList={tagList} />
      </CustomLink>
    </div>
  );
}
