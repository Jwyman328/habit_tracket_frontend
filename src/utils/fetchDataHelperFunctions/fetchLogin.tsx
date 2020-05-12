import React from "react";
import { userNamePasswordModel } from "../../models/authModels/userNamePasswordModel";
import { loginHttpResponse } from "../../models/authModels/loginHttpResponseModel";

/**
 * Send request to sign_in page and recieve a jwt token in order to log in.
 *
 * Once the jwt token is reviece then the user may be logged in.
 */
const fetchLogin = async (loginUser:() => void, usernamePassword:userNamePasswordModel, urlExtension:string) => {
  let jsonUsername = JSON.stringify(usernamePassword);
  let loginResponse = await fetch(
    `https://shrouded-ravine-06737.herokuapp.com/${urlExtension}`,
    {
      method: "POST",
      mode: "cors",
      body: jsonUsername,
      headers: { "Content-Type": "application/json" },
    }
  );
  let jsonResponse:loginHttpResponse = await loginResponse.json();
  //add token to local storage and use for requests
  const token = jsonResponse.token;
  localStorage.setItem("token", token);
  if (token) {
    loginUser();
  }
};

export default fetchLogin;
