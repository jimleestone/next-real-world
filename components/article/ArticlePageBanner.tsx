import { ArticleViewFragment } from '../../generated/graphql';
import ArticleMeta from './ArticleMeta';

export default function ArticlePageBanner(props: { article: ArticleViewFragment }) {
  return (
    <div className='banner'>
      <div className='container'>
        <h1>{props.article.title}</h1>

        <ArticleMeta {...props} />
      </div>
    </div>
  );
}
