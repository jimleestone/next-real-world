import { AnySchema, object, string } from 'yup';
import { AuthUser, useCheckEmailLazyQuery, useCheckUsernameLazyQuery, UserUpdateInput } from '../../generated/graphql';
import { email, password, username } from '../validation/schema';
import { useMessageHandler } from './use-message';

export function useCheckUser(origin?: AuthUser) {
  const { handleErrors } = useMessageHandler();
  const [checkUsername] = useCheckUsernameLazyQuery({
    onError: (err) => handleErrors({ err, mode: 'alert' }),
  });
  const [checkEmail] = useCheckEmailLazyQuery({
    onError: (err) => handleErrors({ err, mode: 'alert' }),
  });

  return object<Record<keyof UserUpdateInput, AnySchema>>({
    username: username.test('check-username', 'Username had been taken', async (value) => {
      if (!value || origin?.username === value) return true;
      const { data } = await checkUsername({ variables: { username: value } });
      return data?.checkUsername === null;
    }),
    email: email.test('check-email', 'Email had been taken', async (value) => {
      if (!value || origin?.email === value) return true;
      const { data } = await checkEmail({
        variables: { email: value },
      });
      return data?.checkEmail === null;
    }),
    password,
    bio: string().trim().max(300, 'Bio is too long').nullable(),
    image: string().url('Invalid URL').max(1024, 'Image URL is too long').nullable(),
  });
}
