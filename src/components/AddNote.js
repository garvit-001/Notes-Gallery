import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1>Add your notes</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="your title here"
            onChange={onchange}
            name="title"
            required={true}
            minLength={5}
            value={note.title}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            onChange={onchange}
            name="description"
            required={true}
            minLength={5}
            value={note.description}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="tag">tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="your tag here"
            onChange={onchange}
            name="tag"
            required={true}
            minLength={5}
            value={note.tag}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={handleclick}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Add to list
        </button>
      </form>
      <h1> your notes are here</h1>
    </div>
  );
};

export default AddNote;
