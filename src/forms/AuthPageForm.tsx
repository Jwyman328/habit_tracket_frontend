import React from "react";

type AuthPageFormProps ={
  inputChangeHandler:Function;
  handleSubmit:  Function;
}
function AuthPageForm({ inputChangeHandler, handleSubmit }: AuthPageFormProps) {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        Username{" "}
        <input onChange={(e) => inputChangeHandler(e)} type="text" name="username" />{" "}
      </label>
      <br></br>
      <label>
        Password{" "}
        <input onChange={(e) => inputChangeHandler(e)} type="password" name="password" />{" "}
      </label>
      <br></br>
      <button className="custom-button" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </form>
  );
}

export default AuthPageForm;
