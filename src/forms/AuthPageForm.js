import React from "react";

function AuthPageForm({ inputChangeHandler, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username{" "}
        <input onChange={inputChangeHandler} type="text" name="username" />{" "}
      </label>
      <br></br>
      <label>
        Password{" "}
        <input onChange={inputChangeHandler} type="password" name="password" />{" "}
      </label>
      <br></br>
      <button className="custom-button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default AuthPageForm;
