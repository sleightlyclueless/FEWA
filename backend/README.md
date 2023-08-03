# FWE-SS-23-769544 - BACKEND

## Set up the project ("beschreibt, wie die Applikation aufzusetzen ist")
0. Make sure your console is within the repository folder root

1. <b>Run docker container with postgres</b>
- `(docker-compose down)`
- `(docker system prune -a --volumes)`
- `docker-compose up -d`
<br>
2. <b>Move to this backend/ directory<br>(all following commands etc. happen here in the backend module / directory)</b>

- `cd backend/`
<br>
3. <b>Usually not in repository: Set up .env file in backend/.env with following two lines (without "- ")</b>
DATABASE_URL="postgresql://sebastian:fweSS22@localhost:5432/chefkochDB?schema=public" <br>
MY_JWT_SECRET = "MY_SECRET_SECRET"
<br><br>
4. <b>Install node modules from package.json</b>

- `npm i`
<br><br>
5. <b>Create Prisma DB</b>

- `npx prisma db push --schema=src/prisma/schema.prisma`
<br>

6. <b>Create Prisma Client</b>

- `npx prisma generate --schema=src/prisma/schema.prisma`
<br>

7. <b>Run node on localhost:3000</b>
Note: since these are permanent containers i suggest to use multiple vs terminals

- `npm run start:dev`
<br>
8. <b>Run Prisma Studio on localhost:5555</b>

- `npm run start:prisma`
<br>
9. <b>Create fresh DB Schema</b>

- `npm run schema:fresh`

### Now the project is set up and you have:<br>- a node backend running on <i>localhost:3000</i><br>- a database interface on <i>localhost:5555</i>
### You can now continue with the setup at ./frontend/README.md or continue reading about the explanation of the backend
===========================================================================<br>


## Test this project ("beschreibt wie die API getestet werden kann")
To test the application, there is a postman collection you can click through. You can also check out prismas <i>localhost:5555</i> to view the effect on the Database live!

1. Open Postman
<br>

2. Click on the "Hamburger"-Icon on the very top left "File->Import..."
<br>

3. Drag & Drop the /backend/testing.postman_collection-v2.1.json into the Window
- Shouldn´t be a problem, but if it does not work please also try the /backend/testing.postman_collection-v2.0.json
<br>

4. Click on left->collections and open the imported "Integration testing"
- Since as a bonus I included the authorization token from the classes you first <b>must</b> run "0-Register User" and "1-Login User". If you want you can take a look at an unauthorized access with "2-Unauthorized-no-jwt-token"
<br>

5. Now move through the folders 1-Recipe, 2-Ingredient, 3-CookingStep, 4-CustomRoutes, 5-ForeignkeyHandling from top to bottom and view the localhost:5555 for the database structure throughout the testing of hopefully all necessary cases.
<br>
Example Video ("Testingexample-Postman-Auth+Recipe.mp4"):<br>
<video width="320" height="240" controls>
  <source src="Testingexample-Postman-Auth+Recipe.mp4" type="video/mp4">
  Can´t load, please look at the video "Testingexample-Postman-Auth+Recipe.mp4" from the file structure
</video>
<b>NOTE post Frontend:</b> The authorizarion step is not required in postman anymore, but accessed later in the frontend to log a user in and register. Therefore the No Access Test will "return" ingredients now!


===========================================================================<br>
## Usage ("die Funktionalitäten beschreibt")
The contents inside this backend/ folder describe a REST API written in Node.js with Typescript and Express, handeling Data in a Database described here:
<img style="float: right;" src="DB-draft.png"><br><br>
With this API you can view (GET), create (POST), update (PUT) and delete (DELETE) data within this database via the Prisma ORM functionality implemented within this folders code. To do that you call different routes as follows in the next paragraph more in detail.
To achieve that we have following functionalities / folders, all located in /backend/src/.

<b>Preface</b>: The given folders and containing files each have the according functions
- <b>entities/</b>: Give a file structure including a node_module validator (yup) to use as schemas in the other files
- <b>prisma/</b>: Give interface functions to interact asynchronously with the database by selecting, updating, inserting or deleting according data
    - <b>prisma/prismaClient.ts</b>: Instance of PrismaClient, called and used within the DBInterfaces to communicate with the DB asynchronously.
- <b>controller/</b>: Strongly bound to the prisma DB Interface for the regarding entity. Checks user Input and calls DB actions depending on CRUD, it is called with (get, post, put, delete)
- <b>middleware/</b>: just for the authentication process - injects itself between controller / routers and checks if the user - jwt token is valid for usage, hence denies or grants access

==========<br><br>
- <b>DB initialization</b>: Is done over the ./prisma/schema.prisma file with the prisma node_module
- <b>User and Authorization</b>: Is done over entities/UserEntity.ts, prisma/userDBInterface.ts, controller/authController.ts, middleware/auth.ts
- <b>Recipe Selection, Creation, Updating and Deletion</b>: Is done over entities/RecipeEntity.ts, prisma/recipeDBInterface.ts, controller/recipeEntriesController.ts
- <b>Ingerdient Selection, Creation, Updating and Deletion</b>: Is done over entities/IngredientEntity.ts, prisma/ingredientDBInterface.ts, controller/ingredientEntriesController.ts
- <b>CookingSteps Selection, Creation, Updating and Deletion</b>: Is done over entities/CookingStepEntity.ts, prisma/cookingStepDBInterface.ts, controller/cookingStepEntriesController.ts

