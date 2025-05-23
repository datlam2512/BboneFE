import React from "react";
import { Helmet } from "react-helmet";
import UserView from "../section/UserTablePage/UserTableView";
function UserTableView() {
  return (
    <div>
      <Helmet>
        <title>UserTable</title>
      </Helmet>
      <UserView />
    </div>
  );
}

export default UserTableView;
