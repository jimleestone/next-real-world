import { extendType } from 'nexus';
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
        });
        return tags.map((t) => t.name);
      },
    });
  },
});

export default TagQuery;
