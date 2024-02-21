import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../context/notes/noteContext";

function NoteForm() {
    //  useEffect(() => {
    //     fetchData(); // this will call the fetchData before rendering
    //   },[]); 
  // context variables a
  const { notes, addNote, fetchData, updateNoteInContext } =
    useContext(MyContext);

  // creating an onchange function

  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.value); // this will be the text inside the form input
    // setText is the state variable
    setText({ ...text, [e.target.name]: e.target.value }); //main logic
    console.log(text);
  };

  // creating an settingNote function

  const [text, setText] = useState({ title: "", body: "", tag: "" });

  const settingNote = (e) => {
    e.preventDefault();
    // getting all the values that were inside the text boxes
    const { title, body, tag } = text;

    addNote(title, body, tag);
    console.log("Note value returned by the form ", text);
    setText({ title: "", body: "", tag: "" });
  };

  return (
    <>
      <div className="container mt-4">
        <div className="jumbotron">
          <h1 className="display-4">Add a Note</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={onChange}
                value={text.title}
                required  
              />
            </div>

            <div className="mb-3">
              <label htmlFor="body" className="form-label">
                Body
              </label>
              <textarea
                className="form-control"
                id="body"
                name="body"
                onChange={onChange}
                rows="3"
                value={text.body}
                required 
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                onChange={onChange}
                name="tag"
                value={text.tag}
                required 
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label
                className="form-check-label"
                htmlFor="exampleCheck1"
              ></label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={settingNote}
              disabled={
                text.title.length < 3 || text.body.length < 3 ? true : false
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NoteForm;
