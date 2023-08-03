// Prisma Client is an auto-generated and type-safe query builder that's tailored to your database schema.prisma.
// Interact with your database using a set of operations exposed as a type-safe GraphQL API.

import { MyPrismaClient } from "./prismaClient";

async function deleteAll() {
  const deletedAllCookingStep = await MyPrismaClient.cookingStep.deleteMany({});
  const deletedAllIngredient = await MyPrismaClient.ingredient.deleteMany({});
  const deletedAllRecipe = await MyPrismaClient.recipe.deleteMany({});

  const deleteAllUsers = await MyPrismaClient.user.deleteMany({});
}
deleteAll();