import React, { useEffect, useState } from "react";
import { ListContainer, Search, Filter } from "../components/";
import { filters, maps } from "../util/";
import { instrumentList } from "../forms/";
import "./studentRoster.css";
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
    <div>
      <h2>Student Roster</h2>
      <Search arr={students} search={maps.search} filter={filters.filterSearch} setState={setList} />
      <div className={"roster"}>
        <Filter>
          <h3>Filters</h3>
          {maps.renderCheckboxes(instrumentList, instruments, handleChange)}
        </Filter>
        <ListContainer>
          <form>{maps.renderProfile(list, maps.iterateProps)}</form>
        </ListContainer>
      </div>
    </div>
  );
}
