import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticlesViewer from '../../components/article-list/ArticlesViewer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
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
    <div className='profile-page'>
      <UserInfo author={data.profile} />,
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
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
      </div>
    </div>
  );
};

export default Profile;
