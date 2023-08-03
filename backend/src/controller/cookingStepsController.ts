// INTERACT WITH DB REGARDING COOKINGSTEPS WITH GET, POST, PUT, DELETE
import { Router } from "express";
import {
  createCookingStep,
  selectAllCookingSteps,
  selectCookingStepById,
  selectAllCookingStepsForRecipe,
  selectAllCookingStepsForIngredient,
  updateCookingStep,
  deleteCookingStep,
} from "../prisma/cookingStepDBInterface";
import { selectRecipeById } from "../prisma/recipeDBInterface";
import { selectIngredientById } from "../prisma/ingredientDBInterface";
import {
  CookingStepEntity,
  createCookingStepEntitySchema,
  putCookingStepEntitySchema,
} from "../entities/CookingStepEntity";

const router = Router({ mergeParams: true });

// UTILS
// Check if Recipe is used in CookingSteps before deleting
async function checkIngredientAndRecipeExistence(rId: number, iId: number) {
  if (rId == null || iId == null) return false;
  return (
    (await selectRecipeById(rId)) != null &&
    (await selectIngredientById(iId)) != null
  );
}
// ========================================================================================================

// GET: SELECT from DB
/*
Empty for all CookingSteps
{
    "rId": x
}
for all CookingSteps for a recipe
{
    "iId": x
}
for all CookingSteps for an ingredient
*/
router.get("/", async (req, res) => {
  try {
    var result: CookingStepEntity[] = [];

    console.log(req.query.rId);
    // Check if any body or an empty json was sent
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object && req.query.rId == null && req.query.iId == null)
      result = await selectAllCookingSteps();
    // Check CookingSteps for a recipe if rId was sent
    if (req.query.rId)
      result = await selectAllCookingStepsForRecipe(Number(req.query.rId));
    // Check CookingSteps for an ingredient if iId was sent
    if (req.query.iId)
      result = await selectAllCookingStepsForIngredient(Number(req.query.iId));

    // Send the result, if any
    if (result.length != 0) res.status(200).send(result);
    else res.status(404).send({ errors: ["No CookingSteps found"] });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ errors: ["Invalid data"] });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await selectCookingStepById(Number(id));
    if (result != null) res.status(200).send(result);
    else res.status(404).send({ errors: ["No CookingStep found"] });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ errors: ["Invalid data"] });
  }
});
// ========================================================================================================

// POST: INSERT into DB
router.post("/", async (req, res) => {
  try {
    // Check valid data
    const validData = await createCookingStepEntitySchema.validate(req.body, {
      stripUnknown: false,
    });
    // If validation succeeds, validData will contain the validated object
    // If validation fails, an error will be thrown and caught in the catch block

    // Check if given recipe and ingredient exist
    if (await checkIngredientAndRecipeExistence(validData.rId, validData.iId)) {
      // Insert into DB
      createCookingStep(validData);
      res.status(201).send(validData);
    } else {
      res.status(400).send("Ingredient and/or Recipe don't exist!");
    }
  } catch (e) {
    console.log(e);
    if (Array.isArray(e)) {
      return res.status(400).send({ errors: e });
    }
    return res.status(400).send({ errors: ["Invalid data"] });
  }
});
// ========================================================================================================

// PUT: UPDATE DB entry by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Check valid data
    const validData = await putCookingStepEntitySchema.validate(req.body, {
      stripUnknown: false,
    });
    // If validation succeeds, validData will contain the validated object
    // If validation fails, an error will be thrown and caught in the catch block

    // Check if CookingStep does not exist
    if ((await selectCookingStepById(Number(id))) != null) {
      // Check if given recipe and ingredient exist
      if (
        await checkIngredientAndRecipeExistence(
          validData.rId as number,
          validData.iId as number
        )
      ) {
        // Update DB entry
        updateCookingStep(Number(id), validData as CookingStepEntity);
        res.status(202).send(validData);
      } else {
        res.status(400).send("Ingredient and/or Recipe don't exist!");
      }
    } else {
      res.status(404).send({
        errors: ["CookingStep does not exist!"],
      });
    }
  } catch (e) {
    console.log(e);
    if (Array.isArray(e)) {
      return res.status(400).send({ errors: e });
    }
    return res.status(400).send({ errors: ["Invalid data"] });
  }
});

// ========================================================================================================

// DELETE: DELETE DB entry by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if ((await selectCookingStepById(Number(id))) != null) {
      deleteCookingStep(Number(id));
      res.status(204).send({});
    } else {
      res.status(404).send({ errors: ["CookingStep does not exist!"] });
    }
  } catch (e) {
    console.log(e);
    return res.status(403).send({ errors: ["Cant delete this id"] });
  }
});

export const cookingStepController = router;
