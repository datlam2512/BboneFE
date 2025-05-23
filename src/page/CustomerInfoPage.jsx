import React from "react";
import { Helmet } from "react-helmet";
import CustomerInfo from "../section/CustomerInfo/CustomerInfoView";
function CustomerInfoPage() {
  return (
    <div>
      <Helmet>
        <title>Thông tin khách hàng</title>
      </Helmet>
      <CustomerInfo />
    </div>
  );
}

export default CustomerInfoPage;
