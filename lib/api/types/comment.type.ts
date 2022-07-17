import { User } from '@prisma/client';
import { inputObjectType, objectType } from 'nexus';
import { Context } from '../context';

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.implements('Node');
    t.nonNull.string('body');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.field('updatedAt', { type: 'DateTime' });
    t.nonNull.field('author', {
      type: 'Profile',
      resolve: async ({ id }, _, context: Context) => {
        const author = (await context.prisma.comment
          .findUnique({
            where: { id },
          })
          .author()) as User;
        return author;
      },
    });
  },
});

const CommentInput = inputObjectType({
  name: 'CommentInput',
  definition(t) {
    t.nonNull.string('body');
  },
});

const CommentTypes = [Comment, CommentInput];
export default CommentTypes;
