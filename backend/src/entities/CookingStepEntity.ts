import { object, string, number } from "yup";
export class CookingStepEntity {
  // cId: number;
  description: string;
  unit: string;
  amount: string;
  rId: number;
  iId: number;

  constructor({
    description,
    unit,
    amount,
    rId,
    iId,
  }: createCookingStepEntityDTO) {
    this.description = description;
    this.unit = unit;
    this.amount = amount;
    this.rId = rId;
    this.iId = iId;
  }
}

export type createCookingStepEntityDTO = {
  description: string;
  unit: string;
  amount: string;
  rId: number;
  iId: number;
};

// Schemas fos usage with yup
export const createCookingStepEntitySchema = object({
  description: string().required(),
  unit: string().required(),
  amount: string().required(),
  rId: number().required(),
  iId: number().required(),
}).noUnknown();

export const putCookingStepEntitySchema = object({
  description: string(),
  unit: string(),
  amount: string(),
  rId: number(),
  iId: number(),
}).noUnknown();
