import { ApolloServerPluginCacheControl, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { ApolloError, ApolloServer, AuthenticationError } from 'apollo-server-micro';
import { RequestHandler } from 'micro';
import Cors from 'micro-cors';
import * as R from 'ramda';
import { Context } from '../../lib/api/context';
import prisma from '../../lib/api/prisma';
import { schema } from '../../lib/api/schema';
import Utility from '../../lib/api/utils';

const cors = Cors();

let apiHandler: RequestHandler;
async function getApiHandler() {
  const server = new ApolloServer({
    schema: schema,
    context: ({ req }): Context => {
      try {
        const id = Utility.loadCurrentUser(req.headers.authorization);
        return { prisma, currentUser: id ? { id } : undefined };
      } catch {
        // should be a token parsing error, treat as a guest
        return { prisma };
      }
    },
    csrfPrevention: true,
    introspection: process.env.NODE_ENV === 'development',
    cache: 'bounded',
    plugins: R.concat(
      [ApolloServerPluginCacheControl({ defaultMaxAge: 5 })],
      process.env.NODE_ENV === 'development' ? [] : [ApolloServerPluginLandingPageDisabled()]
    ),
    persistedQueries: { ttl: 1500 },
    formatError: (err) => {
      if (
        err.message === 'Not authorized' // nexus authorize plugin error message
      ) {
        return new AuthenticationError('unauthorized', {
          path: err.path,
          locations: err.locations,
        });
      } else if (err.message.includes('prisma') || err.message.includes('database')) {
        return new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR', {
          path: err.path,
          locations: err.locations,
        });
      }
      return err;
    },
  });

  if (!apiHandler) {
    await server.start();
    apiHandler = server.createHandler({
      path: '/api',
    });
  }
  return apiHandler;
}

export default cors(async (req, res) => {
  const apiHandler = await getApiHandler();
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  return apiHandler(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
