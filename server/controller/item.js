const express = require("express");
const connection = require("../utils");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.execute('CALL GetAllItems()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error getting all items"});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    await connection.execute('CALL UpdateItem(?, ?)', [id, name]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error updating item"});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await connection.execute('CALL DeleteItem(?)', [id]);
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error deleting item"});
  }
})

router.post('/', async (req, res) => {
  try {
    const {name, category} = req.body;
    await connection.execute('CALL CreateItem(?, ?)', [name, category])
    res.json({status: "Success"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Error creating a new item"});
  }
})

module.exports = router;