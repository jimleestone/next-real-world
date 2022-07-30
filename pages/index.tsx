import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticlesViewer from '../components/article-list/ArticlesViewer';
import Wrapper from '../components/common/wrapper';
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
    <Wrapper title='Home'>
      <HomeBanner />
      <div className='container flex flex-col-reverse justify-center mt-8 mx-auto md:flex-row'>
        <main className='basis-9/12 shrink-0'>
          <ArticlesViewer tabs={buildTabList()} queryFilter={queryFilter} isFeedQuery={isFeedQuery} />
        </main>
        <aside className='md:ml-8'>
          <HomeSidebar />
        </aside>
      </div>
    </Wrapper>
  );
};

export default Home;
