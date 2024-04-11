const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const CLIENT_URL = "http://localhost:3000";
// const CLIENT_URL = "http://192.168.1.157:3000";


app.use(
  cors({
    credentials: true,
    origin: [CLIENT_URL]
  }));

app.use(express.json());

// TODO: dummy data, replace with call to database
let lists = [
  {id: 0, name: "Roche Bros"},
  {id: 1, name: "Target"}
];

app.get('/grocery_list/get_lists', (req, res) => {
  res.send(lists);
});

app.post('/grocery_list/add_list', (req, res) => {
  lists.push({id: lists.length, name: req.body.name});
  res.send(lists);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});