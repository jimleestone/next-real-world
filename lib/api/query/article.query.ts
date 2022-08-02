import { Prisma } from '@prisma/client';
import { extendType, intArg, nonNull, stringArg } from 'nexus';
import { Context } from '../context';

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
        return context.prisma.article.findUnique({ where: { slug } });
      },
    });
    t.nonNull.list.nonNull.field('articles', {
      type: 'Article',
      args: {
        author: stringArg(),
        tag: stringArg(),
        favorited: stringArg(),
        limit: intArg({ default: 10 }),
        offset: intArg({ default: 0 }),
        cursor: intArg(),
      },
      validate: ({ string, number }) => ({
        author: string(),
        tag: string(),
        favorited: string(),
        limit: number().integer().positive().max(100),
        offset: number().integer(),
        cursor: number().integer().positive(),
      }),
      resolve: (_, { limit, offset, ...rest }, context: Context) => {
        let skip, take;
        if (rest.cursor && limit && offset) {
          skip = 1;
          take = offset > 0 ? limit : -limit;
        } else {
          skip = offset || undefined;
          take = limit || undefined;
        }
        return context.prisma.article.findMany({
          where: articleQueryFilter(rest),
          skip,
          take,
          cursor: rest.cursor ? { id: rest.cursor } : undefined,
          orderBy: { createdAt: 'desc' },
        });
      },
    });
    t.nonNull.int('articlesCount', {
      args: {
        author: stringArg(),
        tag: stringArg(),
        favorited: stringArg(),
      },
      validate: ({ string }) => ({
        author: string(),
        tag: string(),
        favorited: string(),
      }),
      resolve: async (_, args, context: Context) => {
        const idCount = await context.prisma.article.count({
          select: { id: true },
          where: articleQueryFilter(args),
        });
        return idCount.id;
      },
    });

    t.nonNull.list.nonNull.field('feed', {
      type: 'Article',
      args: {
        limit: intArg({ default: 10 }),
        offset: intArg({ default: 0 }),
        cursor: intArg(),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ number }) => ({
        limit: number().integer().positive().max(100),
        offset: number().integer(),
        cursor: number().integer().positive(),
      }),
      resolve: (_, { limit, offset, cursor }, context: Context) => {
        let skip, take;
        if (cursor && limit && offset) {
          skip = 1;
          take = offset > 0 ? limit : -limit;
        } else {
          skip = offset || undefined;
          take = limit || undefined;
        }

        return context.prisma.article.findMany({
          where: feedQueryFilter(context.currentUser!.id),
          skip,
          take,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: { createdAt: 'desc' },
        });
      },
    });
    t.nonNull.int('feedCount', {
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      resolve: async (_, _args, context: Context) => {
        const idCount = await context.prisma.article.count({
          select: { id: true },
          where: feedQueryFilter(context.currentUser!.id),
        });
        return idCount.id;
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
