const fs = require('fs');

const build_file_system = async (req, res, next) => {
	try {
		if (!fs.existsSync('./logs')) {
			fs.mkdirSync('./logs');
		}
		if (!fs.existsSync('./public/img')) {
			fs.mkdirSync('./public/img/students');
			fs.mkdirSync('./public/img/teachers');
			fs.mkdirSync('./public/img/user');
		}
	} catch (err) {
		throw err;
	}
	return next();
};

const logger = async (req, res, next) => {
	try {
		console.log('/users requester');
	} catch (err) {
		throw err;
	}
	return next();
};

module.exports = {
	build_file_system,
	logger,
};
