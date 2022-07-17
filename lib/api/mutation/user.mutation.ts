import { Prisma } from '@prisma/client';
import { UserInputError } from 'apollo-server-micro';
import { arg, mutationType, nonNull } from 'nexus';
import { Context } from '../context';
import Utility from '../utils';

const UserMutation = mutationType({
  definition(t) {
    t.nonNull.field('login', {
      type: 'AuthUser',
      args: {
        input: nonNull(arg({ type: 'UserLoginInput' })),
      },
      validate: ({ object, string }) => ({
        input: object({
          email: string().required().email(),
          password: string().required(),
        }),
      }),
      resolve: async (_, { input: { email, password: inputPassword } }, context: Context) => {
        const user = await context.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UserInputError('Bad Credentials');

        const { id, username, password } = user;
        const checkPassword = Utility.checkPassword(inputPassword, password);
        if (!checkPassword) throw new UserInputError('Bad Credentials');

        const payload = { sub: id, user: username };
        return { ...user, token: Utility.issueToken(payload) };
      },
    });
    t.nullable.field('signup', {
      type: 'AuthUser',
      args: {
        input: nonNull(arg({ type: 'UserSignupInput' })),
      },
      validate: ({ object, string }) => ({
        input: object({
          username: string().required().max(100),
          email: string().required().email().max(100),
          password: string().required().max(100),
        }),
      }),
      resolve: async (_, { input }, context: Context) => {
        try {
          const { password, ...inputRest } = input;
          const user = await context.prisma.user.create({
            data: {
              ...inputRest,
              password: Utility.encodePassword(password),
            },
          });
          const { id, username } = user;
          const payload = { sub: id, user: username };
          return { ...user, token: Utility.issueToken(payload) };
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') throw new UserInputError('Duplicate username or email');
          }
          return null;
        }
      },
    });
    t.nonNull.field('updateUser', {
      type: 'AuthUser',
      args: {
        input: nonNull(arg({ type: 'UserUpdateInput' })),
      },
      authorize: (_, _args, ctx: Context) => !!ctx.currentUser,
      validate: ({ object, string }) => ({
        input: object({
          username: string().required().max(100),
          email: string().required().email().max(100),
          password: string().max(100),
          bio: string().max(300).nullable(),
          image: string().url().max(1024).nullable(),
        }),
      }),
      resolve: async (_, { input }, context: Context) => {
        const origin = await context.prisma.user.findUnique({
          where: { id: context.currentUser!.id },
        });
        if (!origin) throw new UserInputError('User not found');

        try {
          const { password, ...rest } = input;
          return await context.prisma.user.update({
            where: { id: origin.id },
            data: {
              ...rest,
              // change password
              password: !!password ? Utility.encodePassword(password) : undefined,
            },
          });
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') throw new UserInputError('Duplicate username or email');
          }
          return origin;
        }
      },
    });
  },
});

export default UserMutation;
