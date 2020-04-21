import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";


// helper function
import fetchLogin from "../../utils/fetchDataHelperFunctions/fetchLogin";

//card 
import SignUpCard from "../../components/LoginPageComponents/LoginCard";
import SignUpCardLogoLeft from "../../components/LoginPageComponents/LoginCardLogoLeft";
import SignUpCardLogoRight from "../../components/LoginPageComponents/LoginCardLogoRight";
import CardTitle from '../../components/general_components/CardTitle';

//custom hooks 
import useGetAuthState from "../customHooks/LoginPage/useGetAuthState";

//form
import AuthPageForm from "../../forms/AuthPageForm";


/**
 * Allow someone to create a new user, by sending a new username, and password to recieve a JWT token.
 * Log in the user after new user is created.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out.
 * @param {Func} props.logIn - Turns loggedIn to true, allowing user to access logged in only services.
 *
 */
function SignUpPage(props) {
  const {
    usernamePassword,
    setUsernamePassword,
    inputChangeHandler,
    logIn,
  } = useGetAuthState();


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin(logIn, usernamePassword, 'sign_up');
  };
  return (
    <div className="loginPage">
      <br></br>
      <SignUpCard>
        <SignUpCardLogoLeft />
        <SignUpCardLogoRight />
        <CardTitle titleText='Sign Up' />
        <AuthPageForm
          inputChangeHandler={inputChangeHandler}
          handleSubmit={handleSubmit}
        />
      </SignUpCard>
      {props.loggedIn ? <Redirect to="/home" /> : null}
    </div>
  );
}
export default SignUpPage;

SignUpPage.propTypes = {
  logIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
