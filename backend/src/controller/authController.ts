import { Router } from "express";
import { LoginSchema, RegisterUserDTO, RegisterUserSchema, User } from "../entities/UserEntity";
import { Auth } from "../middleware/auth";
import { createUsers, selectUserByEmail } from "../prisma/userDBInterface";

const router = Router({ mergeParams: true });

// Register a new user
router.post("/register", async (req, res) => {
  const validatedData = await RegisterUserSchema.validate(req.body).catch(
    (e) => {res.status(400).send({ errors: e.errors });}
  );
  if (!validatedData) return;

  const registerUserDto: RegisterUserDTO = {
    ...req.body,
    password: await Auth.hashPassword(req.body.password),
  };

  const user = await selectUserByEmail(req.body.email);
  if (user != undefined) return res.status(400).send({ errors: ["User already exists"] });

  const newUser = new User(registerUserDto);
  var users: User[] = [newUser];
  createUsers(users);

  return res.status(201).send(newUser);
});


// Login a user and assign a JWT
router.post("/login", async (req, res) => {
  const validatedData = await LoginSchema.validate(req.body).catch((e) => {
    res.status(400).send({ errors: e.errors });
  });
  if (!validatedData) return;

  // Check if user exists
  const user = await selectUserByEmail(validatedData.email);
  if (user == undefined) return res.status(400).json({ errors: ["User does not exist"] });

  // Check if password is correct
  const matchingPassword = await Auth.comparePasswordWithHash(
    validatedData.password,
    user.password
  );
  if (!matchingPassword) return res.status(401).send({ errors: ["Incorrect password"] });

  // Create JWT out of user data
  const jwt = Auth.generateToken({
    email: user.email,
    firstName: user.fName,
    id: user.uId,
    lastName: user.lName,
  });
  res.status(200).send({ accessToken: jwt });
});
// Decrypt / look at jwt data via https://jwt.io/

export const authController = router;