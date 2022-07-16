import { NextPage } from 'next';
import ArticleEditor from '../../components/editor/ArticleEditor';

const NewArticle: NextPage = () => {
  return <ArticleEditor />;
};

export function getStaticProps() {
  return { props: { protected: true } };
}

export default NewArticle;
