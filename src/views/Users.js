import React, { useEffect, useState } from "react";
import { fetches, maps, filters } from "../util";
import { ListContainer, Search } from "../components";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetches.getUsers().then((res) => {
      setUsers(res.data);
      setList(res.data);
    });
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <Search arr={users} search={filters.search} filter={filters.filterSearch} setState={setList} />
      <ListContainer>{maps.renderProfile(list, maps.iterateProps)}</ListContainer>
    </div>
  );
}
