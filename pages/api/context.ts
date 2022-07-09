import { PrismaClient } from '@prisma/client';
import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';

export interface Context {
  prisma: PrismaClient;
  // req: IncomingMessage | NextApiRequest;
  currentUser: { id: number } | undefined;
}
