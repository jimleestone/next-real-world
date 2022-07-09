import { Prisma } from '@prisma/client';
import { extendType, intArg, nonNull, stringArg } from 'nexus';
import { Context } from '../context';
import { checkArticle } from '../mutation/article.mutation';

const ArticleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('article', {
      type: 'Article',
      args: {
        slug: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        slug: string().required(),
      }),
      resolve: (_, { slug }, context: Context) => {
        return checkArticle(context, slug);
      },
    });
    t.nonNull.field('articles', {
      type: 'Articles',
      args: {
        author: stringArg(),
        tag: stringArg(),
        favorited: stringArg(),
        limit: intArg({ default: 20 }),
        offset: intArg({ default: 0 }),
      },
      validate: ({ string, number }) => ({
        author: string(),
        tag: string(),
        favorited: string(),
        limit: number().integer().positive().max(100),
        offset: number().integer().min(0),
      }),
      resolve: async (_, args, context: Context) => {
        const { limit, offset, ...rest } = args;
        const articles = await context.prisma.article.findMany({
          where: articleQueryFilter(rest),
          skip: offset || undefined,
          take: limit || undefined,
          orderBy: { createdAt: 'desc' },
        });
        const articlesCount = await context.prisma.article.count({
          where: articleQueryFilter(rest),
        });
        return { articles, articlesCount };
      },
    });
    t.nonNull.field('feed', {
      type: 'Articles',
      args: {
        limit: intArg({ default: 20 }),
        offset: intArg({ default: 0 }),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ number }) => ({
        limit: number().integer().positive().max(100),
        offset: number().integer().min(0),
      }),
      resolve: async (_, { limit, offset }, context: Context) => {
        const articles = await context.prisma.article.findMany({
          where: feedQueryFilter(context.currentUser!.id),
          skip: offset || undefined,
          take: limit || undefined,
          orderBy: { createdAt: 'desc' },
        });
        const articlesCount = await context.prisma.article.count({
          where: feedQueryFilter(context.currentUser!.id),
        });
        return { articles, articlesCount };
      },
    });
  },
});

const articleQueryFilter = (query: any) => {
  return Prisma.validator<Prisma.ArticleWhereInput>()({
    AND: [
      { del: false },
      { author: { username: query?.author } },
      { tags: { some: query?.tag && { tag: { name: query.tag } } } },
      {
        favoritedBy: {
          // this "some" operator somehow could not work with the nested undefined value in an "AND" array
          some: query?.favorited && { favoritedBy: { username: query.favorited } },
        },
      },
    ],
  });
};

const feedQueryFilter = (userId: number) => {
  return Prisma.validator<Prisma.ArticleWhereInput>()({
    del: false,
    author: { followedBy: { some: { followerId: userId } } },
  });
};

export default ArticleQuery;
