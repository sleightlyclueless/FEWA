import { object, string } from "yup";
export class IngredientEntity {
  iId: number;
  iName: string;

  constructor({ iId, iName }: createIngredientEntityDTO) {
    this.iId = iId;
    this.iName = iName;
  }
}

export type createIngredientEntityDTO = {
  iId: number;
  iName: string;
};

// Schemas fos usage with yup
export const createIngredientEntitySchema = object({
  iName: string().required(),
}).noUnknown();

export const putIngredientEntitySchema = object({
  iName: string(),
}).noUnknown();
