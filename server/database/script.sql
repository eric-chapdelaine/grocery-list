DROP DATABASE IF EXISTS grocery;
CREATE DATABASE grocery;

USE grocery;


## Schema ##

DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  instructions TEXT,
  prep_time_minutes INT,
  cook_time_minutes INT,
  servings INT
);

DROP TABLE IF EXISTS planned_meal;
CREATE TABLE planned_meal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  meal_type ENUM('Breakfast', 'Lunch', 'Dinner'),
  recipe INT,
  FOREIGN KEY (recipe) REFERENCES recipe(id)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE
);

DROP TABLE IF EXISTS item;
CREATE TABLE item (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) UNIQUE,
	category ENUM('Produce', 'Dairy', 'Meat', 'Baking', 'Other', 'Non-food')
);

DROP TABLE IF EXISTS recipe_made_up_of_item;
CREATE TABLE recipe_made_up_of_item (
	recipe INT,
	item INT,
	quantity DOUBLE,
	unit VARCHAR(255),
	FOREIGN KEY (recipe) REFERENCES recipe(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (item) REFERENCES item(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	PRIMARY KEY (recipe, item)
);

DROP TABLE IF EXISTS grocery_list;
CREATE TABLE grocery_list (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) UNIQUE
);

DROP TABLE IF EXISTS grocery_list_includes_item;
CREATE TABLE grocery_list_includes_item (
	id INT AUTO_INCREMENT PRIMARY KEY,
	grocery_list INT,
	item INT,
	picked_up BOOLEAN,
	quantity DOUBLE,
	unit VARCHAR(255),
	recipe INT,
	FOREIGN KEY (grocery_list) REFERENCES grocery_list(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (item) REFERENCES item(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (recipe) REFERENCES recipe(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
	);

## Functions & Procedures ##


## PlannedMeal

# CRUD

# Create
DROP PROCEDURE IF EXISTS CreatePlannedMeal;
DELIMITER $$
CREATE PROCEDURE CreatePlannedMeal(
	IN p_date DATE,
	IN p_meal_type ENUM('Breakfast', 'Lunch', 'Dinner'),
	IN p_recipe INT
)
BEGIN
  INSERT INTO planned_meal (`date`, meal_type, recipe)
  VALUES (p_date, p_meal_type, p_recipe);
END$$
DELIMITER ;


# Read
DROP PROCEDURE IF EXISTS GetAllPlannedMeals;

DELIMITER $$
CREATE PROCEDURE GetAllPlannedMeals()
BEGIN
  -- TODO: maybe include recipe name
  SELECT id, `date`, meal_type, recipe 
  FROM planned_meal;
END$$
DELIMITER ;


# Update
DROP PROCEDURE IF EXISTS UpdatePlannedMeal;
DELIMITER $$
CREATE PROCEDURE UpdatePlannedMeal(
	IN p_id INT,
	IN p_date DATE,
	IN p_meal_type ENUM('Breakfast', 'Lunch', 'Dinner'),
	IN p_recipe INT
)
BEGIN
	UPDATE planned_meal
	SET `date` = p_date,
		meal_type = p_meal_type,
		recipe = p_recipe
	WHERE id = p_id;
END$$
DELIMITER ;


# Delete
DROP PROCEDURE IF EXISTS DeletePlannedMeal;
DELIMITER $$
CREATE PROCEDURE DeletePlannedMeal(
	IN p_id INT
)
BEGIN
	DELETE FROM planned_meal
	WHERE id = p_id;
END$$
DELIMITER ;


## Recipe

# CRUD
# Create
# Read
# Update
# Delete

## Item

# CRUD
# Create
# Read
# Update
# Delete

DROP PROCEDURE IF EXISTS GetAllItems;

DELIMITER $$
CREATE PROCEDURE GetAllItems()
BEGIN
  SELECT * FROM item;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS UpdateItem;
DELIMITER $$
CREATE PROCEDURE UpdateItem (
	IN p_id INT,
	IN p_name VARCHAR(255)
)
BEGIN
  UPDATE item
  SET name = p_name
  WHERE id = p_id;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS DeleteItem;
DELIMITER $$
CREATE PROCEDURE DeleteItem (
	IN p_id INT
)
BEGIN
	DELETE FROM item
	WHERE id = p_id;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS CreateItem;
DELIMITER $$
CREATE PROCEDURE CreateItem (
	IN p_name VARCHAR(255),
	IN p_category ENUM('Produce', 'Dairy', 'Meat', 'Baking', 'Other', 'Non-food')
)
BEGIN
  INSERT INTO item (name, category) VALUES (p_name, p_category);
END$$
DELIMITER ;



## Grocery List

# CRUD
# Create
DROP PROCEDURE IF EXISTS CreateGroceryList;
DELIMITER $$
CREATE PROCEDURE CreateGroceryList(
  IN p_name VARCHAR(255)
)
BEGIN
  INSERT INTO grocery_list (name) VALUES (p_name);
END$$
DELIMITER ;

# Read
DROP PROCEDURE IF EXISTS GetAllGroceryLists;
DELIMITER $$
CREATE PROCEDURE GetAllGroceryLists()
BEGIN
  SELECT * FROM grocery_list;
END$$
DELIMITER ;
 

# Read
DROP PROCEDURE IF EXISTS GetGroceryListItems;
DELIMITER $$
CREATE PROCEDURE GetGroceryListItems(
  IN p_grocery_list INT
)
BEGIN
SELECT 
	   glii.id AS id,
	   i.name, 
	   i.category, 
	   glii.picked_up, 
	   glii.quantity, 
	   glii.unit, 
	   r.name AS recipe,
	   r.id AS recipe_id
	FROM grocery_list_includes_item AS glii
	LEFT JOIN item AS i
		ON glii.item = i.id
	LEFT JOIN recipe AS r
		ON r.id = glii.recipe
	WHERE glii.grocery_list = p_grocery_list;
END$$
DELIMITER ;

# Update
DROP PROCEDURE IF EXISTS UpdateGroceryList;
DELIMITER $$
CREATE PROCEDURE UpdateGroceryList(
  IN p_id INT,
  IN p_name VARCHAR(255)
)
BEGIN
  UPDATE grocery_list
  SET name = p_name
  WHERE id = p_id;
END$$
DELIMITER ;

# Delete
DROP PROCEDURE IF EXISTS DeleteGroceryList;
DELIMITER $$
CREATE PROCEDURE DeleteGroceryList(
  IN p_id INT
)
BEGIN
  DELETE FROM grocery_list
  WHERE id = p_id;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS AddItemToGroceryList;

DELIMITER $$
CREATE PROCEDURE AddItemToGroceryList(
  IN p_grocery_list INT,
  IN p_item INT,
  IN p_quantity DOUBLE,
  IN p_unit VARCHAR(255),
  IN p_recipe INT
)
BEGIN
  INSERT INTO grocery_list_includes_item (grocery_list, item, picked_up, quantity, unit, recipe)
  VALUES (p_grocery_list, p_item, 0, p_quantity, p_unit, CASE WHEN p_recipe IS NOT NULL THEN p_recipe ELSE NULL END);
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS DeleteInstanceOfItem;

DELIMITER $$
CREATE PROCEDURE DeleteInstanceOfItem(
	IN p_item_instance INT
)
BEGIN
	DELETE FROM grocery_list_includes_item
	WHERE id = p_item_instance;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateItemPickedUp(
	IN p_id INT,
	IN p_picked_up BOOLEAN
)
BEGIN
	UPDATE grocery_list_includes_item 
	SET picked_up = p_picked_up
	WHERE id = p_id;

END$$
DELIMITER ;


## Sample Data ##

INSERT INTO grocery_list (name) VALUES ("Roche Bros");
INSERT INTO grocery_list (name) VALUES ("Target");

INSERT INTO item (name, category) VALUES ("Scallion", "Produce");
INSERT INTO item (name, category) VALUES ("Cucumber", "Produce");
INSERT INTO item (name, category) VALUES ("Ground Beef", "Meat");
INSERT INTO item (name, category) VALUES ("Rice", "Other");
INSERT INTO item (name, category) VALUES ("Taco Seasoning", "Other");


INSERT INTO recipe  (name, instructions, prep_time_minutes, cook_time_minutes, servings)
VALUES ("Bibimbap Bowl", "Sample instructions for bibimbap", 30, 20, 4);

INSERT INTO recipe  (name, instructions, prep_time_minutes, cook_time_minutes, servings)
VALUES ("Taco Bowl", "Sample instructions for taco bowl", 20, 10, 4);

INSERT INTO grocery_list_includes_item (grocery_list, item, picked_up, quantity, unit, recipe)
VALUES (1, 1, false, 1, "Bunch", 1);

INSERT INTO grocery_list_includes_item (grocery_list, item, picked_up, quantity, unit, recipe)
VALUES (1, 3, true, 1, "lb", 1);

INSERT INTO grocery_list_includes_item (grocery_list, item, picked_up, quantity, unit, recipe)
VALUES (1, 3, true, 1, "lb", 2);

INSERT INTO planned_meal (date, meal_type, recipe)
VALUES ("2024-04-12", "Dinner", 1);

INSERT INTO planned_meal (date, meal_type, recipe)
VALUES ("2024-04-13", "Lunch", 2);

INSERT INTO recipe_made_up_of_item (recipe, item, quantity, unit)
VALUES (1, 1, 1, "Bunch");

INSERT INTO recipe_made_up_of_item (recipe, item, quantity, unit)
VALUES (1, 3, 1, "lb");

INSERT INTO recipe_made_up_of_item (recipe, item, quantity, unit)
VALUES (1, 4, 1.5, "cups");

INSERT INTO recipe_made_up_of_item (recipe, item, quantity, unit)
VALUES (2, 3, 1, "lb");

INSERT INTO recipe_made_up_of_item (recipe, item, quantity, unit)
VALUES (2, 5, 1, "lb");

INSERT INTO recipe_made_up_of_item (recipe, item, quantity, unit)
VALUES (2, 4, 1.5, "cups");

CALL GetGroceryListItems(1); 


# procedure - add recipe to grocery list
# input - recipe id, grocery list id
# actions 
#  - get all rows in recipe_made_up_of_item where recipe = input recipe id


# procedure - add new item

# function - get all planned meals

# procedure - change planned meal

# procedure - edit recipe

# procedure - edit item

# function - get all items in grocery list



