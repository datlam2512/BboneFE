import React from "react";
import { Helmet } from "react-helmet";
import ProductDetail from "../section/ProductDetailPage/ProductDetailView";
function ProductList() {
  return (
    <div>
      <Helmet>
        <title>ProductDetail</title>
      </Helmet>
      <ProductDetail />
    </div>
  );
}

export default ProductList;
