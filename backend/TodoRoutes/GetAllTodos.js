const { getALlTodo, createTodo } = require('../TodoController/TodoController');

const router = require('express').Router();

router.get('/', getALlTodo);

module.exports = router;
