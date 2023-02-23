import React from "react";
import AuthForm from "../components/authForm";

const Register = () => {
  return (
    <AuthForm
      children="Sign Up"
      href="/singin"
      link="You already have an account?"
      reqLink="http://localhost:3000/auth/register/"
    />
  );
};

export default Register;
