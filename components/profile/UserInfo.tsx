import { useRouter } from 'next/router';
import { Profile } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import CustomImage from '../common/CustomImage';
import FollowsButton from '../common/FollowsButton';

export default function UserInfo({ author }: { author: Profile }) {
  const router = useRouter();
  const { user } = useCurrentUser();

  const { image, username, bio } = author;
  const currentUsername = user ? user.username : '';

  return (
    <div className='user-info'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <CustomImage src={image} alt={username} className='user-img' width={100} height={100} />
            <h4>{username}</h4>
            <p>{bio}</p>

            {currentUsername === username ? (
              <button className='btn btn-sm btn-outline-secondary action-btn' onClick={() => router.push('/settings')}>
                <i className='ion-gear-a'></i>&nbsp; Edit Profile Settings
              </button>
            ) : (
              <FollowsButton author={author} className='btn btn-sm btn-outline-secondary action-btn' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
