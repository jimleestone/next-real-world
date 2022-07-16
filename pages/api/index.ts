import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import { ApolloError, ApolloServer, AuthenticationError } from 'apollo-server-micro';
import Cors from 'micro-cors';
import prisma from '../../lib/prisma';
import { Context } from './context';
import { schema } from './schema';
import Utility from './utils';

const cors = Cors();

const server = new ApolloServer({
  schema: schema,
  context: ({ req }): Context => {
    try {
      const id = Utility.loadCurrentUser(req.headers.authorization);
      return { prisma, currentUser: id ? { id } : undefined };
    } catch {
      return { prisma };
    }
  },
  csrfPrevention: true,
  introspection: process.env.NODE_ENV === 'development',
  cache: 'bounded',
  plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 20 })],
  persistedQueries: { ttl: 300 },
  formatError: (err) => {
    if (
      err.message === 'Not authorized' // nexus authorize plugin error message
    ) {
      return new AuthenticationError('unauthorized', {
        path: err.path,
        locations: err.locations,
      });
    } else if (err.message.includes('prisma')) {
      return new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR', { path: err.path });
    }
    return err;
  },
});
const startServer = server.start();
export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  return server.createHandler({
    path: '/api',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
