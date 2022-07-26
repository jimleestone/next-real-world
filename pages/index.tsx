import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticlesViewer from '../components/article-list/ArticlesViewer';
import Title from '../components/common/Title';
import HomeBanner from '../components/home/Banner';
import HomeSidebar from '../components/home/Sidebar';
import { ArticlesQueryVariables } from '../generated/graphql';
import { useCurrentUser } from '../lib/hooks/use-current-user';

const Home: NextPage = () => {
  const { feed, tag } = useRouter().query as { feed?: string; tag?: string };
  const { user } = useCurrentUser();
  const [isFeedQuery, setFeedQuery] = useState<boolean>(false);
  const [queryFilter, setQueryFilter] = useState<ArticlesQueryVariables>({});
  useEffect(() => {
    setFeedQuery(!!user && !!feed);
    setQueryFilter(tag ? { tag } : {});
  }, [feed, tag, user]);

  function buildTabList() {
    return Array.from(
      new Set([
        ...(user ? [{ name: 'Your Feed', href: '/?feed=true' }] : []),
        { name: 'Global Feed', href: '/' },
        ...(tag ? [{ name: `# ${tag}`, href: `/?tag=${tag}` }] : []),
      ])
    );
  }

  return (
    <>
      <Title title='Home' />
      <div className='mb-auto'>
        <HomeBanner />
        <div className='container flex flex-col-reverse justify-center mx-auto mt-8 md:flex-row'>
          <div className='basis-9/12 shrink-0 md:mr-6'>
            <ArticlesViewer
              toggleClassName='feed-toggle'
              tabs={buildTabList()}
              queryFilter={queryFilter}
              isFeedQuery={isFeedQuery}
            />
          </div>

          <aside className=''>
            <HomeSidebar />
          </aside>
        </div>
      </div>
    </>
  );
};

export default Home;
