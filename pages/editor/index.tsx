import { NextPage } from 'next';
import ArticleEditor from '../../components/editor/ArticleEditor';
import withAuth from '../../lib/auth/with-auth';

const NewArticle: NextPage = () => {
  return <ArticleEditor />;
};

export default withAuth(NewArticle);
