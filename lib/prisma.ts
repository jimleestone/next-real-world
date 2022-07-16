import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>;
}

const prisma =
  global.prisma ||
  new PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>({
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

if (process.env.NODE_ENV === 'development') {
  console.log('dev init prisma...');
  global.prisma = prisma;
  prisma.$on('query', (event) => {
    console.log(`[query]: ${event.query}, [params]: ${event.params}`);
  });
}

export default prisma;
