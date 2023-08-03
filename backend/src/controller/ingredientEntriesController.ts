import { Router } from "express";
import {
  createIngredient,
  selectAllIngredients,
  selectIngredientById,
  selectIngredientByName,
  updateIngredient,
  deleteIngredient,
} from "../prisma/ingredientDBInterface";
import {
  IngredientEntity,
  createIngredientEntitySchema,
  putIngredientEntitySchema,
} from "../entities/IngredientEntity";
import { selectAllCookingStepsForIngredient } from "../prisma/cookingStepDBInterface";
import { CookingStepEntity } from "../entities/CookingStepEntity";

const router = Router({ mergeParams: true });

// UTILS
// Check if Ingredient is used in CookingSteps
async function isUsedInCookingSteps(iId_: number) {
  const cookingSteps: CookingStepEntity[] =
    await selectAllCookingStepsForIngredient(iId_);
  if (cookingSteps.length != 0) return true;
  else return false;
}
// ========================================================================================================

// Handle CRUD operations related to Ingredient entries
// GET: SELECT ALL from DB
router.get("/", async (req, res) => {
  try {
    var result;

    // Check if any body or an empty json was sent
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object && req.query.rId == null && req.query.iId == null)
      result = await selectAllIngredients();
    else
      return res.status(400).send({
        errors: [
          "No body data for get allowed! Try /ingredientEntries/:iId or :iName",
        ],
      });

    // Send the result, if any
    if (result.length != 0) res.status(200).send(result);
    else res.status(404).send({ errors: ["No Ingredients found"] });
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
        // If an iName was sent in the data, select by name
        result = await selectIngredientByName(param);
      } else result = await selectIngredientById(Number(param));
    } else
      return res.status(400).send({
        errors: [
          "No body data for get allowed! Use url params /:iId or :iName",
        ],
      });
    // Send the result, if any
    if (result != null) res.status(200).send(result);
    else res.status(404).send({ errors: ["No Ingredients found"] });
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
    const validData = await createIngredientEntitySchema.validate(req.body, {
      stripUnknown: false,
    });

    // Check if Ingredient already exists
    if ((await selectIngredientByName(validData.iName)) == null) {
      // Insert into DB
      createIngredient(validData as IngredientEntity);
      res.status(201).send(validData);
    } else {
      res.status(400).send(`Ingredient ${validData.iName} already exists!`);
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
    const validData = await putIngredientEntitySchema.validate(req.body, {
      stripUnknown: false,
    });

    // Check if ingredient exists
    if ((await selectIngredientById(Number(id))) != null) {
      if ((await selectIngredientByName(validData.iName as string)) == null) {
        updateIngredient(Number(id), validData as IngredientEntity);
        res.status(202).send(validData);
      } else {
        res.status(400).send(`Ingredient ${validData.iName} already exists!`);
      }
    } else {
      res.status(404).send({
        errors: ["Ingredient does not exist!"],
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
      if ((await selectIngredientById(Number(id))) != null) {
        var used = await isUsedInCookingSteps(Number(id));
        if (!used) {
          deleteIngredient(Number(id));
          res.status(204).send({});
        } else
          res.status(403).send({
            errors: ["Foreign Key Error: Ingredient is used in CookingSteps!"],
          });
      } else res.status(404).send({ errors: ["Ingredient does not exist!"] });
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

export const ingredientController = router;
