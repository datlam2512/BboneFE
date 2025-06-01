import React from "react";
import  ConfirmPage  from "../section/ConfirmPage/views/ConfirmPage";
import { Helmet } from "react-helmet";
function ConfirmLoginPage() {
  return (
    <div>
         <Helmet>
        <title>ConfirmPage</title>
      </Helmet>
      <ConfirmPage />
    </div>
  );
}

export default ConfirmLoginPage;
