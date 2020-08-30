const { studentModel } = require('../models');
const fs = require('fs');

const studentCtrl = {
	getStudents: async (req, res) => {
		try {
			if (req.params.id) {
				studentModel.findOne({ _id: req.params.id }).exec((err, data) => {
					if (err) throw err;
					res.json(data);
				});
			} else {
				studentModel.find().exec((err, data) => {
					if (err) throw err;
					res.json(data);
				});
			}
		} catch (err) {
			throw err;
		}
	},

	postStudents: async (req, res) => {
		try {
			const { s, img } = req.body;
			delete s._id;
			const newStudent = new studentModel(s);
			newStudent.save((err, success) => {
				if (err) throw err;
				fs.writeFile(
					`./public/img/students/${success._id}.jpg`,
					img,
					{ encoding: 'base64' },
					(err) => {
						if (err) throw err;
					}
				);
				fs.appendFile(
					'./logs/students.txt',
					`Added Student: ${JSON.stringify(success)}\n`,
					(err) => {
						if (err) throw err;
					}
				);
				res.json(success);
			});
		} catch (err) {
			throw err;
		}
	},

	updateStudents: async (req, res) => {
		try {
			const { student } = req.body;
			studentModel
				.findByIdAndUpdate({ _id: student._id }, { student })
				.exec((err, success) => {
					if (err) throw err;
					res.json(success);
				});
		} catch (err) {
			throw err;
		}
	},

	deleteStudents: async (req, res) => {
		try {
			studentModel
				.findByIdAndDelete({ _id: req.params.id })
				.exec((err, success) => {
					if (err) throw err;
					fs.unlink(
						`./public/img/students/${req.params.id}.jpg`,
						(err) => {
							if (err) throw err;
						}
					);
					res.json(success);
				});
		} catch (err) {
			throw err;
		}
	},
};
module.exports = studentCtrl;
