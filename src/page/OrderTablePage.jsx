import React from "react";
import { Helmet } from "react-helmet";
import OrderPage from "../section/OrderPage/OrderView";
function OrderTablePage() {
  return (
    <div>
      <Helmet>
        <title>OrderTablePage</title>
      </Helmet>
      <OrderPage />
    </div>
  );
}

export default OrderTablePage;
