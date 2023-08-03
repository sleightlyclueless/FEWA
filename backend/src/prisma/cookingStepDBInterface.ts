import { MyPrismaClient } from "./prismaClient";
import { CookingStepEntity } from "../entities/CookingStepEntity";

// CRUD operations for user table via PrismaClient

// CREATE / POST
async function createCookingStep(CookingStep: CookingStepEntity) {
  const transaction = await MyPrismaClient.$transaction(
    async (MyPrismaClient) => {
      await MyPrismaClient.cookingStep.create({
        data: CookingStep,
      });
    }
  );
}
// ========================================================================================================

// READ
async function selectAllCookingSteps(): Promise<CookingStepEntity[]> {
  return MyPrismaClient.cookingStep.findMany();
}

async function selectCookingStepById(cId_: number): Promise<CookingStepEntity | null> {
  return MyPrismaClient.cookingStep.findUnique({
    where: { cId: cId_ },
  });
}

async function selectAllCookingStepsForRecipe(
  rId_: number
): Promise<CookingStepEntity[]> {
  return MyPrismaClient.cookingStep.findMany({
    where: { rId: rId_ },
  });
}

async function selectAllCookingStepsForIngredient(
  iId_: number
): Promise<CookingStepEntity[]> {
    var myCookingSteps: CookingStepEntity[] = await MyPrismaClient.cookingStep.findMany({
    where: { iId: iId_ },
    });
    return myCookingSteps;
}
// ========================================================================================================

// UPDATE
async function updateCookingStep(id_: number, CookingStep: CookingStepEntity) {
  return MyPrismaClient.cookingStep.update({
    where: { cId: id_ },
    data: CookingStep,
  });
}
// ========================================================================================================

// DELETE
async function deleteCookingStep(id_: number) {
  return MyPrismaClient.cookingStep.delete({
    where: { cId: id_ },
  });
}

export {
  createCookingStep,
  selectAllCookingSteps,
  selectCookingStepById,
  selectAllCookingStepsForRecipe,
  selectAllCookingStepsForIngredient,
  updateCookingStep,
  deleteCookingStep,
};
