import React, { useContext, useEffect } from "react";
import MyContext from "../context/notes/noteContext";

function NoteCard({ note, updateNote }) {
  const { deleteNote, fetchData } = useContext(MyContext);
  const onDelete = () => {
    deleteNote(note._id);
  };
  const onUpdate = () => {
    updateNote(note);
  };
  // useEffect(() => {
  //   fetchData();
  // },[]);

  return (
    <div>
      <div className="card text-white bg-primary mb-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.body}</p>

          {/* using editing icon as an button  */}

          <a href="/" className="btn">
            <i className="fa-regular fa-pen-to-square" onClick={onUpdate}></i>
          </a>

          {/* using deleting icon as an button  */}
          <a href="/" className="btn">
            <i className="fa-solid fa-trash" onClick={onDelete}></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
