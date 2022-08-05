import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Wrapper from '../../components/common/wrapper';
import ArticleEditor from '../../components/editor/ArticleEditor';
import { AuthUser, useEditArticleQuery } from '../../generated/graphql';
import withAuth from '../../lib/auth/with-auth';
import Custom404 from '../404';

const EditArticle = ({ user }: { user: AuthUser }) => {
  const { slug } = useRouter().query as { slug: string };
  const { data, loading } = useEditArticleQuery({ variables: { slug } });
  if (loading || !data) return <LoadingSpinner />;
  const { article } = data;
  if (
    !article ||
    // owner check
    article.author.username !== user.username
  )
    return <Custom404 />;

  return (
    <Wrapper title='Edit article'>
      <ArticleEditor {...{ user, article }} />
    </Wrapper>
  );
};

export default withAuth(EditArticle);
