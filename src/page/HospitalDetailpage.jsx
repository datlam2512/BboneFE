import React from "react";
import { Helmet } from "react-helmet";
import HospitalDetail from "../section/HospitalDetailPage/HospitalDetailView";
function HospitalDetailpage() {
  return (
    <div>
      <Helmet>
        <title>HospitalDetail</title>
      </Helmet>
      <HospitalDetail />
    </div>
  );
}

export default HospitalDetailpage;
