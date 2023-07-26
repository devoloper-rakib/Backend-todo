const express = require('express');
const TodoModel = require('../model/TodoModel');
const ResponseHandler = require('../utlis/ResponseHandler');
const getALlTodo = async (req, res) => {
	try {
		const todos = await TodoModel.find();
		ResponseHandler(res, 200, 'Todo fetched successfully', true, todos);
	} catch (err) {
		ResponseHandler(res, 500, 'Something went wrong', false, err);
	}
};

const createTodo = async (req, res) => {
	console.log(req.body);

	const user = new TodoModel(req.body);

	try {
		await user.save();
		ResponseHandler(res, 200, 'Todo created successfully', true, user);
	} catch (err) {
		ResponseHandler(res, 500, 'Something went wrong', false, err);
	}
};

const getSingleTodo = async (req, res) => {
	console.log(req.params.id);

	try {
		const singleTodo = await TodoModel.findOne({ _id: req.params.id });
		ResponseHandler(res, 200, 'Todo fetched successfully', true, singleTodo);
	} catch (err) {
		ResponseHandler(res, 500, 'Something went wrong', false, err);
	}
};

const deleteSingleTodo = async (req, res) => {
	console.log(req.params.id);

	try {
		const deleteSingleTodo = await TodoModel.findByIdAndDelete({
			_id: req.params.id,
		});

		ResponseHandler(
			res,
			200,
			'Todo deleted successfully',
			true,
			deleteSingleTodo,
		);
	} catch (error) {
		ResponseHandler(res, 500, 'Something went wrong', false, err);
	}
};

const updateSingleTodo = async (req, res) => {
	console.log(req.params.id);

	try {
		const updateSingleTodo = await TodoModel.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: { ...req.body } },
			{ new: true },
		);

		if (!updateSingleTodo)
			return res.status(404).json({ message: 'Todo not found' });

		ResponseHandler(
			res,
			200,
			'Todo updated successfully',
			true,
			updateSingleTodo,
		);
	} catch (err) {
		ResponseHandler(res, 500, 'Something went wrong', false, err);
	}
};

module.exports = {
	getALlTodo,
	createTodo,
	getSingleTodo,
	deleteSingleTodo,
	updateSingleTodo,
};
