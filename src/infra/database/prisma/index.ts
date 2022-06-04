import { PrismaClient } from '@prisma/client';

export default async () => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url:
          process.env.NODE_ENV === 'test'
            ? process.env.DATABASE_URL_TEST
            : process.env.DATABASE_URL,
      },
    },
  });

  return prisma;
};
