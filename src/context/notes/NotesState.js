import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NotesState = (props) => {
  // API CALL to fetch all note from backend
  const host = "http://localhost:5000";
  const notesOnitial = [];

  const [notes, setNotes] = useState(notesOnitial);
  // get all note
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application-json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    // showing the changes in frontend
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API CALL to add note to backend
    const url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    // console.log(json);

    // showing the changes in frontend
    setNotes(notes.concat(json));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API CALL to delete from backend
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const json = await response.json();
    console.log(json);

    // showing the changes in frontend
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    // console.log("deleeting the note with id" + id);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API CALL to edit a note in backend also
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // showing the changes in frontend
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    // <NoteContext.Provider value={{ first, updater }}>
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesState;
