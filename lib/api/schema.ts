import { UserInputError } from 'apollo-server-micro';
import { fieldAuthorizePlugin, makeSchema } from 'nexus';
import { validatePlugin } from 'nexus-validate';
import path from 'path';
import { ValidationError } from 'yup';
import ArticleMutation from './mutation/article.mutation';
import CommentMutation from './mutation/comment.mutation';
import ProfileMutation from './mutation/profile.mutation';
import UserMutation from './mutation/user.mutation';
import ArticleQuery from './query/article.query';
import CommentQuery from './query/comment.query';
import TagQuery from './query/tag.query';
import userQuery from './query/user.query';
import ArticleTypes from './types/article.type';
import BaseTypes from './types/base.type';
import CommentTypes from './types/comment.type';
import { DateTime } from './types/scalar.type';
import UserTypes from './types/user.type';

export const schema = makeSchema({
  types: [
    userQuery,
    UserMutation,
    ProfileMutation,
    ArticleQuery,
    ArticleMutation,
    CommentQuery,
    CommentMutation,
    TagQuery,
    DateTime,
    ...BaseTypes,
    ...UserTypes,
    ...ArticleTypes,
    ...CommentTypes,
  ],
  outputs: {
    schema: path.join(__dirname, '..', '..', 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, '..', '..', 'generated', 'nexus.ts'),
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
  contextType: {
    // module: require.resolve('./context'),
    module: path.join(process.cwd(), 'lib', 'api', 'context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
  plugins: [
    fieldAuthorizePlugin(),
    validatePlugin({
      formatError: ({ error }) => {
        if (error instanceof ValidationError) {
          // convert error to UserInputError from apollo-server
          return new UserInputError(error.message.replace('input.', ''), {
            invalidArgs: [error.path],
          });
        }

        return error;
      },
    }),
  ],
});
