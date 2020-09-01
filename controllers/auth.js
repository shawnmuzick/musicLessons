module.exports = {
	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) {
			console.log('login check passed');
			return next(); //non-negotiable
		} else {
			console.log('login check failed');
			res.status(400).send({ message: 'You must be logged in!' });
			return;
		}
	},

	isAdmin: (req, res, next) => {
		if (req.user.role !== 'admin') {
			return next();
		} else {
			console.log('not an admin');
			res.status(400).send({ message: 'You must be an admin!' });
			return;
		}
	},
};
