const { teacherModel } = require('../models');
const fs = require('fs');

const teacherCtrl = {
	getTeachers: async (req, res) => {
		try {
			if (req.params.id) {
				teacherModel.findOne({ _id: req.params.id }).exec((err, data) => {
					if (err) throw err;
					res.json(data);
				});
			} else {
				teacherModel.find().exec((err, data) => {
					if (err) throw err;
					res.json(data);
				});
			}
		} catch (err) {
			throw err;
		}
	},

	postTeacher: async (req, res) => {
		try {
			const { teacher, img } = req.body;
			const newTeacher = new teacherModel({ teacher });
			newTeacher.save((err, success) => {
				if (err) throw err;
				fs.writeFile(
					`./public/img/faculty/${success._id}.jpg`,
					img,
					{ encoding: 'base64' },
					(err) => {
						if (err) throw err;
					}
				);
				fs.appendFile(
					'./logs/teachers.txt',
					`Added Teacher: 
          ${JSON.stringify(success)}\n`,
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

	updateTeacher: async (req, res) => {
		try {
			const { teacher } = req.body;
			teacherModel
				.updateOne({ _id: teacher._id }, { teacher })
				.exec((err, success) => {
					if (err) throw err;
					res.json(success);
				});
		} catch (err) {
			throw err;
		}
	},

	deleteTeacher: async (req, res) => {
		try {
			teacherModel
				.findByIdAndDelete({ _id: req.params.id })
				.exec((err, success) => {
					if (err) throw err;
					fs.unlink(
						`./public/img/faculty/${req.params.id}.jpg`,
						(err) => {
							if (err) console.log(err);
						}
					);
					res.json(success);
				});
		} catch (err) {
			throw err;
		}
	},
};
module.exports = teacherCtrl;
