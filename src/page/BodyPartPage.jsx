import React from "react";
import  BodyPart  from "../section/BodyPartPage/BodyPartView";
import { Helmet } from "react-helmet";
function BodyPartPage() {
  return (
    <div>
         <Helmet>
        <title>BodyPart</title>
      </Helmet>
      <BodyPart />
    </div>
  );
}

export default BodyPartPage;
