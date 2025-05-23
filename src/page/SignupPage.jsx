import React from "react";
import { Helmet } from "react-helmet";
import RegisterView from "../section/RegisterPage/RegisterView";
function SignupPage() {
  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <RegisterView />
    </div>
  );
}

export default SignupPage;
