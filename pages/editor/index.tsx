import Wrapper from '../../components/common/wrapper';
import ArticleEditor from '../../components/editor/ArticleEditor';
import { AuthUser } from '../../generated/graphql';
import withAuth from '../../lib/auth/with-auth';

const NewArticle = ({ user }: { user: AuthUser }) => {
  return (
    <Wrapper title='New article'>
      <ArticleEditor {...{ user }} />
    </Wrapper>
  );
};

export default withAuth(NewArticle);
