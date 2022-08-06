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

export type Article = Node & {
  __typename?: 'Article';
  author: Profile;
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  favorited: Scalars['Boolean'];
  favoritesCount: Scalars['Int'];
  id: Scalars['Int'];
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

export type AuthUser = BaseUser & Node & {
  __typename?: 'AuthUser';
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type BaseUser = {
  bio?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Comment = Node & {
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
  favorite: Article;
  follow: Profile;
  login: AuthUser;
  signup?: Maybe<AuthUser>;
  unFollow: Profile;
  unfavorite: Article;
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

export type Node = {
  id: Scalars['Int'];
};

export type Profile = BaseUser & {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  following: Scalars['Boolean'];
  image?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles: Array<Article>;
  articlesCount: Scalars['Int'];
  checkEmail?: Maybe<Scalars['String']>;
  checkUsername?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  currentUser: AuthUser;
  feed: Array<Article>;
  feedCount: Scalars['Int'];
  profile?: Maybe<Profile>;
  tags: Array<Scalars['String']>;
};


export type QueryArticleArgs = {
  slug: Scalars['String'];
};


export type QueryArticlesArgs = {
  author?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['Int']>;
  favorited?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  tag?: InputMaybe<Scalars['String']>;
};


export type QueryArticlesCountArgs = {
  author?: InputMaybe<Scalars['String']>;
  favorited?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
};


export type QueryCheckEmailArgs = {
  email: Scalars['String'];
};


export type QueryCheckUsernameArgs = {
  username: Scalars['String'];
};


export type QueryCommentsArgs = {
  articleId: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryFeedArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
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

export type ArticlesQueryVariables = Exact<{
  author?: InputMaybe<Scalars['String']>;
  favorited?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  tag?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: number, slug: string, description: string, title: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null } }> };

export type ArticlesCountQueryVariables = Exact<{
  author?: InputMaybe<Scalars['String']>;
  favorited?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
}>;


export type ArticlesCountQuery = { __typename?: 'Query', articlesCount: number };

export type FeedQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Article', id: number, slug: string, description: string, title: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null } }> };

export type FeedCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedCountQuery = { __typename?: 'Query', feedCount: number };

export type FavoriteMutationVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FavoriteMutation = { __typename?: 'Mutation', favorite: { __typename?: 'Article', id: number, favorited: boolean, favoritesCount: number } };

export type UnfavoriteMutationVariables = Exact<{
  slug: Scalars['String'];
}>;


export type UnfavoriteMutation = { __typename?: 'Mutation', unfavorite: { __typename?: 'Article', id: number, favorited: boolean, favoritesCount: number } };

export type FavoritesFragment = { __typename?: 'Article', id: number, favorited: boolean, favoritesCount: number };

export type ArticlePreviewFragment = { __typename?: 'Article', id: number, slug: string, description: string, title: string, createdAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null } };

export type ArticleQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: number, slug: string, title: string, description: string, body: string, createdAt: any, updatedAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null, following: boolean } } | null };

export type ArticleMetaQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ArticleMetaQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: number, slug: string, favorited: boolean, favoritesCount: number, author: { __typename?: 'Profile', username: string, following: boolean } } | null };

export type CommentsQueryVariables = Exact<{
  articleId: Scalars['Int'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: number, body: string, createdAt: any, author: { __typename?: 'Profile', username: string, image?: string | null } }> };

export type CreateCommentMutationVariables = Exact<{
  slug: Scalars['String'];
  input: CommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, body: string, createdAt: any, author: { __typename?: 'Profile', username: string, image?: string | null } } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'Comment', id: number } };

export type DeleteArticleMutationVariables = Exact<{
  slug: Scalars['String'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename?: 'Article', id: number } };

export type ArticleViewFragment = { __typename?: 'Article', id: number, slug: string, title: string, description: string, body: string, createdAt: any, updatedAt: any, favorited: boolean, favoritesCount: number, tagList: Array<string>, author: { __typename?: 'Profile', username: string, image?: string | null, following: boolean } };

export type ArticleMetaViewFragment = { __typename?: 'Article', id: number, slug: string, favorited: boolean, favoritesCount: number, author: { __typename?: 'Profile', username: string, following: boolean } };

export type CommentViewFragment = { __typename?: 'Comment', id: number, body: string, createdAt: any, author: { __typename?: 'Profile', username: string, image?: string | null } };

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null, token?: string | null } };

