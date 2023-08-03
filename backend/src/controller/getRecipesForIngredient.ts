// Es soll eine Route geben die alle Rezepte in dem eine bestimmte Zutat existiert zurückgeben kann.
import { Router } from "express";

import { selectIngredientByName } from "../prisma/ingredientDBInterface";
import { selectAllCookingStepsForIngredient, selectAllCookingStepsForRecipe } from "../prisma/cookingStepDBInterface";
import { selectRecipeById } from "../prisma/recipeDBInterface";
import { CookingStepEntity } from "../entities/CookingStepEntity";

const router = Router({ mergeParams: true });

// GET: SELECT from DB
router.get("/:ingredient", async (req, res) => {
  try {
    const { ingredient } = req.params;

    // Get iId from ingredient
    const myIngredient = await selectIngredientByName(ingredient);
    var iId = null;
    if (myIngredient != null) iId = myIngredient.iId;

    if (iId != null) {
      // Get all recipes with this ingredient
      const myCookingSteps: CookingStepEntity[] = await selectAllCookingStepsForIngredient(iId);
      if (myCookingSteps.length != 0) {
        var rIds = [];
        for (let i = 0; i < myCookingSteps.length; i++) {
          rIds.push(myCookingSteps[i].rId);
        }
        rIds = Array.from(new Set(rIds));

        var resultSet = [];
        for (let i = 0; i < rIds.length; i++) {
          resultSet.push(await selectRecipeById(rIds[i]));
          // resultSet.push("COOKINGSTEPS");
          // resultSet.push(await selectAllCookingStepsForRecipe(rIds[i]));
        }

        if (resultSet.length != 0) {
          return res.status(200).send(resultSet);
        }
      }
    }
    return res.status(404).send({ errors: ["No recipes for this ingredient"] });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ errors: ["No recipes for this ingredient"] });
  }
});

export const recipeControllerForIngredient = router;
