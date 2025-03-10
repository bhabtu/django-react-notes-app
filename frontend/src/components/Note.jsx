import React from "react";
import "../styles/Note.css";

function Note({ note, onUpdate, onDelete }) {
  // Format the note's creation date to a readable format
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>

      <div className="button-container">
        <button className="update-button" onClick={() => onUpdate(note)}>
          Update
        </button>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Note;
