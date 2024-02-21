import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signupData, setSignUpData] = useState({
    sname: "",
    semail: "",
    spassword: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setSignUpData({ ...signupData, [e.target.name]: e.target.value });
  };

  //   Performing the API Calls
  const navigate = useNavigate();

  const apiCallSignUP = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: signupData.sname,
        email: signupData.semail,
        password: signupData.spassword,
      };
      const response = await fetch("http://localhost:4000/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        try {
          let auth_token = await response.json(); // parses JSON response into native JavaScript objects
          
          if(auth_token.status){
          alert(`Sign Up Successfull ${data.name}`);
          console.log(
            "New value of Authentication token from sign up from auth token api is : ",
            auth_token
          );
          navigate("/home");

          // MOST IMP SAVING TO A LOCAL STORAGE WITH THE NAME OF AUTH-LOGIN
          localStorage.setItem("signUpToken", auth_token);}
          else{
            alert(auth_token.message)
          }
        } catch (error) {
          alert("Please fill the details correctly");
        }

        // setNotes((prevNotes) => [...prevNotes, noteJson]);
      } else {
        console.log("Error Occurred:", response.statusText);
      }

      // setNotes(noteJson);
    } catch (error) {
      console.log("Error Occured :", error);
    }
  };

  return (
    <div className="container">
      <h2 className="display-1 fs-1">Sign Up </h2>

      <form>
        <div className="mb-3 my-4">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="sname"
            name="sname"
            aria-describedby="nameHelp"
            onChange={onChange}
          />
          <div id="nameHelp" className="form-text">
            Enter your full name.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="semail"
            name="semail"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="spassword"
            name="spassword"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputConfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="scpassword"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={apiCallSignUP}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
