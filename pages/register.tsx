import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ContainerPage } from '../components/common/ContainerPage';
import { GenericForm } from '../components/common/GenericForm';
import { UserSignupInput, useSignupMutation } from '../generated/graphql';
import guestOnly from '../lib/auth/guest-only';
import { useErrorsHandler } from '../lib/hooks/use-errors-handler';
import { useToken } from '../lib/hooks/use-token';
import { buildGenericFormField } from '../lib/utils/genericFormField';

const Register: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { handleChangeToken } = useToken();
  const { errors, handleErrors } = useErrorsHandler();

  const [input, setInput] = useState<UserSignupInput>({ username: '', email: '', password: '' });
  const [signUp, { loading }] = useSignupMutation({
    onCompleted: async (data) => {
      if (data) {
        handleChangeToken(data.signup?.token as string);
        await client.resetStore();
        await router.back();
      }
    },
    onError: (err) => handleErrors(err),
  });

  function onSignUp() {
    return async (ev: React.FormEvent) => {
      ev.preventDefault();
      await signUp({ variables: { input } });
    };
  }

  function onUpdateField(name: string, value: string) {
    setInput({ ...input, [name as keyof UserSignupInput]: value });
  }

  return (
    <div className='auth-page'>
      <ContainerPage>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <h1 className='text-xs-center'>Sign up</h1>
          <p className='text-xs-center'>
            <Link href='/login'>Have an account?</Link>
          </p>

          <GenericForm
            disabled={loading}
            errors={errors}
            formObject={input as unknown as Record<string, string>}
            submitButtonText='Sign up'
            onChange={onUpdateField}
            onSubmit={onSignUp()}
            fields={[
              buildGenericFormField({ name: 'username', placeholder: 'Username' }),
              buildGenericFormField({ name: 'email', placeholder: 'Email' }),
              buildGenericFormField({ name: 'password', placeholder: 'Password', type: 'password' }),
            ]}
          />
        </div>
      </ContainerPage>
    </div>
  );
};

export default guestOnly(Register);
