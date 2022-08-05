import { useRouter } from 'next/router';
import { FeedDocument, Profile, useFollowMutation, useUnFollowMutation } from '../../generated/graphql';
import { ARTICLES_PAGE_SIZE } from '../../lib/constants';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useMessageHandler } from '../../lib/hooks/use-message';
import CustomButton from './CustomButton';

interface FollowsButtonProps {
  author: Profile;
  className?: string;
}

export default function FollowsButton({ author, className }: FollowsButtonProps) {
  const { user } = useCurrentUser();
  const router = useRouter();
  const { handleErrors } = useMessageHandler();
  const { following, username } = author;

  const [follow, { loading: followLoading }] = useFollowMutation({
    refetchQueries: [{ query: FeedDocument, variables: { offset: 0, limit: ARTICLES_PAGE_SIZE } }], // reload the first page of user feeds
    optimisticResponse: { follow: { username, following: true, __typename: 'Profile' } },
    onError: (err) => handleErrors({ err, mode: 'toast' }),
  });
  const [unFollow, { loading: unFollowLoading }] = useUnFollowMutation({
    refetchQueries: [{ query: FeedDocument, variables: { offset: 0, limit: ARTICLES_PAGE_SIZE } }],
    optimisticResponse: { unFollow: { username, following: false, __typename: 'Profile' } },
    onError: (err) => handleErrors({ err, mode: 'toast' }),
  });
  async function onFollowToggle() {
    if (!user) {
      router.push('/login');
      return;
    }
    following ? await unFollow({ variables: { username } }) : await follow({ variables: { username } });
  }

  return (
    <CustomButton
      color='secondary'
      size='s'
      outlined={!following}
      className={className}
      onClick={onFollowToggle}
      disabled={followLoading || unFollowLoading}
    >
      {following ? (
        <>
          <i className='ion-minus-round'></i>&nbsp;Unfollow
        </>
      ) : (
        <>
          <i className='ion-plus-round'></i>&nbsp;Follow
        </>
      )}
    </CustomButton>
  );
}
