import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col m-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="position-absolute top-0 end-0 mx-2">
            <i
              className="fa-regular fa-file-pen mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            <i
              onClick={() => {
                deleteNote(note._id);
              }}
              className="fa-solid fa-trash"
            ></i>
          </div>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
