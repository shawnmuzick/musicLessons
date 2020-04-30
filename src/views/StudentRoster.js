import React, { useEffect, useState } from "react";
import { ListContainer, ListItem, Search } from "../components/";
import { filters, maps } from "../util/";
export default function StudentRoster({ students }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(students);
  }, [students]);
  const search = (arr, filter, query) => {
    return setList(arr.filter(filter(query)));
  };
  const renderStudents = (arr) => {
    return arr.map((s) => {
      return (
        <details>
          <summary>{`${s.fname} ${s.lname}`}</summary>
          <ListItem>
            <div className={"photoID"}>
              <img src={`/assets/img/students/${s._id}.jpg`} alt={`${s.fname}`} />
            </div>
            {maps.iterateProps(s)}
          </ListItem>
        </details>
      );
    });
  };
  return (
    <div>
      <h2>Student Roster</h2>
      <Search arr={students} search={search} filter={filters.filterSearch} />
      <ListContainer>{renderStudents(list)}</ListContainer>
    </div>
  );
}
