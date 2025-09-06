import Note from "../models/Note.js" // Import the Note model from models

// Controller to get all notes
export async function getAllNotes(req, res) {
   try {
      // Find all notes and sort by creation date (newest first)
      const notes = await Note.find().sort({ createdAt: -1 }); 
      // Send the notes as a JSON response with status 200
      res.status(200).json(notes);
   } catch (error) {
      // Log any errors to the console
      console.error("Error in getAllNotes controller", error);
      // Send a 500 error response if something goes wrong
      res.status(500).json({ message: "Internal server error" })
   }
};

// Controller to get a single note by its ID
export async function getAllNoteById(req, res) {
   try {
      // Find a note by the ID provided in the request parameters
      const note = await Note.findById(req.params.id);
      // If no note is found, send a 404 error response
      if (!note) return res.status(404).json({ message: "Note not found" });
      // Send the found note as a JSON response
      res.json(note);
   } catch (error) {
      // Log any errors to the console
      console.error("Error in getAllNoteById controller", error);
      // Send a 500 error response if something goes wrong
      res.status(500).json({ message: "Internal server error" });
   } 
}

// Controller to create a new note
export async function createNotes(req, res) {
   try {
      // Destructure title and content from the request body
      const { title, content } = req.body;
      // Log the title and content to the console
      console.log(title, content); 
      // Create a new Note instance with the provided title and content
      const note = new Note({ title, content });

      // Save the new note to the database
      const saveNote = await note.save();
      // Send the saved note as a JSON response with status 201
      res.status(201).json({ saveNote }); 
   } catch (error) {
      // Log any errors to the console
      console.error("Error in createNotes controller", error);
      // Send a 500 error response if something goes wrong
      res.status(500).json({ message: "Internal server error" });
   }
};

// Controller to update an existing note
export async function updateNote(req, res) {
   try {
      // Destructure title and content from the request body
      const { title, content } = req.body
      // Find a note by ID and update its title and content
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true }
      );
      // If no note is found, send a 404 error response
      if (!updatedNote) return res.status(404).json({ message: "Note not found" });
      // Send a success message as a JSON response
      res.status(200).json({ message: "Note updated successfully!" });
   } catch (error) {
      // Log any errors to the console
      console.error("Error in updateNote controller", error);
      // Send a 500 error response if something goes wrong
      res.status(500).json({ message: "Internal server error" });
   }
};

// Controller to delete a note
export async function deleteNote(req, res) {
   try {
      // Find a note by ID and delete it
      const deleteNote = await Note.findByIdAndDelete(req.params.id);
      // If no note is found, send a 404 error response
      if (!deleteNote) return res.status(404).json({ message: "Note not found" });
      // Send a success message as a JSON response
      res.json({ message: "Note deleted successfully!" });
   } catch (error) {
      // Log any errors to the console
      console.error("Error in deleteNote controller", error);
      // Send a 500 error response if something goes wrong
      res.status(500).json({ message: "Internal server error" });
   }
} // <-- Add