export type SignupMutationVariables = Exact<{
  input: UserSignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null, token?: string | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null } };

export type CheckUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type CheckUsernameQuery = { __typename?: 'Query', checkUsername?: string | null };

export type CheckEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type CheckEmailQuery = { __typename?: 'Query', checkEmail?: string | null };

export type CreateArticleMutationVariables = Exact<{
  input: ArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id: number, slug: string } };

export type UpdateArticleMutationVariables = Exact<{
  slug: Scalars['String'];
  input: ArticleInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', id: number, slug: string, title: string, body: string, description: string, tagList: Array<string> } };

export type EditArticleQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type EditArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: number, slug: string, title: string, body: string, description: string, tagList: Array<string>, author: { __typename?: 'Profile', username: string } } | null };

export type EditArticleViewFragment = { __typename?: 'Article', id: number, slug: string, title: string, body: string, description: string, tagList: Array<string>, author: { __typename?: 'Profile', username: string } };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<string> };

export type ProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', username: string, bio?: string | null, image?: string | null, following: boolean } | null };

export type FollowMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'Profile', username: string, following: boolean } };

export type UnFollowMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UnFollowMutation = { __typename?: 'Mutation', unFollow: { __typename?: 'Profile', username: string, following: boolean } };

export type FollowsFragment = { __typename?: 'Profile', username: string, following: boolean };

export type UpdateUserMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'AuthUser', id: number, username: string, email: string, bio?: string | null, image?: string | null } };

export const FavoritesFragmentDoc = gql`
    fragment Favorites on Article {
  id
  favorited
  favoritesCount
}
    `;
