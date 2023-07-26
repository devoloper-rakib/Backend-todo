const { updateSingleTodo } = require('../TodoController/TodoController');

const router = require('express').Router();

router.put('/:id', updateSingleTodo);

module.exports = router;
