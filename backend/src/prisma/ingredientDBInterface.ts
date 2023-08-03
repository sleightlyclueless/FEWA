import { MyPrismaClient } from "./prismaClient";
import { IngredientEntity } from "../entities/IngredientEntity";


// CRUD operations for user table via PrismaClient

// CREATE / POST
async function createIngredient(Ingredient: IngredientEntity) {
  const transaction = await MyPrismaClient.$transaction(
    async (MyPrismaClient) => {
      await MyPrismaClient.ingredient.create({
        data: Ingredient,
      });
    }
  );
}
// ========================================================================================================

// READ
async function selectAllIngredients(): Promise<IngredientEntity[]> {
  return MyPrismaClient.ingredient.findMany();
}

async function selectIngredientById(id_: number): Promise<IngredientEntity | null> {
  return MyPrismaClient.ingredient.findUnique({
    where: { iId: id_ },
  });
}

async function selectIngredientByName(iName_: string): Promise<IngredientEntity | null> {
  return MyPrismaClient.ingredient.findUnique({
    where: { iName: iName_ },
  });
}
// ========================================================================================================

// UPDATE
async function updateIngredient(id_: number, Ingredient: IngredientEntity) {
  return MyPrismaClient.ingredient.update({
    where: { iId: id_ },
    data: Ingredient,
  });
}
// ========================================================================================================

// DELETE
async function deleteIngredient(id_: number) {
  return MyPrismaClient.ingredient.delete({
    where: { iId: id_ },
  });
}

export {
  createIngredient,
  selectAllIngredients,
  selectIngredientById,
  selectIngredientByName,
  updateIngredient,
  deleteIngredient,
};
