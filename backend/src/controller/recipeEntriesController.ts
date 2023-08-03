import { Router } from "express";
import {
  createRecipe,
  selectAllRecipes,
  selectRecipeById,
  selectRecipeByName,
  updateRecipe,
  deleteRecipe,
} from "../prisma/recipeDBInterface";
import {
  RecipeEntity,
  createRecipeEntitySchema,
  putRecipeEntitySchema,
} from "../entities/RecipeEntity";
import { selectAllCookingStepsForRecipe } from "../prisma/cookingStepDBInterface";
import { CookingStepEntity } from "../entities/CookingStepEntity";

const router = Router({ mergeParams: true });

// UTILS
// Check if Ingredient is used in CookingSteps
async function isUsedInCookingSteps(rId_: number) {
  const cookingSteps: CookingStepEntity[] =
    await selectAllCookingStepsForRecipe(rId_);
  if (cookingSteps.length != 0) return true;
  else return false;
}
// ========================================================================================================

// Handle CRUD operations related to recipe entries
// GET: SELECT ALL from DB
router.get("/", async (req, res) => {
  try {
    var result;

    // Check if any body or an empty json was sent
    if (
      Object.keys(req.body).length === 0 &&
      req.body.constructor === Object &&
      req.query.rId == null &&
      req.query.iId == null
    )
      result = await selectAllRecipes();
    else
      return res.status(400).send({
        errors: [
          "No body data for get allowed! Try /recipeEntries/:rId or :rName",
        ],
      });

    // Send the result, if any
    if (result.length != 0) res.status(200).send(result);
    else res.status(404).send({ errors: ["No recipes found"] });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ errors: ["Invalid data"] });
  }
});

// GET: SELECT from DB by id or name
router.get("/:param", async (req, res) => {
  try {
    const { param } = req.params;
    var result;
    // Check if any body or an empty json was sent
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      if (isNaN(Number(param))) {
        // If an rName was sent in the data, select by name
        result = await selectRecipeByName(param);
      } else result = await selectRecipeById(Number(param));
    } else
      return res.status(400).send({
        errors: [
          "No body data for get allowed! Use url params /:rId or :rName",
        ],
      });
    // Send the result, if any
    if (result != null) res.status(200).send(result);
    else res.status(404).send({ errors: ["No recipes found"] });
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
    const validData = await createRecipeEntitySchema.validate(req.body, {
      stripUnknown: false,
    });

    // Check if recipe already exists
    if ((await selectRecipeByName(validData.rName)) == null) {
      // Insert into DB
      createRecipe(validData as RecipeEntity);
      res.status(201).send(validData);
    } else {
      res.status(400).send(`Recipe ${validData.rName} already exists!`);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ errors: ["Invalid data"] });
  }
});

// ========================================================================================================

// PUT: UPDATE DB entry by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Check valid data
    const validData = await putRecipeEntitySchema.validate(req.body, {
      stripUnknown: false,
    });

    // Check if recipe exists
    if ((await selectRecipeById(Number(id))) != null) {
      updateRecipe(Number(id), validData as RecipeEntity);
      res.status(202).send(validData);
    } else {
      res.status(404).send({
        errors: ["Recipe does not exist!"],
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ errors: ["Invalid data"] });
  }
});
// ========================================================================================================

// DELETE: DELETE DB entry by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      if ((await selectRecipeById(Number(id))) != null) {
        var used = await isUsedInCookingSteps(Number(id));
        if (!used) {
          deleteRecipe(Number(id));
          res.status(204).send({});
        } else
          res.status(403).send({
            errors: ["Foreign Key Error: Recipe is used in CookingSteps!"],
          });
      } else res.status(404).send({ errors: ["Recipe does not exist!"] });
    } else
      return res.status(400).send({
        errors: [
          "No body data for get allowed! Try /ingredientEntries/:iId or :iName",
        ],
      });
  } catch (e) {
    console.log(e);
    return res.status(403).send({ errors: ["Cant delete this id"] });
  }
});

export const recipeController = router;
