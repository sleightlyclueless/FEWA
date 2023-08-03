// Prisma Client is an auto-generated and type-safe query builder that's tailored to your database schema.prisma.
// Interact with your database using a set of operations exposed as a type-safe GraphQL API.

import { MyPrismaClient } from "./prismaClient";
import { User } from "../entities/UserEntity";
import e from "express";

// CRUD operations for user table

// CREATE
async function createUsers(users: User[]) {
  for (var i = 0; i < users.length; i++) {
    await MyPrismaClient.user.create({
      data: users[i],
    });
  }
}
// ========================================================================================================

// READ
async function selectAllUsers(): Promise<User[]> {
  return MyPrismaClient.user.findMany();
}

async function selectUserById(uId_: string): Promise<User | null> {
  const user = await MyPrismaClient.user.findUnique({
    where: { uId: uId_ },
  });
  return user;
}

async function selectUserByEmail(email_: string): Promise<User | null> {
  const user = await MyPrismaClient.user.findUnique({
    where: { email: email_ },
  });
  return user;
}

export { createUsers, selectAllUsers, selectUserById, selectUserByEmail };

// UPDATE

// DELETE
