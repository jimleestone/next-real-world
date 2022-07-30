import { ArticlePreviewFragment } from '../../generated/graphql';
import ArticleAuthorInfo, { AuthorInfo } from '../article/ArticleAuthorInfo';
import CustomLink from '../common/CustomLink';
import FavoritesButton from '../common/FavoritesButton';
import TagList from '../common/TagList';

export function ArticlePreview({ article }: { article: ArticlePreviewFragment }) {
  const { slug, title, description, tagList, createdAt, author } = article;
  const { username, image } = author;
  const authorInfo: AuthorInfo = { createdAt, username, image };
  return (
    <>
      <div className='flex flex-wrap justify-between items-center py-3'>
        <ArticleAuthorInfo authorInfo={authorInfo} />
        <FavoritesButton className='' article={article} />
      </div>
      <CustomLink href={`/article/${slug}`} className='flex flex-col pb-2'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <p className='text-lg font-thin text-gray-400'>{description}</p>
        <div className='flex flex-wrap justify-between items-center mt-4'>
          <span className='text-sm font-light text-gray-300'>Read more...</span>
          <TagList tagList={tagList} outlined size='s' />
        </div>
      </CustomLink>
    </>
  );
}
