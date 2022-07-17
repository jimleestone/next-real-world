import { Prisma } from '@prisma/client';
import { UserInputError } from 'apollo-server-micro';
import { extendType, nonNull, stringArg } from 'nexus';
import { Context } from '../context';

const ProfileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('follow', {
      type: 'Profile',
      args: {
        username: nonNull(stringArg()),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ string }) => ({
        username: string().required(),
      }),
      resolve: async (_, { username }, context: Context) => {
        const following = await checkProfile(context, username);
        return context.prisma.user.update({
          where: { id: following.id },
          data: {
            followedBy: {
              connectOrCreate: {
                where: {
                  followerId_followingId: { followerId: context.currentUser!.id, followingId: following.id },
                },
                create: { followerId: context.currentUser!.id },
              },
            },
          },
        });
      },
    });
    t.nonNull.field('unFollow', {
      type: 'Profile',
      args: {
        username: nonNull(stringArg()),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ string }) => ({
        username: string().required(),
      }),
      resolve: async (_, { username }, context: Context) => {
        const following = await checkProfile(context, username);
        try {
          return await context.prisma.user.update({
            where: { id: following.id },
            data: {
              followedBy: {
                delete: {
                  followerId_followingId: { followerId: context.currentUser!.id, followingId: following.id },
                },
              },
            },
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2017') throw new UserInputError('Had been unfollowed');
          }
          return following;
        }
      },
    });
  },
});

async function checkProfile(ctx: Context, username: string) {
  const following = await ctx.prisma.user.findUnique({
    where: { username },
  });
  if (!following) throw new UserInputError('User not found');
  return following;
}

export default ProfileMutation;
