import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ContainerPage } from '../components/common/ContainerPage';
import { GenericForm } from '../components/common/GenericForm';
import { useLoginMutation, UserLoginInput } from '../generated/graphql';
import guestOnly from '../lib/auth/guest-only';
import { useErrorsHandler } from '../lib/hooks/use-errors-handler';
import { useToken } from '../lib/hooks/use-token';
import { buildGenericFormField } from '../lib/utils/genericFormField';

const Login: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { handleChangeToken } = useToken();
  const { errors, handleErrors } = useErrorsHandler();

  const [input, setInput] = useState<UserLoginInput>({ email: '', password: '' });
  const [login, { loading }] = useLoginMutation({
    onCompleted: async (data) => {
      if (data) {
        handleChangeToken(data.login.token as string);
        await client.resetStore();
        await router.back();
      }
    },
    onError: (err) => handleErrors(err),
  });

  function onUpdateField(name: string, value: string) {
    setInput({ ...input, [name as keyof UserLoginInput]: value });
  }

  function onLogin() {
    return async (ev: React.FormEvent) => {
      ev.preventDefault();
      await login({ variables: { input } });
    };
  }

  return (
    <div className='auth-page'>
      <ContainerPage>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <h1 className='text-xs-center'>Sign in</h1>
          <p className='text-xs-center'>
            <Link href='/register'>Need an account?</Link>
          </p>

          <GenericForm
            disabled={loading}
            errors={errors}
            formObject={input as unknown as Record<string, string>}
            submitButtonText='Sign in'
            onChange={onUpdateField}
            onSubmit={onLogin()}
            fields={[
              buildGenericFormField({ name: 'email', placeholder: 'Email' }),
              buildGenericFormField({ name: 'password', placeholder: 'Password', type: 'password' }),
            ]}
          />
        </div>
      </ContainerPage>
    </div>
  );
};

export default guestOnly(Login);