export const ArticlePreviewFragmentDoc = gql`
    fragment ArticlePreview on Article {
  id
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
export const ArticleViewFragmentDoc = gql`
    fragment ArticleView on Article {
  id
  slug
  title
  description
  body
  createdAt
  updatedAt
  favorited
  favoritesCount
  author {
    username
    image
    following
  }
  tagList
}
    `;
export const ArticleMetaViewFragmentDoc = gql`
    fragment ArticleMetaView on Article {
  id
  slug
  favorited
  favoritesCount
  author {
    username
    following
  }
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
export const EditArticleViewFragmentDoc = gql`
    fragment EditArticleView on Article {
  id
  slug
  title
  body
  description
  tagList
  author {
    username
  }
}
    `;
export const FollowsFragmentDoc = gql`
    fragment Follows on Profile {
  username
  following
}
    `;
export const ArticlesDocument = gql`
    query Articles($author: String, $favorited: String, $offset: Int, $limit: Int, $tag: String, $cursor: Int) {
  articles(
    author: $author
    favorited: $favorited
    offset: $offset
    limit: $limit
    tag: $tag
    cursor: $cursor
  ) {
    ...ArticlePreview
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
 *      author: // value for 'author'
 *      favorited: // value for 'favorited'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      tag: // value for 'tag'
 *      cursor: // value for 'cursor'
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
export const ArticlesCountDocument = gql`
    query ArticlesCount($author: String, $favorited: String, $tag: String) {
  articlesCount(author: $author, favorited: $favorited, tag: $tag)
}
    `;

/**
 * __useArticlesCountQuery__
 *
 * To run a query within a React component, call `useArticlesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesCountQuery({
 *   variables: {
 *      author: // value for 'author'
 *      favorited: // value for 'favorited'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useArticlesCountQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesCountQuery, ArticlesCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesCountQuery, ArticlesCountQueryVariables>(ArticlesCountDocument, options);
      }
export function useArticlesCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesCountQuery, ArticlesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesCountQuery, ArticlesCountQueryVariables>(ArticlesCountDocument, options);
        }
export type ArticlesCountQueryHookResult = ReturnType<typeof useArticlesCountQuery>;
export type ArticlesCountLazyQueryHookResult = ReturnType<typeof useArticlesCountLazyQuery>;
export type ArticlesCountQueryResult = Apollo.QueryResult<ArticlesCountQuery, ArticlesCountQueryVariables>;
export const FeedDocument = gql`
    query Feed($offset: Int, $limit: Int, $cursor: Int) {
  feed(offset: $offset, limit: $limit, cursor: $cursor) {
    ...ArticlePreview
  }
}
    ${ArticlePreviewFragmentDoc}`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const FeedCountDocument = gql`
    query FeedCount {
  feedCount
}
    `;

/**
 * __useFeedCountQuery__
 *
 * To run a query within a React component, call `useFeedCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeedCountQuery(baseOptions?: Apollo.QueryHookOptions<FeedCountQuery, FeedCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedCountQuery, FeedCountQueryVariables>(FeedCountDocument, options);
      }
export function useFeedCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedCountQuery, FeedCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedCountQuery, FeedCountQueryVariables>(FeedCountDocument, options);
        }
export type FeedCountQueryHookResult = ReturnType<typeof useFeedCountQuery>;
export type FeedCountLazyQueryHookResult = ReturnType<typeof useFeedCountLazyQuery>;
export type FeedCountQueryResult = Apollo.QueryResult<FeedCountQuery, FeedCountQueryVariables>;
export const FavoriteDocument = gql`
    mutation Favorite($slug: String!) {
  favorite(slug: $slug) {
    ...Favorites
  }
}
    ${FavoritesFragmentDoc}`;
export type FavoriteMutationFn = Apollo.MutationFunction<FavoriteMutation, FavoriteMutationVariables>;

/**
 * __useFavoriteMutation__
 *
 * To run a mutation, you first call `useFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoriteMutation, { data, loading, error }] = useFavoriteMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<FavoriteMutation, FavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavoriteMutation, FavoriteMutationVariables>(FavoriteDocument, options);
      }
export type FavoriteMutationHookResult = ReturnType<typeof useFavoriteMutation>;
export type FavoriteMutationResult = Apollo.MutationResult<FavoriteMutation>;
export type FavoriteMutationOptions = Apollo.BaseMutationOptions<FavoriteMutation, FavoriteMutationVariables>;
export const UnfavoriteDocument = gql`
    mutation Unfavorite($slug: String!) {
  unfavorite(slug: $slug) {
    ...Favorites
  }
}
    ${FavoritesFragmentDoc}`;
export type UnfavoriteMutationFn = Apollo.MutationFunction<UnfavoriteMutation, UnfavoriteMutationVariables>;

/**
 * __useUnfavoriteMutation__
 *
 * To run a mutation, you first call `useUnfavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfavoriteMutation, { data, loading, error }] = useUnfavoriteMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useUnfavoriteMutation(baseOptions?: Apollo.MutationHookOptions<UnfavoriteMutation, UnfavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfavoriteMutation, UnfavoriteMutationVariables>(UnfavoriteDocument, options);
      }
export type UnfavoriteMutationHookResult = ReturnType<typeof useUnfavoriteMutation>;
export type UnfavoriteMutationResult = Apollo.MutationResult<UnfavoriteMutation>;
export type UnfavoriteMutationOptions = Apollo.BaseMutationOptions<UnfavoriteMutation, UnfavoriteMutationVariables>;
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
export const ArticleMetaDocument = gql`
    query ArticleMeta($slug: String!) {
  article(slug: $slug) {
    ...ArticleMetaView
  }
}
    ${ArticleMetaViewFragmentDoc}`;

/**
 * __useArticleMetaQuery__
 *
 * To run a query within a React component, call `useArticleMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleMetaQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useArticleMetaQuery(baseOptions: Apollo.QueryHookOptions<ArticleMetaQuery, ArticleMetaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleMetaQuery, ArticleMetaQueryVariables>(ArticleMetaDocument, options);
      }
export function useArticleMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleMetaQuery, ArticleMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleMetaQuery, ArticleMetaQueryVariables>(ArticleMetaDocument, options);
        }
export type ArticleMetaQueryHookResult = ReturnType<typeof useArticleMetaQuery>;
export type ArticleMetaLazyQueryHookResult = ReturnType<typeof useArticleMetaLazyQuery>;
export type ArticleMetaQueryResult = Apollo.QueryResult<ArticleMetaQuery, ArticleMetaQueryVariables>;
export const CommentsDocument = gql`
    query Comments($articleId: Int!, $limit: Int, $offset: Int, $cursor: Int) {
  comments(articleId: $articleId, limit: $limit, offset: $offset, cursor: $cursor) {
    ...CommentView
  }
}
    ${CommentViewFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($slug: String!, $input: CommentInput!) {
  createComment(slug: $slug, input: $input) {
    ...CommentView
  }
}
    ${CommentViewFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: Int!) {
  deleteComment(id: $deleteCommentId) {
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentId: // value for 'deleteCommentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($slug: String!) {
  deleteArticle(slug: $slug) {
    id
  }
}
    `;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, options);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: UserLoginInput!) {
  login(input: $input) {
    id
    username
    email
    bio
    image
    token
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
export const SignupDocument = gql`
    mutation Signup($input: UserSignupInput!) {
  signup(input: $input) {
    id
    username
    email
    bio
    image
    token
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
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
export const CheckUsernameDocument = gql`
    query CheckUsername($username: String!) {
  checkUsername(username: $username)
}
    `;

/**
 * __useCheckUsernameQuery__
 *
 * To run a query within a React component, call `useCheckUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckUsernameQuery(baseOptions: Apollo.QueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
      }
export function useCheckUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
        }
export type CheckUsernameQueryHookResult = ReturnType<typeof useCheckUsernameQuery>;
export type CheckUsernameLazyQueryHookResult = ReturnType<typeof useCheckUsernameLazyQuery>;
export type CheckUsernameQueryResult = Apollo.QueryResult<CheckUsernameQuery, CheckUsernameQueryVariables>;
export const CheckEmailDocument = gql`
    query CheckEmail($email: String!) {
  checkEmail(email: $email)
}
    `;

/**
 * __useCheckEmailQuery__
 *
 * To run a query within a React component, call `useCheckEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCheckEmailQuery(baseOptions: Apollo.QueryHookOptions<CheckEmailQuery, CheckEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckEmailQuery, CheckEmailQueryVariables>(CheckEmailDocument, options);
      }
export function useCheckEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckEmailQuery, CheckEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckEmailQuery, CheckEmailQueryVariables>(CheckEmailDocument, options);
        }
export type CheckEmailQueryHookResult = ReturnType<typeof useCheckEmailQuery>;
export type CheckEmailLazyQueryHookResult = ReturnType<typeof useCheckEmailLazyQuery>;
export type CheckEmailQueryResult = Apollo.QueryResult<CheckEmailQuery, CheckEmailQueryVariables>;
export const CreateArticleDocument = gql`
    mutation CreateArticle($input: ArticleInput!) {
  createArticle(input: $input) {
    id
    slug
  }
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($slug: String!, $input: ArticleInput!) {
  updateArticle(slug: $slug, input: $input) {
    id
    slug
    title
    body
    description
    tagList
  }
}
    `;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const EditArticleDocument = gql`
    query EditArticle($slug: String!) {
  article(slug: $slug) {
    ...EditArticleView
  }
}
    ${EditArticleViewFragmentDoc}`;

/**
 * __useEditArticleQuery__
 *
 * To run a query within a React component, call `useEditArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditArticleQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useEditArticleQuery(baseOptions: Apollo.QueryHookOptions<EditArticleQuery, EditArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditArticleQuery, EditArticleQueryVariables>(EditArticleDocument, options);
      }
export function useEditArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditArticleQuery, EditArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditArticleQuery, EditArticleQueryVariables>(EditArticleDocument, options);
        }
export type EditArticleQueryHookResult = ReturnType<typeof useEditArticleQuery>;
export type EditArticleLazyQueryHookResult = ReturnType<typeof useEditArticleLazyQuery>;
export type EditArticleQueryResult = Apollo.QueryResult<EditArticleQuery, EditArticleQueryVariables>;
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
export const ProfileDocument = gql`
    query Profile($username: String!) {
  profile(username: $username) {
    username
    bio
    image
    following
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const FollowDocument = gql`
    mutation Follow($username: String!) {
  follow(username: $username) {
    ...Follows
  }
}
    ${FollowsFragmentDoc}`;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const UnFollowDocument = gql`
    mutation UnFollow($username: String!) {
  unFollow(username: $username) {
    ...Follows
  }
}
    ${FollowsFragmentDoc}`;
export type UnFollowMutationFn = Apollo.MutationFunction<UnFollowMutation, UnFollowMutationVariables>;

/**
 * __useUnFollowMutation__
 *
 * To run a mutation, you first call `useUnFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowMutation, { data, loading, error }] = useUnFollowMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUnFollowMutation(baseOptions?: Apollo.MutationHookOptions<UnFollowMutation, UnFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFollowMutation, UnFollowMutationVariables>(UnFollowDocument, options);
      }
export type UnFollowMutationHookResult = ReturnType<typeof useUnFollowMutation>;
export type UnFollowMutationResult = Apollo.MutationResult<UnFollowMutation>;
export type UnFollowMutationOptions = Apollo.BaseMutationOptions<UnFollowMutation, UnFollowMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UserUpdateInput!) {
  updateUser(input: $input) {
    id
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