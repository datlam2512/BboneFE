import React from "react";
import { Helmet } from "react-helmet";
import HospitalBookingView from "../section/HospitalBookingPage/HospitalBookingView";
function HospitalBookingPage() {
  return (
    <div>
      <Helmet>
        <title>HospitalBookingView</title>
      </Helmet>
      <HospitalBookingView />
    </div>
  );
}

export default HospitalBookingPage;
