import { GetServerSideProps } from 'next';
import ArticleJsonMeta from '../../components/article/article-json-meta';
import ArticleMeta from '../../components/article/ArticleMeta';
import ArticlePageBanner from '../../components/article/ArticlePageBanner';
import CommentSection from '../../components/article/CommentSection';
import Marked from '../../components/article/marked';
import TagList from '../../components/common/TagList';
import Wrapper from '../../components/common/wrapper';
import { ArticleDocument, ArticleQuery, ArticleViewFragment } from '../../generated/graphql';
import client from '../../lib/client/apollo-client';
import { BASE_URL } from '../../lib/constants';
import Custom404 from '../404';

const ArticlePage = ({ article }: { article: ArticleViewFragment }) => {
  if (!article) return <Custom404 />;
  const { slug, title, description } = article;
  return (
    <Wrapper
      {...{ title, description }}
      openGraph={{
        url: `${BASE_URL}/article/${slug}`,
        title,
        description,
      }}
    >
      <ArticleJsonMeta article={article} />
      <ArticlePageBanner article={article} />

      <div className='container flex flex-wrap flex-col mx-auto mt-8'>
        <div className='w-full'>
          <Marked content={article.body} className='mb-4' />
        </div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const { data } = await client.query<ArticleQuery>({
    query: ArticleDocument,
    variables: { slug },
    errorPolicy: 'ignore',
  });
  return {
    props: { article: data.article },
  };
};
