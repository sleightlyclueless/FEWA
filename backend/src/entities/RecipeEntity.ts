import { object, string } from "yup";
export class RecipeEntity {
  // rId: number;
  rName: string;
  rDescription: string;
  rImg: string;
  // createdAt: Date;
  // updatedAt: Date;

  constructor({ rName, rDescription, rImg }: createRecipeEntityDTO) {
    this.rName = rName;
    this.rDescription = rDescription;
    this.rImg = rImg;
  }
}

export type createRecipeEntityDTO = {
  rName: string;
  rDescription: string;
  rImg: string;
};

// Schemas fos usage with yup
export const createRecipeEntitySchema = object({
  rName: string().required(),
  rDescription: string().required(),
  rImg: string(),
}).noUnknown();

export const putRecipeEntitySchema = object({
  rName: string(),
  rDescription: string(),
  rImg: string(),
}).noUnknown();
