const router = require('express').Router();
const { deleteSingleTodo } = require('../TodoController/TodoController');

router.delete('/:id', deleteSingleTodo);

module.exports = router;
