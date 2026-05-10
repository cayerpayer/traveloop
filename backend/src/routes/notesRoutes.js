/* Notes Routes */
import { Router } from 'express';
import { getNotes, getNote, createNote, updateNote, deleteNote } from '../controllers/notesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.route('/').get(getNotes).post(createNote);
router.route('/:id').get(getNote).put(updateNote).delete(deleteNote);

export default router;
