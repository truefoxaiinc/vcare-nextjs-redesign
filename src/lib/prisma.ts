import 'server-only';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { Pool } from 'pg';

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
  postgresPool?: Pool;
};

let prismaClient = globalForPrisma.prisma;
let postgresPool = globalForPrisma.postgresPool;

export function getPrisma(): PrismaClient {
  if (prismaClient) return prismaClient;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL must be configured before using the Prisma client.');

  postgresPool ??= new Pool({ connectionString: databaseUrl });
  prismaClient = new PrismaClient({ adapter: new PrismaPg(postgresPool) });
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.postgresPool = postgresPool;
    globalForPrisma.prisma = prismaClient;
  }
  return prismaClient;
}
