# ToDoManagement

To Run this project, follow these steps:

## Option 1: Run projets directly

### Step 1: Start API
From the root directory:
1. ``` cd ToDoApi ```
2. Ensure you have .NET 8 installed. ```dotnet --version```
3. ```dotnet run ```

The project should be up and running on port 5203.

### Step 2: Run React app:
From the root directory:
1. ``` cd front-end ```
2. Install dependencies: ``` npm install ```. Please ensure that you have node installed.

3. Start the project:
``` npm start ```
4. Open browser, go to ```http://localhost:3000```
5. Username: test. Password: test
6. Enjoy 🥂.

## Option 2: Run through Docker
From the root directory:
1. ```docker compose build```
2. ```docker compose up```
3. Open browser, go to ```http://localhost:3000```. Refer to Option 1, Step 2, Step 5 for username and password.

Unit tests for API can be found at TodoApi.Tests project. To run the tests, simply jump to the test project and ```dotnet test```
