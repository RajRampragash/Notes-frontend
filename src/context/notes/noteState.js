// Create a parent component that wraps child components with a Provider
import React, { useEffect, useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // importing the initial state of notes from the fetch api
  const auth_token = localStorage.getItem("auth_token");
  console.log("The value of auth-token inside note state", auth_token);

  const host = "http://localhost:8080";
  const [notes, setNotes] = useState([
    {
      title: "",
      body: "",
      tag: "",
      date: "",
      _id: "",
      user: "",
    },
  ]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/notes/api/fetchingNotes",
        {
          method: "GET",
          headers: {
            "auth-token": auth_token,
          },
        }
      );
      let noteJson = await response.json(); // parses JSON response into native JavaScript objects
      console.log(noteJson);
      setNotes(noteJson);
    } catch (error) {
      console.log("Error Occured :", error);
    }
  };

  // adding a note
  const addNote = async (title, body_, tag) => {
    // MAKING AN API CALL FOR GET NOTES
    try {
      const data = {
        title: title,
        body: body_,
        tag: tag,
      };
      const response = await fetch(
        "http://localhost:8080/notes/api/addingNotes",
        {
          method: "POST",
          headers: {
            "auth-token": auth_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        let noteJson = await response.json(); // parses JSON response into native JavaScript objects

        console.log(
          "New value of Authentication token which we get from auth token api is : ",
          authToken
        );

        // console.log("noteJson", await response.text());
        console.log("noteJson value from the api is : ", noteJson);
        // setNotes((prevNotes) => [...prevNotes, noteJson]);
        setNotes(notes.concat(noteJson));
      } else {
        console.log("Error Occurred:", response.statusText);
      }

      // setNotes(noteJson);
    } catch (error) {
      console.log("Error Occured :", error);
    }

    // UPDATING IT ON FRONT END
    // taking title, body, and tag from the api response
    // let updatednote = {
    //   tag: tag,
    //   title: title,
    //   body: body_,
    // };
    // setNotes(notes.concat(updatednote));

    // const noteJson = await response.json();
  };

  // Deleting a note
  const deleteNote = async (id) => {
    // Api Call
    try {
      const response = await fetch(`${host}/notes/api/deletingnotes/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": auth_token,
        },
      });

      let noteJson = await response.text(); // parses JSON response into native JavaScript objects
      console.log(noteJson);

      let updatedNote = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(updatedNote);
    } catch (error) {
      console.log("Error Occured :", error);
    }
  };

  // Updating a note
  const updateNoteInContext = async (id, title, body_, tag) => {
    // MAKING AN API CALL FOR GET NOTES
    try {
      const data = {
        title: title,
        body: body_,
        tag: tag,
      };
      console.log(
        "Updated values of id title body and tag inside the context of update Note context",
        data,
        id
      );

      const response = await fetch(`${host}/notes/api/updatingnotes/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": auth_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        let outputJson = await response.json(); // parses JSON response into native JavaScript objects
        console.log(
          "ye response hamme context ne diaa hea jisnme ek dam perfect call mari hea update api ko (expected output : id , name , title ): ",
          outputJson
        );

        console.log(
          "Aur ye wo data hea jo hamnne api mein bhega tha ye dekho notestate : ",
          data,
          id
        );
        // since noteJson does not have any _id we will give the normal id
        outputJson._id = id;

        console.log("noteJson value from the api is : ", outputJson);
        // setNotes((prevNotes) => [...prevNotes, noteJson]);

        // deleting the note with the following id as filter
        notes.filter((note) => {
          return note._id !== id;
        });

        // concating the new note to the previous notes
        setNotes(notes.concat(outputJson));
        console.log(
          "All the notes after appending this stupid data is : ",
          notes
        );
      } else {
        console.log(
          "Error Occurred big error vales are :",
          response.statusText
        );
      }

      // setNotes(noteJson);
    } catch (error) {
      console.log("Error Occured :", error);
    }
  };

  // FOR AUTHENTICATION PURPOSES
  const [authToken, setAuthToken] = useState("");

  const changeAuthToken = (authToken) => {
    setAuthToken(authToken);
  };

  return (
    <div>
      <NoteContext.Provider
        value={{
          notes,
          setNotes,
          addNote,
          fetchData,
          deleteNote,
          updateNoteInContext,
          changeAuthToken,
          authToken,
        }}
      >
        {props.children}
      </NoteContext.Provider>
    </div>
  );
};

export default NoteState;
