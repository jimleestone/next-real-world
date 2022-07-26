import { ApolloClient } from '@apollo/client';
import { AnySchema, array, object, string } from 'yup';
import {
  ArticleInput,
  CheckEmailDocument,
  CheckEmailQuery,
  CheckUsernameDocument,
  CheckUsernameQuery,
  CommentInput,
  UserLoginInput,
  UserSignupInput,
  UserUpdateInput,
} from '../../generated/graphql';

const username = string().trim().required('Username is required').max(100, 'Username is too long');
const email = string().trim().required('Email is required').email('Invalid email').max(100, 'Email is too long');
const password = string().trim().max(100, 'Password is too long');
const passwordRequired = password.required('Password is required');

export const loginInputSchema = object<Record<keyof UserLoginInput, AnySchema>>({
  email,
  password: passwordRequired,
});

export const signupInputSchema = object<Record<keyof UserSignupInput, AnySchema>>({
  username,
  email,
  password: passwordRequired,
});

export const updateUserInputSchema = object<Record<keyof UserUpdateInput, AnySchema>>({
  username,
  email,
  password,
  bio: string().max(300, 'Bio is too long').nullable(),
  image: string().url('Invalid URL').max(1024, 'Image URL is too long').nullable(),
});

export const updateUserInputSchemaAsync = (client: ApolloClient<object>, origin?: UserUpdateInput) => {
  return object<Record<keyof UserUpdateInput, AnySchema>>({
    username: username.test('check-username', 'Username had been taken', async (value) => {
      if (origin?.username === value) return true;
      const { data } = await client.query<CheckUsernameQuery>({
        query: CheckUsernameDocument,
        variables: { username: value },
        errorPolicy: 'ignore',
      });
      return data.checkUsername === null;
    }),
    email: email.test('check-email', 'Email had been taken', async (value) => {
      if (origin?.email === value) return true;
      const { data } = await client.query<CheckEmailQuery>({
        query: CheckEmailDocument,
        variables: { email: value },
        errorPolicy: 'ignore',
      });
      return data.checkEmail === null;
    }),
    password,
    bio: string().trim().max(300, 'Bio is too long').nullable(),
    image: string().url('Invalid URL').max(1024, 'Image URL is too long').nullable(),
  });
};

export const articleInputSchema = object<Record<keyof ArticleInput, AnySchema>>({
  title: string().trim().required('Title is required').max(100, 'Title is too long'),
  description: string().trim().required('Description is required').max(255, 'Description is too long'),
  body: string().trim().required('Article content is required').max(65535, 'Article content is too long'),
  tagList: array(string().trim().required('Tag is required').max(100, 'Tag is too long')).min(
    1,
    'Add at least one tag'
  ),
});

export const commentInputSchema = object<Record<keyof CommentInput, AnySchema>>({
  body: string().trim().required('Comment content is required').max(65535, 'Comment content is too long'),
});
