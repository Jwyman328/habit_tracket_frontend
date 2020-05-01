import React, { useState, useContext, EventHandler } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import FlipCard from "../../components/general_components/flipCard";
import GuestAccessInfo from "../../forms/components/GuestAccessInfo";

//card background image links
import cardThreeLink from "../../imageLinks/cardImageLinks/cardThreeLink";
import cardTwoLink from "../../imageLinks/cardImageLinks/cardTwoLink";
import cardOneLink from "../../imageLinks/cardImageLinks/cardOneLink";
//import '../App.css';

//forms
import AuthPageForm from "../../forms/AuthPageForm";

//custom hooks
import useGetAuthState from "../customHooks/LoginPage/useGetAuthState";

// helper function
import fetchLogin from "../../utils/fetchDataHelperFunctions/fetchLogin";

//card
import LoginCard from "../../components/LoginPageComponents/LoginCard";
import LoginCardLogoLeft from "../../components/LoginPageComponents/LoginCardLogoLeft";
import LoginCardLogoRight from "../../components/LoginPageComponents/LoginCardLogoRight";
import CardTitle from '../../components/general_components/CardTitle';
/**
 * Allow a current user to login, by sending username, password and jwt token to DRF for authentication.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out.
 * @param {Func} props.logIn - Turns loggedIn to true, allowing user to access logged in only services.
 *
 */

 type LoginPageProps = {
  loggedIn: boolean;
 }

function LoginPage({loggedIn}:LoginPageProps) {

  const {
    usernamePassword,
    setUsernamePassword,
    inputChangeHandler,
    logIn,
  } = useGetAuthState();

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    fetchLogin(logIn, usernamePassword, 'sign_in');
  };
  return (
    <div className="loginPage">
      <br></br>
      <LoginCard>
        <LoginCardLogoLeft />
        <LoginCardLogoRight />
        <CardTitle titleText='Login' />

        <br></br>
        <GuestAccessInfo />

        <br></br>
        <AuthPageForm
          inputChangeHandler={inputChangeHandler}
          handleSubmit={handleSubmit}
        />
      </LoginCard>
      
      <div className="card-container">
        <FlipCard
          image={
            <img src="https://img.icons8.com/carbon-copy/100/000000/1-c.png" />
          }
          title={"set goals."}
          backImage={<img height="100%" width="100%" src={cardOneLink} />}
        />
        <FlipCard
          image={
            <img src="https://img.icons8.com/carbon-copy/100/000000/2-c.png" />
          }
          title={"Do."}
          backImage={<img height="100%" width="100%" src={cardTwoLink} />}
        />
        <FlipCard
          image={
            <img src="https://img.icons8.com/carbon-copy/100/000000/3.png" />
          }
          title={"Progress."}
          backImage={<img height="100%" width="100%" src={cardThreeLink} />}
        />
      </div>
      {loggedIn ? <Redirect to="/calender/" /> : null}
    </div>
  );
}

export default LoginPage;

LoginPage.propTypes = {
  logIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
