import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ContainerPage } from '../components/common/ContainerPage';
import { GenericForm } from '../components/common/GenericForm';
import { ProfileDocument, UserUpdateInput, useUpdateUserMutation } from '../generated/graphql';
import { useCurrentUser } from '../lib/hooks/use-current-user';
import { useErrorsHandler } from '../lib/hooks/use-errors-handler';
import { useToken } from '../lib/hooks/use-token';
import { buildGenericFormField } from '../lib/utils/genericFormField';

const Settings: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { user } = useCurrentUser();
  const { handleChangeToken } = useToken();
  const [input, setInput] = useState<UserUpdateInput>({ username: '', email: '', bio: '', image: '' });
  const { errors, handleErrors } = useErrorsHandler();

  useEffect(() => {
    if (user) {
      const { username, email, bio, image } = user;
      setInput({ username, email, bio, image });
    }
  }, [user]);

  const originUsername = user?.username;
  const [updateUser, { loading }] = useUpdateUserMutation({
    refetchQueries: [{ query: ProfileDocument, variables: { username: input.username } }],
    onError: (err) => handleErrors(err),
  });

  function onUpdateField(name: string, value: string) {
    setInput({ ...input, [name as keyof UserUpdateInput]: value });
  }

  function onUpdateSettings() {
    return async (ev: React.FormEvent) => {
      ev.preventDefault();
      await updateUser({ variables: { input } });
    };
  }
  function onLogout() {
    return async () => {
      handleChangeToken('');
      await client.resetStore();
      await router.replace('/');
    };
  }

  return (
    <div className='settings-page'>
      <ContainerPage>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <h1 className='text-xs-center'>Your Settings</h1>

          <GenericForm
            disabled={loading}
            errors={errors}
            formObject={{ ...input }}
            submitButtonText='Update Settings'
            onChange={onUpdateField}
            onSubmit={onUpdateSettings()}
            fields={[
              buildGenericFormField({ name: 'image', placeholder: 'URL of profile picture' }),
              buildGenericFormField({ name: 'username', placeholder: 'Your Name' }),
              buildGenericFormField({
                name: 'bio',
                placeholder: 'Short bio about you',
                rows: 8,
                fieldType: 'textarea',
              }),
              buildGenericFormField({ name: 'email', placeholder: 'Email' }),
              buildGenericFormField({ name: 'password', placeholder: 'Password', type: 'password' }),
            ]}
          />

          <hr />
          <button className='btn btn-outline-danger' onClick={onLogout()}>
            Or click here to logout.()
          </button>
        </div>
      </ContainerPage>
    </div>
  );
};

export function getStaticProps() {
  return { props: { protected: true } };
}

export default Settings;
