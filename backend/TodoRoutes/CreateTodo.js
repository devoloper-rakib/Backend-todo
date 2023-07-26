const express = require('express');
const { createTodo } = require('../TodoController/TodoController');
const router = express();

router.post('/', createTodo);

module.exports = router;
