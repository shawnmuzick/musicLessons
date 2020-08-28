const { studentModel, lessonModel } = require('../models');
const fs = require('fs');
const lessonsCtrl = {
	getLessons: (req, res) => {
		if (req.params.id) {
			res.json([]);
		} else {
			lessonModel.find().exec((err, data) => {
				if (err) throw err;
				res.json(data);
			});
		}
		//placeholder
	},
	postLessons: (req, res) => {
		const { event, stID } = req.body;
		const {
			start,
			end,
			id,
			title,
			backgroundColor,
			borderColor,
			instrument,
			icon,
			rate,
		} = event;
		studentModel
			.updateOne(
				//find where lessons's child element that matches id
				{ _id: stID },
				{
					$push: {
						lessons: {
							title,
							id: id,
							start,
							end,
							backgroundColor,
							borderColor,
							instrument,
							icon,
							rate,
						},
					},
				}
			)
			.exec((err, success) => {
				if (err) throw err;
				if (!fs.existsSync('./logs')) {
					fs.mkdirSync('./logs');
				}
				fs.appendFile(
					'./logs/lesson.txt',
					` Added ID: ${JSON.stringify(id)}\t${JSON.stringify(
						success
					)}\n`,
					(err) => {
						if (err) throw err;
					}
				);
				console.log(success);
				res.json(success);
			});
	},
	updateLessons: (req, res) => {
		const {
			start,
			end,
			id,
			title,
			backgroundColor,
			borderColor,
			instrument,
			icon,
			rate,
		} = req.body.event;
		studentModel
			.updateOne(
				//find where lessons's child element that matches id
				{ lessons: { $elemMatch: { id: id } } },
				//set the first child of lessons that matches id, to {stuff in here}
				{
					$set: {
						'lessons.$': {
							title,
							id,
							start,
							end,
							backgroundColor,
							borderColor,
							instrument,
							icon,
							rate,
						},
					},
				}
			)
			.exec((err, success) => {
				if (err) throw err;
				if (!fs.existsSync('./logs')) {
					fs.mkdirSync('./logs');
				}
				fs.appendFile(
					'./logs/lesson.txt',
					`Updated ID: ${JSON.stringify(id)}\t${JSON.stringify(
						success
					)}\n`,
					(err) => {
						if (err) throw err;
					}
				);
				console.log(success);
				res.json(success);
			});
	},
	deleteLessons: (req, res) => {
		console.log(req.params.id);
		const id = req.params.id;
		studentModel
			//update the student, where the lesson is stored
			.updateOne(
				//find where lessons's child element that matches id
				{ lessons: { $elemMatch: { id: id } } },
				{ $pull: { lessons: { id: id } } }
			)
			.exec((err, success) => {
				if (err) throw err;
				if (!fs.existsSync('./logs')) {
					fs.mkdirSync('./logs');
				}
				fs.appendFile(
					'./logs/lesson.txt',
					`Deleted Lesson ID: ${JSON.stringify(id)}\t${JSON.stringify(
						success
					)}\n`,
					(err) => {
						if (err) throw err;
					}
				);
				console.log(success);
				res.json(success);
			});
	},
};

module.exports = lessonsCtrl;
