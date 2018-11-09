const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const port = 3000;
const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(() => {
    res.send(todo);
  }, e => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({todos});
  }, e => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = {app};