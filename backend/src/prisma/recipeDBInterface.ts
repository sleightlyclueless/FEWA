import { MyPrismaClient } from "./prismaClient";
import { RecipeEntity } from "../entities/RecipeEntity";

// CRUD operations for user table via PrismaClient

// CREATE / POST
// recipes: Json Object (rName, rDescription, rImg (optional))
async function createRecipe(recipe: RecipeEntity) {
  const transaction = await MyPrismaClient.$transaction(
    async (MyPrismaClient) => {
      await MyPrismaClient.recipe.create({
        data: recipe,
      });
    }
  );
}
// ========================================================================================================

// READ
async function selectAllRecipes(): Promise<RecipeEntity[]> {
  return (await MyPrismaClient.recipe.findMany()) as RecipeEntity[];
}

async function selectRecipeById(rId_: number): Promise<RecipeEntity | null> {
  const recipe = await MyPrismaClient.recipe.findUnique({
    where: { rId: rId_ },
  });
  return recipe as RecipeEntity | null;
}

async function selectRecipeByName(
  rName_: string
): Promise<RecipeEntity | null> {
  const recipe = await MyPrismaClient.recipe.findUnique({
    where: { rName: rName_ },
  });
  return recipe as RecipeEntity | null;
}

// ========================================================================================================

// UPDATE
async function updateRecipe(id_: number, recipe: RecipeEntity) {
  return MyPrismaClient.recipe.update({
    where: { rId: id_ },
    data: recipe,
  });
}
// ========================================================================================================

// DELETE
async function deleteRecipe(id_: number) {
  return MyPrismaClient.recipe.delete({
    where: { rId: id_ },
  });
}

export {
  createRecipe,
  selectAllRecipes,
  selectRecipeById,
  selectRecipeByName,
  updateRecipe,
  deleteRecipe,
};
