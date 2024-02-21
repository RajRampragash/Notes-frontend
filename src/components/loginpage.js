
import React, { useContext, useState } from "react";
// use history is not working
import { useHistory } from "react-router-dom";
// so using usenavigate
import { useNavigate } from "react-router-dom";

import MyContext from "../context/notes/noteContext";

function Loginpage() {
  // importing the context
  const { changeAuthToken } = useContext(MyContext);

  // getting the text which is inside the text box
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();

  const host = "http://localhost:8080";

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    try {
      const response = await fetch(`${host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
      });

      if (response.ok) {
        const auth_token = await response.json(); // parses JSON response into native JavaScript objects
        // changeAuthToken(auth_token);
        localStorage.setItem("auth_token", auth_token.authToken);
        console.log("auth_token extracted", localStorage.getItem("auth_token"));
        console.log(auth_token.status);
        if (auth_token.status === true) {
          alert(`Welcome ${email} `);
          navigate("/home");
          window.location.reload();
          console.log("Reload done in login page");
        } else {
          alert("Invalid credentials");
        }
      } else {
        console.log("Response from the server is :", response);
      }
    } catch (error) {
      console.log("Error from try block : ", error);
    }
  };

  // creating an Onclick function which will fetch the api and will get us a authentication token
  return (
    <div className="container">
      <h2 className="display-1 fs-1 ">Sign In</h2>
      <form>
        <div className="mb-3 my-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
            id="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Loginpage;