const { userModel } = require('../models');

const userCtrl = {
	getUsers: async (req, res) => {
		try {
			if (req.params.id) {
				userModel.findOne({ _id: req.params.id }).exec((err, data) => {
					if (err) throw err;
					res.json(data);
				});
			} else {
				userModel.find().exec((err, data) => {
					if (err) throw err;
					res.json(data);
				});
			}
		} catch (err) {
			throw err;
		}
	},
	postUsers: (req, res) => {},
	putUsers: (req, res) => {},
	deleteUsers: (req, res) => {},
};

module.exports = userCtrl;
