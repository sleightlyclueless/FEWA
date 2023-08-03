# FWE-SS-23-769544 - FRONTEND

## Set up the project ("beschreibt, wie die Applikation aufzusetzen ist")
0. First please install and turn on the backend, as it is required to use the vite frontend. The rest is much easier to start compared to the backend 


1. <b>Make sure you are in the frontend folder</b>
- `cd frontend/`
<br>

2. <b>Install node modules from package.json</b>
- `npm i`
<br>

3. <b>Start the project</b>
- `npm run start:dev`

### Now the project is set up and you have:<br>- the frontend running on <i>localhost:5173</i> and hopefully correctly communicating with the backend API
===========================================================================<br>


## Test this project ("beschreibt wie die API getestet werden kann")
To test the application, click yourselve through the frontend and follow its instructions!<br>
You can check out changes on the database directly on prismas interface at localhost:5555 and check the console.log and console.error on your browser, as well as the Toast messages catching user input errors etc. <br>
You can also check out this Example Video ("Anwendungsbeispiel.mp4") to check an example of how the frontend is used together with the already set up backend:<br>
<video width="320" height="240" controls>
  <source src="Anwendungsbeispiel.mp4" type="video/mp4">
  Can´t load, please look at the video "Anwendungsbeispiel.mp4" from the file structure
</video>
Note: I sadly could not figure out why the recipes do not refresh yet, eventhough I set up and called a refresh value...
===========================================================================<br>

## Usage ("die Funktionalitäten beschreibt")
The contents inside this fontend/ folder describe a Frontend, communicating with the REST API written in the backend folder, using the React.js Framework with Typescript.

<b>Preface</b>: The given folders and containing files each have the according functions located in ./frontend/src
- <b>adapter/api/</b>: Contains Entities and API calls to the backend API at localhost/3000 needed for the frontend functionality regarding the ingredient and recipe - cookingstep communication <br>
The openapi functionalities have been opted out for complexity reasoning<br>
- <b>components/</b>: The Authentication card layout is located here seperately and called by the LoginPage.tsx and RegisterPage.tsx
- <b>hooks/</b>: Called by the AuthProvider.tsx - we have a Hook to access with R/W to the localstorage
- <b>layout/</b>: Giving specific styles around the page within the "AppLayout" tags, this folder contains stylings especially for the header shown on each page
- <b>pages/</b>: The core functionality together with the adapter/api/ content.
    - index.tsx: The starting point of the website, explaining its following content and providing quicklinks
    - xxxPage.tsx: Declares the Page Layout as well as the implemented functions for fetching and deleting the data. Update and Create is done through their own Modals / Forms.
    - ModalComponents/CreatexxxModal.tsx: Declares the Modal for Creating a new element for the Database of the respective component.
    - ModalComponents/UpdatexxxModal.tsx: Declares the Modal for Updating a new element for the Database of the respective component. Basically the same as the Create Modal but not required inputfields and preloading existent data into the fields
    - TableComponents/xxxTable.tsx: Declares a basic data structure for showing one Table entry of the respective Entity (Ingredient, Recipe or CookingSteps) and is accessed and loaded data into inside the pages. 
- <b>provider/</b>: Providing an interface between LocalStorage of the users browser and the authorization
- <b>App, AppRoutes, main/</b>: Providing the base of the project via vite contents<br>
==========<br><br>

## Archive - Long setup I did to get here
cd frontend/<br>
npm create vite@latest / -- --template react-ts<br>
npm i<br>
((edit package.json with namespaces used in backend))
npm run start:build<br>
npm run start:dev<br>