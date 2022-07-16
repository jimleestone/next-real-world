import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ArticleEditor from '../../components/editor/ArticleEditor';
import { useEditArticleQuery } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import Custom404 from '../404';

const EditArticle: NextPage = () => {
  const { slug } = useRouter().query as { slug: string };
  const { user } = useCurrentUser();

  const { data, loading } = useEditArticleQuery({ variables: { slug } });

  if (loading) return <LoadingSpinner />;
  if (
    !data ||
    !data.article ||
    // owner check
    data.article.author.username !== user?.username
  )
    return <Custom404 />;

  const { article } = data;
  return <ArticleEditor article={article} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: { protected: true } };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default EditArticle;
