import React from "react";
import  ArticleDetail  from "../section/ArticlePage/ArticleView";
import { Helmet } from "react-helmet";
function ArticleDetailPage() {
  return (
    <div>
         <Helmet>
        <title>ArticleDetail</title>
      </Helmet>
      <ArticleDetail />
    </div>
  );
}

export default ArticleDetailPage;
