import { extendType, nonNull, stringArg } from 'nexus';
import { Context } from '../context';
import { checkArticle } from '../mutation/article.mutation';

const CommentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('comments', {
      type: 'Comment',
      args: {
        slug: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        slug: string().required(),
      }),
      resolve: async (_, { slug }, context: Context) => {
        const article = await checkArticle(context, slug);
        return context.prisma.comment.findMany({
          where: { del: false, articleId: article.id },
          orderBy: { createdAt: 'desc' },
        });
      },
    });
  },
});

export default CommentQuery;
