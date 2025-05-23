import React from "react";
import { Helmet } from "react-helmet";
import ProductTableView from "../section/ProductTablePage/ProductTableVIew";
function ProductList() {
  return (
    <div>
      <Helmet>
        <title>ProductTable</title>
      </Helmet>
      <ProductTableView />
    </div>
  );
}

export default ProductList;
