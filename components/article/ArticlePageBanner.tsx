import { ArticleViewFragment } from '../../generated/graphql';
import ArticleMeta from './ArticleMeta';

export default function ArticlePageBanner(props: { article: ArticleViewFragment }) {
  return (
    <div className='text-white bg-gray-700'>
      <div className='container flex flex-wrap flex-col mx-auto'>
        <h1 className='font-bold text-5xl pt-8 mb-8'>{props.article.title}</h1>

        <ArticleMeta {...props} dark />
      </div>
    </div>
  );
}
