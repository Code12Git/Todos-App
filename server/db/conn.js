import { PrismaClient } from "@prisma/client";

let prisma;

// Create a singleton instance of PrismaClient
if (!prisma) {
  prisma = new PrismaClient();
}

// In development mode, you can clear the PrismaClient instance for hot-reloading
if (process.env.NODE_ENV !== 'production') {
  prisma.$disconnect();
  prisma = new PrismaClient();
}

// Export the Prisma instance
export { prisma };
