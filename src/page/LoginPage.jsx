import React from "react";
import { Helmet } from "react-helmet";
import LoginView from "../section/LoginPage/LoginView";
function LoginPage() {
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginView />
    </div>
  );
}

export default LoginPage;
