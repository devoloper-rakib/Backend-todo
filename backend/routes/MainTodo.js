const express = require('express');
const router = express.Router();
const GetALlTodos = require('../TodoRoutes/GetAllTodos');
const CreateTodo = require('../TodoRoutes/CreateTodo');
const FindSingleTodo = require('../TodoRoutes/FindSingleTodo');
const DeleteSingleTodo = require('../TodoRoutes/DeleteSingleTodo');
const updateSingleTodo = require('../TodoRoutes/updateSingleTodo');

router.use('/', GetALlTodos);
router.use('/create', CreateTodo);
router.use('/', FindSingleTodo);
router.use('/', DeleteSingleTodo);
router.use('/', updateSingleTodo);
module.exports = router;
