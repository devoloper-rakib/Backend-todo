const ResponseHandler = (res, code, status, data, message) => {
	res.status(code).json({
		message,
		status,
		data,
	});
};

module.exports = ResponseHandler;
