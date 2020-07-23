import React, { useEffect, useState } from 'react';
import { ListContainer, Search, Filter } from '../components/';
import { filters, maps } from '../util/';
import { instrumentList } from '../forms/';
import './studentRoster.css';
export default function StudentRoster({ students }) {
	const [list, setList] = useState([]);
	const [instruments, setInstruments] = useState({ guitar: false, piano: false });
	useEffect(() => {
		setList(students);
	}, [students]);
	const handleChange = (e) => {
		const { name, checked } = e.target;
		const obj = instruments;
		obj[name] = checked;
		setInstruments(obj);
		if (name && checked) {
			setList(filters.studentsByInstrument(students, name));
		} else {
			setList(students);
		}
	};
	return (
		<div className={'view'} id={'view_studentRoster'}>
			<h2>Student Roster</h2>
			<Search
				arr={students}
				search={filters.search}
				filter={filters.filterSearch}
				setState={setList}
			/>
			<div className={'roster'}>
				<Filter>
					<h3 className={"filter-title"}>Filters</h3>
					{maps.renderCheckboxes(instrumentList, instruments, handleChange)}
				</Filter>
				<ListContainer>{maps.renderProfile(list, maps.iterateProps)}</ListContainer>
			</div>
		</div>
	);
}
