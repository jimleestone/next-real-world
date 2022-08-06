import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticlesViewer from '../../components/article-list/ArticlesViewer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { TabProps } from '../../components/common/Tab';
import Wrapper from '../../components/common/wrapper';
import UserInfo from '../../components/profile/UserInfo';
import { ArticlesQueryVariables, useProfileLazyQuery } from '../../generated/graphql';
import Custom404 from '../404';

const Profile: NextPage = () => {
  const router = useRouter();
  const { username, favorites } = useRouter().query as { username: string; favorites?: string };
  const [queryFilter, setQueryFilter] = useState<ArticlesQueryVariables>({});
  const [tabs, setTabs] = useState<TabProps[]>([]);
  const [loadProfile, { data, loading }] = useProfileLazyQuery();
  useEffect(() => {
    if (router.isReady) {
      loadProfile({ variables: { username } });
      setQueryFilter(favorites ? { favorited: username } : { author: username });
      setTabs([
        { name: 'My Articles', href: `/profile/${username}` },
        { name: 'Favorited Articles', href: `/profile/${username}?favorites=true` },
      ]);
    }
  }, [username, favorites, router.isReady, loadProfile]);

  if (loading || !data) return <LoadingSpinner />;
  const { profile } = data;
  if (!profile) return <Custom404 />;
  return (
    <Wrapper title='Profile'>
      <UserInfo author={profile} />
      <div className='container flex flex-wrap justify-center mx-auto mt-8'>
        <div className='w-full'>
          <ArticlesViewer {...{ tabs, queryFilter }} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
