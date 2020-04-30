import React, { useEffect, useState } from "react";
import { fetches, maps } from "../util";
import { ListContainer, ListItem } from "../components";
export default function Users() {
  const [users, getUsers] = useState([]);
  useEffect(() => {
    fetches.getUsers().then((res) => {
      console.log(res);
      getUsers(res.data);
    });
  },[]);
  const renderUsers = () => {
    console.log(users);
    return users.map((u) => {
      return <ListItem key={u._id}>{maps.iterateProps(u)}</ListItem>;
    });
  };
  return (
    <div>
      <h2>Users</h2>
      <ListContainer>{renderUsers()}</ListContainer>
    </div>
  );
}
