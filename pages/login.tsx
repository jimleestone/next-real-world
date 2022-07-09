import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { ContainerPage } from '../components/common/ContainerPage';
import { GenericForm } from '../components/common/GenericForm';
import { useLoginMutation, UserLoginInput } from '../generated/graphql';
import { useAuth } from '../lib/hooks/use-auth';
import { buildGenericFormField } from '../lib/utils/genericFormField';

const Login: NextPage = () => {
  const [input, setInput] = useState<UserLoginInput>({ email: '', password: '' });
  function onUpdateField(name: string, value: string) {
    setInput({ ...input, [name as keyof UserLoginInput]: value });
  }
  const { loadUser } = useAuth();
  const [login, { loading }] = useLoginMutation();
  function onLogin() {
    return async (ev: React.FormEvent) => {
      ev.preventDefault();
      await login({ variables: { input } })
        .then(({ data }) => {
          if (data) {
            loadUser(data.login);
            Router.push('/');
          }
        })
        .catch((err) => console.log(err));
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

export default Login;
