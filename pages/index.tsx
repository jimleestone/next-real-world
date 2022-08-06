import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useEffect, useState } from 'react';
import ArticlesViewer from '../components/article-list/ArticlesViewer';
import { TabProps } from '../components/common/Tab';
import Wrapper from '../components/common/wrapper';
import HomeBanner from '../components/home/Banner';
import HomeSidebar from '../components/home/Sidebar';
import { ArticlesQueryVariables } from '../generated/graphql';
import { useCurrentUser } from '../lib/hooks/use-current-user';

const Home: NextPage = () => {
  const router = useRouter();
  const { feed, tag } = useRouter().query as { feed?: string; tag?: string };
  const [tabs, setTabs] = useState<TabProps[]>([]);
  const { user, loading } = useCurrentUser();
  const [isFeedQuery, setFeedQuery] = useState<boolean>(false);
  const [queryFilter, setQueryFilter] = useState<ArticlesQueryVariables>({});
  useEffect(() => {
    if (router.isReady && !loading) {
      setFeedQuery(!!user && !!feed);
      setQueryFilter(tag ? { tag } : {});
      setTabs(
        R.unnest([
          user ? [{ name: 'Your Feed', href: '/?feed=true' }] : [],
          [{ name: 'Global Feed', href: '/' }],
          tag ? [{ name: `# ${tag}`, href: `/?tag=${tag}` }] : [],
        ])
      );
    }
  }, [feed, tag, user, router.isReady, loading]);

  return (
    <Wrapper title='Home'>
      <HomeBanner />
      <div className='container flex flex-col-reverse justify-center mt-8 mx-auto md:flex-row'>
        <main className='basis-9/12 shrink-0'>
          <ArticlesViewer {...{ tabs, queryFilter, isFeedQuery }} />
        </main>
        <aside className='w-full sticky self-start md:top-16 md:ml-8'>
          <HomeSidebar />
        </aside>
      </div>
    </Wrapper>
  );
};

export default Home;
