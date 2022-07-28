import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ArticleMeta from '../../components/article/ArticleMeta';
import ArticlePageBanner from '../../components/article/ArticlePageBanner';
import CommentSection from '../../components/article/CommentSection';
import Marked from '../../components/article/marked';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import TagList from '../../components/common/TagList';
import Wrapper from '../../components/common/wrapper';
import { useArticleQuery } from '../../generated/graphql';
import Custom404 from '../404';

const ArticlePage: NextPage = () => {
  const { slug } = useRouter().query as { slug: string };
  const { data, loading } = useArticleQuery({ variables: { slug } });

  if (loading || !data) return <LoadingSpinner />;
  if (!data.article) return <Custom404 />;
  const { article } = data;

  return (
    <Wrapper title={article.title}>
      <ArticlePageBanner article={article} />

      <div className='container flex flex-wrap flex-col mx-auto mt-8'>
        <Marked content={article.body} className='mb-4' />
        <TagList outlined tagList={article.tagList} />

        <hr className='my-4' />

        <div className='mt-16 self-center'>
          <ArticleMeta article={article} />
        </div>
      </div>
      <CommentSection article={article} />
    </Wrapper>
  );
};

export default ArticlePage;
