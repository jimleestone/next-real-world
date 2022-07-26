import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import * as R from 'ramda';
import CustomButton from '../components/common/CustomButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Title from '../components/common/Title';
import Form from '../components/forms/form';
import FormTextarea from '../components/forms/form-teextarea';
import FormInput from '../components/forms/FormInput';
import Submit from '../components/forms/submit';
import { AuthUser, ProfileDocument, UserUpdateInput, useUpdateUserMutation } from '../generated/graphql';
import withAuth from '../lib/auth/with-auth';
import { useCurrentUser } from '../lib/hooks/use-current-user';
import { useErrorsHandler } from '../lib/hooks/use-errors-handler';
import { useToken } from '../lib/hooks/use-token';
import { updateUserInputSchemaAsync } from '../lib/validation/schema';

const Settings: NextPage = () => {
  const client = useApolloClient();
  const { user } = useCurrentUser();
  const { handleChangeToken } = useToken();
  const { errors, handleErrors } = useErrorsHandler();

  const [updateUser, { loading }] = useUpdateUserMutation({
    refetchQueries: [{ query: ProfileDocument, variables: { username: user?.username } }],
    onError: (err) => handleErrors(err),
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

  if (!user) return <LoadingSpinner />;
  const init = R.pickAll<AuthUser, UserUpdateInput>(['username', 'email', 'bio', 'image'], user);
  const checkSchema = updateUserInputSchemaAsync(client, init);
  return (
    <>
      <Title title='Settings' />
      <div className='mb-auto'>
        <div className='container flex flex-wrap flex-col items-center mx-auto space-y-4'>
          <h1 className='text-4xl font-extralight'>Your Settings</h1>
          <div className='w-6/12'>
            <Form<UserUpdateInput> onSubmit={onUpdateSettings} schema={checkSchema} mode='onBlur' defaultValues={init}>
              <fieldset className='flex flex-col justify-center mx-auto space-y-6' aria-live='polite'>
                <FormInput<UserUpdateInput> name='image' placeholder='URL of profile picture' watch />
                <FormInput<UserUpdateInput> name='username' placeholder='Your name' />
                <FormTextarea<UserUpdateInput> name='bio' placeholder='Short bio about you' rows={8} />
                <FormInput<UserUpdateInput> name='email' placeholder='Email' />
                <FormInput<UserUpdateInput> name='password' placeholder='Password' type='password' watch />

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
      </div>
    </>
  );
};

export default withAuth(Settings);
