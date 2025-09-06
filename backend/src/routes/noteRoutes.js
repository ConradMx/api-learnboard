import express from 'express';

import { createNotes, deleteNote, updateNote,  getAllNotes, getAllNoteById } from '../controllers/notesController.js';

const router = express.Router();

router.get("/",  getAllNotes);
router.get("/:id",  getAllNoteById);
router.post("/", createNotes );
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

 




 






