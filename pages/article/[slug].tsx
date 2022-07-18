import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ArticleMeta from '../../components/article/ArticleMeta';
import ArticlePageBanner from '../../components/article/ArticlePageBanner';
import CommentSection from '../../components/article/CommentSection';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import TagList from '../../components/common/TagList';
import Title from '../../components/common/Title';
import { useArticleQuery } from '../../generated/graphql';
import Custom404 from '../404';

const ArticlePage: NextPage = () => {
  const { slug } = useRouter().query as { slug: string };
  const { data, loading } = useArticleQuery({ variables: { slug } });

  if (loading || !data) return <LoadingSpinner />;
  if (!data.article) return <Custom404 />;
  const { article } = data;
  return (
    <>
      <Title title={article.title} />
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
    </>
  );
};

export default ArticlePage;
