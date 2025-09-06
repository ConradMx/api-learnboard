// Import React hooks and required libraries
import { useEffect } from "react"; // For running side effects
import { useState } from "react"; // For managing component state
import { Link, useNavigate, useParams } from "react-router"; // For navigation and route parameters
import api from "../lib/axios"; // Axios instance for API requests
import toast from "react-hot-toast"; // For showing toast notifications
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react"; // Icon components

// Main component for displaying and editing a single note
const NoteDetailPage = () => {
  // State to hold the note data
  const [note, setNote] = useState(null);
  // State to track loading status while fetching note
  const [loading, setLoading] = useState(true);
  // State to track saving status while updating note
  const [saving, setSaving] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Get the note ID from the route parameters
  const { id } = useParams();

  // Fetch the note when the component mounts or the ID changes
  useEffect(() => {
    // Async function to fetch note data from API
    const fetchNote = async () => {
      try {
        // Make GET request to fetch note by ID
        const res = await api.get(`/notes/${id}`);
        // Update note state with fetched data
        setNote(res.data);
      } catch (error) {
        // Log error and show toast notification
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        // Set loading to false after fetch attempt
        setLoading(false);
      }
    };

    // Call the fetchNote function
    fetchNote();
  }, [id]);

  // Handler for deleting the note
  const handleDelete = async () => {
    // Confirm deletion with the user
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      // Make DELETE request to API
      await api.delete(`/notes/${id}`);
      // Show success toast and navigate back to notes list
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      // Log error and show toast notification
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  // Handler for saving changes to the note
  const handleSave = async () => {
    // Validate that title and content are not empty
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    // Set saving state to true
    setSaving(true);

    try {
      // Make PUT request to update note
      await api.put(`/notes/${id}`, note);
      // Show success toast and navigate back to notes list
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      // Log error and show toast notification
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      // Set saving state to false after attempt
      setSaving(false);
    }
  };

  // Show loading spinner while fetching note
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  // Render the note detail form
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header with back button and delete button */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          {/* Card containing the note form */}
          <div className="card bg-base-100">
            <div className="card-body">
              {/* Title input field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* Content textarea field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              {/* Save button */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default NoteDetailPage;
