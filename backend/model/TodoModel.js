const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const todoSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: 'Please add a description',
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

const Todo = model('Todo', todoSchema);
module.exports = Todo;
