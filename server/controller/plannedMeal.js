const express = require("express");
const connection = require("../utils")

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.execute('CALL GetAllPlannedMeals()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error getting planned meals"});
  }
})

router.post('/', async (req, res) => {
  try {
    const {date, meal_type, recipe_id} = req.body;
    const mysqlDate = new Date(date).toISOString().slice(0, 10);
    await connection.execute('CALL CreatePlannedMeal(?, ?, ?)', [mysqlDate, meal_type, recipe_id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error creating a new planned meal"});
  }
})

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {date, meal_type, recipe_id} = req.body;
    const mysqlDate = new Date(date).toISOString().slice(0, 10);
    await connection.execute('CALL UpdatePlannedMeal(?, ?, ?, ?)', [id, mysqlDate, meal_type, recipe_id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error updating planned meal"});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await connection.execute('CALL DeletePlannedMeal(?)', [id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error deleting planned meal"});
  }
})

module.exports = router;