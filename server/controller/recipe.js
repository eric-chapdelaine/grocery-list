const express = require("express");

const router = express.Router();

// TODO: dummy data, replace with call to database
let lists = [
  {id: 0, name: "Roche Bros"},
  {id: 1, name: "Target"}
];

router.get('/get_lists', (req, res) => {
  res.send(lists);
});

router.post('/add_list', (req, res) => {
  lists.push({id: lists.length, name: req.body.name});
  res.send(lists);
});

modules.exports = router;