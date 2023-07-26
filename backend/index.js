const express = require('express');
const connectDB = require('./Database/Database');
const app = express();
const port = 5000;
const MainTodo = require('./routes/MainTodo');
const cors = require('cors');
// middleWare
app.use(express.json());
app.use(cors());
// database connection
connectDB();

// routes
app.use('/api/v1/todo', MainTodo);

// health check
app.get('/health', (req, res) => {
	res.status(200).json({
		message: 'server is okay',
		statusCode: 200,
	});
});

// todo : server listen
app.listen(port, () => console.log(`server is running on port ${port}`));
