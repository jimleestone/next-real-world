import type { NextPage } from 'next';
import ArticlesViewer from '../components/article-list/ArticlesViewer';
import { ContainerPage } from '../components/common/ContainerPage';
import HomeBanner from '../components/home/Banner';
import HomeSidebar from '../components/home/Sidebar';

const Home: NextPage = () => {
  return (
    <div className='home-page'>
      <HomeBanner />
      <ContainerPage>
        <div className='col-md-9'>
          <ArticlesViewer />
        </div>

        <div className='col-md-3'>
          <HomeSidebar />
        </div>
      </ContainerPage>
    </div>
  );
};

export default Home;
