const filters = {
	search: (arr, filter, query, setState) => {
		console.log(query);
		return setState(arr.filter(filter(query)));
	},

	studentsByTeacher: (arr, teacher) => {
		return arr.filter((s) => s.teacher._id === teacher._id);
	},

	studentsByInstrument: (arr, instrument) => {
		return arr.filter((s) => s.instrument === instrument.toLowerCase());
	},

	filterSearch: (query) => {
		if (!query || query === '') {
			return function (i) {
				return i;
			};
		}
		return function (s) {
			let found = false;
			const regex = new RegExp(`${query}`, 'gi');
			let fields = Object.entries(s).map((entry) => {
				if (typeof entry[1] === 'string') {
					return entry[1];
				}
				return null;
			});
			fields.forEach((f) => {
				if (typeof f !== 'string') {
					return;
				} else {
					if (f.match(regex) !== null) {
						found = true;
						return f;
					}
				}
			});
			return found;
		};
	},
};
export { filters };
