// Central instance of PrismaClient to be used by all DB interfaces
import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

export const MyPrismaClient = prisma;
