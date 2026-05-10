/* ============================================
   Notes Service — API calls for travel journal
   and notes management.
   Currently uses localStorage.
   Ready for backend integration.
   ============================================ */

import api from './api';

/**
 * Get all notes for the current user.
 */
export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

/**
 * Get a single note by ID.
 */
export const getNote = async (noteId) => {
  const response = await api.get(`/notes/${noteId}`);
  return response.data;
};

/**
 * Create a new note.
 */
export const createNote = async (noteData) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

/**
 * Update an existing note.
 */
export const updateNote = async (noteId, noteData) => {
  const response = await api.put(`/notes/${noteId}`, noteData);
  return response.data;
};

/**
 * Delete a note.
 */
export const deleteNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};
