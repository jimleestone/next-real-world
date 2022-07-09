import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ContainerPage } from '../components/common/ContainerPage';
import { GenericForm } from '../components/common/GenericForm';
import { UserUpdateInput, useUpdateUserMutation } from '../generated/graphql';
import { useAuth } from '../lib/hooks/use-auth';
import { buildGenericFormField } from '../lib/utils/genericFormField';

const Settings: NextPage = () => {
  const router = useRouter();
  const { user, loadUser, logout } = useAuth();
  // useEffect(() => {
  //   console.log(user);
  //   if (!user) router.push('/login');
  // }, []);
  const [input, setInput] = useState<UserUpdateInput>({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio,
    image: user?.image,
  });

  function onUpdateField(name: string, value: string) {
    setInput({ ...input, [name as keyof UserUpdateInput]: value });
  }

  const [updateUser, { loading }] = useUpdateUserMutation();
  function onUpdateSettings() {
    return (ev: React.FormEvent) => {
      ev.preventDefault();
      updateUser({ variables: { input } })
        .then(({ data }) => {
          if (data) {
            loadUser(data.updateUser);
            setInput({ ...input, ...data.updateUser });
          }
        })
        .catch((err) => console.log(err));
    };
  }

  function onLogout() {
    return (ev: React.FormEvent) => {
      ev.preventDefault();
      logout();
    };
  }

  return (
    <div className='settings-page'>
      <ContainerPage>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <h1 className='text-xs-center'>Your Settings</h1>

          <GenericForm
            disabled={loading}
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
            Or click here to logout.
          </button>
        </div>
      </ContainerPage>
    </div>
  );
};

export default Settings;
