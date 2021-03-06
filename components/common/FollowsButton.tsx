import { useRouter } from 'next/router';
import { FeedDocument, Profile, useFollowMutation, useUnFollowMutation } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';

interface FollowsButtonProps {
  author: Profile;
  className: string;
}

export default function FollowsButton({ author, className }: FollowsButtonProps) {
  const { user } = useCurrentUser();
  const router = useRouter();
  const { handleErrors } = useErrorsHandler();
  const { following, username } = author;

  const [follow, { loading: followLoading }] = useFollowMutation({
    refetchQueries: [{ query: FeedDocument, variables: { offset: 0 } }], // reload the first page of user feeds
    optimisticResponse: { follow: { username, following: true, __typename: 'Profile' } },
    onError: (err) => handleErrors(err),
  });
  const [unFollow, { loading: unFollowLoading }] = useUnFollowMutation({
    refetchQueries: [{ query: FeedDocument, variables: { offset: 0 } }],
    optimisticResponse: { unFollow: { username, following: false, __typename: 'Profile' } },
    onError: (err) => handleErrors(err),
  });
  async function onFollowToggle() {
    if (!user) {
      router.push('/login');
      return;
    }
    following ? await unFollow({ variables: { username } }) : await follow({ variables: { username } });
  }

  return (
    <button className={className} onClick={onFollowToggle} disabled={followLoading || unFollowLoading}>
      {following ? (
        <>
          {' '}
          <i className='ion-minus-round'></i>
          &nbsp; {`Unfollow ${username}`}
        </>
      ) : (
        <>
          {' '}
          <i className='ion-plus-round'></i>
          &nbsp; {`Follow ${username}`}
        </>
      )}
    </button>
  );
}
