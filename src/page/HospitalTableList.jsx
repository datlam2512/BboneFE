import React from "react";
import { Helmet } from "react-helmet";
import HospitalListTable from "../section/HospitalList/HospitalListTable";
function HospitalListPage() {
  return (
    <div>
      <Helmet>
        <title>HospitalListTable</title>
      </Helmet>
      <HospitalListTable />
    </div>
  );
}

export default HospitalListPage;
