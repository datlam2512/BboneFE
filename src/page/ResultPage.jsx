import React from "react";
import  Result  from "../section/ResultPage/ResultView";
import { Helmet } from "react-helmet";
function ResultPage() {
  return (
    <div>
         <Helmet>
        <title>Result</title>
      </Helmet>
      <Result />
    </div>
  );
}

export default ResultPage;
