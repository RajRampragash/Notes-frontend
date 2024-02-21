import "./App.css";
import About from "./components/about";
import Home from "./components/home";
import Navbar from "./components/navbar";

import { Routes, Route, useNavigate } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Alert from "./components/alert";
import { useContext, useEffect, useState } from "react";
import Loginpage from "./components/loginpage";
import Signup from "./components/signup";
import MyContext from "../src/context/notes/noteContext";

function App() {
  // creating a state for alert message
  const [alertstatus, SetAlertStatus] = useState(true);
  function status() {
    {
      setTimeout(() => {
        SetAlertStatus(false);
      }, 1000);
    }
  }

 
  return (
    <>
      {/* for using context api  */}
      <NoteState>
        {/* your normal code  */}
        <Navbar />
        <Alert message={"Hi, this is a simple alert message"} />;
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
