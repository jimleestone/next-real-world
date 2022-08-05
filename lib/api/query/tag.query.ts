import { extendType } from 'nexus';
import { SIDEBAR_TAG_QUERY_SIZE } from '../../constants';
import { Context } from '../context';

const TagQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.string('tags', {
      resolve: async (_, _args, context: Context) => {
        const tags = await context.prisma.tag.findMany({
          select: {
            name: true,
            _count: { select: { articles: true } },
          },
          orderBy: { articles: { _count: 'desc' } },
          skip: 0,
          take: SIDEBAR_TAG_QUERY_SIZE,
        });
        return tags.filter((t) => t._count.articles != 0).map((t) => t.name);
      },
    });
  },
});

export default TagQuery;
