import { Student, Teacher, Event } from '../classes/classes';
import { fetches } from './fetches';
import { filters } from './filters';
import { maps } from './maps';

const cookie = {
	get: () => {
		return document.cookie;
	},
	set: (key, value) => {
		return (document.cookie = `${key}=${value}`);
    },
    //return browser cookies as object containing key/value pairs
	parse: () => {
		let arr = document.cookie.trim().split(';');
		let obj = arr.reduce((obj, pair) => {
			let current = pair.trim().split('=');
			obj[current[0]] = current[1];
			return obj;
		},{});
		return obj;
	},
};

export { fetches, maps, filters, cookie, Student, Teacher, Event };
