import React from "react";
import { Helmet } from "react-helmet";
import PaymentView from "../section/PaymentPage/PaymentView";
function PaymentPage() {
  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <PaymentView />
    </div>
  );
}

export default PaymentPage;