===========================================================================<br>
## API Routes ("die Struktur der Routen auflistet")
For now, the server runs on localhost:3000, and depending on the path you can manipulate the data in the database
- <b>localhost:3000/auth</b>
    - POST localhost:3000/auth/register: Register a new user with following data<br>
    `{"email" : "test@test.de","password":"test","fName":"Sebastian","lName":"Zill"}`

    - POST localhost:3000/auth/login: Login a registered user and get the jwt token to authorize access to following routes<br>
    `{"email": "test@test.de","password": "test"}`
<br>

- <b>localhost:3000/recipeEntries</b>
    - POST localhost:3000/recipeEntries: Create new recipe with following input options:<br>
    `{"rName" : "Nudelauflauf"}`
    `{"rName" : "Nudelauflauf","rDescription" : "Nudeln im Auflauf"}`
    `{"rName" : "Nudelauflauf","rDescription" : "Nudeln im Auflauf","rImg" : "path/to/img.png"}`
    <br>

    - GET localhost:3000/recipeEntries: Query recipes in three modes:<br>
        - localhost:3000/recipeEntries: Query all recipes<br>
        - localhost:3000/recipeEntries/1: Query recipe with id 1<br>
        - localhost:3000/recipeEntries/Nudelauflauf: Query recipe with name Nudelauflauf
    <br>

    - PUT localhost:3000/recipeEntries/2: Update data for recipe with id 2 with following input options:<br>
    `{"rName":"RecipeName","rDescription":"Pizza out of the freezer","rImg":"Pizza.png"}`
    `{"rName":"RecipeName","rDescription":"Pizza out of the freezer"}`
    `{"rName":"RecipeName","rImg":"Pizza.png"}`
    `{"rDescription":"Pizza out of the freezer","rImg":"Pizza.png"}`
    `{"rDescription":"Pizza out of the freezer"}`
    `{"rImg":"Pizza.png"}`
    <br>

    - DELETE localhost:3000/recipeEntries/:
        - localhost:3000/recipeEntries/2: Delete recipe with id 2<br>
    <br>
- <b>localhost:3000/ingredientEntries</b>
    - POST localhost:3000/ingredientEntries: Create new recipe with following input options:<br>
    `{"iName" : "Nudeln"}`
    <br>

    - GET localhost:3000/ingredientEntries: Query ingredients in three modes:<br>
        - localhost:3000/ingredientEntries: Query all ingredients
        - localhost:3000/ingredientEntries/1: Query ingredient with id
        - localhost:3000/ingredientEntries/Nudeln: Query ingredient with name Nudeln
    <br>

    - PUT localhost:3000/ingredientEntries/2: Update data for recipe with id 2 with following input options:<br>
    `{"iName":"IngredientName"}`
    <br>

    - DELETE localhost:3000/ingredientEntries:
        - localhost:3000/ingredientEntries/2: Delete ingredient with id 2<br>
    <br>
- <b>localhost:3000/cookingStepEntries</b>
    - POST localhost:3000/cookingStepEntries: Create new cooking steps with following input options (iId and rId have to exist, of course!):<br>
    `{"description" : "Tomaten hinzugeben", "unit" : "Stück", "amount" : "2", "rId" : 1, "iId" : 2}`
    <br>

    - GET localhost:3000/cookingStepEntries: Query cooking steps with following input options:<br>
        - `null`: Query all cooking steps
        - `{"rId" : 0}`: Query all cooking steps for recipe with id 0
        - `{"iId" : 0}`: Query all cooking steps for ingredient with id 0
    <br>

    - PUT localhost:3000/cookingStepEntries/2: Update data for cooking steps with id 2 with following input options (each field is optional - combinations as needed!):<br>
    `{"description" : "Tomaten hinzugeben", "unit" : "Stück", "amount" : "2", "rId" : 1, "iId" : 2}`
    <br>
    
    - DELETE localhost:3000/cookingStepEntries
        - localhost:3000/cookingStepEntries/2: Delete cooking steps with id 2
    <br>
- <b>localhost:3000/recipeEntriesForIngredient/ingredient</b>: Custom Route "Es soll eine Route geben die alle Rezepte in dem eine bestimmte Zutat existiert zurückgeben kann." - Get all recipes including their cooking steps for the ingredient "ingredient" by its name

## Archive - Long setup I did to get here
cd backend/<br>
npm init -y<br>
npm i express<br>
npm i ts-node<br>
npm i yup<br>
npm i typescript -D<br>
npm i ts-node -D<br>
npm i tsc-watch -D<br>
npm i @types/express -D<br>
npm i @types/node -D<br>
npm i @types/typescript -D<br>
npm i prisma ts-node<br>
npm i @prisma/client -D<br>
npx tsc --init