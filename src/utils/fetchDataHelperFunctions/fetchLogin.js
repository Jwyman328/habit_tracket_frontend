import React from 'react';

/**
   * Send request to sign_in page and recieve a jwt token in order to log in.
   *
   * Once the jwt token is reviece then the user may be logged in.
   */
  const fetchLogin = async (loginUser,usernamePassword,urlExtension) => {
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
    let jsonResponse = await loginResponse.json();
    //add token to local storage and use for requests
    const token = jsonResponse.token;
    localStorage.setItem("token", token);
    if (token) {
        loginUser();
    }
  };

export default fetchLogin;