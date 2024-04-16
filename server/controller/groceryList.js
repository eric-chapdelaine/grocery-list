const express = require("express");

const connection = require("../utils");

const router = express.Router();


// read
router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.execute('CALL GetAllGroceryLists()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error getting grocery lists"});
  }
});

// read
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await connection.execute('CALL GetGroceryListItems(?)', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error fetching grocery list items"});
  }
});

// create
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    await connection.execute('CALL CreateGroceryList(?)', [name]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error creating grocery list"});
  }
});

// update
router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    await connection.execute('CALL UpdateGroceryList(?, ?)', [id, name]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error updating grocery list"});
  }
});

// delete
router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await connection.execute('CALL DeleteGroceryList(?)', [id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error deleting grocery list"});
  }
});

// Create - add an item to a grocery list
router.post('/:id/items', async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId, quantity, unit, recipeId } = req.body;
    let recipe = null;
    if (recipeId !== undefined) {
      recipe = recipeId;
    }

    await connection.execute('CALL AddItemToGroceryList(?, ?, ?, ?, ?)', [
      id,
      itemId,
      quantity,
      unit,
      recipe || null
    ]);
    const [rows] = await connection.execute('CALL GetGroceryListItems(?)', [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding item to grocery list' });
  }
});

// Delete - remove an item from a grocery list
router.delete('/item/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await connection.execute('CALL DeleteInstanceOfItem(?)', [id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error removing item from grocery list' });
  }
});

router.post('/item/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {picked_up} = req.body;
    await connection.execute('CALL UpdateItemPickedUp(?, ?)', [id, picked_up]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error picking up item"});
  }
})

router.post('/:id/recipe', async (req, res) => {
  try {
    const {id} = req.params;
    const {r_id} = req.body;
    await connection.execute('CALL AddRecipeToGroceryList(?, ?)', [id, r_id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error adding the recipe to the grocery list"});
  }
})

module.exports = router;