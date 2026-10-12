import 'server-only';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { Pool } from 'pg';

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
  postgresPool?: Pool;
};

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL must be configured before using the Prisma client.');
}

const pool = globalForPrisma.postgresPool ?? new Pool({
  connectionString: databaseUrl
});

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: new PrismaPg(pool)
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.postgresPool = pool;
  globalForPrisma.prisma = prisma;
}

export { prisma };
