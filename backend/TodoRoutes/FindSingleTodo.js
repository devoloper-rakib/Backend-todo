const { getSingleTodo } = require('../TodoController/TodoController');

const router = require('express').Router();

router.get('/:id', getSingleTodo);

module.exports = router;
