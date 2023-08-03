import { object, string } from 'yup';

export class User {
  uId: string;
  email: string;
  password: string;
  fName: string;
  lName: string;

  constructor({ uId, lName, fName, email, password }: RegisterUserDTO) {
    this.uId = uId;
    this.email = email;
    this.password = password;
    this.fName = fName;
    this.lName = lName;
  }
}

export const RegisterUserSchema = object({
  email: string().required(),
  password: string().required(),
  fName: string().required(),
  lName: string().required(),
});

export type RegisterUserDTO = {
  uId: string;
  email: string;
  password: string;
  fName: string;
  lName: string;
};

export const LoginSchema = object({
  email: string().required(),
  password: string().required(),
});

