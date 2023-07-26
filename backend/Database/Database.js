const mongoose = require('mongoose');

const connectDB = () => {
	mongoose
		.connect('mongodb://127.0.0.1:27017/todo-application')
		.then(() => console.log('MongoDB connected...'))
		.catch((err) => console.log(`MongoDB connection error: ${err}`));
};

module.exports = connectDB;
