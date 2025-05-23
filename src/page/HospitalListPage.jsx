import React from "react";
import { Helmet } from "react-helmet";
import HospitalListView from "../section/HospitalPage/HospitalListView";
function HospitalListPage() {
  return (
    <div>
      <Helmet>
        <title>HospitalListView</title>
      </Helmet>
      <HospitalListView />
    </div>
  );
}

export default HospitalListPage;
