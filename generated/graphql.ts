import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Article = {
  __typename?: 'Article';
  author: Profile;
  body: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  favorited: Scalars['Boolean'];
  favoritesCount: Scalars['Int'];
  slug: Scalars['String'];
  tagList: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ArticleInput = {
  body: Scalars['String'];
  description: Scalars['String'];
  tagList: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type Articles = {
  __typename?: 'Articles';
  articles: Array<Article>;
  articlesCount: Scalars['Int'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: Profile;
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type CommentInput = {
  body: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Article;
  createComment: Comment;
  deleteArticle: Article;
  deleteComment: Comment;
  favorite?: Maybe<Article>;
  follow: Profile;
  login: AuthUser;
  signup?: Maybe<AuthUser>;
  unFollow?: Maybe<Profile>;
  unfavorite?: Maybe<Article>;
  updateArticle: Article;
  updateUser: AuthUser;
};


export type MutationCreateArticleArgs = {
  input: ArticleInput;
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
  slug: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  slug: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationFavoriteArgs = {
  slug: Scalars['String'];
};


export type MutationFollowArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationSignupArgs = {
  input: UserSignupInput;
};


export type MutationUnFollowArgs = {
  username: Scalars['String'];
};


export type MutationUnfavoriteArgs = {
  slug: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  input: ArticleInput;
  slug: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  following: Scalars['Boolean'];
  image?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles: Articles;
  comments: Array<Comment>;
  currentUser: AuthUser;
  feed: Articles;
  profile?: Maybe<Profile>;
  tags: Array<Scalars['String']>;
};


export type QueryArticleArgs = {
  slug: Scalars['String'];
};


export type QueryArticlesArgs = {
  author?: InputMaybe<Scalars['String']>;
  favorited?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  tag?: InputMaybe<Scalars['String']>;
};


export type QueryCommentsArgs = {
  slug: Scalars['String'];
};


export type QueryFeedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryProfileArgs = {
  username: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserSignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserUpdateInput = {
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type ArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesQuery = { __typename?: 'Query', articles: { __typename?: 'Articles', articlesCount: number, articles: Array<{ __typename?: 'Article', slug: string, description: string, title: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null } }> } };

export type ArticlePreviewFragment = { __typename?: 'Article', slug: string, description: string, title: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null } };

export type ArticleQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', slug: string, title: string, body: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null, following: boolean }, comments: Array<{ __typename?: 'Comment', id: number, body: string, createdAt: any, author: { __typename?: 'Profile', username: string, image?: string | null } }> } | null };

export type ArticleViewFragment = { __typename?: 'Article', slug: string, title: string, body: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null, following: boolean }, comments: Array<{ __typename?: 'Comment', id: number, body: string, createdAt: any, author: { __typename?: 'Profile', username: string, image?: string | null } }> };

export type CommentViewFragment = { __typename?: 'Comment', id: number, body: string, createdAt: any, author: { __typename?: 'Profile', username: string, image?: string | null } };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<string> };

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthUser', username: string, token?: string | null, email: string, bio?: string | null, image?: string | null } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'AuthUser', username: string, email: string, bio?: string | null, image?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'AuthUser', username: string, email: string, bio?: string | null, image?: string | null } };

export const ArticlePreviewFragmentDoc = gql`
    fragment ArticlePreview on Article {
  slug
  description
  title
  createdAt
  author {
    username
    image
  }
  favorited
  favoritesCount
  tagList
}
    `;
export const CommentViewFragmentDoc = gql`
    fragment CommentView on Comment {
  id
  body
  createdAt
  author {
    username
    image
  }
}
    `;
export const ArticleViewFragmentDoc = gql`
    fragment ArticleView on Article {
  slug
  title
  body
  createdAt
  favorited
  favoritesCount
  author {
    username
    image
    following
  }
  comments {
    ...CommentView
  }
  tagList
}
    ${CommentViewFragmentDoc}`;
export const ArticlesDocument = gql`
    query Articles {
  articles {
    articles {
      ...ArticlePreview
    }
    articlesCount
  }
}
    ${ArticlePreviewFragmentDoc}`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleDocument = gql`
    query Article($slug: String!) {
  article(slug: $slug) {
    ...ArticleView
  }
}
    ${ArticleViewFragmentDoc}`;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
      }
export function useArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const TagsDocument = gql`
    query Tags {
  tags
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: UserLoginInput!) {
  login(input: $input) {
    username
    token
    email
    bio
    image
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    username
    email
    bio
    image
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UserUpdateInput!) {
  updateUser(input: $input) {
    username
    email
    bio
    image
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;