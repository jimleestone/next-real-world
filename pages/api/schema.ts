import { fieldAuthorizePlugin, makeSchema } from 'nexus';
import { validatePlugin } from 'nexus-validate';
import path from 'path';
import ArticleMutation from './mutation/article.mutation';
import CommentMutation from './mutation/comment.mutation';
import ProfileMutation from './mutation/profile.mutation';
import UserMutation from './mutation/user.mutation';
import ArticleQuery from './query/article.query';
import CommentQuery from './query/comment.query';
import TagQuery from './query/tag.query';
import userQuery from './query/user.query';
import articleType from './types/article.type';
import commentType from './types/comment.type';
import { DateTime } from './types/scalar.type';
import userType from './types/user.type';

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
    ...userType,
    ...articleType,
    ...commentType,
  ],
  outputs: {
    schema: path.join(__dirname, '..', '..', 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, '..', '..', 'generated', 'nexus.ts'),
  },
  contextType: {
    // module: require.resolve('./context'),
    module: path.join(process.cwd(), 'pages', 'api', 'context.ts'),
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
  plugins: [fieldAuthorizePlugin(), validatePlugin()],
});
