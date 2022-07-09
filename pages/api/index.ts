import { Prisma, PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { Context } from './context';
import { schema } from './schema';
import Utility from './utils';

const prisma = new PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (event) => {
  console.log(`[query]: ${event.query}, [params]: ${event.params}`);
});

const cors = Cors();

const server = new ApolloServer({
  schema: schema,
  context: ({ req }): Context => {
    const id = Utility.loadCurrentUser(req.headers.authorization);
    return {
      prisma,
      currentUser: !!id ? { id } : undefined,
    };
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
