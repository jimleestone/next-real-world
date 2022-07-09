import { nonNull, queryType, stringArg } from 'nexus';
import { Context } from '../context';

const UserQuery = queryType({
  definition(t) {
    t.field('profile', {
      type: 'Profile',
      args: {
        username: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        username: string().required(),
      }),
      resolve: (_, { username }, context: Context) => {
        return context.prisma.user.findUnique({
          where: { username },
        });
      },
    });
    t.nonNull.field('currentUser', {
      type: 'AuthUser',
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      resolve: (_, _args, context: Context) => {
        return context.prisma.user.findUnique({
          where: { id: context.currentUser!.id },
        });
      },
    });
  },
});

export default UserQuery;
