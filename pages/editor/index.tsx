import { NextPage } from 'next';
import Wrapper from '../../components/common/wrapper';
import ArticleEditor from '../../components/editor/ArticleEditor';
import withAuth from '../../lib/auth/with-auth';

const NewArticle: NextPage = () => {
  return (
    <Wrapper title='New article'>
      <ArticleEditor />;
    </Wrapper>
  );
};

export default withAuth(NewArticle);
