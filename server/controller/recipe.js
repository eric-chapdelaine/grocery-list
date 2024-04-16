const express = require("express");
const connection = require("../utils");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.execute('CALL GetRecipes()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error getting recipes"});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const [rows] = await connection.execute('CALL GetRecipe(?)', [id]);
    if (rows[0].length == 0) {
      res.status(404).json({error: "Recipe not found"});
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error getting recipe"});
  }
});

router.get('/:id/items', async (req, res) => {
  try {
    const {id} = req.params;
    const [rows] = await connection.execute('CALL GetItemsInRecipe(?)', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error getting items in recipe"});
  }
})

router.put('/:r_id/items/:i_id/', async (req, res) => {
  try {
    const {r_id, i_id} = req.params;
    const {new_quantity, new_unit} = req.body;
    await connection.execute('CALL UpdateItemInRecipe(?, ?, ?, ?)', [r_id, i_id, new_quantity, new_unit]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error updating item in recipe"});
  }
});

router.post('/:r_id/items', async (req, res) => {
  try {
    const {r_id} = req.params;
    const {item_id, quantity, unit} = req.body;
    await connection.execute('CALL AddItemToRecipe(?, ?, ?, ?)', [r_id, item_id, quantity, unit]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error adding the item to the recipe"});
  }
})

router.delete('/:r_id/items/:i_id', async (req, res) => {
  try {
    const {r_id, i_id} = req.params;
    await connection.execute('CALL DeleteItemFromRecipe(?, ?)', [r_id, i_id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error deleting the item from the recipe"});
  }
})

router.put(`/:r_id`, async (req, res) => {
  try {
    const {r_id} = req.params;
    const {name, prep_time_minutes, cook_time_minutes, servings, instructions} = req.body;
    await connection.execute('CALL UpdateRecipe(?, ?, ?, ?, ?, ?)', [r_id, name, prep_time_minutes, cook_time_minutes, servings, instructions]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error updating recipe"});
  }
});

router.delete(`/:r_id`, async (req, res) => {
  try {
    const {r_id} = req.params;
    await connection.execute('CALL DeleteRecipe(?)', [r_id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error deleting recipe"});
  }

});


// list all recipes - id, name, body, prep/cook time
// get recipe - id, name, body, prep/cook time
// get ingredients - by recipe id
// edit recipe
// delete recipe
// create recipe
// add ingredient to recipe

// CRUD - 

module.exports = router;