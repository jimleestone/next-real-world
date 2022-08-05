import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import CustomLink from '../components/common/CustomLink';
import Wrapper from '../components/common/wrapper';
import Form from '../components/forms/form';
import FormInput from '../components/forms/FormInput';
import Submit from '../components/forms/submit';
import { UserSignupInput, useSignupMutation } from '../generated/graphql';
import guestOnly from '../lib/auth/guest-only';
import { useMessageHandler } from '../lib/hooks/use-message';
import { useToken } from '../lib/hooks/use-token';
import { signupInputSchema } from '../lib/validation/schema';

const Register: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { handleChangeToken } = useToken();
  const { handleErrors } = useMessageHandler();

  const [signUp, { loading }] = useSignupMutation({
    onCompleted: async (data) => {
      if (data) {
        handleChangeToken(data.signup?.token as string);
        await client.resetStore();
        router.back();
      }
    },
    onError: (err) => handleErrors({ err, mode: 'alert' }),
  });

  async function onSignUp(input: UserSignupInput) {
    await signUp({ variables: { input } });
  }
  const init: UserSignupInput = { email: '', password: '', username: '' };
  return (
    <Wrapper title='Sign up'>
      <div className='container flex flex-wrap flex-col items-center mx-auto pt-12'>
        <h1 className='text-4xl font-extralight'>Sign up</h1>
        <p className='mt-4'>
          <CustomLink href='/login' mode='primary' underlined>
            Have an account?
          </CustomLink>
        </p>
        <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12'>
          <Form<UserSignupInput> onSubmit={onSignUp} schema={signupInputSchema} defaultValues={init}>
            <fieldset className='flex flex-col justify-center mx-auto' aria-live='polite'>
              <FormInput<UserSignupInput> name='username' placeholder='Username' />
              <FormInput<UserSignupInput> name='email' placeholder='Email' />
              <FormInput<UserSignupInput> name='password' placeholder='Password' type='password' />

              <Submit size='l' className='self-end'>
                Sign up
              </Submit>
            </fieldset>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default guestOnly(Register);
