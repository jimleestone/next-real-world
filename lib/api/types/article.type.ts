import { User } from '@prisma/client';
import { inputObjectType, objectType } from 'nexus';
import { Context } from '../context';

const Article = objectType({
  name: 'Article',
  definition(t) {
    t.implements('Node');
    t.nonNull.string('slug');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('body');
    t.nonNull.int('favoritesCount');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.field('updatedAt', { type: 'DateTime' });
    t.nonNull.field('author', {
      type: 'Profile',
      resolve: async ({ slug }, _, context: Context) => {
        const author = (await context.prisma.article
          .findUniqueOrThrow({
            where: { slug },
          })
          .author()) as User;
        return author;
      },
    });
    t.nonNull.boolean('favorited', {
      resolve: async ({ slug }, _, context: Context) => {
        if (!context.currentUser) return false;
        const favorites = await context.prisma.article
          .findUnique({
            where: { slug },
          })
          .favoritedBy({ select: { favoritedBy: true }, where: { userId: context.currentUser.id } });
        return !!favorites.length;
      },
    });
    t.nonNull.list.nonNull.string('tagList', {
      resolve: async ({ slug }, _, context: Context) => {
        const tags = await context.prisma.article
          .findUnique({
            where: { slug },
          })
          .tags({ select: { tag: { select: { name: true } } } });
        return tags.map((t) => t.tag.name);
      },
    });
  },
});

const ArticleInput = inputObjectType({
  name: 'ArticleInput',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('body');
    t.nonNull.list.nonNull.string('tagList');
  },
});

const ArticleTypes = [Article, ArticleInput];
export default ArticleTypes;
