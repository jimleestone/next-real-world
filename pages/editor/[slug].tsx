import { NextPage } from 'next';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Title from '../../components/common/Title';
import ArticleEditor from '../../components/editor/ArticleEditor';
import { useEditArticleQuery } from '../../generated/graphql';
import withAuth from '../../lib/auth/with-auth';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import Custom404 from '../404';

const EditArticle: NextPage = () => {
  const { slug } = useRouter().query as { slug: string };
  const { user } = useCurrentUser();

  const { data, loading } = useEditArticleQuery({ variables: { slug } });

  if (loading || !data) return <LoadingSpinner />;
  if (
    !data.article ||
    // owner check
    data.article.author.username !== user?.username
  )
    return <Custom404 />;

  const { article } = data;
  return (
    <>
      <Title title='Edit article' />
      <ArticleEditor article={article} />;
    </>
  );
};

export default withAuth(EditArticle);
