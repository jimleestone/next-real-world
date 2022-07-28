import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticlesViewer from '../../components/article-list/ArticlesViewer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Wrapper from '../../components/common/wrapper';
import UserInfo from '../../components/profile/UserInfo';
import { ArticlesQueryVariables, useProfileQuery } from '../../generated/graphql';
import Custom404 from '../404';

const Profile: NextPage = () => {
  const { username, favorites } = useRouter().query as { username: string; favorites?: string };
  const [queryFilter, setQueryFilter] = useState<ArticlesQueryVariables>({});
  useEffect(() => {
    setQueryFilter(favorites ? { favorited: username } : { author: username });
  }, [username, favorites]);

  const { data, loading } = useProfileQuery({ variables: { username } });
  if (loading) return <LoadingSpinner />;
  if (!data || !data.profile) return <Custom404 />;
  return (
    <Wrapper title='Profile'>
      <UserInfo author={data.profile} />,
      <div className='container flex flex-wrap justify-center mx-auto mt-8'>
        <div className='w-full'>
          <ArticlesViewer
            toggleClassName='articles-toggle'
            tabs={[
              { name: 'My Articles', href: `/profile/${username}` },
              { name: 'Favorited Articles', href: `/profile/${username}?favorites=true` },
            ]}
            queryFilter={queryFilter}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
