import { NextPage } from 'next';
import Title from '../../components/common/Title';
import ArticleEditor from '../../components/editor/ArticleEditor';
import withAuth from '../../lib/auth/with-auth';

const NewArticle: NextPage = () => {
  return (
    <>
      <Title title='New article' />
      <ArticleEditor />;
    </>
  );
};

export default withAuth(NewArticle);
