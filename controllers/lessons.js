const { lessonModel } = require('../models');
const fs = require('fs');

const lessonsCtrl = {
	getLessons: async (req, res) => {
		try {
			if (req.params.id) {
				lessonModel.findById({ _id: req.params.id }).exec((err, data) => {
					if (err) throw err;
					res.json(data);
				});
			} else {
				lessonModel.find().exec((err, data) => {
					if (err) throw err;
					res.json(data);
				});
			}
		} catch (err) {
			throw err;
		}
	},

	postLessons: async (req, res) => {
		try {
			const { lesson } = req.body;
			const newLesson = new lessonModel(lesson);
			newLesson.save((err, success) => {
				if (err) throw err;
				res.json(success);
			});
		} catch (err) {
			throw err;
		}
	},

	updateLessons: (req, res) => {
		try {
			const { lesson } = req.body;
			lessonModel
				.findByIdAndUpdate({ _id: lesson._id }, { lesson })
				.exec((err, success) => {
					if (err) throw err;
					if (!fs.existsSync('./logs')) {
						fs.mkdirSync('./logs');
					}
					fs.appendFile(
						'./logs/lesson.txt',
						`${JSON.stringify(success)}\n`,
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

	deleteLessons: async (req, res) => {
		try {
			lessonModel.findByIdAndDelete({ _id: req.params.id }).exec((err, data) => {
				if (err) throw err;
				res.json(data);
			});
		} catch (err) {
			throw err;
		}
	},
};

module.exports = lessonsCtrl;
