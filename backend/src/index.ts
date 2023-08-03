// Main index file to handle everything

import express from "express";
import http from "http";
import cors from "cors"; // Import cors correctly

import { Auth } from "./middleware/auth";
import { authController } from "./controller/authController";
import { recipeController } from "./controller/recipeEntriesController";
import { ingredientController } from "./controller/ingredientEntriesController";
import { cookingStepController } from "./controller/cookingStepsController";
import { recipeControllerForIngredient } from "./controller/getRecipesForIngredient";


export const DI = {} as {
  server: http.Server;
};

const PORT = 3000;
const app = express();


// FRONTEND: Enable CORS
app.use(cors()); // Enable CORS for all routes

export const initializeServer = async () => {
  // global middleware
  app.use(express.json());
  app.use(Auth.prepareAuthentication);

  // routes with authorization
  /* app.use("/auth", authController);
  app.use("/recipeEntries", Auth.verifyAccess, recipeController);
  app.use("/ingredientEntries", Auth.verifyAccess, ingredientController);
  app.use("/cookingStepEntries", Auth.verifyAccess, cookingStepController); */

  // FRONTEND: No authorization
  app.use("/auth", authController);
  app.use("/recipeEntries", recipeController);
  app.use("/ingredientEntries", ingredientController);
  app.use("/cookingStepEntries", cookingStepController);

  // Custom route for "Es soll eine Route geben die alle Rezepte in dem eine bestimmte Zutat existiert zurückgeben kann."
  app.use(
    "/recipeEntriesForIngredient",
    //Auth.verifyAccess,
    recipeControllerForIngredient
  );

  DI.server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

initializeServer();
