import React, { useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserList() {
  const { users, isLoading } = useContext(GithubContext);

  if (!isLoading) {
    return (
      <div className="grid gap-8 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserList;
