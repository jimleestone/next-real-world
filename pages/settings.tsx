import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import CustomButton from '../components/common/CustomButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Wrapper from '../components/common/wrapper';
import Form from '../components/forms/form';
import FormTextarea from '../components/forms/form-teextarea';
import FormInput from '../components/forms/FormInput';
import Submit from '../components/forms/submit';
import { ProfileDocument, UserUpdateInput, useUpdateUserMutation } from '../generated/graphql';
import withAuth from '../lib/auth/with-auth';
import { useCurrentUser } from '../lib/hooks/use-current-user';
import { useMessageHandler } from '../lib/hooks/use-message';
import { useToken } from '../lib/hooks/use-token';
import { useCheckUser } from '../lib/hooks/use-validation';

const Settings: NextPage = () => {
  const client = useApolloClient();
  const { user } = useCurrentUser();
  const { handleChangeToken } = useToken();
  const { success, handleErrors } = useMessageHandler();

  const [updateUser, { loading }] = useUpdateUserMutation({
    refetchQueries: [{ query: ProfileDocument, variables: { username: user?.username } }],
    onError: (err) => handleErrors({ err, mode: 'alert' }),
    onCompleted: () => success({ content: 'user updated!', mode: 'alert' }),
  });

  async function onUpdateSettings(input: UserUpdateInput) {
    await updateUser({ variables: { input } });
  }

  function onLogout() {
    return async () => {
      handleChangeToken('');
      await client.resetStore();
    };
  }

  const checkSchema = useCheckUser(user);
  if (!user) return <LoadingSpinner />;
  const { username, email, bio, image } = user;
  const init: UserUpdateInput = {
    username: user.username,
    email: user.email,
    bio: user.bio ?? '',
    image: user.image ?? '',
    password: '',
  };
  return (
    <Wrapper title='Settings'>
      <div className='container flex flex-wrap flex-col items-center mx-auto pt-12'>
        <h1 className='text-4xl font-extralight'>Your Settings</h1>
        <div className='w-6/12'>
          <Form<UserUpdateInput>
            onSubmit={onUpdateSettings}
            schema={checkSchema}
            mode='onBlur'
            reValidateMode='onBlur'
            defaultValues={init}
          >
            <fieldset className='flex flex-col justify-center mx-auto' aria-live='polite'>
              <FormInput<UserUpdateInput>
                name='image'
                placeholder='URL of profile picture(currently support i.imgur.com)'
                watch
              />
              <FormInput<UserUpdateInput> name='username' placeholder='Your name' />
              <FormTextarea<UserUpdateInput> name='bio' placeholder='Short bio about you' rows={8} />
              <FormInput<UserUpdateInput> name='email' placeholder='Email' />
              <FormInput<UserUpdateInput> name='password' placeholder='Password' type='password' clear />

              <Submit size='l' className='self-end' strict>
                Update Settings
              </Submit>
            </fieldset>
          </Form>

          <hr className='my-4' />

          <CustomButton color='danger' outlined className='self-start' onClick={onLogout()}>
            Or click here to logout.()
          </CustomButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default withAuth(Settings);
