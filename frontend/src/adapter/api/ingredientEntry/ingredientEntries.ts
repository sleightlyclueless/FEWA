import axios, { AxiosResponse } from "axios";
import { Ingredient } from "./Ingredient";

export const ingredientEntriesQueryKey = "ingredient-entries";

// GET
export const getAllIngredients = async (): Promise<[Ingredient[], boolean]> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Ingredient[]> = await axios.get(
      "http://localhost:3000/ingredientEntries",
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

export const getIngredient = async (id: number): Promise<Ingredient | null> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Ingredient> = await axios.get(
      `http://localhost:3000/ingredientEntries/${id}`,
      // { headers }
      {}
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch ingredient:", error.response);
    } else {
      console.error("Failed to fetch ingredient:", error);
    }

    return null;
  }
};

// PUT
export const updateIngredient = async (
  iId: number,
  updatedIngredientData: Ingredient
) => {
  try {
    console.log(
      `http://localhost:3000/ingredientEntries/${iId}`,
      updatedIngredientData
    );
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Ingredient> = await axios.put(
      `http://localhost:3000/ingredientEntries/${iId}`,
      updatedIngredientData,
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
export const deleteIngredient = async (iId: number) => {
  try {
    console.log(`http://localhost:3000/ingredientEntries/${iId}`);
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Ingredient> = await axios.delete(
      `http://localhost:3000/ingredientEntries/${iId}`,
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
export const createIngredient = async (ingredientData: Ingredient) => {
  try {
    console.log("http://localhost:3000/ingredientEntries", ingredientData);
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<Ingredient> = await axios.post(
      "http://localhost:3000/ingredientEntries",
      ingredientData,
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
