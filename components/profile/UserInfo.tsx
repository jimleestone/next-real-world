import { useRouter } from 'next/router';
import { Profile } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import CustomButton from '../common/CustomButton';
import CustomImage from '../common/CustomImage';
import FollowsButton from '../common/FollowsButton';

export default function UserInfo({ author }: { author: Profile }) {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  const { image, username, bio } = author;
  const currentUsername = user ? user.username : '';

  return (
    <div className='bg-gray-200 py-8'>
      <div className='container flex flex-wrap flex-col items-center mx-auto'>
        <CustomImage src={image} alt={username} size='l' />
        <h4 className='text-3xl font-bold mt-4 mb-2'>{username}</h4>
        <p className='font-thin text-lg text-gray-400 mb-4'>{bio}</p>
        {!loading && (
          <div className='md:self-end'>
            {currentUsername === username ? (
              <CustomButton color='secondary' size='s' outlined onClick={() => router.push('/settings')}>
                <i className='ion-gear-a'></i>&nbsp; Edit Profile Settings
              </CustomButton>
            ) : (
              <FollowsButton author={author} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
