import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Fetch all user notes when the component mounts
  useEffect(() => {
    getNotes();
  }, []); // Empty dependency array ensures it runs only once

  const getNotes = () => {
    api
      .get("api/notes/") // Send GET request to API endpoint to fetch all user notes
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          getNotes();
        } else {
          alert("Failed to delete note.");
          console.error("Failed to delete note", res);
        }
      })
      .catch((error) => {
        alert(error);
        console.error("Error deleting note:", error);
      });
  };

  const clearForm = () => {
    setEditingNoteId(null);
    setTitle("");
    setContent("");
  };

  const createNote = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          clearForm();
          getNotes();
        } else {
          alert("Failed to create note.");
          console.error("Failed to create note", res);
        }
      })
      .catch((err) => {
        alert(err);
        console.error("Error creating note:", err);
      });
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const updateNote = (e) => {
    e.preventDefault();
    api
      .put(`/api/notes/update/${editingNoteId}/`, { content, title })
      .then((res) => {
        if (res.status === 200) {
          clearForm();
          getNotes();
        } else {
          alert("Failed to update note");
          console.error("Failed to update note", res);
        }
      })
      .catch((err) => {
        alert(err);
        console.error("Error updating note:", err);
      });
  };

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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-input"
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            onChange={(e) => setContent(e.target.value)}
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
              onUpdate={startEditing}
              onDelete={deleteNote}
              key={note.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
