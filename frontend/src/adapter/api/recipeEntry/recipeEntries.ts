import axios, { AxiosResponse } from "axios";
import { Recipe } from "./Recipe";

export const recipe = "recipe-entries";

// GET
export const getAllRecipes = async (): Promise<[Recipe[], boolean]> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Recipe[]> = await axios.get(
      "http://localhost:3000/recipeEntries",
      // { headers }
      {}
    );
    return [response.data, true];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [[] || error.response, false];
    } else {
      return [[] || error, false];
    }
  }
};

export const getRecipe = async (id: number): Promise<Recipe | null> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Recipe> = await axios.get(
      `http://localhost:3000/recipeEntries/${id}`,
      // { headers }
      {}
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch recipe:", error.response);
    } else {
      console.error("Failed to fetch recipe:", error);
    }

    return null;
  }
};

export const getRecipeByName = async (
  rName: string
): Promise<[Recipe[], boolean]> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    console.log(`http://localhost:3000/recipeEntries/${rName}`);
    const response: AxiosResponse<Recipe> = await axios.get(
      `http://localhost:3000/recipeEntries/${rName}`,
      { headers }
    );

    return [[response.data], true]; // Wrap the response data in an array to match the return type to other functions
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [[error.response?.data || {}], false]; // Wrap the response data in an array to match the return type to other functions
    } else {
      return [[], false];
    }
  }
};

export const getRecipeByIngredient = async (
  ingredient: string
): Promise<[Recipe[], boolean]> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Recipe[]> = await axios.get(
      `http://localhost:3000/recipeEntriesForIngredient/${ingredient}`,
      // { headers }
      {}
    );

    return [response.data, true];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [[] || error.response, false];
    } else {
      return [[] || error, false];
    }
  }
};

// PUT
export const updateRecipe = async (iId: number, updatedRecipeData: Recipe) => {
  try {
    console.log(
      `http://localhost:3000/recipeEntries/${iId}`,
      updatedRecipeData
    );
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Recipe> = await axios.put(
      `http://localhost:3000/recipeEntries/${iId}`,
      updatedRecipeData,
      // { headers }
      {}
    );
    return [response.data, true];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [error.response, false];
    } else {
      return [error, false];
    }
  }
};

// DELETE
export const deleteRecipe = async (iId: number) => {
  try {
    console.log(`http://localhost:3000/recipeEntries/${iId}`);
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Recipe> = await axios.delete(
      `http://localhost:3000/recipeEntries/${iId}`,
      // { headers }
      {}
    );
    return [response.data, true];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [error.response, false];
    } else {
      return [error, false];
    }
  }
};

// POST
export const createRecipe = async (recipeData: Recipe) => {
  try {
    console.log("http://localhost:3000/recipeEntries", recipeData);
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Recipe> = await axios.post(
      "http://localhost:3000/recipeEntries",
      recipeData,
      // { headers }
      {}
    );
    return [response.data, true];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [error.response, false];
    } else {
      return [error, false];
    }
  }
};
