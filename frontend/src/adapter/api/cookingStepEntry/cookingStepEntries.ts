import axios, { AxiosResponse } from "axios";
import { CookingStep } from "./CookingStep";

export const cookingStepEntriesQueryKey = "cookingStep-entries";

// GET
export const getAllCookingStepsByRecipe = async (
  rId: number
): Promise<[CookingStep[], boolean]> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const requestData = { rId: rId };

    console.log("http://localhost:3000/cookingStepEntries", requestData);
    const response: AxiosResponse<CookingStep[]> = await axios.get(
      "http://localhost:3000/cookingStepEntries",
      {
        //headers,
        params: requestData,
      }
    );

    return [response.data, true];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [[], false];
    } else {
      return [[], false];
    }
  }
};

// PUT
export const updateCookingStep = async (
  iId: number,
  updatedCookingStepData: CookingStep
) => {
  try {
    console.log(
      `http://localhost:3000/cookingStepEntries/${iId}`,
      updatedCookingStepData
    );
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<CookingStep> = await axios.put(
      `http://localhost:3000/cookingStepEntries/${iId}`,
      updatedCookingStepData,
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
export const deleteCookingStep = async (iId: number) => {
  try {
    console.log(`http://localhost:3000/cookingStepEntries/${iId}`);
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<CookingStep> = await axios.delete(
      `http://localhost:3000/cookingStepEntries/${iId}`,
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
export const createCookingStep = async (cookingStepData: CookingStep) => {
  try {
    console.log("http://localhost:3000/cookingStepEntries", cookingStepData);
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response: AxiosResponse<CookingStep> = await axios.post(
      "http://localhost:3000/cookingStepEntries",
      cookingStepData,
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
