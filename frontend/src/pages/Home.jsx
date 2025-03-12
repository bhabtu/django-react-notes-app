import { useEffect } from "react";
import Note from "../components/Note";
import "../styles/Home.css";
import useNotes from "../hooks/useNotes";

function Home() {
  const {
    notesData: { notes, getNotes },
    formState: { content, title, editingNoteId, startEditing },
    noteActions: { createNote, updateNote, deleteNote },
    formHandlers: { handleTitleChange, handleContentChange },
  } = useNotes();

  // Fetch all user notes when the component mounts
  useEffect(() => {
    getNotes();
  }, []); // The effect runs once when the component mounts

  return (
    <div>
      <div className="form-container">
        <h2>{editingNoteId ? "Edit Your Note" : "Create a Note"}</h2>
        <form onSubmit={editingNoteId ? updateNote : createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={handleTitleChange}
            value={title}
            className="form-input"
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            onChange={handleContentChange}
            value={content}
            className="form-input"
          ></textarea>
          <br />
          <input
            type="submit"
            value={editingNoteId ? "Update Note" : "Create Note"}
            className="form-button"
          ></input>
        </form>
      </div>
      <div>
        {notes.length > 0 && <h2>Notes</h2>}
        <div className="notes-grid">
          {notes.map((note) => (
            <Note
              note={note}
              onUpdate={() => startEditing(note)}
              onDelete={() => deleteNote(note.id)}
              key={note.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
