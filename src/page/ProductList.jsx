import React from "react";
import { Helmet } from "react-helmet";
import ProductListView from "../section/ProductListPage/views/ProductList";
function ProductList() {
  return (
    <div>
      <Helmet>
        <title>ProductList</title>
      </Helmet>
      <ProductListView />
    </div>
  );
}

export default ProductList;
