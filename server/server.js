const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const CLIENT_URL = "http://grocery-list-frontend";
const LOCAL_URL = "http://localhost:3000";


app.use(
  cors({
    credentials: true,
    origin: [CLIENT_URL, LOCAL_URL]
  }));

app.use(express.json());

const groceryListController = require("./controller/groceryList")
const itemController = require("./controller/item")
const recipeController = require("./controller/recipe")
const plannedMealController = require("./controller/plannedMeal")

app.use("/grocery_list", groceryListController);
app.use("/item", itemController);
app.use("/recipe", recipeController);
app.use("/planned_meal", plannedMealController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
