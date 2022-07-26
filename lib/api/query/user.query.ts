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
    t.string('checkUsername', {
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      args: {
        username: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        username: string().required(),
      }),
      resolve: async (_, { username }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          select: { username: true },
          where: { username },
        });
        return user && user.username;
      },
    });
    t.string('checkEmail', {
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      args: {
        email: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        email: string().required(),
      }),
      resolve: async (_, { email }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          select: { email: true },
          where: { email },
        });
        return user && user.email;
      },
    });
  },
});

export default UserQuery;
