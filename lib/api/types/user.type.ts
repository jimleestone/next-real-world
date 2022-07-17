import { inputObjectType, interfaceType, objectType } from 'nexus';
import { Context } from '../context';

export interface AuthPayload {
  sub: number;
  user: string;
}

const BaseUser = interfaceType({
  name: 'BaseUser',
  definition(t) {
    t.nonNull.string('username');
    t.string('bio');
    t.string('image');
  },
});

const AuthUser = objectType({
  name: 'AuthUser',
  definition(t) {
    t.implements('Node');
    t.implements('BaseUser');
    t.nonNull.string('email');
    t.string('token');
  },
});

const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.implements('BaseUser');
    t.nonNull.boolean('following', {
      resolve: async ({ username }, _, context: Context) => {
        if (!context.currentUser) return false;
        const follows = await context.prisma.user
          .findUnique({
            where: { username },
          })
          .followedBy({ select: { followerId: true }, where: { followerId: context.currentUser.id } });
        return !!follows.length;
      },
    });
  },
});

const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

const UserSignupInput = inputObjectType({
  name: 'UserSignupInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('username');
    t.nonNull.string('password');
  },
});

const UserUpdateInput = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('username');
    t.string('password');
    t.string('bio');
    t.string('image');
  },
});

const UserTypes = [BaseUser, AuthUser, Profile, UserLoginInput, UserSignupInput, UserUpdateInput];
export default UserTypes;
