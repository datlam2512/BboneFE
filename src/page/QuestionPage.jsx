import React from "react";
import  Question  from "../section/QuestionPage/QuestionView";
import { Helmet } from "react-helmet";
function QuestionPage() {
  return (
    <div>
         <Helmet>
        <title>Question</title>
      </Helmet>
      <Question />
    </div>
  );
}

export default QuestionPage;
