const express = require('express');
const router = express.Router();
const TodoListController = require('../controllers/TodoListsController');
const validation = require('../middleware/validation');
const todoListSchema = require('../schemas/todoList');

router
  .route('/')
  .get(TodoListController.getTodoLists)
  .post(
    validation(todoListSchema.create, 'body'),
    TodoListController.createTodoList
  );

router
  .route('/:id')
  .put(TodoListController.updateTodoList)
  .delete(TodoListController.deleteTodoList);

module.exports = router;
