import { User } from '@prisma/client';
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
      resolve: async (_, _args, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: { id: context.currentUser!.id },
        });
        return user as User;
      },
    });
  },
});

export default UserQuery;
