import { useState } from "react";
import api from "../api";

// Custom hook for managing Notes state and CRUD operations
const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  
  // Fetches all notes from the backend
  const getNotes = () => {
    api
      .get("api/notes/") // Send GET request to API endpoint to fetch all user notes
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
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

  // Functions to populate or clear the form fields
  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const clearForm = () => {
    setEditingNoteId(null);
    setTitle("");
    setContent("");
  };

  // Functions to update title and content states
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return {
    notesData: { notes, getNotes },
    formState: { content, title, editingNoteId, startEditing },
    noteActions: { createNote, updateNote, deleteNote},
    formHandlers: { handleTitleChange, handleContentChange },
  };
}

export default useNotes;