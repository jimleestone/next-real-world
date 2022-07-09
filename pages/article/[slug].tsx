import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ArticleMeta from '../../components/article/ArticleMeta';
import ArticlePageBanner from '../../components/article/ArticlePageBanner';
import CommentSection from '../../components/article/CommentSection';
import TagList from '../../components/common/TagList';
import { useArticleQuery } from '../../generated/graphql';

const ArticlePage: NextPage = () => {
  const { slug } = useRouter().query as { slug: string };
  const { data, loading } = useArticleQuery({ variables: { slug } });
  if (loading) return <div>Loading article...</div>;
  if (!data?.article) return <div>No such article</div>;
  const { article } = data;
  return (
    <div className='article-page'>
      <ArticlePageBanner article={article} />

      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>{article.body}</div>
          <TagList tagList={article.tagList} />
        </div>

        <hr />

        <div className='article-actions'>
          <ArticleMeta article={article} />
        </div>

        <CommentSection article={article} />
      </div>
    </div>
  );
};

export default ArticlePage;
