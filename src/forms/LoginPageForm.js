import React from 'react';

function LoginPageForm({inputChangeHandler, handleSubmit}) {


    return (
        <form onSubmit={handleSubmit}>
          <label>
            Username{" "}
            <input onChange={inputChangeHandler} type="text" name="username" />{" "}
          </label>
          <br></br>
          <label>
            Password{" "}
            <input
              onChange={inputChangeHandler}
              type="password"
              name="password"
            />{" "}
          </label>
          <br></br>
          <button className="custom-button" onClick={handleSubmit}>
            {" "}
            Log In{" "}
          </button>
        </form>
    );
}

export default LoginPageForm;